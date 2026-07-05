import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { Link } from "@/i18n/navigation";
import type {
  RelatedItemsBgColor,
  RelatedItemsBlock as RelatedItemsBlockData,
} from "@/lib/types";

const BG_CLASS: Record<RelatedItemsBgColor, string> = {
  "lev-green-dark": "bg-lev-green-dark",
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-black": "bg-lev-black",
  "lev-yellow-light": "bg-lev-yellow-light",
  white: "bg-white",
};

const COLS_CLASS: Record<NonNullable<RelatedItemsBlockData["columns"]>, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
  "4": "md:grid-cols-2 lg:grid-cols-4",
};

interface RelatedItemsBlockProps {
  block: RelatedItemsBlockData;
}

export function RelatedItemsBlock({ block }: RelatedItemsBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-green-dark"];
  const colsClass = COLS_CLASS[block.columns ?? "4"];
  const isDark =
    block.backgroundColor !== "lev-yellow-light" &&
    block.backgroundColor !== "white";
  const items = block.items ?? [];
  const viewAll = block.viewAll;

  return (
    <div className={cn("py-16 lg:py-24", bgClass)}>
      <div className="container">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle
            className={cn(
              "mb-12 text-center typography-M48",
              isDark ? "text-white" : "text-lev-blue-dark",
            )}
          >
            {block.heading}
          </SectionTitle>
        </FadeUpAnimator>

        <div className="flex items-center justify-between mb-12">
          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <span
              className={cn(
                "typography-R18",
                isDark ? "text-white" : "text-lev-blue-dark",
              )}
            >
              {block.sectionLabel ?? "Items"}
            </span>
          </FadeUpAnimator>
          <div
            className={cn(
              "flex-1 h-[1px] mx-6",
              isDark ? "bg-white/30" : "bg-lev-blue-dark/30",
            )}
          />
          {viewAll?.label && viewAll?.url && (
            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <Link
                href={viewAll.url}
                className={cn(
                  "flex items-center gap-2 typography-R18 transition-colors",
                  isDark
                    ? "text-white hover:text-lev-green-light"
                    : "text-lev-blue-dark hover:text-lev-red",
                )}
              >
                {viewAll.label}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </FadeUpAnimator>
          )}
        </div>

        <div className={cn("grid grid-cols-1 gap-6", colsClass)}>
          {items.map((item, i) => {
            const src = mediaUrl(item.image, "feature") ?? mediaUrl(item.image);
            if (!src) return null;
            return (
              <FadeUpAnimator
                key={item.id ?? `item-${i}`}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                <Link href={item.url}>
                  <div className="relative h-[300px] lg:h-[350px] overflow-hidden group cursor-pointer">
                    <Image
                      src={src}
                      alt={mediaAlt(item.image, item.title)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="typography-R34 text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </FadeUpAnimator>
            );
          })}
        </div>
      </div>
    </div>
  );
}
