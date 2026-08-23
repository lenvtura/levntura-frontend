import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

import { RichTextish } from "./rich-textish";
import { HighlightedTitle } from "./highlighted-title";

interface ProgramWhatIsBlockData {
  title?: string;
  highlightedWords?: string;
  body?: string;
}

/** Block version of program-page section 3 (What Is). 1:1 with the original. */
export function ProgramWhatIsBlock({ block }: { block: ProgramWhatIsBlockData }) {
  if (!block.title && !block.body) return null;

  return (
    <SectionWrapper className="container-md">
      {block.title && (
        <FadeUpAnimator>
          <SectionTitle className="mb-[80px]">
            <HighlightedTitle
              title={block.title}
              highlight={block.highlightedWords}
            />
          </SectionTitle>
        </FadeUpAnimator>
      )}
      {block.body && (
        <FadeUpAnimator className="flex">
          <p className="ms-auto text-lev-red-dark w-[300px]">
            <RichTextish text={block.body} />
          </p>
        </FadeUpAnimator>
      )}
    </SectionWrapper>
  );
}
