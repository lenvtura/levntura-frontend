import { mediaUrl } from "@/lib/url";
import { PROGRAM_COUNTRY_OPTIONS } from "@/fields/countries";
import type { Job } from "@/lib/types";

import type { JobCard } from "./internship-listing";

export const COUNTRY_LABEL: Record<string, string> = Object.fromEntries(
  PROGRAM_COUNTRY_OPTIONS.map((o) => [o.value, o.label]),
);

export function fmtDate(d?: string): string | undefined {
  if (!d) return undefined;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return undefined;
  const day = String(dt.getDate()).padStart(2, "0");
  const month = dt.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}, ${dt.getFullYear()}`;
}

export function dateRangeOf(job: Job): string {
  const start = fmtDate(job.startDate);
  const end = fmtDate(job.endDate);
  if (start && end) return `${start} - ${end}`;
  return start ?? end ?? "";
}

export function salaryOf(job: Job): string {
  const s = job.salary;
  if (!s || s.amount == null) return "";
  const period = s.period && s.period !== "total" ? s.period : "";
  return `${s.amount}${s.currency ?? "$"}${period}`;
}

export function jobTypeName(job: Job): string {
  return typeof job.jobType === "object" && job.jobType ? job.jobType.name : "";
}

/** Map a CMS Job to the flat card shape used by JobOpportunityCard. */
export function jobToCard(job: Job): JobCard {
  return {
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
    category: jobTypeName(job),
    dates: dateRangeOf(job),
    description: job.shortDescription ?? "",
    salary: salaryOf(job),
    moreHref: `/internship/${job.slug}`,
    applyHref: `/internship/${job.slug}`,
  };
}
