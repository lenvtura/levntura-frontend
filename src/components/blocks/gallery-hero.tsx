import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { cn } from "@/design-system/helpers";

import type {
  GalleryHeroBgColor,
  GalleryHeroBlock as GalleryHeroBlockData,
} from "@/lib/types";

// Pre-CMS defaults — used when the block predates the heading fields
// (pages seeded before the fields existed keep rendering identically).
const DEFAULT_HEADING = "WE ARE CREATING\nMEMORIES, ARE\nYOU JOINING?";
const DEFAULT_HIGHLIGHT = "CREATING MEMORIES,";

/**
 * Renders the headline line by line, coloring the consecutive words that
 * match `highlight` in bright red and everything else in dark red —
 * reproducing the legacy multi-color span treatment for any copy.
 */
function HeadlineSpans({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string | null;
}) {
  const lines = heading.split("\n").map((l) => l.split(/\s+/).filter(Boolean));
  const flat = lines.flat();
  const hlWords = (highlight ?? "").trim().split(/\s+/).filter(Boolean);

  // Find where the highlighted word sequence starts in the flattened text.
  let start = -1;
  if (hlWords.length > 0) {
    for (let i = 0; i + hlWords.length <= flat.length; i++) {
      if (
        hlWords.every(
          (w, k) => flat[i + k].toLowerCase() === w.toLowerCase(),
        )
      ) {
        start = i;
        break;
      }
    }
  }
  const inHighlight = (idx: number) =>
    start >= 0 && idx >= start && idx < start + hlWords.length;

  let wordIdx = 0;
  return (
    <>
      {lines.map((words, li) => (
        <span key={li}>
          {words.map((word, wi) => {
            const idx = wordIdx++;
            return (
              <span
                key={wi}
                className={
                  inHighlight(idx) ? "text-lev-red" : "text-lev-red-dark"
                }
              >
                {word}
                {wi < words.length - 1 ? " " : ""}
              </span>
            );
          })}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

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
          <HeadlineSpans
            heading={block.heading || DEFAULT_HEADING}
            highlight={block.heading ? block.highlightedWords : DEFAULT_HIGHLIGHT}
          />
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
