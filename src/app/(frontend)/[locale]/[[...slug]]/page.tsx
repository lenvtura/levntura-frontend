import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPageByPath } from "@/lib/api";
import { mediaUrl, mediaAlt, localeCanonical } from "@/lib/url";
import { JsonLd } from "@/components/json-ld";
import { buildPageSchema } from "@/lib/structuredData";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { resolveLocale, resolvePreview } from "@/lib/server-request";
import type { Locale, Page } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com";

interface CmsPageProps {
  // Optional catch-all: slug is undefined for the root ("/"), array for nested paths.
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ draft?: string; preview?: string; locale?: string }>;
}

/**
 * Build a fullPath from the catch-all segments.
 *
 * Next strips leading "/ar" from the segments via the proxy middleware (the
 * locale prefix is handled at the rewrite layer), so we never need to deal
 * with it here. ["about", "team"] → "/about/team".
 */
function buildFullPath(segments: string[] | undefined): string {
  if (!segments || segments.length === 0) return "/";
  return "/" + segments.join("/");
}

//  Metadata 

export async function generateMetadata({
  params,
  searchParams,
}: CmsPageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([
    params,
    resolveLocale(),
  ]);

  const fullPath = buildFullPath(slug);
  const page = await getPageByPath(fullPath, locale).catch(() => null);
  if (!page) return {};

  // Editor-set canonical (SEO tab) wins; otherwise fall back to the
  // locale-aware default so Arabic pages stay self-canonical.
  const canonical =
    page.meta?.canonicalURL || localeCanonical(SITE_URL, locale, fullPath);
  // The OG section overrides the meta fields when set, else falls back to them.
  const ogImage =
    mediaUrl(page.openGraph?.image, "og") ??
    mediaUrl(page.openGraph?.image) ??
    mediaUrl(page.meta?.image, "og") ??
    mediaUrl(page.meta?.image);

  return {
    title: page.meta?.title ?? page.title,
    description: page.meta?.description,
    alternates: { canonical },
    // No Index / No Follow checkboxes (SEO tab). Default is index + follow.
    robots: {
      index: !page.meta?.noIndex,
      follow: !page.meta?.noFollow,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: page.openGraph?.title || page.meta?.title || page.title,
      description: page.openGraph?.description || page.meta?.description,
      siteName: "Levntura",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: mediaAlt(page.openGraph?.image ?? page.meta?.image, page.title),
            },
          ]
        : [],
    },
  };
}

//  Page 

export default function CmsPage({ params, searchParams }: CmsPageProps) {
  return (
    <Suspense fallback={null}>
      <CmsPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CmsPageContent({ params, searchParams }: CmsPageProps) {
  const [{ slug }, locale, { draft, preview }] = await Promise.all([
    params,
    resolveLocale(),
    resolvePreview(searchParams),
  ]);

  const fullPath = buildFullPath(slug);
  const page = await getPageByPath(fullPath, locale, { draft, preview }).catch(
    () => null,
  );

  if (!page) {
    notFound();
  }

  const canonical =
    page.meta?.canonicalURL || localeCanonical(SITE_URL, locale, fullPath);

  return (
    <>
      <JsonLd data={buildPageSchema(page, canonical)} />
      <PageBody page={page} locale={locale} shareUrl={canonical} />
    </>
  );
}

function PageBody({
  page,
  locale,
  shareUrl,
}: {
  page: Page;
  locale: Locale;
  shareUrl: string;
}) {
  return (
    <main className="min-h-screen">
      {/* shareUrl lets the "Share" program section work on pages too. */}
      <BlockRenderer blocks={page.sections} locale={locale} shareUrl={shareUrl} />
    </main>
  );
}
