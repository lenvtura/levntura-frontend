import Image from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  ImageFeatureBackgroundColor,
  ImageFeatureBlock as ImageFeatureBlockData,
} from "@/lib/types";

import fallbackImage from "@/assets/photos/student-at-college.png";

interface ImageFeatureBlockProps {
  block: ImageFeatureBlockData;
}

const BG_COLOR_MAP: Record<ImageFeatureBackgroundColor, string> = {
  "lev-yellow": "bg-lev-yellow",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
  "lev-gray-light": "bg-lev-gray-light",
  white: "bg-white",
};

export function ImageFeatureBlock({ block }: ImageFeatureBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_COLOR_MAP[block.backgroundColor ?? "lev-yellow"];
  const imgUrl =
    mediaUrl(block.image, "feature") ??
    mediaUrl(block.image) ??
    fallbackImage.src;
  const imgWidth = block.image?.width ?? fallbackImage.width;
  const imgHeight = block.image?.height ?? fallbackImage.height;

  return (
    <div>
      <SectionWrapper sectionColor={bgClass}>
        <div className="grid md:grid-cols-[1fr_3fr]">
          {block.eyebrow && (
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <span className="uppercase typography-M18 max-md:mb-10">
                {block.eyebrow}
              </span>
            </FadeUpAnimator>
          )}
          <div>
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <SectionTitle className="mb-8">{block.heading}</SectionTitle>
            </FadeUpAnimator>
            {block.paragraph && (
              <FadeUpAnimator transition={{ delay: 0.3 }}>
                <p className="max-w-[80ch]">{block.paragraph}</p>
              </FadeUpAnimator>
            )}
          </div>
        </div>
      </SectionWrapper>
      <FadeUpAnimator
        transition={{ delay: 0.4 }}
        className="max-md:h-[350px] h-[650]"
      >
        <Image
          alt={mediaAlt(block.image, block.heading)}
          src={imgUrl}
          width={imgWidth}
          height={imgHeight}
          className="object-cover w-full h-full"
        />
      </FadeUpAnimator>
    </div>
  );
}
