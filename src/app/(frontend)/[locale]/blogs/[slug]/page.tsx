import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getBlogPost } from "@/lib/api";
import { mediaUrl, mediaAlt, localeCanonical } from "@/lib/url";
import { JsonLd } from "@/components/json-ld";
import { buildArticleSchema } from "@/lib/structuredData";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { RelatedPosts } from "@/components/blocks/related-posts";
import { BlogAuthor } from "@/components/blocks/blog-author";
import {
  extractHeadingsFromLexical,
  type RichTextHeading,
} from "@/components/blocks/rich-text";
import { resolveLocale, resolvePreview } from "@/lib/server-request";
import type { BlogPost as CmsBlogPost, Block, Locale } from "@/lib/types";

import { BlogHero } from "./blog-hero";
import { ReadingProgressBar } from "./reading-progress-bar";
import { Title } from "./title-social-icons-";
import { BlogBreadcrumb } from "./blog-breadcrumb";
import { BlogTocSidebar } from "./blog-toc-sidebar";
import { SocialShareIcons } from "@/atoms/social-share-icons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draft?: string; preview?: string; locale?: string }>;
}

// ─── Metadata ────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
  searchParams,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale();

  const cmsPost = await getBlogPost(slug, locale).catch(() => null);
  if (!cmsPost) return {};

  // Editor-set canonical (SEO tab) wins; otherwise fall back to the
  // locale-aware default so Arabic posts stay self-canonical.
  const canonical =
    cmsPost.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/blogs/${slug}`);
  // The OG section overrides when set, else falls back to meta / featuredImage.
  const ogImage =
    mediaUrl(cmsPost.openGraph?.image, "og") ??
    mediaUrl(cmsPost.openGraph?.image) ??
    mediaUrl(cmsPost.featuredImage, "og") ??
    mediaUrl(cmsPost.featuredImage);

  return {
    title: cmsPost.meta?.title ?? cmsPost.title,
    description: cmsPost.meta?.description ?? cmsPost.excerpt,
    alternates: { canonical },
    // No Index / No Follow checkboxes (SEO tab). Default is index + follow.
    robots: {
      index: !cmsPost.meta?.noIndex,
      follow: !cmsPost.meta?.noFollow,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: cmsPost.openGraph?.title || cmsPost.meta?.title || cmsPost.title,
      description:
        cmsPost.openGraph?.description ||
        cmsPost.meta?.description ||
        cmsPost.excerpt,
      siteName: "Levntura",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: mediaAlt(cmsPost.openGraph?.image ?? cmsPost.featuredImage, cmsPost.title),
            },
          ]
        : [],
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function BlogDetailPage({
  params,
  searchParams,
}: BlogDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <BlogDetailContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function BlogDetailContent({
  params,
  searchParams,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale();
  const { draft, preview } = await resolvePreview(searchParams);

  const cmsPost = await getBlogPost(slug, locale, { draft, preview }).catch(
    () => null,
  );

  if (!cmsPost) {
    notFound();
  }

  return <CmsBlogDetail post={cmsPost} locale={locale} />;
}

function CmsBlogDetail({
  post,
  locale,
}: {
  post: CmsBlogPost;
  locale: Locale;
}) {
  const heroImage =
    mediaUrl(post.featuredImage, "feature") ?? mediaUrl(post.featuredImage);

  // Detect whether the editor added their own HeroBlogPost block — if not,
  // render a default hero so the page never starts with bare text.
  const hasExplicitHero = post.sections?.some(
    (b) => b.blockType === "heroBlogPost",
  );

  // Build the table-of-contents from every richText block's headings so the
  // sidebar mirrors the legacy static layout. Multi-block posts (rare) get
  // their headings concatenated in document order.
  //
  // `extractHeadingsFromLexical` dedupes IDs WITHIN a single lexical doc,
  // but when a post has multiple richText blocks each block runs its own
  // dedup pass — so two blocks both containing an "Introduction" H2 would
  // emit id="introduction" twice and React warns about duplicate keys.
  // We re-disambiguate across blocks here with the same `-N` suffix scheme.
  const rawToc: RichTextHeading[] = (post.sections ?? [])
    .filter((b: Block): b is Block & { content: unknown } =>
      b.blockType === "richText" && "content" in b,
    )
    .flatMap((b) => extractHeadingsFromLexical(b.content));
  const seenIds = new Map<string, number>();
  const tocSections: RichTextHeading[] = rawToc.map((h) => {
    const prior = seenIds.get(h.id) ?? 0;
    seenIds.set(h.id, prior + 1);
    return prior > 0 ? { ...h, id: `${h.id}-${prior + 1}` } : h;
  });

  const canonical =
    post.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/blogs/${post.slug}`);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildArticleSchema(post, canonical)} />
      <ReadingProgressBar />

      {!hasExplicitHero && heroImage && (
        <BlogHero
          title={post.title}
          image={heroImage}
          imageAlt={mediaAlt(post.featuredImage, post.title)}
        />
      )}

      <div className="container py-12 lg:py-16">
        <div
          className={
            tocSections.length > 0
              ? "grid lg:grid-cols-[250px_1fr] gap-8"
              : ""
          }
        >
          {tocSections.length > 0 && (
            <aside className="hidden h-full lg:block">
              <div className="sticky top-24 h-fit">
                <BlogTocSidebar sections={tocSections} />
              </div>
            </aside>
          )}

          <main>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 flex-wrap gap-4">
              <BlogBreadcrumb title={post.title} />
              <Suspense fallback={<div className="w-12 h-12 animate-pulse" />}>
                <SocialShareIcons size="sm" />
              </Suspense>
            </div>

            <Title title={post.title} />

            <BlogAuthor post={post} locale={locale} />

            <BlockRenderer
              blocks={post.sections}
              post={post}
              locale={locale}
              shareUrl={canonical}
            />

            <RelatedPosts posts={post.relatedPosts} locale={locale} />
          </main>
        </div>
      </div>
    </div>
  );
}
