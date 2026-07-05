"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/design-system/button";
import { mediaUrl } from "@/lib/url";
import { Link } from "@/i18n/navigation";
import type { VideoTestimonialsBlock as VideoTestimonialsBlockData } from "@/lib/types";

const FALLBACK_VIDEOS = [
  "/assets/videos/media-1.mp4",
  "/assets/videos/media-2.mp4",
];

interface VideoTestimonialsBlockProps {
  block: VideoTestimonialsBlockData;
}

interface RenderVideo {
  key: string;
  src: string;
  caption?: string;
}

export function VideoTestimonialsBlock({ block }: VideoTestimonialsBlockProps) {
  if (!block.heading) return null;

  const cmsVideos: RenderVideo[] = (block.videos ?? [])
    .map<RenderVideo | null>((v, i) => {
      const src = mediaUrl(v.video);
      if (!src) return null;
      return {
        key: v.id ?? `vid-${i}`,
        src,
        caption: v.caption,
      };
    })
    .filter((x): x is RenderVideo => x !== null);

  const videos: RenderVideo[] =
    cmsVideos.length > 0
      ? cmsVideos
      : FALLBACK_VIDEOS.map((src, i) => ({ key: `fb-${i}`, src }));

  const cta = block.cta;
  const primary = videos[0];
  const secondary = videos[1] ?? primary;
  const tertiary = videos[2] ?? secondary;

  return (
    <SectionWrapper className="min-h-screen space-y-4">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-EB48 lg:typography-EB74 leading-12 lg:leading-16 uppercase sm:w-1/2">
          {block.heading}
        </h2>
      </FadeUpAnimator>

      <section className="hidden lg:grid lg:grid-cols-2 lg:gap-x-4">
        <article className="hidden lg:block">
          <video className="h-[70vh]" controls muted loop>
            <source src={primary.src} type="video/mp4" />
          </video>
        </article>
        <article className="grid grid-cols-2 gap-x-4">
          <div className="space-y-4 -mt-20">
            <video className="h-[55vh]" controls height={1000} muted loop>
              <source src={secondary.src} type="video/mp4" />
            </video>
            {block.subheading && (
              <h4 className="typography-S34 leading-8">
                {block.subheading.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h4>
            )}
          </div>
          <video className="h-[45vh] mt-6" controls muted loop>
            <source src={tertiary.src} type="video/mp4" />
          </video>
          {block.description && (
            <p className="typography-R14 text-lev-red-dark leading-5 col-span-2">
              {block.description}
            </p>
          )}
          {cta?.label && cta?.url && (
            <Button asChild className="self-end justify-self-start">
              <Link href={cta.url}>{cta.label} →</Link>
            </Button>
          )}
        </article>
      </section>

      <Carousel
        className="w-full overflow-hidden lg:hidden"
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1">
          {videos.map((v, i) => (
            <CarouselItem
              key={v.key}
              className="pl-1 md:basis-auto lg:basis-auto w-100"
            >
              <video
                className={i === videos.length - 1 ? "h-[45vh] mt-6" : "h-[70vh]"}
                controls
                muted
                loop
              >
                <source src={v.src} type="video/mp4" />
              </video>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <article className="space-y-4 lg:hidden">
        {block.subheading && (
          <FadeUpAnimator transition={{ delay: 0.3 }}>
            <h4 className="typography-R24 leading-6">
              {block.subheading.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h4>
          </FadeUpAnimator>
        )}
        {block.description && (
          <FadeUpAnimator transition={{ delay: 0.4 }}>
            <p className="typography-R14 leading-4 col-span-2 max-w-xl">
              {block.description}
            </p>
          </FadeUpAnimator>
        )}
        {cta?.label && cta?.url && (
          <FadeUpAnimator transition={{ delay: 0.5 }}>
            <Button asChild className="self-end justify-self-start">
              <Link href={cta.url}>{cta.label} →</Link>
            </Button>
          </FadeUpAnimator>
        )}
      </article>
    </SectionWrapper>
  );
}
