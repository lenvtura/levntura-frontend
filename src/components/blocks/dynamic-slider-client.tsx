"use client";

import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";

import { HighlightedTitle } from "./highlighted-title";

export interface SliderCard {
  href: string;
  title: string;
  badge?: string;
  subtitle?: string;
  countryLabel?: string;
  flagSrc?: string;
  dateRange?: string;
  description?: string;
  salary?: string;
  applyUrl?: string;
  imageSrc?: string | null;
  imageAlt?: string;
}

interface DynamicSliderClientProps {
  heading?: string;
  highlightedWords?: string;
  body?: string;
  emptyMessage?: string;
  cards: SliderCard[];
}

function Card({ card }: { card: SliderCard }) {
  return (
    <div className="w-[330px] lg:w-[460px] overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Banner image */}
      <Link href={card.href} className="relative block h-[170px] w-full bg-lev-gray-light lg:h-[220px]">
        {card.imageSrc && (
          <Image
            src={card.imageSrc}
            alt={card.imageAlt ?? card.title}
            fill
            sizes="460px"
            className="object-cover pointer-events-none"
          />
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          {card.badge && (
            <span className="typography-B14 uppercase tracking-wide text-[#f97316]">
              {card.badge}
            </span>
          )}
          {card.countryLabel && (
            <span className="ms-auto flex items-center gap-2 typography-R14 text-lev-blue">
              {card.countryLabel}
              {card.flagSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.flagSrc} alt="" width={28} height={20} className="h-4 w-auto rounded-sm" />
              )}
            </span>
          )}
        </div>

        <h4 className="typography-EB24 lg:typography-EB32 uppercase text-lev-black">
          {card.title}
        </h4>

        {card.subtitle && (
          <span className="typography-R14 text-lev-gray">{card.subtitle}</span>
        )}

        <div className="flex items-center justify-between gap-3">
          {card.dateRange && (
            <span className="typography-R14 text-lev-gray">{card.dateRange}</span>
          )}
          {card.applyUrl && (
            <a
              href={card.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="typography-B14 border border-lev-black px-6 py-2 uppercase text-lev-black transition-colors hover:bg-lev-black hover:text-white"
            >
              Apply
            </a>
          )}
        </div>

        {card.description && (
          <p className="typography-R14 text-lev-gray line-clamp-2">
            {card.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          {card.salary && (
            <span className="typography-EB18 text-lev-blue">{card.salary}</span>
          )}
          <Link
            href={card.href}
            className="typography-B14 ms-auto uppercase text-lev-black hover:text-lev-blue"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Client half of the DynamicSlider block. The server half fetches jobs /
 * internship programs and hands over plain card data — this renders the
 * draggable slider + cards.
 */
export function DynamicSliderClient({
  heading,
  highlightedWords,
  body,
  emptyMessage,
  cards,
}: DynamicSliderClientProps) {
  if (cards.length === 0) {
    if (!emptyMessage) return null;
    return (
      <SectionWrapper className="container-md mb-[80px]">
        <p className="text-center text-lev-gray">{emptyMessage}</p>
      </SectionWrapper>
    );
  }

  return (
    <div className="mb-[150px]">
      <SectionWrapper className="container-md">
        {heading && (
          <FadeUpAnimator>
            <SectionTitle className="mb-[40px]">
              <HighlightedTitle title={heading} highlight={highlightedWords} />
            </SectionTitle>
          </FadeUpAnimator>
        )}
        {/* Body is intentionally NOT wrapped in FadeUpAnimator: sitting just
            below the title, it falls inside the animator's "-100px" bottom
            margin on load, so whileInView never fires and it stays hidden
            until you scroll. Plain render = always visible. */}
        {body && (
          <div className="flex">
            <p className="ms-auto text-lev-red-dark w-[300px]">{body}</p>
          </div>
        )}
      </SectionWrapper>

      <Slider data={cards} renderItem={(card) => <Card card={card} />} />
    </div>
  );
}
