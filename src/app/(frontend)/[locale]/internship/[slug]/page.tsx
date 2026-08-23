import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getJob, getJobs, getSiteSettings } from "@/lib/api";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { FormModal } from "@/components/form-modal";
import { Button } from "@/design-system/button";
import { Link } from "@/i18n/navigation";
import { resolveLocale, resolvePreview } from "@/lib/server-request";
import { mediaUrl, mediaAlt, localeCanonical } from "@/lib/url";
import type { CmsForm, Job } from "@/lib/types";

import { JobOpportunityCard } from "../../careers/job-opportunity-card";
import { ShareCard } from "../../careers/share-card";
import { JobHeader } from "../job-header";
import {
  COUNTRY_LABEL,
  dateRangeOf,
  jobToCard,
  jobTypeName,
  salaryOf,
} from "../job-utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com";

export const revalidate = 60;

interface JobPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; draft?: string; locale?: string }>;
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale();
  const job = await getJob(slug, locale).catch(() => null);
  if (!job) return {};

  const canonical =
    job.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/internship/${slug}`);
  const ogImage =
    mediaUrl(job.openGraph?.image, "og") ??
    mediaUrl(job.image, "og") ??
    mediaUrl(job.image);

  return {
    title: job.meta?.title ?? job.title,
    description: job.meta?.description ?? job.shortDescription,
    alternates: { canonical },
    robots: { index: !job.meta?.noIndex, follow: !job.meta?.noFollow },
    openGraph: {
      type: "website",
      url: canonical,
      title: job.openGraph?.title || job.meta?.title || job.title,
      description:
        job.openGraph?.description || job.meta?.description || job.shortDescription,
      siteName: "Levntura",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const jobs = await getJobs("en", { limit: 100 });
    return jobs.map((j) => ({ slug: j.slug }));
  } catch {
    return [];
  }
}

async function resolveRelated(job: Job, locale: "en" | "ar"): Promise<Job[]> {
  // Manual pick wins; otherwise auto-fill by same country + job type.
  const manual = (job.relatedJobs ?? []).filter(
    (j): j is Job => Boolean(j) && typeof j === "object",
  );
  if (manual.length) return manual.slice(0, 4);

  const jobTypeId =
    typeof job.jobType === "object" && job.jobType ? job.jobType.id : job.jobType;
  const res = await getJobs(locale, {
    countries: [job.country],
    jobTypeIds: jobTypeId != null ? [jobTypeId] : undefined,
    limit: 6,
  });
  return res.filter((j) => String(j.id) !== String(job.id)).slice(0, 4);
}

export default async function JobPage({ params, searchParams }: JobPageProps) {
  const [{ slug }, locale, { isPreview }] = await Promise.all([
    params,
    resolveLocale(),
    resolvePreview(searchParams),
  ]);

  const job = await getJob(slug, locale, {
    preview: isPreview,
    draft: isPreview,
  }).catch(() => null);
  if (!job) notFound();

  const [related, settings, t] = await Promise.all([
    resolveRelated(job, locale),
    getSiteSettings(locale),
    getTranslations("internship"),
  ]);

  const applyForm =
    ((settings as { internship?: { applyForm?: unknown } } | null)?.internship
      ?.applyForm as CmsForm | undefined) ?? null;
  const validApplyForm =
    applyForm && typeof applyForm === "object" ? applyForm : null;

  const canonical =
    job.meta?.canonicalURL ||
    localeCanonical(SITE_URL, locale, `/internship/${job.slug}`);

  const salary = salaryOf(job);
  const relatedCards = related.map(jobToCard);
  const jobImage = mediaUrl(job.image, "feature") ?? mediaUrl(job.image) ?? null;

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <div className="relative">
        {/* Dark-green band behind the nav + top of the content (the cards and
            hero image overlap it, matching the design). */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-lev-green-dark" />
        <div className="container relative pt-28 pb-8 lg:pt-32 lg:pb-12">
          <div className="grid items-start gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
          {/* Sidebar — similar jobs */}
          {relatedCards.length > 0 && (
            <aside className="order-last flex flex-col gap-6 lg:order-none">
              {relatedCards.map((card) => (
                <JobOpportunityCard
                  key={card.id}
                  image={card.image}
                  type={card.type}
                  country={card.country}
                  countryCode={card.countryCode}
                  title={card.title}
                  category={card.category}
                  dates={card.dates}
                  description={card.description}
                  salary={card.salary}
                  moreHref={card.moreHref}
                  applyForm={validApplyForm}
                  applyLabel={t("card.apply")}
                  moreLabel={t("card.more")}
                />
              ))}
            </aside>
          )}

          {/* Main — fixed header + block content + apply + share */}
          <main className={relatedCards.length === 0 ? "lg:col-span-2" : ""}>
            <div className="bg-white">
              {/* Full-bleed hero image (spans the whole column, reaches the top). */}
              {jobImage && (
                <div className="relative h-[280px] w-full overflow-hidden lg:h-[420px]">
                  <Image
                    src={jobImage}
                    alt={mediaAlt(job.image, job.title)}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 lg:p-10">
                <JobHeader
                  type={job.employmentType?.replace(/-/g, "").toUpperCase() ?? ""}
                  countryLabel={COUNTRY_LABEL[job.country] ?? job.country}
                  countryCode={job.country}
                  title={job.title}
                  category={jobTypeName(job)}
                  dates={dateRangeOf(job)}
                />

                {salary && (
                  <p className="typography-S24 mb-8 text-lev-black">{salary}</p>
                )}

                {/* Editable content — add any blocks (rich text, etc.). */}
                <BlockRenderer
                  blocks={job.sections}
                  locale={locale}
                  shareUrl={canonical}
                />

              {/* Apply */}
              <div className="mt-8">
                {validApplyForm ? (
                  <FormModal
                    form={validApplyForm}
                    title={validApplyForm.title ?? job.title}
                    contextField={{ name: "_job", label: "Job", value: job.title }}
                    trigger={
                      <Button className="border-lev-black px-10 text-lev-black hover:bg-lev-black hover:text-white">
                        {t("card.apply")}
                      </Button>
                    }
                  />
                ) : job.applyUrl ? (
                  <Button asChild className="border-lev-black px-10 text-lev-black hover:bg-lev-black hover:text-white">
                    <Link href={job.applyUrl}>{t("card.apply")}</Link>
                  </Button>
                ) : null}
              </div>
              </div>
            </div>

            <div className="mt-8">
              <ShareCard shareUrl={canonical} />
            </div>
          </main>
          </div>
        </div>
      </div>
    </div>
  );
}
