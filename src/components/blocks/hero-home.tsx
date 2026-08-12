import Image from "next/image";
import { Suspense } from "react";

import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import { HEADER_HEIGHT } from "@/constants/header-height";
import { PART_HEIGHT_APPEAR_IN_NEXT_SECTION } from "@/components/sections/constant";

import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  HeroHomeBackgroundColor,
  HeroHomeBlock as HeroHomeBlockData,
} from "@/lib/types";

const FALLBACK_HERO_URL =
  "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home-hero_yxhrSNq.jpg";

interface HeroHomeBlockProps {
  block: HeroHomeBlockData;
}

// Maps the CMS color picker value to a Tailwind bg-* class.
// Kept as a static lookup (not concatenated) so the Tailwind JIT keeps
// these classes in the final CSS bundle.
const COLOR_TO_BG: Record<HeroHomeBackgroundColor, string> = {
  "lev-blue": "bg-lev-blue",
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-green-dark": "bg-lev-green-dark",
  "lev-green": "bg-lev-green",
  "lev-red": "bg-lev-red",
  "lev-orange": "bg-lev-orange",
  "lev-yellow": "bg-lev-yellow",
  "lev-black": "bg-lev-black",
};

export function HeroHomeBlock({ block }: HeroHomeBlockProps) {
  if (!block.headline) return null;

  const useColor = block.backgroundType === "color";
  const bgColorClass = useColor
    ? COLOR_TO_BG[block.backgroundColor ?? "lev-blue"]
    : undefined;

  // When the editor picks "image" but hasn't uploaded one yet, fall back
  // to the original homepage hero URL so the design still works.
  const bgUrl = useColor
    ? undefined
    : mediaUrl(block.backgroundImage, "feature") ??
      mediaUrl(block.backgroundImage) ??
      FALLBACK_HERO_URL;
  const bgAlt = mediaAlt(block.backgroundImage, block.headline);

  const opportunities = block.opportunities ?? [];
  const cta = block.cta;
  const showSocialIcons = block.showSocialIcons ?? true;

  const hasIntro = Boolean(
    block.intro?.heading || block.intro?.paragraph1 || block.intro?.paragraph2,
  );

  return (
    <div className="overflow-x-hidden">
      {/* Background — image OR solid color. Sits behind everything, extends
          200px past the hero so the intro section's negative-margin trick
          can overlay it. */}
      <div
        style={{
          height: `calc(100dvh + ${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px)`,
        }}
        className={cn(
          "absolute top-0 -z-1 inset-x-0 h-full w-full",
          bgColorClass,
        )}
      >
        {bgUrl && (
          <Image
            alt={bgAlt}
            src={bgUrl}
            fill
            priority
            className="object-cover w-full h-full object-center"
            sizes="100vw"
          />
        )}
      </div>

      <div
        style={{
          height: `calc(100dvh + ${
            PART_HEIGHT_APPEAR_IN_NEXT_SECTION - HEADER_HEIGHT
          }px)`,
        }}
        className="text-white"
      >
        <div
          style={{ height: `calc(100dvh - ${HEADER_HEIGHT}px)` }}
          className="flex-col flex"
        >
          <div className="mt-auto py-8 container-md w-full">
            {block.eyebrow && (
              <FadeUpAnimator transition={{ delay: 0.1 }}>
                <span className="uppercase typography-S14 tracking-widest text-white/80 mb-3 inline-block">
                  {block.eyebrow}
                </span>
              </FadeUpAnimator>
            )}

            <div className="flex max-lg:flex-col-reverse max-lg:items-start gap-8 justify-between items-end mb-8">
              <FadeUpAnimator transition={{ delay: 0.2 }}>
                <h1 className="uppercase typography-EB74 max-sm:typography-EB48 text-white">
                  {/* Hollow (outlined) in LTR; solid white in Arabic where the
                      outline stroke reads badly on Arabic glyphs. */}
                  <span className="text-transparent [-webkit-text-stroke:2px_white] rtl:text-white rtl:[-webkit-text-stroke:0px]">
                    {block.headline}
                  </span>
                  {block.subheadline && (
                    <>
                      <br /> {block.subheadline}
                    </>
                  )}
                </h1>
              </FadeUpAnimator>

              {opportunities.length > 0 && (
                <FadeUpAnimator
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  {opportunities.map((opp, i) => (
                    <span key={opp.id ?? `opp-${i}`}>{opp.label}</span>
                  ))}
                </FadeUpAnimator>
              )}
            </div>

            <FadeUpAnimator
              transition={{ delay: 0.5 }}
              className="h-[2px] w-[90%] bg-amber-50 bg-blend-overlay mix-blend-overlay"
            />

            <div className="flex justify-between mt-4">
              {cta?.label && cta?.url && (
                <FadeUpAnimator
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <ButtonWithArrow
                    href={cta.url}
                    iconClassName="border-white"
                  >
                    {cta.label} →
                  </ButtonWithArrow>
                </FadeUpAnimator>
              )}

              {showSocialIcons && (
                <FadeUpAnimator
                  transition={{ delay: 0.7 }}
                  className="flex gap-2"
                >
                  <Suspense fallback={null}>
                    <SocialShareIcons size="sm" variant="white-border" />
                  </Suspense>
                </FadeUpAnimator>
              )}
            </div>
          </div>

          {/* Decorative white accent block at the bottom-left of the hero. */}
          <div className="h-[64px] inset-x-0 bottom-0 w-[50%] max-md:w-[90%] bg-white" />
        </div>
      </div>

      {/* Optional intro text section — heading + 2 paragraph columns.
          The destination cards strip that overlays its bottom is a
          separate block (TravelDestinations) placed right after. */}
      {hasIntro && <HeroHomeIntro intro={block.intro} />}
    </div>
  );
}

