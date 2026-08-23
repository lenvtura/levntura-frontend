import Image from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { TitleWithBreaks } from "@/app/(frontend)/[locale]/programs/work-and-travel/title-with-breaks";
import { FeatureIcon } from "@/app/(frontend)/[locale]/programs/[programSlug]/icons";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

import { HighlightedTitle } from "./highlighted-title";

type FeatureIconKey = "star" | "bag" | "hand" | "people" | "face" | "check";

interface Feature {
  id?: string;
  iconKey: FeatureIconKey;
  title: string;
  description?: string;
  image?: Media | null;
}

interface ProgramWhyChooseBlockData {
  heading?: string;
  highlightedWords?: string;
  features?: Feature[];
}

/** Block version of program-page section 12 (Why Choose Levntura). 1:1. */
export function ProgramWhyChooseBlock({
  block,
}: {
  block: ProgramWhyChooseBlockData;
}) {
  const features = block.features ?? [];
  if (features.length === 0) return null;

  return (
    <SectionWrapper className="min-h-screen container-md mb-[100px]">
      {block.heading && (
        <FadeUpAnimator>
          <SectionTitle className="mb-[90px]">
            <HighlightedTitle
              title={block.heading}
              highlight={block.highlightedWords}
            />
          </SectionTitle>
        </FadeUpAnimator>
      )}
      <div className="grid gap-y-[120px] gap-x-24 grid-cols-1 lg:grid-cols-2">
        {features.map((feature, index) => (
          <FadeUpAnimator
            transition={{ delay: index * 0.1 }}
            key={feature.id ?? `feat-${index}`}
            className="flex gap-4 lg:gap-10"
          >
            <span className="shrink-0 w-[80px]">
              {mediaUrl(feature.image) ? (
                <Image
                  src={mediaUrl(feature.image) as string}
                  alt={mediaAlt(feature.image, feature.title)}
                  width={80}
                  height={80}
                  className="w-[80px] h-auto object-contain"
                />
              ) : (
                <FeatureIcon icon={feature.iconKey} />
              )}
            </span>
            <div>
              <TitleWithBreaks
                title={feature.title}
                className="text-lev-blue-dark leading-9 mb-[22px] typography-R34 text-[32px]"
              />
              {feature.description && (
                <p className="typography-R18 leading-6 text-lev-red-dark max-w-[350px]">
                  {feature.description}
                </p>
              )}
            </div>
          </FadeUpAnimator>
        ))}
      </div>
    </SectionWrapper>
  );
}
