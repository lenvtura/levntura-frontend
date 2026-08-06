import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

import { HighlightedTitle } from "./highlighted-title";

// Bundled defaults — shown when the editor hasn't uploaded a photo.
import applyTopLeftPhoto from "@/assets/photos/3.png";
import applyTopRightPhoto from "@/assets/photos/4.png";
import applyBottomLeftPhoto from "@/assets/photos/6.png";
import applyBottomRightPhoto from "@/assets/photos/5.png";

interface ProgramApplyBlockData {
  heading?: string;
  highlightedWords?: string;
  photoTopLeft?: Media | null;
  photoTopRight?: Media | null;
  photoBottomLeft?: Media | null;
  photoBottomRight?: Media | null;
}

/** A decorative photo that uses the uploaded Media if set, else a bundled default. */
function DecorPhoto({
  media,
  fallback,
  className,
}: {
  media?: Media | null;
  fallback: StaticImageData;
  className?: string;
}) {
  const url = mediaUrl(media);
  if (url) {
    return (
      <Image
        src={url}
        alt={mediaAlt(media, "")}
        width={media?.width ?? 500}
        height={media?.height ?? 500}
        className={className}
      />
    );
  }
  return <Image src={fallback} alt="" className={className} />;
}

/**
 * Block version of program-page section 13 (Are You Ready / Apply). The
 * program-specific `applyForm` is built on the server (Calendly or the
 * dynamic form) and passed through BlockRenderer; the block renders nothing
 * when it is absent (e.g. a closed program). The 4 decorative photos are
 * editable uploads that fall back to the brand defaults.
 */
export function ProgramApplyBlock({
  block,
  applyForm,
}: {
  block: ProgramApplyBlockData;
  applyForm?: ReactNode;
}) {
  if (!applyForm) return null;

  return (
    <div id="apply" className="relative">
      <SectionWrapper>
        <div className="h-[500px] flex justify-between max-md:hidden">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <DecorPhoto media={block.photoTopLeft} fallback={applyTopLeftPhoto} />
          </FadeUpAnimator>
          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <DecorPhoto media={block.photoTopRight} fallback={applyTopRightPhoto} />
          </FadeUpAnimator>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          <FadeUpAnimator>
            <SectionTitle>
              <HighlightedTitle
                title={block.heading || "Are You\nReady to\nChange\nYour\nWorld?"}
                highlight={block.highlightedWords}
              />
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl"
          >
            {applyForm}
          </FadeUpAnimator>
        </div>
      </SectionWrapper>

      <div className="flex gap-14 max-md:hidden">
        <FadeUpAnimator className="w-full">
          <DecorPhoto media={block.photoBottomLeft} fallback={applyBottomLeftPhoto} />
        </FadeUpAnimator>
        <FadeUpAnimator className="w-full">
          <DecorPhoto
            media={block.photoBottomRight}
            fallback={applyBottomRightPhoto}
            className="ml-auto mr-6"
          />
        </FadeUpAnimator>
      </div>
    </div>
  );
}
