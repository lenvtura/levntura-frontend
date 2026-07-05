import Image from "next/image";

import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  BrandColor,
  FeatureCardsBlock as FeatureCardsBlockData,
} from "@/lib/types";

const FALLBACK_CARDS = [
  {
    label: "Work & Travel",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/left-work-and-travel_Prn1fcB.jpg",
    panelColor: "lev-blue-light" as BrandColor,
    overlayTextColor: "lev-blue-light" as BrandColor,
    ctaUrl: "/programs",
  },
  {
    label: "Camp Counselor",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/right-camp-counselor_q6tqoVf.jpg",
    panelColor: "lev-orange" as BrandColor,
    overlayTextColor: "lev-orange" as BrandColor,
    ctaUrl: "/programs",
  },
];

const BG_CLASS: Record<BrandColor, string> = {
  "lev-blue-light": "bg-lev-blue-light",
  "lev-blue": "bg-lev-blue",
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-orange": "bg-lev-orange",
  "lev-yellow": "bg-lev-yellow",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-green": "bg-lev-green",
  "lev-green-light": "bg-lev-green-light",
  "lev-green-dark": "bg-lev-green-dark",
  "lev-red": "bg-lev-red",
  "lev-pink": "bg-lev-pink",
  white: "bg-white",
};

const TEXT_CLASS: Record<BrandColor, string> = {
  "lev-blue-light": "text-lev-blue-light",
  "lev-blue": "text-lev-blue",
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-orange": "text-lev-orange",
  "lev-yellow": "text-lev-yellow",
  "lev-yellow-light": "text-lev-yellow-light",
  "lev-green": "text-lev-green",
  "lev-green-light": "text-lev-green-light",
  "lev-green-dark": "text-lev-green-dark",
  "lev-red": "text-lev-red",
  "lev-pink": "text-lev-pink",
  white: "text-white",
};

interface FeatureCardsBlockProps {
  block: FeatureCardsBlockData;
}

export function FeatureCardsBlock({ block }: FeatureCardsBlockProps) {
  if (!block.heading) return null;

  const sectionBg = BG_CLASS[block.backgroundColor ?? "lev-blue-dark"];
  const sectionCta = block.sectionCta;

  const cmsCards = (block.cards ?? []).map((c, i) => ({
    key: c.id ?? `card-${i}`,
    label: c.label,
    src:
      mediaUrl(c.image, "feature") ??
      mediaUrl(c.image) ??
      FALLBACK_CARDS[i]?.src ??
      "",
    alt: mediaAlt(c.image, c.label),
    panelColor: (c.panelColor ?? "lev-blue-light") as BrandColor,
    overlayTextColor: (c.overlayTextColor ?? "lev-blue-light") as BrandColor,
    ctaUrl: c.ctaUrl,
  }));

  const cards =
    cmsCards.length > 0
      ? cmsCards
      : FALLBACK_CARDS.map((c, i) => ({
          key: `fb-${i}`,
          label: c.label,
          src: c.src,
          alt: c.label,
          panelColor: c.panelColor,
          overlayTextColor: c.overlayTextColor,
          ctaUrl: c.ctaUrl,
        }));

  return (
    <SectionWrapper
      className="flex flex-col text-white gap-4"
      sectionColor={sectionBg}
    >
      <div className="flex gap-8 flex-col md:flex-row">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle className="text-white shrink-1">
            {block.heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </SectionTitle>
        </FadeUpAnimator>

        {block.description && (
          <FadeUpAnimator
            transition={{ delay: 0.3 }}
            className="md:max-w-[40%] typography-R14 mb-8 md:mb-0 leading-5 flex-1"
          >
            <p>{block.description}</p>
          </FadeUpAnimator>
        )}
      </div>

      <div className="flex gap-4 flex-wrap items-start">
        {sectionCta?.label && sectionCta?.url && (
          <FadeUpAnimator transition={{ delay: 0.4 }}>
            <ButtonWithArrow href={sectionCta.url}>
              {sectionCta.label}
            </ButtonWithArrow>
          </FadeUpAnimator>
        )}

        <div
          className={cn(
            "grid gap-6 w-full",
            cards.length <= 2
              ? "grid-cols-1 md:grid-cols-2 md:ml-auto md:max-w-[1000px]"
              : "grid-cols-1 md:grid-cols-2",
          )}
        >
          {cards.map((card, index) => (
            <FadeUpAnimator
              key={card.key}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="w-full group overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                {card.src && (
                  <Image
                    width={500}
                    height={500}
                    className="w-full group-hover:scale-110 transition-transform duration-300 object-cover"
                    src={card.src}
                    alt={card.alt}
                  />
                )}
                <p
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typography-R48 w-full text-center",
                    TEXT_CLASS[card.overlayTextColor],
                  )}
                >
                  {card.label}
                </p>
              </div>
              <div
                className={cn(
                  "flex justify-between gap-4 items-center flex-wrap px-4 py-8 typography-R24",
                  BG_CLASS[card.panelColor],
                )}
              >
                <span>{card.label}</span>
                <StartNowBtn className="border-white" href={card.ctaUrl} />
              </div>
            </FadeUpAnimator>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
