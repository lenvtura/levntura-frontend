"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";

const INITIAL_BATCH = 12;
const BATCH_SIZE = 12;

interface PhotoGridProps {
  images: string[];
  columns?: 2 | 3 | 4;
}

/** Repeating masonry pattern: indices 1, 4, 6 in each cycle of 8 get row-span-2 */
function shouldSpanTwoRows(index: number): boolean {
  const pos = index % 8;
  return pos === 1 || pos === 4 || pos === 6;
}

/** Repeating pattern: only indices 0 and 4 in each cycle of 8 get col-span-2 (max 2 wide images per 8) */
function shouldSpanTwoCols(index: number): boolean {
  const pos = index % 8;
  return pos === 0 || pos === 4;
}

export function PhotoGrid({ images }: PhotoGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 grid-flow-dense grid-auto-rows-[minmax(140px,auto)]">
          {visibleImages.map((image, index) => {
            const spanTwoRows = shouldSpanTwoRows(index);
            const spanTwoCols = shouldSpanTwoCols(index);
            return (
              <FadeUpAnimator
                key={index}
                transition={{ delay: 0.1 * (index % 6) }}
                className={cn(
                  "relative overflow-hidden group cursor-pointer min-h-0",
                  spanTwoCols && "col-span-2",
                  spanTwoRows
                    ? "row-span-2 h-full min-h-[280px]"
                    : spanTwoCols
                      ? "aspect-[2/1]"
                      : "aspect-square"
                )}
              >
                <Image
                  src={image}
                  alt={`Gallery photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </FadeUpAnimator>
            );
          })}
        </div>
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              onClick={() => setVisibleCount((n) => Math.min(n + BATCH_SIZE, images.length))}
            >
              Show more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
