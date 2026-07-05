import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import type {
  MissionStatsBgColor,
  MissionStatsBlock as MissionStatsBlockData,
  MissionStatsValueColor,
} from "@/lib/types";

const BG_CLASS: Record<MissionStatsBgColor, string> = {
  "lev-orange": "bg-lev-orange",
  "lev-red": "bg-lev-red",
  "lev-blue": "bg-lev-blue",
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-green-dark": "bg-lev-green-dark",
  "lev-black": "bg-lev-black",
};

const VALUE_TEXT_CLASS: Record<MissionStatsValueColor, string> = {
  "lev-yellow": "text-lev-yellow",
  "lev-orange": "text-lev-orange",
  "lev-green-light": "text-lev-green-light",
  "lev-blue-light": "text-lev-blue-light",
  white: "text-white",
};

interface MissionStatsBlockProps {
  block: MissionStatsBlockData;
}

export function MissionStatsBlock({ block }: MissionStatsBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-orange"];
  const valueClass = VALUE_TEXT_CLASS[block.statValueColor ?? "lev-yellow"];
  const paragraphs = block.paragraphs ?? [];
  const stats = block.stats ?? [];

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="space-y-16 container-md"
    >
      <article className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between border-b border-lev-yellow/20 pb-16">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle className="text-white">
            {block.heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </SectionTitle>
        </FadeUpAnimator>
        {paragraphs.length > 0 && (
          <div className="space-y-6 text-white lg:w-1/3">
            {paragraphs.map((p, i) => (
              <FadeUpAnimator
                key={p.id ?? `p-${i}`}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <p className="typography-R12 leading-relaxed">{p.text}</p>
              </FadeUpAnimator>
            ))}
          </div>
        )}
      </article>

      {stats.length > 0 && (
        <article className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16">
          {stats.map((stat, i) => (
            <FadeUpAnimator
              key={stat.id ?? `s-${i}`}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="space-y-2"
            >
              <h2 className={cn("text-[100px] font-bold leading-none", valueClass)}>
                {stat.value}
              </h2>
              <p className="typography-M16 text-white uppercase tracking-wide">
                {stat.label}
              </p>
            </FadeUpAnimator>
          ))}
        </article>
      )}
    </SectionWrapper>
  );
}
