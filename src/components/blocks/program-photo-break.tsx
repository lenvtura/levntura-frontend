import Image from "next/image";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { Media } from "@/lib/types";

// Bundled default so the section still shows a photo before an upload.
import photoMiddleFallback from "@/app/(frontend)/[locale]/programs/work-and-travel/photo2.webp";

interface ProgramPhotoBreakBlockData {
  image?: Media | null;
}

/** Block version of program-page section 4 (Photo break). 1:1 with original. */
export function ProgramPhotoBreakBlock({
  block,
}: {
  block: ProgramPhotoBreakBlockData;
}) {
  const url = mediaUrl(block.image, "feature") ?? mediaUrl(block.image);

  return (
    <SectionWrapper className="flex justify-center items-center">
      {url ? (
        <Image
          src={url}
          alt={mediaAlt(block.image, "")}
          width={block.image?.width ?? 700}
          height={block.image?.height ?? 500}
          className="h-auto max-w-full"
        />
      ) : (
        <Image src={photoMiddleFallback} alt="" />
      )}
    </SectionWrapper>
  );
}
