import Image, { StaticImageData } from "next/image";
import { Button } from "@/design-system/button";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/design-system/separator";

interface JobListingCardProps {
  image: StaticImageData | string;
  title: string;
  dates: string;
  type: string;
  typeColor: "green" | "orange";
  country: string;
  countryCode: "USA" | "UK";
  description: string;
  salary: string;
  moreHref: string;
}

export function JobListingCard({
  image,
  title,
  dates,
  type,
  typeColor,
  country,
  description,
  salary,
  moreHref,
}: JobListingCardProps) {
  return (
    <div className="bg-white border border-lev-gray-light rounded-sm overflow-hidden group h-full flex flex-col mb-6">
      <div className="relative h-[200px] overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="typography-M24 uppercase text-lev-black mb-3">
          {title}
        </h3>

        <p className="typography-R14 text-lev-gray mb-3 uppercase">{dates}</p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`typography-S12 uppercase px-3 py-1.5  ${
              typeColor === "green"
                ? "bg-lev-green/20 text-lev-green"
                : "bg-lev-orange/20 text-lev-orange"
            }`}
          >
            {type}
          </span>
          <span className="typography-S12 uppercase px-3 py-1.5 bg-lev-pink/20 text-lev-pink">
            {country}
          </span>
        </div>

        <p className="text-lev-gray text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
          {description}
        </p>

        <Separator className="mb-6" />

        <div className="flex items-center justify-between mt-auto">
          <span className="typography-S18 text-lev-black font-semibold">
            {salary}
          </span>
          <Button asChild variant="ghost">
            <Link href={moreHref}>MORE</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
