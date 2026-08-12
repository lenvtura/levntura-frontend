import Image from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  MapEmbedBgColor,
  MapEmbedBlock as MapEmbedBlockData,
} from "@/lib/types";

import mapImg from "@/assets/photos/Group 6210.png";

const BG_CLASS: Record<MapEmbedBgColor, string> = {
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-yellow": "bg-lev-yellow",
  "lev-pink": "bg-lev-pink",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  white: "bg-white",
};

interface MapEmbedBlockProps {
  block: MapEmbedBlockData;
}

export function MapEmbedBlock({ block }: MapEmbedBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-yellow-light"];
  const paragraphs = block.supportingParagraphs ?? [];
  const stat = block.stat;
  const imgUrl = mediaUrl(block.mapImage) ?? mapImg.src;
  const usingCmsImage = Boolean(mediaUrl(block.mapImage));

  const mapImageEl = usingCmsImage ? (
    <Image
      src={imgUrl}
      alt={mediaAlt(block.mapImage, "Map")}
      width={block.mapImage?.width ?? 1200}
      height={block.mapImage?.height ?? 800}
    />
  ) : (
    <Image src={mapImg} alt="Map" />
  );

  const mapWithLink = block.mapLink ? (
    <a
      href={block.mapLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open in Google Maps"
    >
      {mapImageEl}
    </a>
  ) : (
    mapImageEl
  );

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="relative lg:h-screen space-y-4"
    >
      <div className="flex flex-col lg:flex-row gap-y-8 items-start justify-between">
        {block.eyebrow && (
          <h4 className="text-lev-orange typography-S20 uppercase">
            {block.eyebrow}
          </h4>
        )}

        <h1 className="typography-B74 uppercase text-lev-red-dark leading-16">
          {block.heading.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>

      {paragraphs.length > 0 && (
        <article className="lg:absolute end-0 bottom-30 w-100 space-y-2">
          {paragraphs.map((p, i) => (
            <p
              key={p.id ?? `p-${i}`}
              className="typography-R16 leading-4"
            >
              {p.text}
            </p>
          ))}
        </article>
      )}

      <div className="lg:absolute inset-0">{mapWithLink}</div>

      {stat && (stat.value || stat.label || stat.description) && (
        <div className="lg:absolute start-0 bottom-0 w-100 space-y-4">
          <div className="flex items-center gap-4">
            {stat.value && (
              <h1 className={cn("typography-EB74 text-lev-orange")}>
                {stat.value}
              </h1>
            )}
            {stat.label && <h6 className="typography-B16">{stat.label}</h6>}
          </div>
          {stat.description && (
            <p className="typography-R16 leading-4">{stat.description}</p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
