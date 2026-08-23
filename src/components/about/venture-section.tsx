/**
 * VentureSection — restored from the legacy `app/about/venture.tsx`
 * ("Designed for Global Adventures").
 *
 * Pure presentation component: takes the heading + subtitle + 4 cards +
 * 2 paragraphs as props. Used by:
 *   - `components/blocks/venture-grid.tsx` — when the section comes from CMS
 *   - (potential) any other page that wants the same About-style 2-row layout
 *
 * Visuals match the original 1:1 — same classes, same Image sizing, same
 * hover micro-interaction on the bottom-left card. Do NOT add CMS-specific
 * concerns here (defaults, fallbacks, mediaUrl wiring); those live in the
 * block wrapper.
 */

import Image, { type StaticImageData } from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";

export interface VentureCard {
  key: string;
  /** Either a remote URL (CMS upload) or a static import. */
  src: string | StaticImageData;
  alt: string;
  label: string;
}

export interface VentureSectionProps {
  heading: React.ReactNode;
  subtitle?: string;
  cards: [VentureCard, VentureCard, VentureCard, VentureCard];
  paragraph1?: string;
  paragraph2?: string;
  sectionColor?: string;
  /** Tailwind text-color class for the heading + paragraphs (e.g. "text-lev-blue-dark"). */
  headingColor?: string;
}

export function VentureSection({
  heading,
  subtitle = "Venture",
  cards,
  paragraph1,
  paragraph2,
  sectionColor = "bg-lev-yellow-light",
  headingColor = "text-lev-blue-dark",
}: VentureSectionProps) {
  const [topLeft, topRight, bottomLeft, bottomRight] = cards;

  return (
    <SectionWrapper
      className="space-y-4 lg:space-y-8"
      sectionColor={sectionColor}
    >
      <div className="lg:flex items-start justify-between space-y-8">
        <div className="flex flex-col gap-y-4">
          <h1
            className={`text-5xl sm:text-6xl font-bold lg:typography-B74 sm:leading-16 uppercase ${headingColor}`}
          >
            {heading}
          </h1>
          {subtitle && (
            <h4 className="typography-M20 text-lev-orange">{subtitle}</h4>
          )}
        </div>

        <div className="sm:flex gap-x-4 space-y-4">
          <VentureImageCard card={topLeft} />
          <VentureImageCard card={topRight} />
        </div>
      </div>

      <div className="lg:flex gap-x-4 justify-end space-y-4">
        <section className="sm:flex gap-x-4 space-y-4">
          {/* The original "Study & Travel" card had a special translate-on-
              hover effect that nudged it left on hover. Keep it. */}
          <VentureImageCard card={bottomLeft} extraClassName="hover:translate-x-[-100px] transition-transform duration-300" />
          <VentureImageCard card={bottomRight} />
        </section>

        {(paragraph1 || paragraph2) && (
          <div className={`flex flex-col gap-y-8 ${headingColor}`}>
            {paragraph1 && (
              <p className="typography-R16 leading-4 w-80">{paragraph1}</p>
            )}
            {paragraph2 && (
              <p className="typography-R16 leading-4 w-80">{paragraph2}</p>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function VentureImageCard({
  card,
  extraClassName = "",
}: {
  card: VentureCard;
  extraClassName?: string;
}) {
  const containerClass = `relative w-70 h-90 overflow-hidden ${extraClassName}`.trim();
  return (
    <div className={containerClass}>
      {typeof card.src === "string" ? (
        <Image
          src={card.src}
          width={300}
          height={300}
          alt={card.alt}
          className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover"
        />
      ) : (
        <Image
          src={card.src}
          alt={card.alt}
          className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover"
        />
      )}
      <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
        {card.label}
      </h3>
    </div>
  );
}
