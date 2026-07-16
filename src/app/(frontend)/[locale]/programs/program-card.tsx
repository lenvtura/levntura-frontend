import Image, { StaticImageData } from "next/image";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";
import { Link } from "@/i18n/navigation";
import { StartNowBtn } from "@/atoms/start-now-btn";

interface ProgramCardProps {
  // Allow null so callers can pass an explicit "no image" instead of "" which
  // crashes <Image>. When null we render a gray placeholder div in the slot.
  image: StaticImageData | string | null;
  title: string;
  country: string;
  countryCode: "US" | "UK" | "USA" | string;
  duration: string;
  description: string;
  href?: string;
}

const CountryFlag = ({ countryCode }: { countryCode: "US" | "UK" | "USA" | string }) => {
  if (countryCode === "USA" || countryCode === "US") {
    return (
      <svg
        width="28"
        height="20"
        viewBox="0 0 28 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="28" height="20" rx="2" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H28V1.53846H0V0ZM0 3.07692H28V4.61538H0V3.07692ZM28 6.15385H0V7.69231H28V6.15385ZM0 9.23077H28V10.7692H0V9.23077ZM28 12.3077H0V13.8462H28V12.3077ZM0 15.3846H28V16.9231H0V15.3846ZM28 18.4615H0V20H28V18.4615Z"
          fill="#D02F44"
        />
        <path fill="#46467F" d="M0 0H11.2V10.7692H0V0Z" />
        <g fill="white">
          <path d="M1.4 1.53846L1.68 2.30769H2.48L1.8 2.84615L2.08 3.61538L1.4 3.07692L0.72 3.61538L1 2.84615L0.32 2.30769H1.12L1.4 1.53846Z" />
          <path d="M4.2 1.53846L4.48 2.30769H5.28L4.6 2.84615L4.88 3.61538L4.2 3.07692L3.52 3.61538L3.8 2.84615L3.12 2.30769H3.92L4.2 1.53846Z" />
          <path d="M7 1.53846L7.28 2.30769H8.08L7.4 2.84615L7.68 3.61538L7 3.07692L6.32 3.61538L6.6 2.84615L5.92 2.30769H6.72L7 1.53846Z" />
          <path d="M9.8 1.53846L10.08 2.30769H10.88L10.2 2.84615L10.48 3.61538L9.8 3.07692L9.12 3.61538L9.4 2.84615L8.72 2.30769H9.52L9.8 1.53846Z" />
          <path d="M2.8 3.84615L3.08 4.61538H3.88L3.2 5.15385L3.48 5.92308L2.8 5.38462L2.12 5.92308L2.4 5.15385L1.72 4.61538H2.52L2.8 3.84615Z" />
          <path d="M5.6 3.84615L5.88 4.61538H6.68L6 5.15385L6.28 5.92308L5.6 5.38462L4.92 5.92308L5.2 5.15385L4.52 4.61538H5.32L5.6 3.84615Z" />
          <path d="M8.4 3.84615L8.68 4.61538H9.48L8.8 5.15385L9.08 5.92308L8.4 5.38462L7.72 5.92308L8 5.15385L7.32 4.61538H8.12L8.4 3.84615Z" />
          <path d="M1.4 6.15385L1.68 6.92308H2.48L1.8 7.46154L2.08 8.23077L1.4 7.69231L0.72 8.23077L1 7.46154L0.32 6.92308H1.12L1.4 6.15385Z" />
          <path d="M4.2 6.15385L4.48 6.92308H5.28L4.6 7.46154L4.88 8.23077L4.2 7.69231L3.52 8.23077L3.8 7.46154L3.12 6.92308H3.92L4.2 6.15385Z" />
          <path d="M7 6.15385L7.28 6.92308H8.08L7.4 7.46154L7.68 8.23077L7 7.69231L6.32 8.23077L6.6 7.46154L5.92 6.92308H6.72L7 6.15385Z" />
          <path d="M9.8 6.15385L10.08 6.92308H10.88L10.2 7.46154L10.48 8.23077L9.8 7.69231L9.12 8.23077L9.4 7.46154L8.72 6.92308H9.52L9.8 6.15385Z" />
          <path d="M2.8 8.46154L3.08 9.23077H3.88L3.2 9.76923L3.48 10.5385L2.8 10L2.12 10.5385L2.4 9.76923L1.72 9.23077H2.52L2.8 8.46154Z" />
          <path d="M5.6 8.46154L5.88 9.23077H6.68L6 9.76923L6.28 10.5385L5.6 10L4.92 10.5385L5.2 9.76923L4.52 9.23077H5.32L5.6 8.46154Z" />
          <path d="M8.4 8.46154L8.68 9.23077H9.48L8.8 9.76923L9.08 10.5385L8.4 10L7.72 10.5385L8 9.76923L7.32 9.23077H8.12L8.4 8.46154Z" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="28" height="20" rx="2" fill="#012169" />
      <path d="M0 0L28 20M28 0L0 20" stroke="white" strokeWidth="4" />
      <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2.5" />
      <path d="M14 0V20M0 10H28" stroke="white" strokeWidth="6.67" />
      <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="4" />
    </svg>
  );
};

export function ProgramCard({
  image,
  title,
  country,
  countryCode,
  duration,
  description,
  href = "#",
}: ProgramCardProps) {
  return (
    <div className="bg-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group h-full flex flex-col">
      <div className="relative h-[240px] overflow-hidden shrink-0 bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : null}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <Link href={href}>
            <h3 className="typography-R24! text-lev-black">{title}</h3>
          </Link>
          <div className="flex items-center gap-2">
            <span className="typography-S12 uppercase text-lev-black">
              {country}
            </span>
            <CountryFlag countryCode={countryCode} />
          </div>
        </div>

        <p className="typography-R14 text-lev-black mb-4">{duration}</p>

        <p className="text-lev-gray text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
          {description}
        </p>

        <StartNowBtn href={href} className="w-full" />
      </div>
    </div>
  );
}
