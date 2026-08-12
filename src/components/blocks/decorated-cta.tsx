import Image, { type StaticImageData } from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { cn } from "@/design-system/helpers";
import type {
  DecoratedCTABackgroundColor,
  DecoratedCTABlock as DecoratedCTABlockData,
  Media,
} from "@/lib/types";

import firstPhoto from "@/assets/photos/3.png";
import secondPhoto from "@/assets/photos/4.png";
import thirdPhoto from "@/assets/photos/5.png";
import fourthPhoto from "@/assets/photos/6.png";

const FALLBACK_TOP: StaticImageData[] = [firstPhoto, secondPhoto];
const FALLBACK_BOTTOM: StaticImageData[] = [fourthPhoto, thirdPhoto];

interface RenderImage {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

function resolveImages(
  cmsImages: { id?: string; image: Media }[] | undefined,
  fallback: StaticImageData[],
  keyPrefix: string,
  resolveCmsItem: (
    item: { id?: string; image: Media },
    i: number,
  ) => RenderImage | null,
): RenderImage[] {
  const fromCms = (cmsImages ?? [])
    .map((item, i) => resolveCmsItem(item, i))
    .filter((x): x is RenderImage => x !== null);
  if (fromCms.length > 0) return fromCms;
  return fallback.map((img, i) => ({
    key: `${keyPrefix}-fb-${i}`,
    src: img.src,
    width: img.width,
    height: img.height,
    alt: "",
  }));
}

interface DecoratedCTABlockProps {
  block: DecoratedCTABlockData;
}

const BG_COLOR_MAP: Record<DecoratedCTABackgroundColor, string> = {
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-yellow": "bg-lev-yellow",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
  white: "bg-white",
};

export function DecoratedCTABlock({ block }: DecoratedCTABlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_COLOR_MAP[block.backgroundColor ?? "lev-yellow-light"];
  const cta = block.cta;

  const topImages = resolveImages(
    block.topImages,
    FALLBACK_TOP,
    "top",
    (item, i) => {
      const src = mediaUrl(item.image, "feature") ?? mediaUrl(item.image);
      if (!src) return null;
      return {
        key: item.id ?? `top-${i}`,
        src,
        width: item.image.width ?? 400,
        height: item.image.height ?? 500,
        alt: mediaAlt(item.image),
      };
    },
  );

  const bottomImages = resolveImages(
    block.bottomImages,
    FALLBACK_BOTTOM,
    "bot",
    (item, i) => {
      const src = mediaUrl(item.image, "feature") ?? mediaUrl(item.image);
      if (!src) return null;
      return {
        key: item.id ?? `bot-${i}`,
        src,
        width: item.image.width ?? 800,
        height: item.image.height ?? 400,
        alt: mediaAlt(item.image),
      };
    },
  );

  return (
    <div className={cn("relative", bgClass)}>
      <SectionWrapper sectionColor={bgClass}>
        {topImages.length > 0 && (
          <div className="h-[500px] flex justify-between">
            {topImages.map((img, i) => (
              <FadeUpAnimator
                key={img.key}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Image
                  alt={img.alt}
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  className={i > 0 ? "mt-10" : undefined}
                />
              </FadeUpAnimator>
            ))}
          </div>
        )}

        <div className="flex gap-10 flex-col items-center">
          <FadeUpAnimator
            className="flex flex-col gap-10 items-center"
            transition={{ delay: 0.3 }}
          >
            <SectionTitle className="text-center text-lev-red-dark max-w-[650px]">
              {block.heading}
            </SectionTitle>
            {block.description && (
              <p className="text-center text-lev-red-dark typography-R16 max-w-[600px]">
                {block.description}
              </p>
            )}
            {cta?.label && cta?.url ? (
              <StartNowBtn href={cta.url}>{cta.label}</StartNowBtn>
            ) : (
              <StartNowBtn />
            )}
          </FadeUpAnimator>
        </div>
      </SectionWrapper>

      {bottomImages.length > 0 && (
        <div className="flex gap-14 overflow-hidden">
          {bottomImages.map((img, i) => {
            const isLast = i === bottomImages.length - 1;
            return (
              <FadeUpAnimator
                key={img.key}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="w-full"
              >
                <Image
                  alt={img.alt}
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  className={isLast ? "ms-auto me-6" : undefined}
                />
              </FadeUpAnimator>
            );
          })}
        </div>
      )}
    </div>
  );
}
