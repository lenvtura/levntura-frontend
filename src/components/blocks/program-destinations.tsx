"use client";

import Image from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { TitleWithBreaks } from "@/app/(frontend)/[locale]/programs/work-and-travel/title-with-breaks";
import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

import { HighlightedTitle } from "./highlighted-title";

interface Destination {
  image?: Media | null;
  area: string;
  country?: string;
}

interface ProgramDestinationsBlockData {
  leadText?: string;
  heading?: string;
  highlightedWords?: string;
  items?: Destination[];
}

/** Block version of program-page section 8 (Destinations). 1:1 original. */
export function ProgramDestinationsBlock({
  block,
}: {
  block: ProgramDestinationsBlockData;
}) {
  const items = block.items ?? [];
  if (!block.leadText && !block.heading && items.length === 0) return null;

  return (
    <div className="mb-[100px] sm:mb-0">
      <SectionWrapper>
        {block.leadText && (
          <FadeUpAnimator>
            <p className="mb-12 text-lev-red-dark w-[300px]">{block.leadText}</p>
          </FadeUpAnimator>
        )}
        {block.heading && (
          <FadeUpAnimator className="flex">
            <SectionTitle className="ms-auto text-end">
              <HighlightedTitle
                title={block.heading}
                highlight={block.highlightedWords}
              />
            </SectionTitle>
          </FadeUpAnimator>
        )}
      </SectionWrapper>
      {items.length > 0 && (
        <Slider
          data={items}
          renderItem={(dest) => {
            const src = mediaUrl(dest.image, "feature") ?? mediaUrl(dest.image);
            return (
              <div className="flex flex-col gap-4 w-[400px]">
                <div className="relative shrink-0 overflow-hidden rounded-full h-[300px] aspect-square grid gap-7 bg-lev-gray-light">
                  {src && (
                    <Image
                      fill
                      className="pointer-events-none w-full object-cover"
                      src={src}
                      alt={mediaAlt(dest.image, dest.area)}
                    />
                  )}
                </div>
                <div className="self-center text-center">
                  <TitleWithBreaks
                    title={dest.area}
                    className="typography-S24 leading-9! sm:typography-S34 uppercase"
                  />
                  {dest.country && (
                    <p className="typography-R18 leading-6">{dest.country}</p>
                  )}
                </div>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
