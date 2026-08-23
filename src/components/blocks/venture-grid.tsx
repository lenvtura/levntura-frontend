import type { StaticImageData } from "next/image";

import {
  VentureSection,
  type VentureCard,
} from "@/components/about/venture-section";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  VentureGridBgColor,
  VentureGridBlock as VentureGridBlockData,
  VentureGridHeadingColor,
} from "@/lib/types";

import av1 from "@/assets/photos/a-v-1.png";
import av2 from "@/assets/photos/a-v-2.png";
import av3 from "@/assets/photos/a-v-3.png";
import av4 from "@/assets/photos/a-v-4.png";

const FALLBACK_IMAGES: StaticImageData[] = [av1, av2, av3, av4];
const FALLBACK_LABELS = ["Internship", "Counselor", "Study & Travel", "Work & Travel"];

const BG_CLASS: Record<VentureGridBgColor, string> = {
  none: "",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
  white: "bg-white",
};

const HEADING_CLASS: Record<VentureGridHeadingColor, string> = {
  "lev-blue-dark": "text-lev-blue-dark",
  "lev-red-dark": "text-lev-red-dark",
  "lev-green-dark": "text-lev-green-dark",
  "lev-black": "text-lev-black",
};

interface VentureGridBlockProps {
  block: VentureGridBlockData;
}

export function VentureGridBlock({ block }: VentureGridBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-yellow-light"];
  const headingClass = HEADING_CLASS[block.headingColor ?? "lev-blue-dark"];

  const cards = Array.from({ length: 4 }, (_, i): VentureCard => {
    const cmsCard = block.cards?.[i];
    const cmsSrc =
      cmsCard?.image &&
      (mediaUrl(cmsCard.image, "feature") ?? mediaUrl(cmsCard.image));
    return {
      key: cmsCard?.id ?? `fb-${i}`,
      src: cmsSrc ?? FALLBACK_IMAGES[i],
      alt: cmsCard?.image
        ? mediaAlt(cmsCard.image, cmsCard.label)
        : cmsCard?.label ?? FALLBACK_LABELS[i],
      label: cmsCard?.label ?? FALLBACK_LABELS[i],
    };
  }) as [VentureCard, VentureCard, VentureCard, VentureCard];

  const headingNodes = block.heading.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));

  return (
    <VentureSection
      heading={headingNodes}
      subtitle={block.subtitle}
      cards={cards}
      paragraph1={block.paragraph1}
      paragraph2={block.paragraph2}
      sectionColor={bgClass}
      headingColor={headingClass}
    />
  );
}
