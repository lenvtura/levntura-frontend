import Image, { type StaticImageData } from "next/image";

import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import storyImgFallback from "@/assets/photos/tour-images/i6.png";
import { CenetLogoSvg } from "@/assets/logos/cenet-logo-svg";
import { IenaLogoSvg } from "@/assets/logos/iena-logo-svg";
import { RoyalAcademyLogoSvg } from "@/assets/logos/royal-academy-logo-svg";
import { UnitedStudiesLogoSvg } from "@/assets/logos/united-studies-logo-svg";
import { WiseLogoSvg } from "@/assets/logos/wise-logo-svg";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  PartnersBgColor,
  PartnersCarouselBlock as PartnersCarouselBlockData,
  PartnersHeadingColor,
  PartnersHighlightColor,
} from "@/lib/types";

const FALLBACK_LOGOS = [
  CenetLogoSvg,
  IenaLogoSvg,
  RoyalAcademyLogoSvg,
  UnitedStudiesLogoSvg,
  WiseLogoSvg,
];

const HEADING_TEXT_CLASS: Record<PartnersHeadingColor, string> = {
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-red-dark": "text-lev-red-dark",
  "lev-green-dark": "text-lev-green-dark",
  "lev-black": "text-lev-black",
  white: "text-white",
};

const HEADING_BORDER_CLASS: Record<PartnersHeadingColor, string> = {
  "lev-blue-dark": "border-lev-blue-dark",
  "lev-red-dark": "border-lev-red-dark",
  "lev-green-dark": "border-lev-green-dark",
  "lev-black": "border-lev-black",
  white: "border-white",
};

const BG_CLASS: Record<PartnersBgColor, string> = {
  none: "",
  white: "bg-white",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-yellow": "bg-lev-yellow",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
};

const HIGHLIGHT_TEXT_CLASS: Record<PartnersHighlightColor, string> = {
  none: "",
  "lev-orange": "text-lev-orange",
  "lev-red": "text-lev-red",
  "lev-red-dark": "text-lev-red-dark",
  "lev-blue": "text-lev-blue",
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-green": "text-lev-green",
  "lev-green-dark": "text-lev-green-dark",
  "lev-yellow": "text-lev-yellow",
};

interface PartnersCarouselBlockProps {
  block: PartnersCarouselBlockData;
}

