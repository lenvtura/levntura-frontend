import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

import { HighlightedTitle } from "./highlighted-title";

interface ShowcaseItem {
  id?: string;
  text: string;
}

interface ProgramBenefitsShowcaseBlockData {
  title?: string;
  highlightedWords?: string;
  items?: ShowcaseItem[];
}

/** Block version of program-page section 9 (Benefits Showcase). 1:1 original. */
export function ProgramBenefitsShowcaseBlock({
  block,
}: {
  block: ProgramBenefitsShowcaseBlockData;
}) {
  const items = block.items ?? [];
  if (!block.title && items.length === 0) return null;

  return (
    <SectionWrapper>
      <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
        <div className="max-w-6xl w-full relative z-10">
          {block.title && (
            <div className="text-center mb-16">
              <FadeUpAnimator>
                <SectionTitle className="mb-4">
                  <HighlightedTitle
                    title={block.title}
                    highlight={block.highlightedWords}
                  />
                </SectionTitle>
              </FadeUpAnimator>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <FadeUpAnimator
                transition={{ delay: idx * 0.2 }}
                key={item.id ?? `showcase-${idx}`}
                className="flex flex-col gap-6"
              >
                <div className="border h-[100px] sm:h-[150px] text-lev-blue-dark flex justify-center items-center border-lev-blue rounded-full p-8 text-center">
                  <p className="typography-R18 leading-6">{item.text}</p>
                </div>
              </FadeUpAnimator>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
