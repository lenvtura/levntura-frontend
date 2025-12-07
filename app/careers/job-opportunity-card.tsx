import Image, { StaticImageData } from "next/image";
import { Button } from "@/design-system/button";
import Link from "next/link";
import { CountryFlag } from "./country-flag";

interface JobOpportunityCardProps {
  image: StaticImageData | string;
  type: string;
  country: string;
  countryCode: "USA" | "UK";
  title: string;
  category: string;
  dates: string;
  description: string;
  salary: string;
  applyHref?: string;
  moreHref?: string;
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
}: JobOpportunityCardProps) {
  return (
    <div className="bg-white border border-lev-gray-light rounded-sm overflow-hidden group h-full flex flex-col">
      <div className="relative h-[240px] overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="typography-S14 uppercase text-lev-orange">
            {type}
          </span>
          <div className="flex items-center gap-2">
            <span className="typography-S12 uppercase text-lev-black">
              {country}
            </span>
            <CountryFlag countryCode={countryCode} />
          </div>
        </div>

        <h3 className="typography-EB24 uppercase text-lev-black mb-2">
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
            <Button
              asChild
              className="w-[120px] border-lev-black text-lev-black hover:bg-lev-black hover:text-white"
            >
              <Link href={applyHref}>APPLY</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="w-[120px] border-transparent text-lev-black hover:bg-lev-black/5"
            >
              <Link href={moreHref}>MORE</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
