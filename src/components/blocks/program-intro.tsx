import { SectionWrapper } from "@/components/sections/section-wrapper";

interface ProgramIntroBlockData {
  eyebrow?: string;
  body?: string;
}

/** Block version of program-page section 2 (Intro). 1:1 with the original. */
export function ProgramIntroBlock({ block }: { block: ProgramIntroBlockData }) {
  if (!block.eyebrow && !block.body) return null;

  return (
    <SectionWrapper className="mb-[64px]">
      {block.eyebrow && (
        <p className="typography-S16 text-center text-lev-blue-light mb-4">
          {block.eyebrow}
        </p>
      )}
      {block.body && (
        <p className="typography-S34 leading-9 text-center text-lev-blue-dark">
          {block.body}
        </p>
      )}
    </SectionWrapper>
  );
}
