"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { Block, Media } from "@/lib/types";
import { mediaUrl, mediaAlt } from "@/lib/url";
import { cn } from "@/design-system/helpers";

interface GalleryImage {
  image?: Media;
  caption?: string;
  id?: string;
}

interface GalleryBlockProps {
  block: Block & {
    heading?: string;
    layout?: "grid" | "carousel" | "masonry";
    images?: GalleryImage[];
  };
}

export function GalleryBlock({ block }: GalleryBlockProps) {
  const layout = block.layout ?? "grid";
  const images = (block.images ?? []).filter((item) => item.image);

  if (images.length === 0) return null;

  return (
    <section className="my-12 lg:my-16">
      <div className="container-md">
        {block.heading && (
          <h2 className="typography-EB24 lg:typography-EB32 text-lev-green-dark mb-8">
            {block.heading}
          </h2>
        )}

        {layout === "carousel" ? (
          <GalleryCarousel images={images} />
        ) : (
          <div
            className={cn(
              "grid gap-4",
              layout === "masonry"
                ? "grid-cols-2 lg:grid-cols-3 [&>*:nth-child(3n+1)]:row-span-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {images.map((item, i) => (
              <GalleryItem key={item.id ?? i} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryItem({ item }: { item: GalleryImage }) {
  const src = mediaUrl(item.image, "card") ?? mediaUrl(item.image);
  if (!src) return null;

  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={mediaAlt(item.image, item.caption ?? "")}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      {item.caption && (
        <figcaption className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-sm p-2">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  // Force LTR so the carousel behaves consistently in RTL pages.
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    direction: "ltr",
  });

  return (
    <div className="overflow-hidden" ref={emblaRef} dir="ltr">
      <div className="flex gap-4">
        {images.map((item, i) => (
          <div key={item.id ?? i} className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33%]">
            <GalleryItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
