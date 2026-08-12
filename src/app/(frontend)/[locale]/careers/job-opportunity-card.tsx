import Image, { StaticImageData } from "next/image";
import { Button } from "@/design-system/button";
import { Link } from "@/i18n/navigation";
import { flagSrcFor } from "@/lib/flag";
import { FormModal } from "@/components/form-modal";
import type { CmsForm } from "@/lib/types";

interface JobOpportunityCardProps {
  image?: StaticImageData | string | null;
  type: string;
  country: string;
  /** Country code (e.g. "US", "UK") — resolved to a flag via flagSrcFor. */
  countryCode: string;
  title: string;
  category: string;
  dates: string;
  description: string;
  salary: string;
  applyHref?: string;
  moreHref?: string;
  applyLabel?: string;
  moreLabel?: string;
  /** When set, APPLY opens this form in a pop-up (instead of the applyHref). */
  applyForm?: CmsForm | null;
}

export function JobOpportunityCard({
  image,
  type,
  country,
  countryCode,
  title,
  category,
  dates,
  description,
  salary,
  applyHref = "#",
  moreHref = "#",
  applyLabel = "APPLY",
  moreLabel = "MORE",
  applyForm,
}: JobOpportunityCardProps) {
  return (
    <div className="bg-white border border-lev-gray-light rounded-sm overflow-hidden group h-full flex flex-col">
      <div className="relative h-[240px] overflow-hidden shrink-0 bg-lev-gray-light">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="typography-R14 uppercase text-lev-orange">
            {type}
          </span>
          <div className="flex items-center gap-2">
            <span className="typography-S12 uppercase text-lev-black">
              {country}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagSrcFor(countryCode)}
              alt=""
              width={28}
              height={20}
              className="h-4 w-auto rounded-sm"
            />
          </div>
        </div>

        <h3 className="typography-S24 uppercase text-lev-black mb-4">
          {title}
        </h3>

        <p className="typography-R14 text-lev-gray mb-3">{category}</p>

        <p className="typography-R14 text-lev-gray mb-4">{dates}</p>

        <p className="text-lev-gray text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="typography-S18 text-lev-black">{salary}</span>
          <div className="flex flex-col gap-2">
            {applyForm ? (
              <FormModal
                form={applyForm}
                title={applyForm.title ?? title}
                contextField={{ name: "_job", label: "Job", value: title }}
                trigger={
                  <Button className="w-[120px] border-lev-black text-lev-black hover:bg-lev-black hover:text-white">
                    {applyLabel}
                  </Button>
                }
              />
            ) : (
              <Button
                asChild
                className="w-[120px] border-lev-black text-lev-black hover:bg-lev-black hover:text-white"
              >
                <Link href={applyHref}>{applyLabel}</Link>
              </Button>
            )}
            <Button asChild variant="ghost" className="w-[120px]">
              <Link href={moreHref}>{moreLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
