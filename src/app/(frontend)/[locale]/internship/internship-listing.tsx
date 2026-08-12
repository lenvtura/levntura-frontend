"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, ChevronDown } from "lucide-react";

import { Input } from "@/design-system/input";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { flagSrcFor } from "@/lib/flag";
import type { CmsForm } from "@/lib/types";
import { JobOpportunityCard } from "../careers/job-opportunity-card";
import { CareersPagination } from "../careers/careers-pagination";

export interface JobCard {
  id: string;
  image: string | null;
  type: string;
  country: string;
  countryCode: string;
  jobTypeId: string;
  title: string;
  category: string;
  dates: string;
  description: string;
  salary: string;
  moreHref: string;
  applyHref: string;
}

interface FilterOption {
  value: string;
  label: string;
}

const PER_PAGE = 4;

const SELECT_CLASS =
  "border border-lev-gray-light bg-white px-4 py-3 text-lev-black outline-none focus:ring-1 focus:ring-lev-black min-w-[160px]";

/** Country dropdown that shows a flag + name (native <select> can't render
 *  images, so this is a small custom listbox). */
function CountrySelect({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: FilterOption[];
  placeholder: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const Flag = ({ code }: { code: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagSrcFor(code)}
      alt=""
      width={24}
      height={16}
      className="h-4 w-auto rounded-sm"
    />
  );

  return (
    <div ref={ref} className="relative min-w-[180px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 border border-lev-gray-light bg-white px-4 py-3 text-lev-black"
      >
        {selected ? (
          <>
            <Flag code={selected.value} />
            <span className="truncate">{selected.label}</span>
          </>
        ) : (
          <span className="text-lev-gray">{placeholder}</span>
        )}
        <ChevronDown className="ms-auto h-4 w-4 shrink-0 text-lev-gray" />
      </button>

      {open && (
        <ul className="absolute z-30 mt-1 max-h-[280px] w-full overflow-auto border border-lev-gray-light bg-white shadow-lg">
          <li>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-start text-lev-gray hover:bg-lev-gray-light/40"
            >
              {placeholder}
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-start text-lev-black hover:bg-lev-gray-light/40"
              >
                <Flag code={o.value} />
                <span className="truncate">{o.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function InternshipListing({
  jobs,
  countries,
  jobTypes,
  applyForm,
}: {
  jobs: JobCard[];
  countries: FilterOption[];
  jobTypes: FilterOption[];
  applyForm?: CmsForm | null;
}) {
  const t = useTranslations("internship");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [jobType, setJobType] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (country && j.countryCode !== country) return false;
      if (jobType && j.jobTypeId !== jobType) return false;
      if (
        q &&
        !(
          j.title.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
  }, [jobs, query, country, jobType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const resetPage = () => setPage(1);

  return (
    <>
      <div className="relative min-h-screen">
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[30%] bg-lev-green-dark" />

        <div className="relative lg:ml-[30%]">
          <div className="container p-12 lg:py-16">
            <div className="mb-8 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <FadeUpAnimator
                className="typography-S34 uppercase text-lev-black"
                transition={{ delay: 0.1 }}
              >
                {t("available.title")}
              </FadeUpAnimator>
              <FadeUpAnimator
                transition={{ delay: 0.2 }}
                className="max-w-[600px] leading-normal text-lev-red-dark opacity-50"
              >
                {t("available.subtitle")}
              </FadeUpAnimator>
            </div>

            {/* Search + filters */}
            <FadeUpAnimator
              transition={{ delay: 0.3 }}
              className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center"
            >
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder={t("available.searchPlaceholder")}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    resetPage();
                  }}
                  className="pe-10"
                />
                <Search className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-lev-gray" />
              </div>

              <CountrySelect
                value={country}
                options={countries}
                placeholder={t("available.allCountries")}
                onChange={(v) => {
                  setCountry(v);
                  resetPage();
                }}
              />

              <select
                value={jobType}
                onChange={(e) => {
                  setJobType(e.target.value);
                  resetPage();
                }}
                className={SELECT_CLASS}
              >
                <option value="">{t("available.allTypes")}</option>
                {jobTypes.map((jt) => (
                  <option key={jt.value} value={jt.value}>
                    {jt.label}
                  </option>
                ))}
              </select>
            </FadeUpAnimator>

            {pageItems.length === 0 ? (
              <p className="typography-M18 py-12 text-center text-lev-gray">
                {t("available.empty")}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                {pageItems.map((job) => (
                  <JobOpportunityCard
                    key={job.id}
                    image={job.image}
                    type={job.type}
                    country={job.country}
                    countryCode={job.countryCode}
                    title={job.title}
                    category={job.category}
                    dates={job.dates}
                    description={job.description}
                    salary={job.salary}
                    moreHref={job.moreHref}
                    applyHref={job.applyHref}
                    applyLabel={t("card.apply")}
                    moreLabel={t("card.more")}
                    applyForm={applyForm}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <CareersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
