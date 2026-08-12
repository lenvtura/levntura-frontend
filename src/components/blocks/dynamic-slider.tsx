import { getJobs, getPrograms } from "@/lib/api";
import { resolveLocale } from "@/lib/server-request";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { flagSrcFor } from "@/lib/flag";
import { PROGRAM_COUNTRY_OPTIONS } from "@/fields/countries";
import type { Job, JobType, ProgramType } from "@/lib/types";

import { DynamicSliderClient, type SliderCard } from "./dynamic-slider-client";

export interface DynamicSliderBlockData {
  blockType?: string;
  source?: "jobs" | "internships";
  heading?: string;
  highlightedWords?: string;
  body?: string;
  byCountry?: string[] | null;
  byJobType?: Array<JobType | string | number> | null;
  byProgramType?: Array<ProgramType | string | number> | null;
  limit?: number;
  emptyMessage?: string;
}

const COUNTRY_LABEL: Record<string, string> = Object.fromEntries(
  PROGRAM_COUNTRY_OPTIONS.map((o) => [o.value, o.label]),
);

const idOf = (v: unknown): string | number | undefined =>
  v && typeof v === "object" ? (v as { id?: string | number }).id : (v as string | number);

const slugOf = (v: unknown): string | undefined =>
  v && typeof v === "object" ? (v as { slug?: string }).slug : undefined;

function fmtDate(d?: string): string | undefined {
  if (!d) return undefined;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return undefined;
  const day = String(dt.getDate()).padStart(2, "0");
  const month = dt.toLocaleString("en-US", { month: "short" });
  return `${day} ${month},${dt.getFullYear()}`;
}

function dateRangeOf(job: Job): string | undefined {
  const start = fmtDate(job.startDate);
  const end = fmtDate(job.endDate);
  if (start && end) return `${start} – ${end}`;
  return start ?? end;
}

function salaryOf(job: Job): string | undefined {
  const s = job.salary;
  if (!s || s.amount == null) return undefined;
  const period = s.period && s.period !== "total" ? s.period : "";
  return `${s.amount}${s.currency ?? "$"}${period}`;
}

/**
 * DynamicSlider — server half. Fetches jobs or internship programs per the
 * block config, maps them to plain card data, and hands off to the client
 * slider. Jobs link to /internship/[slug]; programs link to /programs/[slug].
 */
export async function DynamicSliderBlock({
  block,
}: {
  block: DynamicSliderBlockData;
}) {
  const locale = await resolveLocale();
  const source = block.source ?? "jobs";
  const limit = block.limit ?? 12;
  const countries = (block.byCountry ?? []).filter(Boolean);

  let cards: SliderCard[] = [];

  if (source === "jobs") {
    const jobTypeIds = (block.byJobType ?? [])
      .map(idOf)
      .filter((v): v is string | number => v != null);

    const jobs = await getJobs(locale, {
      countries: countries.length ? countries : undefined,
      jobTypeIds: jobTypeIds.length ? jobTypeIds : undefined,
      limit,
    });

    cards = jobs.map((job) => ({
      href: `/internship/${job.slug}`,
      title: job.title,
      badge: job.employmentType?.replace(/-/g, "").toUpperCase(),
      subtitle:
        typeof job.jobType === "object" ? job.jobType?.name : undefined,
      countryLabel: COUNTRY_LABEL[job.country] ?? job.country,
      flagSrc: flagSrcFor(job.country),
      dateRange: dateRangeOf(job),
      description: job.shortDescription ?? "",
      salary: salaryOf(job),
      applyUrl: job.applyUrl,
      imageSrc: mediaUrl(job.image, "feature") ?? mediaUrl(job.image) ?? null,
      imageAlt: mediaAlt(job.image, job.title),
    }));
  } else {
    // Internship programs — programs whose type is internship (or the type
    // picked in the block), optionally narrowed to one country.
    const typeSlug = slugOf((block.byProgramType ?? [])[0]) ?? "internship";
    const res = await getPrograms(locale, {
      typeSlug,
      country: countries[0] as never,
      limit,
    });

    cards = res.docs.map((program) => ({
      href: `/programs/${program.slug}`,
      title: program.title,
      countryLabel: COUNTRY_LABEL[program.country] ?? program.country,
      flagSrc: flagSrcFor(program.country),
      description: program.shortDescription ?? "",
      imageSrc:
        mediaUrl(program.featuredImage, "feature") ??
        mediaUrl(program.featuredImage) ??
        null,
      imageAlt: mediaAlt(program.featuredImage, program.title),
    }));
  }

  return (
    <DynamicSliderClient
      heading={block.heading}
      highlightedWords={block.highlightedWords}
      body={block.body}
      emptyMessage={block.emptyMessage}
      cards={cards}
    />
  );
}
