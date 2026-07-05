import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import type {
  ValuesListBgColor,
  ValuesListBlock as ValuesListBlockData,
} from "@/lib/types";

const BG_CLASS: Record<ValuesListBgColor, string> = {
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-yellow": "bg-lev-yellow",
  "lev-pink": "bg-lev-pink",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  white: "bg-white",
};

interface ValuesListBlockProps {
  block: ValuesListBlockData;
}

export function ValuesListBlock({ block }: ValuesListBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-yellow-light"];
  const values = block.values ?? [];

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="space-y-8 container-md"
    >
      <article className="flex flex-col lg:flex-row gap-y-4 justify-between">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <h1 className="typography-B74 ms-auto uppercase leading-16 text-lev-red-dark shrink-0">
            {block.heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </FadeUpAnimator>
      </article>

      {values.length > 0 && (
        <article
          className={cn(
            "lg:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mx-auto",
            "[&>*]:border-t [&>*]:border-lev-red-dark/10 [&>*]:space-y-8 [&>*]:pt-4",
          )}
        >
          {values.map((value, i) => (
            <FadeUpAnimator
              key={value.id ?? `v-${i}`}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <h4 className="typography-R18 text-lev-red-dark opacity-50">
                {value.number}
              </h4>
              <h3 className="typography-M24 text-lev-red-dark">{value.title}</h3>
              {value.description && (
                <p className="typography-R14 leading-5 text-lev-red-dark">
                  {value.description}
                </p>
              )}
            </FadeUpAnimator>
          ))}
        </article>
      )}
    </SectionWrapper>
  );
}