export function PartnersCarouselBlock({ block }: PartnersCarouselBlockProps) {
  if (!block.heading) return null;

  const cmsPartners = (block.partners ?? []).filter(
    (p) => mediaUrl(p.logo) || p.logo,
  );
  const useFallback = cmsPartners.length === 0;
  const slots = useFallback ? FALLBACK_LOGOS : cmsPartners;
  const count = slots.length;

  const cta = block.cta;
  const headingColorKey = block.headingColor ?? "lev-blue-dark";
  const headingClass = HEADING_TEXT_CLASS[headingColorKey];
  const headingBorderClass = HEADING_BORDER_CLASS[headingColorKey];
  const highlightClass =
    block.highlightColor && block.highlightColor !== "none"
      ? HIGHLIGHT_TEXT_CLASS[block.highlightColor]
      : null;
  const highlight = block.highlightedWord;
  const hasHighlight =
    Boolean(highlight) &&
    Boolean(highlightClass) &&
    block.heading.includes(highlight!);
  const bgClass = BG_CLASS[block.backgroundColor ?? "none"];
  const storyImgUrl =
    mediaUrl(block.storyImage, "feature") ?? mediaUrl(block.storyImage);
  const storyImgAlt = mediaAlt(block.storyImage);
  const useStoryFallback =
    !storyImgUrl &&
    Boolean(block.eyebrow) &&
    Boolean(block.paragraph2);
  const storyImg: string | StaticImageData | null = storyImgUrl
    ? storyImgUrl
    : useStoryFallback
      ? storyImgFallback
      : null;

  return (
    <SectionWrapper sectionColor={bgClass}>
      {block.eyebrow && (
        <FadeUpAnimator transition={{ delay: 0.05 }}>
          <p
            className={cn(
              "typography-R24 md:typography-R34 leading-8 lg:leading-12 mb-8 w-5/6",
              headingClass,
            )}
          >
            {block.eyebrow}
          </p>
        </FadeUpAnimator>
      )}

      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <SectionTitle className={cn("mb-[64px]", headingClass)}>
          {hasHighlight ? (
            <HighlightedHeading
              heading={block.heading}
              highlight={highlight!}
              highlightClass={highlightClass!}
            />
          ) : (
            renderWithLineBreaks(block.heading)
          )}
        </SectionTitle>
      </FadeUpAnimator>

      <div className="overflow-hidden mb-[64px]">
        <FadeUpAnimator
          transition={{ delay: 0.2 }}
          className="flex relative min-w-[1000px] h-[100px] overflow-hidden items-center text-gray-500 gap-4"
        >
          {slots.map((entry, i) => {
            const style = {
              animationDelay: `calc(30s / ${count} * (${count} - ${i + 1}) * -1)`,
              animationName: "scrollLeft",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationDuration: "30s",
              left: `max(calc(50px * ${count}), 100%)`,
            } as const;

            if (useFallback) {
              const LogoSvg = entry as (typeof FALLBACK_LOGOS)[number];
              return (
                <div
                  key={`fallback-${i}`}
                  style={style}
                  className="absolute w-[120px] left-full"
                >
                  <LogoSvg />
                </div>
              );
            }

            const partner = entry as NonNullable<
              PartnersCarouselBlockData["partners"]
            >[number];
            const url = mediaUrl(partner.logo);
            if (!url) return null;
            return (
              <div
                key={partner.id ?? `partner-${i}`}
                style={style}
                className="absolute w-[120px] left-full"
              >
                <Image
                  src={url}
                  alt={partner.name ?? mediaAlt(partner.logo)}
                  width={partner.logo.width ?? 120}
                  height={partner.logo.height ?? 60}
                  className="w-full h-auto object-contain"
                />
              </div>
            );
          })}
        </FadeUpAnimator>
      </div>

      <div
        className={cn(
          "flex flex-col gap-8",
          storyImg ? "md:flex-row-reverse md:items-start md:gap-12" : "",
        )}
      >
        {storyImg && (
          <FadeUpAnimator
            transition={{ delay: 0.3 }}
            className="shrink-0 md:max-w-[45%]"
          >
            {typeof storyImg === "string" ? (
              <Image
                src={storyImg}
                alt={storyImgAlt}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            ) : (
              <Image
                src={storyImg}
                alt={storyImgAlt}
                className="w-full h-auto object-cover"
              />
            )}
          </FadeUpAnimator>
        )}

        <div
          className={cn(
            "flex flex-col gap-[32px]",
            storyImg
              ? "md:flex-1"
              : "md:flex-row md:gap-[32px] md:[&>*]:flex-1",
            headingClass,
          )}
        >
          {cta?.label && cta?.url && (
            <FadeUpAnimator transition={{ delay: 0.4 }}>
              <ButtonWithArrow href={cta.url} iconClassName={headingBorderClass}>
                {cta.label}
              </ButtonWithArrow>
            </FadeUpAnimator>
          )}

          {block.paragraph1 && (
            <FadeUpAnimator transition={{ delay: 0.5 }}>
              <p className="typography-R14 leading-relaxed">{block.paragraph1}</p>
            </FadeUpAnimator>
          )}
          {block.paragraph2 && (
            <FadeUpAnimator transition={{ delay: 0.6 }}>
              <p className="typography-R14 leading-relaxed">{block.paragraph2}</p>
            </FadeUpAnimator>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

function renderWithLineBreaks(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i} className="block">
      {line}
      {i < arr.length - 1 ? null : null}
    </span>
  ));
}

function HighlightedHeading({
  heading,
  highlight,
  highlightClass,
}: {
  heading: string;
  highlight: string;
  highlightClass: string;
}) {
  const idx = heading.indexOf(highlight);
  if (idx === -1) return <>{renderWithLineBreaks(heading)}</>;
  const before = heading.slice(0, idx);
  const after = heading.slice(idx + highlight.length);

  return (
    <>
      {before && <PartWithBreaks text={before} />}
      <span className={highlightClass}>
        <PartWithBreaks text={highlight} />
      </span>
      {after && <PartWithBreaks text={after} />}
    </>
  );
}

function PartWithBreaks({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="inline">
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
