import type { Metadata } from "next";
import { getPrograms, getProgramType, getProgramTypes } from "@/lib/api";
import type { Program, ProgramType } from "@/lib/types";
import { ProgramsView } from "../../programs-view";
import { resolveLocale } from "@/lib/server-request";
import { mediaUrl, localeCanonical } from "@/lib/url";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ typeSlug: string }>;
}): Promise<Metadata> {
  const { typeSlug } = await params;
  const locale = await resolveLocale();

  const type = await getProgramType(typeSlug, locale).catch(() => null);
  if (!type) return {};

  const canonical =
    type.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/programs/category/${typeSlug}`);
  const ogImage =
    mediaUrl(type.meta?.image, "og") ??
    mediaUrl(type.meta?.image) ??
    mediaUrl(type.featuredImage, "og") ??
    mediaUrl(type.featuredImage);

  return {
    title: type.meta?.title ?? type.name,
    description: type.meta?.description ?? type.shortDescription,
    alternates: { canonical },
    robots: {
      index: !type.meta?.noIndex,
      follow: !type.meta?.noFollow,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: type.meta?.title ?? type.name,
      description: type.meta?.description ?? type.shortDescription,
      siteName: "Levntura",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: type.name }]
        : [],
    },
  };
}

export default async function CategoryProgramsPage({
  params,
  searchParams,
}: {
  params: Promise<{ typeSlug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const locale = await resolveLocale();

  const resolvedParams = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const { typeSlug } = resolvedParams;

  // Fetch ALL programs — the type filter is applied client-side inside
  // ProgramsView so type-pill switching stays instant. Tolerate CMS failure.
  const [programsRes, types] = await Promise.all([
    getPrograms(locale, { limit: 100, draft: isPreview }).catch(
      () => ({ docs: [] as Program[] }),
    ),
    getProgramTypes(locale, { draft: isPreview }).catch(
      () => [] as ProgramType[],
    ),
  ]);

  return (
    <ProgramsView
      programs={programsRes.docs}
      types={types}
      activeTypeSlug={typeSlug}
      locale={locale}
    />
  );
}
