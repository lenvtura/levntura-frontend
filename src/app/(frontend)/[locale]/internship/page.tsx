import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getJobs, getPrograms, getSiteSettings } from "@/lib/api";
import { resolveLocale } from "@/lib/server-request";
import { mediaUrl } from "@/lib/url";
import { PROGRAM_COUNTRY_OPTIONS } from "@/fields/countries";
import type { CmsForm, Job } from "@/lib/types";

import { CareersHero } from "../careers/careers-hero";
import { RelatedPrograms } from "../careers/related-programs";
import { SuggestNewOpportunities } from "../careers/suggest-new-opportunities";
import { InternshipListing, type JobCard } from "./internship-listing";

export const revalidate = 60;

const COUNTRY_LABEL: Record<string, string> = Object.fromEntries(
  PROGRAM_COUNTRY_OPTIONS.map((o) => [o.value, o.label]),
);

function fmtDate(d?: string): string | undefined {
  if (!d) return undefined;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return undefined;
  const day = String(dt.getDate()).padStart(2, "0");
  const month = dt.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}, ${dt.getFullYear()}`;
}

function dateRangeOf(job: Job): string {
  const start = fmtDate(job.startDate);
  const end = fmtDate(job.endDate);
  if (start && end) return `${start} - ${end}`;
  return start ?? end ?? "";
}

function salaryOf(job: Job): string {
  const s = job.salary;
  if (!s || s.amount == null) return "";
  const period = s.period && s.period !== "total" ? s.period : "";
  return `${s.amount}${s.currency ?? "$"}${period}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("internship");
  return {
    title: `${t("available.title")} — Levntura`,
    description: t("available.subtitle"),
  };
}

export default async function InternshipPage() {
  const locale = await resolveLocale();
  const [jobs, programsRes, settings, t] = await Promise.all([
    getJobs(locale, { limit: 100 }),
    getPrograms(locale, { typeSlug: "internship", limit: 12 }),
    getSiteSettings(locale),
    getTranslations("internship"),
  ]);

  const internship = (settings as { internship?: { applyForm?: unknown; suggestForm?: unknown } } | null)
    ?.internship;
  const asForm = (v: unknown): CmsForm | null =>
    v && typeof v === "object" ? (v as CmsForm) : null;
  const applyForm = asForm(internship?.applyForm);
  const suggestForm = asForm(internship?.suggestForm);

  const cards: JobCard[] = jobs.map((job) => ({
    id: String(job.id),
    image: mediaUrl(job.image, "feature") ?? mediaUrl(job.image) ?? null,
    type: job.employmentType?.replace(/-/g, "").toUpperCase() ?? "",
    country: COUNTRY_LABEL[job.country] ?? job.country,
    countryCode: job.country,
    jobTypeId:
      typeof job.jobType === "object" && job.jobType
        ? String(job.jobType.id)
        : String(job.jobType ?? ""),
    title: job.title,
    category:
      typeof job.jobType === "object" && job.jobType ? job.jobType.name : "",
    dates: dateRangeOf(job),
    description: job.shortDescription ?? "",
    salary: salaryOf(job),
    moreHref: `/internship/${job.slug}`,
    // Apply popup form is wired later — for now points to the detail page.
    applyHref: `/internship/${job.slug}`,
  }));

  // Build filter options from the jobs actually present.
  const countryMap = new Map<string, string>();
  const typeMap = new Map<string, string>();
  for (const job of jobs) {
    countryMap.set(job.country, COUNTRY_LABEL[job.country] ?? job.country);
    if (typeof job.jobType === "object" && job.jobType) {
      typeMap.set(String(job.jobType.id), job.jobType.name);
    }
  }
  const countries = [...countryMap].map(([value, label]) => ({ value, label }));
  const jobTypes = [...typeMap].map(([value, label]) => ({ value, label }));

  const relatedPrograms = programsRes.docs.map((p) => ({
    id: String(p.id),
    title: p.title,
    image:
      mediaUrl(p.featuredImage, "feature") ?? mediaUrl(p.featuredImage) ?? "",
    href: `/programs/${p.slug}`,
  }));

  return (
    <div className="min-h-screen bg-white">
      <CareersHero />

      <InternshipListing
        jobs={cards}
        countries={countries}
        jobTypes={jobTypes}
        applyForm={applyForm}
      />

      {relatedPrograms.length > 0 && (
        <RelatedPrograms
          programs={relatedPrograms}
          title={t("programs.title")}
          label={t("programs.label")}
          viewAllLabel={t("programs.viewAll")}
        />
      )}

      <SuggestNewOpportunities form={suggestForm} />
    </div>
  );
}
