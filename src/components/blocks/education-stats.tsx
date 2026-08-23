import { Button } from "@/design-system/button";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import { Link } from "@/i18n/navigation";
import type {
  EducationStatsBlock as EducationStatsBlockData,
  EducationStatsBgColor,
  EducationStatsHeadingColor,
  EducationStatsValueColor,
} from "@/lib/types";

const BG_CLASS: Record<EducationStatsBgColor, string> = {
  none: "",
  white: "bg-white",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
};

const HEADING_CLASS: Record<EducationStatsHeadingColor, string> = {
  "lev-red-dark": "text-lev-red-dark",
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-green-dark": "text-lev-green-dark",
  "lev-black": "text-lev-black",
};

const VALUE_CLASS: Record<EducationStatsValueColor, string> = {
  "lev-orange": "text-lev-orange",
  "lev-red": "text-lev-red",
  "lev-blue": "text-lev-blue",
  "lev-green": "text-lev-green",
  "lev-yellow": "text-lev-yellow",
};

interface EducationStatsBlockProps {
  block: EducationStatsBlockData;
}

export function EducationStatsBlock({ block }: EducationStatsBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "none"];
  const headingClass = HEADING_CLASS[block.headingColor ?? "lev-red-dark"];
  const valueClass = VALUE_CLASS[block.statValueColor ?? "lev-orange"];

  const stats = block.stats ?? [];
  const headingLines = block.heading.split("\n");

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="grid lg:grid-cols-2 gap-y-8"
    >
      <FadeUpAnimator
        transition={{ delay: 0.1 }}
        className="flex flex-col items-start gap-y-4"
      >
        <h2
          className={cn(
            "typography-S34 leading-9 uppercase",
            headingClass,
          )}
        >
          {headingLines.map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>

        {block.paragraph && (
          <p
            className={cn(
              "typography-R16 opacity-50 leading-relaxed lg:w-1/2 mt-6",
              headingClass,
            )}
          >
            {block.paragraph}
          </p>
        )}

        {block.cta?.label && block.cta?.url && (
          <Button className="border-1" asChild>
            <Link href={block.cta.url}>{block.cta.label}</Link>
          </Button>
        )}
      </FadeUpAnimator>

      <article className="grid sm:grid-cols-2 gap-y-16">
        {stats.map((stat, i) => (
          <FadeUpAnimator
            key={stat.id ?? `stat-${i}`}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-x-8">
              <h2 className={cn("typography-S34", valueClass)}>{stat.value}</h2>
              <h6 className={cn("typography-M16", headingClass)}>{stat.label}</h6>
            </div>

            {stat.description && (
              <p
                className={cn(
                  "typography-R14 leading-relaxed w-4/5",
                  headingClass,
                )}
              >
                {stat.description}
              </p>
            )}
          </FadeUpAnimator>
        ))}
      </article>
    </SectionWrapper>
  );
}
