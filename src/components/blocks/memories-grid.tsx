/**
 * MemoriesGrid block — mirrors `app/(legacy)/about/tour-images.tsx`.
 *
 * 3-column masonry photo grid with a gradient fade at the bottom revealing a
 * centered title, primary CTA, and a smaller secondary link. Photos are
 * distributed round-robin across columns 0/1/2 so editor ordering controls
 * the masonry rhythm.
 *
 * When the editor uploads no photos we fall back to the 8 packaged
 * tour-images so the page still looks correct pre-DO-Spaces.
 */

import Image, { type StaticImageData } from "next/image";

import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { Link } from "@/i18n/navigation";
import type {
  MemoriesGridBgColor,
  MemoriesGridBlock as MemoriesGridBlockData,
} from "@/lib/types";

import img1 from "@/assets/photos/tour-images/i1.png";
import img2 from "@/assets/photos/tour-images/i2.png";
import img3 from "@/assets/photos/tour-images/i3.png";
import img4 from "@/assets/photos/tour-images/i4.png";
import img5 from "@/assets/photos/tour-images/i5.png";
import img6 from "@/assets/photos/tour-images/i6.png";
import img8 from "@/assets/photos/tour-images/i8.png";
import img9 from "@/assets/photos/tour-images/i9.png";

const FALLBACK_IMAGES: StaticImageData[] = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img8,
  img9,
];

const BG_CLASS: Record<MemoriesGridBgColor, string> = {
  none: "",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-yellow": "bg-lev-yellow",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
  white: "bg-white",
};

// Match the gradient fade color to the section bg so it visually melts the
// last photo row into the bg.
const GRADIENT_FROM_CLASS: Record<MemoriesGridBgColor, string> = {
  none: "from-white",
  "lev-yellow-light": "from-lev-yellow-light",
  "lev-yellow": "from-lev-yellow",
  "lev-blue-light": "from-lev-blue-light",
  "lev-green-light": "from-lev-green-light",
  "lev-pink": "from-lev-pink",
  white: "from-white",
};

interface MemoriesGridBlockProps {
  block: MemoriesGridBlockData;
}

interface RenderImg {
  key: string;
  src: string | StaticImageData;
  alt: string;
}

export function MemoriesGridBlock({ block }: MemoriesGridBlockProps) {
  const bg = block.backgroundColor ?? "lev-yellow-light";

  const cmsImgs: RenderImg[] = ((block.images ?? []) as unknown[])
    .map<RenderImg | null>((it, i) => {
      if (typeof it !== "object" || it === null) return null;
      const media = it as { id?: string | number; url?: string };
      const src = mediaUrl(media as never, "feature") ?? mediaUrl(media as never);
      if (!src) return null;
      return {
        key: String(media.id ?? `cms-${i}`),
        src,
        alt: mediaAlt(media as never),
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

  // Distribute images into 3 masonry columns matching the legacy About
  // tour-images layout: col0=2 photos, col1=3 photos, col2=3 photos.
  // This produces the staircase rhythm (col0 is short, col1/col2 are tall)
  // that fits the gradient fade reveal underneath.
  //
  // If editors upload more than 8 photos, extras spread round-robin starting
  // from col0 so the layout grows evenly.
  const columns: RenderImg[][] = [[], [], []];
  const STAIRCASE = [
    [0, 3],
    [1, 4, 6],
    [2, 5, 7],
  ];
  STAIRCASE.forEach((indices, colIdx) => {
    indices.forEach((imgIdx) => {
      if (images[imgIdx]) columns[colIdx].push(images[imgIdx]);
    });
  });
  // Extras (index 8+) round-robin across the 3 columns.
  for (let i = 8; i < images.length; i++) {
    columns[i % 3].push(images[i]);
  }

  const primaryLabel = block.primaryCta?.label || "Start now!";
  const primaryUrl = block.primaryCta?.url || "/contact";
  const secondaryLabel = block.secondaryLink?.label;
  const secondaryUrl = block.secondaryLink?.url;

  return (
    <SectionWrapper sectionColor={BG_CLASS[bg]}>
      <div className="relative">
        <div className="flex gap-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={cn(
                "flex-1 max-w-full",
                colIdx === 0
                  ? "sm:flex-1/2 sm:max-w-1/2 md:flex-1/3 md:max-w-1/3"
                  : "flex-1/3 max-w-1/3",
                colIdx > 0 && "hidden sm:block",
              )}
            >
              {col.map((img) =>
                typeof img.src === "string" ? (
                  <Image
                    key={img.key}
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={650}
                    className="mt-4 w-full align-middle object-cover"
                  />
                ) : (
                  <Image
                    key={img.key}
                    src={img.src}
                    alt={img.alt}
                    className="mt-4 w-full align-middle"
                  />
                ),
              )}
            </div>
          ))}
        </div>
        <div
          className={cn(
            "absolute h-[500px] left-0 right-0 bottom-0 bg-gradient-to-t from-[10%] to-transparent pointer-events-none",
            GRADIENT_FROM_CLASS[bg],
          )}
        />
      </div>
      <FadeUpAnimator className="flex flex-col -translate-y-[100px] gap-4 items-center relative">
        <SectionTitle className="text-center w-full max-w-2xl">
          {block.title}
        </SectionTitle>
        <Button>
          <Link href={primaryUrl}>{primaryLabel}</Link>
        </Button>
        {secondaryLabel && secondaryUrl && (
          <Link
            href={secondaryUrl}
            className="typography-R16 mt-4 text-black hover:text-lev-red transition-colors"
          >
            {secondaryLabel}
          </Link>
        )}
      </FadeUpAnimator>
    </SectionWrapper>
  );
}
