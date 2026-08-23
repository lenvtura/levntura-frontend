import Image, { type StaticImageData } from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionTitle } from "@/components/sections/section-title";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  HeroImageGridBgColor,
  HeroImageGridHighlight,
  HeroWithImageGridBlock as HeroWithImageGridBlockData,
} from "@/lib/types";

import img1 from "@/assets/photos/home/m-1.png";
import img3 from "@/assets/photos/home/m-3.png";
import img4 from "@/assets/photos/home/m-4.png";

const FALLBACK_IMAGES: StaticImageData[] = [img1, img4, img3];

const BG_CLASS: Record<HeroImageGridBgColor, string> = {
  "lev-green-dark": "bg-lev-green-dark",
  "lev-blue-dark": "bg-lev-blue-dark",
  "lev-black": "bg-lev-black",
  "lev-red-dark": "bg-lev-red-dark",
  "lev-orange": "bg-lev-orange",
};

const HIGHLIGHT_CLASS: Record<HeroImageGridHighlight, string> = {
  "lev-green-light": "text-lev-green-light",
  "lev-yellow": "text-lev-yellow",
  "lev-orange": "text-lev-orange",
  "lev-red": "text-lev-red",
  "lev-blue-light": "text-lev-blue-light",
};

interface HeroWithImageGridBlockProps {
  block: HeroWithImageGridBlockData;
}

interface RenderImg {
  key: string;
  src: string | StaticImageData;
  alt: string;
}

export function HeroWithImageGridBlock({ block }: HeroWithImageGridBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-green-dark"];
  const highlightClass = HIGHLIGHT_CLASS[block.highlightColor ?? "lev-green-light"];

  const cmsImgs: RenderImg[] = (block.images ?? [])
    .map<RenderImg | null>((it, i) => {
      const src = mediaUrl(it.image, "feature") ?? mediaUrl(it.image);
      if (!src) return null;
      return {
        key: it.id ?? `img-${i}`,
        src,
        alt: it.alt ?? mediaAlt(it.image),
      };
    })
    .filter((x): x is RenderImg => x !== null);

  const images: RenderImg[] =
    cmsImgs.length > 0
      ? cmsImgs
      : FALLBACK_IMAGES.map((img, i) => ({
          key: `fb-${i}`,
          src: img,
          alt: "",
        }));

  const heading = block.heading;
  const highlight = block.highlightedWord;

  return (
    <SectionWrapper sectionColor={bgClass}>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center pt-10 lg:pt-0">
        <div>
          {block.eyebrow && (
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <p className="typography-R14 uppercase text-lev-orange mb-4">
                {block.eyebrow}
              </p>
            </FadeUpAnimator>
          )}

          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <SectionTitle className="text-white mb-6">
              {highlight && heading.includes(highlight) ? (
                <>
                  {heading.split(highlight)[0]}
                  <span className={highlightClass}>{highlight}</span>
                  {heading.split(highlight).slice(1).join(highlight)}
                </>
              ) : (
                heading
              )}
            </SectionTitle>
          </FadeUpAnimator>

          {block.description && (
            <FadeUpAnimator
              className="text-white typography-R16 leading-relaxed max-w-[600px]"
              transition={{ delay: 0.3 }}
            >
              {block.description}
            </FadeUpAnimator>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <FadeUpAnimator
              key={img.key}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={cn(
                "h-[200px] lg:h-[280px]",
                i === 0 && "col-span-2",
              )}
            >
              <div className="relative w-full h-full overflow-hidden">
                {typeof img.src === "string" ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </FadeUpAnimator>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
