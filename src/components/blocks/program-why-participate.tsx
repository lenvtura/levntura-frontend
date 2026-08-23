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

interface Benefit {
  image?: Media | null;
  title: string;
  description?: string;
}

interface ProgramWhyParticipateBlockData {
  heading?: string;
  highlightedWords?: string;
  body?: string;
  benefits?: Benefit[];
}

/** Block version of program-page section 6 (Why Participate). 1:1 original. */
export function ProgramWhyParticipateBlock({
  block,
}: {
  block: ProgramWhyParticipateBlockData;
}) {
  const benefits = block.benefits ?? [];
  if (!block.heading && !block.body && benefits.length === 0) return null;

  return (
    <div className="mb-[180px]">
      <SectionWrapper className="container-md">
        {block.heading && (
          <FadeUpAnimator>
            <SectionTitle className="mb-[100px] text-[120px]">
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
      {benefits.length > 0 && (
        <div>
          <Slider
            data={benefits}
            renderItem={(benefit) => {
              const src =
                mediaUrl(benefit.image, "feature") ?? mediaUrl(benefit.image);
              return (
                <div>
                  <div className="relative h-[400px] sm:h-[670px] w-[300px] sm:w-[480px] flex flex-col gap-7 bg-lev-gray-light">
                    {src && (
                      <Image
                        width={500}
                        height={500}
                        className="absolute object-cover pointer-events-none w-full h-full inset-0"
                        src={src}
                        alt={mediaAlt(benefit.image, benefit.title)}
                      />
                    )}
                    <TitleWithBreaks
                      title={benefit.title}
                      className="typography-EB34 sm:typography-EB48 text-white absolute bottom-10 left-10 uppercase"
                    />
                  </div>
                  {benefit.description && (
                    <p className="typography-R16 text-gray-500 w-[300px] sm:w-[480px] mt-4 leading-6">
                      {benefit.description}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
