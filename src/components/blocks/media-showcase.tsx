"use client";

import Image, { type StaticImageData } from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { Link } from "@/i18n/navigation";
import type {
  MediaShowcaseAspectRatio,
  MediaShowcaseBlock as MediaShowcaseBlockData,
} from "@/lib/types";

import m1 from "@/assets/photos/home/m-1.png";
import m2 from "@/assets/photos/home/m-2.png";
import m3 from "@/assets/photos/home/m-3.png";
import m4 from "@/assets/photos/home/m-4.png";

const FALLBACK_ITEMS: StaticImageData[] = [m1, m2, m3, m4];

interface MediaShowcaseBlockProps {
  block: MediaShowcaseBlockData;
}

const ASPECT_CLASS: Record<MediaShowcaseAspectRatio, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-video",
  natural: "",
};

interface RenderItem {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  url?: string;
}

export function MediaShowcaseBlock({ block }: MediaShowcaseBlockProps) {
  if (!block.heading) return null;

  const autoplay = block.autoplay ?? true;
  const delay = block.autoplayDelay ?? 2000;
  const aspect = block.aspectRatio ?? "portrait";
  const aspectClass = ASPECT_CLASS[aspect];
  const cropped = aspect !== "natural";

  const cmsItems = (block.items ?? [])
    .map<RenderItem | null>((item, i) => {
      const src = mediaUrl(item.image, "feature") ?? mediaUrl(item.image);
      if (!src) return null;
      return {
        key: item.id ?? `mi-${i}`,
        src,
        width: item.image.width ?? 400,
        height: item.image.height ?? 500,
        alt: mediaAlt(item.image, item.caption ?? block.heading),
        caption: item.caption,
        url: item.url,
      };
    })
    .filter((x): x is RenderItem => x !== null);

  const renderItems: RenderItem[] =
    cmsItems.length > 0
      ? cmsItems
      : FALLBACK_ITEMS.map((img, i) => ({
          key: `fb-${i}`,
          src: img.src,
          width: img.width,
          height: img.height,
          alt: "",
        }));

  return (
    <SectionWrapper className="space-y-8 lg:space-y-0">
      <article className="justify-between space-y-8">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle className="typography-EB74 uppercase text-lev-blue-dark leading-16 md:w-1/2">
            {block.heading}
          </SectionTitle>
        </FadeUpAnimator>

        {block.description && (
          <div className="w-full flex lg:translate-x-[70px] lg:-translate-y-[50px] justify-center items-center">
            <FadeUpAnimator className="sm:w-1/2 md:w-1/3 text-lev-red-dark typography-R18 leading-6">
              {block.description}
            </FadeUpAnimator>
          </div>
        )}
      </article>

      <Carousel
        className="w-full over"
        plugins={autoplay ? [Autoplay({ delay })] : []}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1">
          {renderItems.map((it) => (
            <CarouselItem
              key={it.key}
              className="pl-4 md:basis-auto lg:basis-auto"
            >
              <MediaShowcaseItem
                item={it}
                aspectClass={aspectClass}
                cropped={cropped}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </SectionWrapper>
  );
}

function MediaShowcaseItem({
  item,
  aspectClass,
  cropped,
}: {
  item: RenderItem;
  aspectClass: string;
  cropped: boolean;
}) {
  const hasLink = Boolean(item.url);
  const isExternal = /^https?:\/\//.test(item.url ?? "");

  const containerClass = cn(
    "relative w-[320px] md:w-[400px] overflow-hidden",
    aspectClass,
  );

  const image = cropped ? (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 320px, 400px"
    />
  ) : (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      className="object-contain w-full h-auto"
    />
  );

  const inner = (
    <div className={containerClass}>
      {image}
      {item.caption && (
        <span className="absolute left-4 bottom-4 typography-EB34 max-sm:typography-EB24 text-white leading-none drop-shadow-md">
          {item.caption}
        </span>
      )}
    </div>
  );

  if (!hasLink) return inner;

  if (isExternal) {
    return (
      <a
        href={item.url ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
        aria-label={item.caption ?? item.alt}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={item.url ?? "#"}
      className="block group"
      aria-label={item.caption ?? item.alt}
    >
      {inner}
    </Link>
  );
}
