import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getBlogCategories, getBlogCategory, getBlogPosts } from "@/lib/api";
import type { BlogPost as CmsBlogPost } from "@/lib/types";
import { mediaUrl, mediaAlt, localeCanonical } from "@/lib/url";
import { resolveLocale } from "@/lib/server-request";

import { BlogsClient } from "../../blogs-client";
import type { BlogPost as UiBlogPost } from "../../blog-utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// ─── Metadata ────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale();

  const category = await getBlogCategory(slug, locale).catch(() => null);
  if (!category) return {};

  const description = category.description ?? `Articles in ${category.name}`;
  const ogImage = mediaUrl(category.image, "og") ?? mediaUrl(category.image);

  return {
    title: category.name,
    description,
    alternates: { canonical: localeCanonical(SITE_URL, locale, `/blogs/category/${slug}`) },
    openGraph: {
      title: category.name,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: category.name }] : [],
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────

function toUiBlog(cms: CmsBlogPost): UiBlogPost {
  const readingMinutes = cms.readingTime ?? 5;
  const dateLabel = cms.publishedAt
    ? new Date(cms.publishedAt)
        .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        .toUpperCase()
    : "";

  return {
    id: String(cms.id),
    title: cms.title,
    category: cms.category?.name?.toUpperCase() ?? "ARTICLE",
    readTime: `${readingMinutes}MIN READ`,
    description: cms.excerpt,
    date: dateLabel,
    image: mediaUrl(cms.featuredImage, "card") ?? mediaUrl(cms.featuredImage) ?? "",
    categories: ["All", ...(cms.category?.name ? [cms.category.name] : [])],
    href: `/blogs/${cms.slug}`,
    featured: cms.isFeatured ?? false,
  };
}

export default function BlogCategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={null}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

async function CategoryPageContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale();

  const [category, postsRes, allCategories] = await Promise.all([
    getBlogCategory(slug, locale).catch(() => null),
    getBlogPosts(locale, { limit: 50, categorySlug: slug }).catch(() => ({ docs: [] as CmsBlogPost[] })),
    getBlogCategories(locale).catch(() => []),
  ]);

  if (!category) {
    notFound();
  }

  const posts: UiBlogPost[] = postsRes.docs.map(toUiBlog);

  const filterOptions = ["All", ...allCategories.map((c) => c.name)];

  // Ensure exactly one featured post in the listing
  const hasFeatured = posts.some((p) => p.featured);
  const normalizedPosts =
    !hasFeatured && posts.length > 0
      ? posts.map((p, i) => ({ ...p, featured: i === 0 }))
      : posts;

  const heroImage =
    mediaUrl(category.image, "feature") ?? mediaUrl(category.image);

  return (
    <div className="min-h-screen bg-white">
      <CategoryHero
        name={category.name}
        description={category.description}
        image={heroImage}
        imageAlt={mediaAlt(category.image, category.name)}
      />

      <BlogsClient posts={normalizedPosts} filterOptions={filterOptions} />
    </div>
  );
}

// ─── Category Hero ───────────────────────────────────────────────────────

function CategoryHero({
  name,
  description,
  image,
  imageAlt,
}: {
  name: string;
  description?: string | null;
  image: string | undefined;
  imageAlt: string;
}) {
  return (
    <section className="relative h-[400px] lg:h-[500px] overflow-hidden bg-lev-green-dark">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </>
      )}

      <div className="relative h-full flex items-end pb-12 lg:pb-16">
        <div className="container-md">
          <span className="typography-S14 uppercase tracking-widest text-white/80 mb-3 block">
            Category
          </span>
          <h1 className="typography-EB48 lg:typography-EB64 text-white mb-4">
            {name}
          </h1>
          {description && (
            <p className="typography-R16 lg:typography-R18 text-white/90 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
