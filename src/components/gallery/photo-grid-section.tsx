/**
 * PhotoGridSection — restored from legacy `app/gallery/photo-grid.tsx`.
 *
 * Pure presentation component: takes an array of photos and renders them in a
 * Pinterest-style masonry. Position pattern (per 8 photos):
 *   - index 0, 4  → col-span-2 (wide)
 *   - index 1, 4, 6 → row-span-2 (tall)
 * Combined with `grid-flow-dense` this packs the grid without gaps.
 *
 * Marked "use client" because it owns the `visibleCount` state for the
 * "Show more" pagination.
 */

"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";

export interface PhotoGridImage {
  key: string;
  src: string | StaticImageData;
  alt: string;
}

export interface PhotoGridSectionProps {
  images: PhotoGridImage[];
  initialCount?: number;
  batchSize?: number;
  showMoreLabel?: string;
  /** Tailwind bg class (e.g. "bg-white"). */
  sectionBgClass?: string;
}

/** Repeating masonry pattern: indices 1, 4, 6 in each cycle of 8 get row-span-2 */
function shouldSpanTwoRows(index: number): boolean {
  const pos = index % 8;
  return pos === 1 || pos === 4 || pos === 6;
}

/** Repeating pattern: only indices 0 and 4 in each cycle of 8 get col-span-2 */
function shouldSpanTwoCols(index: number): boolean {
  const pos = index % 8;
  return pos === 0 || pos === 4;
}

export function PhotoGridSection({
  images,
  initialCount = 12,
  batchSize = 12,
  showMoreLabel = "Show more",
  sectionBgClass = "bg-white",
}: PhotoGridSectionProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div className={cn("py-12 lg:py-16", sectionBgClass)}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 grid-flow-dense grid-auto-rows-[minmax(140px,auto)]">
          {visibleImages.map((image, index) => {
            const spanTwoRows = shouldSpanTwoRows(index);
            const spanTwoCols = shouldSpanTwoCols(index);
            return (
              <FadeUpAnimator
                key={image.key}
                transition={{ delay: 0.1 * (index % 6) }}
                className={cn(
                  "relative overflow-hidden group cursor-pointer min-h-0",
                  spanTwoCols && "col-span-2",
                  spanTwoRows
                    ? "row-span-2 h-full min-h-[280px]"
                    : spanTwoCols
                      ? "aspect-[2/1]"
                      : "aspect-square",
                )}
              >
                {typeof image.src === "string" ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
              </FadeUpAnimator>
            );
          })}
        </div>
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              onClick={() =>
                setVisibleCount((n) => Math.min(n + batchSize, images.length))
              }
            >
              {showMoreLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
