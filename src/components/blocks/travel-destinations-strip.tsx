"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  easeIn,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { StaticImageData } from "next/image";

import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";
import { Travels } from "@/constants/travels";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { TravelDestinationsBlock } from "@/lib/types";

type TravelImage = NonNullable<TravelDestinationsBlock["images"]>[number];
type TravelSrc = string | StaticImageData;

/** Static/DO fallbacks for cards whose CMS media still points at local disk. */
const FALLBACK_BY_LABEL = new Map<string, TravelSrc>(
  Travels.map((t) => [t.label.toLowerCase(), t.src]),
);

function resolveTravelSrc(item: TravelImage): TravelSrc | undefined {
  const fromCms = mediaUrl(item.image, "card") ?? mediaUrl(item.image);
  const fallback = FALLBACK_BY_LABEL.get((item.label || "").toLowerCase());

  // Prefer bundled assets when CMS only has a local /api/media path — those
  // files are not on Vercel’s filesystem even after URL rewriting.
  if (fromCms?.startsWith("/api/media") && fallback) return fallback;

  return fromCms || fallback;
}

interface TravelDestinationsStripProps {
  images: TravelImage[];
}

export function TravelDestinationsStrip({ images }: TravelDestinationsStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  if (!images || images.length === 0) return null;

  return (
    <div ref={containerRef} className="bg-white pb-8">
      <TravelStripMobile images={images} scrollYProgress={scrollYProgress} />
      <TravelStripDesktop images={images} />
    </div>
  );
}

function TravelStripDesktop({ images }: { images: TravelImage[] }) {
  return (
    <div className="-mt-[200px] relative z-[900] min-w-[1500px] overflow-hidden max-md:hidden h-[400px]">
      <Slider
        data={images}
        renderItem={(item) => (
          <TravelCard key={item.id ?? item.label} item={item} variant="desktop" />
        )}
      />
    </div>
  );
}

function TravelStripMobile({
  images,
  scrollYProgress,
}: {
  images: TravelImage[];
  scrollYProgress: MotionValue<number>;
}) {
  const translateXa = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  const photoContainerRef = useRef<HTMLDivElement>(null);
  const [photoContainerWidth, setPhotoContainerWidth] = useState(0);
  useEffect(() => {
    setPhotoContainerWidth(photoContainerRef.current?.clientWidth || 0);
  }, [photoContainerRef.current?.clientWidth]);

  const translateX = useTransform(translateXa, [0, 0.8], ["0%", "-60%"], {
    ease: easeIn,
  });

  return (
    <div className="mt-[24px] md:hidden">
      <motion.div
        ref={photoContainerRef}
        dragConstraints={{
          left: -photoContainerWidth / 5,
          right: photoContainerWidth / 5,
        }}
        style={{ translateX }}
        drag="x"
        whileDrag={{ cursor: "grabbing" }}
        className="flex w-full gap-4 p-2 min-w-[1500px]"
      >
        {images.map((item) => (
          <TravelCard key={item.id ?? item.label} item={item} variant="mobile" />
        ))}
      </motion.div>
    </div>
  );
}

function TravelCard({
  item,
  variant,
}: {
  item: TravelImage;
  variant: "desktop" | "mobile";
}) {
  const src = resolveTravelSrc(item);
  const alt = mediaAlt(item.image, item.label);

  // We deliberately do NOT wrap the whole card in <Link> — it would conflict
  // with the slider's drag gesture. URL is applied to the label text only.
  // `h-[400px]` is required (not `h-full`) because the Slider's flex
  // container uses `items-center` which doesn't stretch children, so
  // `h-full` collapses to the image's intrinsic height and pushes the
  // absolute-positioned label out of the visible 400px clip area.
  const wrapperClass =
    variant === "desktop"
      ? "shrink-0 relative w-[400px] h-[400px] overflow-hidden"
      : "w-full h-full shrink-0 pointer-events-none relative overflow-hidden";

  // `z-10` keeps the label above the framer-motion stacking context during
  // drag. `pointer-events-auto` on the link re-enables clicks inside the
  // `pointer-events-none` mobile wrapper.
  const labelBase =
    "absolute z-10 typography-B48 left-[16px] bottom-[16px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]";

  const label = item.url ? (
    <Link
      href={item.url}
      className={`${labelBase} pointer-events-auto hover:underline cursor-pointer`}
    >
      {item.label}
    </Link>
  ) : (
    <div className={labelBase}>{item.label}</div>
  );

  return (
    <div className={wrapperClass}>
      {src && (
        <Image
          alt={alt}
          width={variant === "desktop" ? 300 : 200}
          height={variant === "desktop" ? 300 : 200}
          src={src}
          className={
            variant === "desktop"
              ? "object-cover group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
              : "object-contain pointer-events-none w-full h-full"
          }
        />
      )}
      {label}
    </div>
  );
}
