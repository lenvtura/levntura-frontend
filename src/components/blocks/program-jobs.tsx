"use client";

import Image from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

import { HighlightedTitle } from "./highlighted-title";

interface Job {
  image?: Media | null;
  title: string;
}

interface ProgramJobsBlockData {
  heading?: string;
  highlightedWords?: string;
  body?: string;
  items?: Job[];
}

/** Block version of program-page section 7 (Jobs). 1:1 with the original. */
export function ProgramJobsBlock({ block }: { block: ProgramJobsBlockData }) {
  const items = block.items ?? [];
  if (!block.heading && !block.body && items.length === 0) return null;

  return (
    <div className="mb-[150px]">
      <SectionWrapper className="container-md">
        {block.heading && (
          <FadeUpAnimator>
            <SectionTitle className="mb-[40px]">
              <HighlightedTitle
                title={block.heading}
                highlight={block.highlightedWords}
              />
            </SectionTitle>
          </FadeUpAnimator>
        )}
        {block.body && (
          <FadeUpAnimator className="flex">
            <p className="ms-auto text-lev-red-dark w-[300px]">{block.body}</p>
          </FadeUpAnimator>
        )}
      </SectionWrapper>
      {items.length > 0 && (
        <div>
          <Slider
            data={items}
            renderItem={(job) => {
              const src = mediaUrl(job.image, "feature") ?? mediaUrl(job.image);
              return (
                <div className="flex size-[300px] lg:size-[450px] justify-center bg-white p-10 flex-col gap-7">
                  <div className="size-[200px] self-center shrink-0 lg:size-[300px] aspect-square overflow-hidden rounded-full bg-lev-gray-light">
                    {src && (
                      <Image
                        src={src}
                        className="object-cover w-full h-full pointer-events-none"
                        width={300}
                        height={300}
                        alt={mediaAlt(job.image, job.title)}
                      />
                    )}
                  </div>
                  <h4 className="typography-EB34 lg:typography-EB48 text-lev-red-dark">
                    {job.title}
                  </h4>
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