function HeroHomeIntro({ intro }: { intro: HeroHomeBlockData["intro"] }) {
  if (!intro) return null;
  const { heading, paragraph1, paragraph2 } = intro;

  return (
    <div className="relative py-8 bg-white">
      {/* Decorative white block — extends INTO the hero peek area (left 50%),
          continuing the hero's white accent so the seam between the two
          sections looks like one solid white shape. The right 50% stays
          transparent so the hero image still peeks through. */}
      <div
        style={{
          marginTop: `-${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px`,
          height: `${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px`,
        }}
        className="absolute inset-x-0 top-0 w-[50%] max-md:w-[90%] -z-[1] bg-white"
      />

      <div className="container-md max-md:flex flex-col grid grid-cols-2">
        {/* Left column — pulled UP into the hero peek so heading appears
            higher than the right column. The fixed `md:h-[700px]` is
            critical: it reserves vertical space so the next block
            (TravelDestinations, pulled UP by -200px) lands at the BOTTOM
            of this column, well clear of the heading + paragraph above. */}
        <div
          style={{ marginTop: `-${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px` }}
          className="bg-white"
        >
          <div className="max-w-[615px] md:h-[700px] max-md:min-h-[500px] ml-auto">
            {heading && (
              <FadeUpAnimator transition={{ delay: 0.1 }}>
                {/* `whitespace-pre-line` preserves `\n` in the heading
                    as visual line breaks — mirrors the legacy static
                    heading's `<br />` tags. Editor can control the
                    wrap by adding/removing newlines in the textarea. */}
                <h4 className="typography-EB34 uppercase leading-[1.3] mb-12 whitespace-pre-line">
                  {heading}
                </h4>
              </FadeUpAnimator>
            )}
            {paragraph1 && (
              <FadeUpAnimator transition={{ delay: 0.3 }}>
                <p className="text-lev-black/50">{paragraph1}</p>
              </FadeUpAnimator>
            )}
          </div>
        </div>

        {/* Right column — normal flow (no negative margin). */}
        {paragraph2 && (
          <div className="max-w-[625px] flex justify-end p-8 max-md:pl-8 pl-[90px]">
            <FadeUpAnimator transition={{ delay: 0.5 }}>
              <p className="text-lev-black">{paragraph2}</p>
            </FadeUpAnimator>
          </div>
        )}
      </div>
    </div>
  );
}
