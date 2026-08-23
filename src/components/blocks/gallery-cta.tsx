import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import type {
  CmsForm,
  GalleryCtaBlock as GalleryCtaBlockData,
  GalleryCtaHeadingColor,
  GalleryCtaHighlightColor,
} from "@/lib/types";

import { DynamicForm } from "./contact-form-client";

const HEADING_CLASS: Record<GalleryCtaHeadingColor, string> = {
  "lev-red-dark": "text-lev-red-dark",
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-green-dark": "text-lev-green-dark",
  "lev-black": "text-lev-black",
};

const HIGHLIGHT_CLASS: Record<GalleryCtaHighlightColor, string> = {
  none: "",
  "lev-red": "text-lev-red",
  "lev-red-dark": "text-lev-red-dark",
  "lev-orange": "text-lev-orange",
  "lev-blue": "text-lev-blue",
  "lev-green": "text-lev-green",
  "lev-yellow": "text-lev-yellow",
};

interface GalleryCtaBlockProps {
  block: GalleryCtaBlockData;
}

export function GalleryCtaBlock({ block }: GalleryCtaBlockProps) {
  if (!block.heading) return null;

  const headingClass = HEADING_CLASS[block.headingColor ?? "lev-red-dark"];
  const highlightClass =
    block.highlightColor && block.highlightColor !== "none"
      ? HIGHLIGHT_CLASS[block.highlightColor]
      : null;
  const showDots = block.showDotPattern ?? true;
  const form = typeof block.form === "object" ? (block.form as CmsForm) : null;

  return (
    <SectionWrapper className="py-16 container-md lg:py-24 relative">
      {showDots && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      )}

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <div className="flex items-center">
            <FadeUpAnimator>
              <SectionTitle className={cn("max-w-[300px]", headingClass)}>
                <HighlightedHeading
                  text={block.heading}
                  highlight={block.highlightedWord}
                  highlightClass={highlightClass}
                />
              </SectionTitle>
            </FadeUpAnimator>
          </div>

          <div className="bg-gray-100 p-8 lg:p-12 max-w-[400px] w-full">
            <FadeUpAnimator className="flex flex-col gap-6">
              {block.formTitle && (
                <h3 className="typography-S34 uppercase text-lev-black mb-4">
                  {block.formTitle}
                </h3>
              )}

              {form ? (
                <DynamicForm form={form} />
              ) : (
                <div className="text-lev-black/60 text-sm text-center py-6">
                  No form selected. Pick one in admin → GalleryCta block.
                </div>
              )}

              {block.contactLink?.label && block.contactLink?.url && (
                <a
                  href={block.contactLink.url}
                  className="uppercase typography-EB14 flex items-center justify-center mt-2 text-lev-green hover:text-lev-green-dark transition-colors"
                >
                  {block.contactLink.label}
                </a>
              )}
            </FadeUpAnimator>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function HighlightedHeading({
  text,
  highlight,
  highlightClass,
}: {
  text: string;
  highlight?: string;
  highlightClass: string | null;
}) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {highlight && highlightClass && line.includes(highlight) ? (
            <>
              {line.split(highlight)[0]}
              <span className={highlightClass}>{highlight}</span>
              {line.split(highlight).slice(1).join(highlight)}
            </>
          ) : (
            line
          )}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
