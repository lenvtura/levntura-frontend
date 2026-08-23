import { flagSrcFor } from "@/lib/flag";

interface JobHeaderProps {
  type: string;
  countryLabel: string;
  countryCode: string;
  title: string;
  category: string;
  dates: string;
}

/**
 * Meta block under the (full-bleed) hero image on a job detail page — built
 * from the job's own structured fields. The image itself is rendered by the
 * page so it can span the full column width.
 */
export function JobHeader({
  type,
  countryLabel,
  countryCode,
  title,
  category,
  dates,
}: JobHeaderProps) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        {type && (
          <span className="typography-R14 uppercase text-[#f97316]">{type}</span>
        )}
        {countryLabel && (
          <span className="flex items-center gap-2 typography-S12 uppercase text-lev-black">
            {countryLabel}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagSrcFor(countryCode)}
              alt=""
              width={28}
              height={20}
              className="h-4 w-auto rounded-sm"
            />
          </span>
        )}
      </div>

      <h1 className="typography-EB48 lg:typography-EB74 mb-4 uppercase leading-[1.05] text-lev-red-dark">
        {title}
      </h1>

      {category && (
        <p className="typography-R16 mb-2 text-lev-gray">{category}</p>
      )}
      {dates && <p className="typography-R16 mb-6 text-lev-gray">{dates}</p>}
    </div>
  );
}
