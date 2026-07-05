// Headline is intentionally hardcoded with the multi-color span treatment;
// only the body + bg color are editable. See backend block schema for the
// rationale on keeping the headline fixed.

import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { cn } from "@/design-system/helpers";

import type {
  GalleryHeroBgColor,
  GalleryHeroBlock as GalleryHeroBlockData,
} from "@/lib/types";

interface GalleryHeroBlockProps {
  block: GalleryHeroBlockData;
}

const BG_CLASS: Record<GalleryHeroBgColor, string> = {
  none: "",
  white: "bg-white",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
};

export function GalleryHeroBlock({ block }: GalleryHeroBlockProps) {
  const bgClass = BG_CLASS[block.backgroundColor ?? "none"];

  return (
    <SectionWrapper className={cn("py-30", bgClass)}>
      <FadeUpAnimator>
        <SectionTitle className="mb-8 text-center">
          <span className="text-lev-red-dark">WE ARE</span>{" "}
          <span className="text-lev-red">CREATING</span>
          <br />
          <span className="text-lev-red">MEMORIES,</span>{" "}
          <span className="text-lev-red-dark">ARE</span>
          <br />
          <span className="text-lev-red-dark">YOU JOINING?</span>
        </SectionTitle>
      </FadeUpAnimator>

      {block.body && (
        <FadeUpAnimator className="text-lev-gray leading-relaxed max-w-3xl mx-auto text-center">
          {block.body}
        </FadeUpAnimator>
      )}
    </SectionWrapper>
  );
}
