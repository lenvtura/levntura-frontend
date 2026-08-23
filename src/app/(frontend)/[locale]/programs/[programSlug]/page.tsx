import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProgram, getPrograms } from "@/lib/api";
import { ProgramApplyForm } from "@/components/program-apply-form";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { resolveLocale, resolvePreview } from "@/lib/server-request";
import type { CmsForm, Locale, Program, ProgramType } from "@/lib/types";

import { mediaUrl, mediaAlt, localeCanonical } from "@/lib/url";
import { JsonLd } from "@/components/json-ld";
import { buildCourseSchema } from "@/lib/structuredData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}): Promise<Metadata> {
  const { programSlug } = await params;
  const locale = await resolveLocale();

  const program = await getProgram(programSlug, locale).catch(() => null);
  if (!program) return {};

  const canonical =
    program.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/programs/${programSlug}`);
  const ogImage =
    mediaUrl(program.openGraph?.image, "og") ??
    mediaUrl(program.openGraph?.image) ??
    mediaUrl(program.featuredImage, "og") ??
    mediaUrl(program.featuredImage);

  return {
    title: program.meta?.title ?? program.title,
    description: program.meta?.description ?? program.shortDescription,
    alternates: { canonical },
    robots: {
      index: !program.meta?.noIndex,
      follow: !program.meta?.noFollow,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: program.openGraph?.title || program.meta?.title || program.title,
      description:
        program.openGraph?.description ||
        program.meta?.description ||
        program.shortDescription,
      siteName: "Levntura",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: mediaAlt(
                program.openGraph?.image ?? program.featuredImage,
                program.title,
              ),
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  // Don't block the build if the CMS is temporarily unreachable / mid-deploy.
  // Vercel will still render each program page on first request via the
  // dynamic route — pre-generation is just a perf nice-to-have here.
  try {
    const programs = await getPrograms("en", { limit: 100 });
    return programs.docs.map((p) => ({ programSlug: p.slug }));
  } catch (err) {
    console.warn(
      "[programs/generateStaticParams] CMS unreachable; rendering all detail pages dynamically:",
      (err as Error).message,
    );
    return [];
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ programSlug: string }>;
  searchParams: Promise<{ preview?: string; draft?: string; locale?: string }>;
}) {
  const [{ programSlug }, locale, { isPreview }] = await Promise.all([
    params,
    resolveLocale(),
    resolvePreview(searchParams),
  ]);

  // Tolerate CMS being unreachable — render 404 rather than crash.
  const program = await getProgram(programSlug, locale, {
    preview: isPreview,
    draft: isPreview,
  }).catch(() => null);

  if (!program) notFound();

  const canonical =
    program.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/programs/${programSlug}`);

  // Build the apply-form block once here so the page knows whether to use
  // Calendly, the dynamic form, or nothing — and ProgramDetail just renders
  // whatever we hand it.
  // The Apply section can pick its own form; fall back to the program's form
  // (or its type's form) when the block leaves it empty.
  const applyBlockForm = (() => {
    const b = Array.isArray(program.sections)
      ? program.sections.find(
          (s) => (s as { blockType?: string })?.blockType === "programApply",
        )
      : undefined;
    const f = (b as { form?: unknown } | undefined)?.form;
    return f && typeof f === "object" ? (f as CmsForm) : null;
  })();

  const applyForm = program.calendlyURL ? (
    <div className="w-full h-[700px] rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
      <iframe
        src={program.calendlyURL}
        width="100%"
        height="100%"
        frameBorder="0"
        title={`Apply for ${program.title}`}
      />
    </div>
  ) : (
    <ProgramApplyForm
      form={applyBlockForm ?? resolveApplicationForm(program)}
      programId={program.id}
      programTitle={program.title}
    />
  );

  // Render any extra CMS blocks on the server so async blocks (e.g.
  // BlogPostsListBlock) can fetch data.

  return (
    <>
      <JsonLd data={buildCourseSchema(program, canonical)} />
      <div className="bg-[#F7F7F8]">
        <BlockRenderer
          blocks={program.sections}
          locale={locale}
          applyForm={program.isOpen ? applyForm : undefined}
          shareUrl={canonical}
        />
      </div>
    </>
  );
}

/**
 * Pick the form that should render in the apply section, following the
 * inheritance rule:
 *   program.applicationForm → programType.applicationForm → null.
 *
 * Both `applicationForm` and `type[*]` come back populated when the program
 * is fetched with `depth >= 2` (Payload's default for cmsRequest).
 */
function resolveApplicationForm(program: Program): CmsForm | null {
  if (program.applicationForm && typeof program.applicationForm === "object") {
    return program.applicationForm as CmsForm;
  }
  // Fall back to the first attached program type's form.
  if (Array.isArray(program.type)) {
    for (const t of program.type) {
      if (
        t &&
        typeof t === "object" &&
        (t as ProgramType).applicationForm &&
        typeof (t as ProgramType).applicationForm === "object"
      ) {
        return (t as ProgramType).applicationForm as CmsForm;
      }
    }
  }
  return null;
}
