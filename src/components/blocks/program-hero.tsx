import Image from "next/image";

import { StartNowBtn } from "@/atoms/start-now-btn";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

// Bundled default so a freshly-added block (no upload yet) still shows a
// full hero image — the editor uploads their own to override it.
import heroFallback from "@/app/(frontend)/[locale]/programs/work-and-travel/program-hero.webp";

interface ProgramHeroBlockData {
  heading?: string;
  tag?: string;
  subtitle?: string;
  note?: string;
  image?: Media | null;
}

/**
 * Block version of the program-page hero — a visual 1:1 of the legacy fixed
 * hero in program-detail.tsx (section 1), reading from its own block fields
 * instead of `program.detailHero` + `program.title`.
 */
export function ProgramHeroBlock({ block }: { block: ProgramHeroBlockData }) {
  const heroImageUrl =
    mediaUrl(block.image, "feature") ?? mediaUrl(block.image);

  return (
    <div className="flex relative bg-gradient-to-b from-lev-gray-light to-transparent justify-center items-center min-h-screen overflow-hidden">
      <Image
        fill
        src={heroImageUrl ?? heroFallback}
        alt={mediaAlt(block.image, block.heading ?? "")}
        className="w-full pointer-events-none object-cover"
        priority
      />
      <StartNowBtn
        href="#apply"
        className="z-10 text-white cursor-pointer border-white absolute top-[350px] left-[50%] translate-x-[-50%]"
      />
      <div className="flex flex-col text-white uppercase z-10 gap-4 items-center -translate-y-[200px] text-center px-4">
        {block.tag && <span className="typography-B18">{block.tag}</span>}
        <h1 className="typography-EB48! mix-blend-difference! sm:typography-EB74! text-[64px] sm:text-[90px]">
          {block.heading}
        </h1>
        {block.subtitle && (
          <p className="typography-S18 mix-blend-difference">{block.subtitle}</p>
        )}
        {block.note && <p className="typography-S18">{block.note}</p>}
      </div>
    </div>
  );
}
