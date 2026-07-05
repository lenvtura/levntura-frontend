"use client";

import Image, { type StaticImageData } from "next/image";

import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "@/components/sections/section-title";
import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";
import { cn } from "@/design-system/helpers";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  ProgramShowcaseBgColor,
  ProgramShowcaseBlock as ProgramShowcaseBlockData,
} from "@/lib/types";

import studyImage from "@/assets/photos/study.png";

const FALLBACK_PROGRAMS: Array<{
  label: string;
  src: string | StaticImageData;
}> = [
  {
    label: "Summer Work & Travel",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_work-and-travel_24LYy63.jpg",
  },
  {
    label: "Camp Counselor",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_camp_kBDwgKc.jpg",
  },
  {
    label: "Internship & Trainee",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_internship_6JEKEIn.jpg",
  },
  { label: "Study Abroad", src: studyImage },
  {
    label: "Language Programs",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_language_xMMqzY7.jpg",
  },
  {
    label: "Summer Camp",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_summer-camp_2hf7glA.jpg",
  },
  {
    label: "Volunteering Programs",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_volunteering_V6OdEt3.jpg",
  },
];

// `tealLight` is an arbitrary value — not a brand-palette token.
const BG_CLASS: Record<ProgramShowcaseBgColor, string> = {
  tealLight: "bg-[#D8E6E6]",
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
  white: "bg-white",
};

interface ProgramShowcaseBlockProps {
  block: ProgramShowcaseBlockData;
}

interface RenderProgram {
  label: string;
  src: string | StaticImageData;
  alt: string;
}

export function ProgramShowcaseBlock({ block }: ProgramShowcaseBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "tealLight"];
  const programTypes = block.programTypes ?? [];
  const cta = block.cta;

  const cmsPrograms = (block.programs ?? []).map((p) => ({
    label: p.label,
    src: mediaUrl(p.image, "feature") ?? mediaUrl(p.image) ?? "",
    alt: mediaAlt(p.image, p.label),
  }));

  const programs: RenderProgram[] =
    cmsPrograms.filter((p) => p.src).length > 0
      ? cmsPrograms.filter((p) => p.src)
      : FALLBACK_PROGRAMS.map((p) => ({
          label: p.label,
          src: p.src,
          alt: p.label,
        }));

  return (
    <div className={cn("py-[100px]", bgClass)}>
      <div className="container">
        <div className="flex max-md:flex-col-reverse relative mb-12 gap-4">
          {programTypes.length > 0 && (
            <FadeUpAnimator
              transition={{ delay: 0.2 }}
              className="flex max-md:mt-4 max-md:grid grid-cols-2 mr-4 flex-col gap-4"
            >
              {programTypes.map((t, i) => (
                <span
                  className="whitespace-nowrap"
                  key={t.id ?? `type-${i}`}
                >
                  {t.label}
                </span>
              ))}
            </FadeUpAnimator>
          )}

          <div className="w-full items-start justify-between">
            {cta?.label && cta?.url && (
              <FadeUpAnimator transition={{ delay: 0.4 }}>
                <ButtonWithArrow
                  className="float-right max-md:-mt-2 flex ml-auto top-0 right-0 typography-R18 items-center gap-4"
                  href={cta.url}
                  iconClassName="border-lev-green-dark"
                >
                  {cta.label} →
                </ButtonWithArrow>
              </FadeUpAnimator>
            )}

            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <SectionTitle className="text-lev-green-dark">
                {block.heading}
              </SectionTitle>
            </FadeUpAnimator>
          </div>
        </div>
      </div>

      <Slider
        data={programs}
        renderItem={(item) => (
          <div
            key={item.label}
            className="shrink-0 relative w-[325px] overflow-hidden h-full"
          >
            {typeof item.src === "string" ? (
              <Image
                alt={item.alt}
                width={300}
                height={300}
                src={item.src}
                className="object-cover group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
              />
            ) : (
              <Image
                alt={item.alt}
                src={item.src}
                className="object-cover group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
              />
            )}
            <div className="absolute typography-R34 left-[16px] bottom-[16px] text-white">
              {item.label}
            </div>
          </div>
        )}
      />
    </div>
  );
}
