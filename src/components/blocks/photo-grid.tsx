import type { StaticImageData } from "next/image";

import {
  PhotoGridSection,
  type PhotoGridImage,
} from "@/components/gallery/photo-grid-section";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  Media,
  PhotoGridBgColor,
  PhotoGridBlock as PhotoGridBlockData,
} from "@/lib/types";

import i1 from "@/assets/photos/tour-images/i1.png";
import i2 from "@/assets/photos/tour-images/i2.png";
import i3 from "@/assets/photos/tour-images/i3.png";
import i4 from "@/assets/photos/tour-images/i4.png";
import i5 from "@/assets/photos/tour-images/i5.png";
import i6 from "@/assets/photos/tour-images/i6.png";
import i7 from "@/assets/photos/tour-images/i7.png";
import i8 from "@/assets/photos/tour-images/i8.png";
import i9 from "@/assets/photos/tour-images/i9.png";
import av1 from "@/assets/photos/a-v-1.png";
import av2 from "@/assets/photos/a-v-2.png";
import av3 from "@/assets/photos/a-v-3.png";
import av4 from "@/assets/photos/a-v-4.png";
import m1 from "@/assets/photos/home/m-1.png";
import m2 from "@/assets/photos/home/m-2.png";
import m3 from "@/assets/photos/home/m-3.png";
import m4 from "@/assets/photos/home/m-4.png";
import happyFriendship from "@/assets/photos/happy-friendship.png";
import happyYoungMan from "@/assets/photos/happy-young-man.png";
import workingTogether from "@/assets/photos/working-together.png";
import studentAtCollege from "@/assets/photos/student-at-college.png";
import manStudy from "@/assets/photos/man-study.png";
import womanStudy from "@/assets/photos/woman-study.png";

const FALLBACK_IMAGES: StaticImageData[] = [
  i1, i2, i3, i4, i5, i6, i7, i8, i9,
  av1, av2, av3, av4,
  m1, m2, m3, m4,
  happyFriendship, happyYoungMan, workingTogether,
  studentAtCollege, manStudy, womanStudy,
];

const BG_CLASS: Record<PhotoGridBgColor, string> = {
  white: "bg-white",
  none: "",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
};

interface PhotoGridBlockProps {
  block: PhotoGridBlockData;
}

export function PhotoGridBlock({ block }: PhotoGridBlockProps) {
  const cmsImgs: PhotoGridImage[] = (block.images ?? [])
    .map((item, i): PhotoGridImage | null => {
      if (typeof item !== "object" || item === null) return null;
      const media = item as Media;
      const src = mediaUrl(media, "feature") ?? mediaUrl(media);
      if (!src) return null;
      // Index suffix prevents key collisions when the same Media doc
      // appears more than once in the grid.
      return {
        key: `cms-${i}-${media.id ?? "noid"}`,
        src,
        alt: mediaAlt(media, `Gallery photo ${i + 1}`),
      };
    })
    .filter((x): x is PhotoGridImage => x !== null);

  const images: PhotoGridImage[] =
    cmsImgs.length > 0
      ? cmsImgs
      : FALLBACK_IMAGES.map((src, i) => ({
          key: `fb-${i}`,
          src,
          alt: `Gallery photo ${i + 1}`,
        }));

  return (
    <PhotoGridSection
      images={images}
      initialCount={block.initialCount ?? 12}
      batchSize={block.batchSize ?? 12}
      showMoreLabel={block.showMoreLabel ?? "Show more"}
      sectionBgClass={BG_CLASS[block.backgroundColor ?? "white"]}
    />
  );
}
