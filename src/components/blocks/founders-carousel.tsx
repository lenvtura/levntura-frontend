"use client";

import Image, { type StaticImageData } from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/design-system/carousel";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type { FoundersCarouselBlock as FoundersCarouselBlockData } from "@/lib/types";

import aboAlMashaikh from "@/assets/photos/founder.png";
import johnDoe from "@/assets/photos/mask-group30.png";

const FALLBACK_FOUNDERS = [
  {
    title: "Co-Founder",
    name: "Ahmad Al-Mashaikh",
    description:
      "Driven by a passion for global education, Ahmad Al-Mashaikh co-founded Levntura to redefine international experiences for today's youth. With extensive experience in global mobility, he believes learning goes beyond classrooms—it's about people, purpose, and perspective.",
    photo: aboAlMashaikh,
  },
  {
    title: "Co-Founder",
    name: "Abdulrahman Soman",
    description:
      "Abdulrahman Soman is a visionary co-founder of Levntura, driving its growth through innovation and strategic leadership. He is passionate about transforming global student mobility by creating smarter, more connected pathways between students and institutions.",
    photo: johnDoe,
  },
];

interface FoundersCarouselBlockProps {
  block: FoundersCarouselBlockData;
}

interface RenderFounder {
  key: string;
  title: string;
  name: string;
  description?: string;
  photoSrc: string | StaticImageData;
  photoAlt: string;
}

export function FoundersCarouselBlock({ block }: FoundersCarouselBlockProps) {
  const cmsFounders: RenderFounder[] = (block.founders ?? []).map((f, i) => ({
    key: f.id ?? `f-${i}`,
    title: f.title,
    name: f.name,
    description: f.description,
    photoSrc:
      mediaUrl(f.photo, "feature") ??
      mediaUrl(f.photo) ??
      (FALLBACK_FOUNDERS[i % 2]?.photo.src ?? ""),
    photoAlt: mediaAlt(f.photo, f.name),
  }));

  const founders: RenderFounder[] =
    cmsFounders.length > 0
      ? cmsFounders
      : FALLBACK_FOUNDERS.map((f, i) => ({
          key: `fb-${i}`,
          title: f.title,
          name: f.name,
          description: f.description,
          photoSrc: f.photo,
          photoAlt: f.name,
        }));

  if (founders.length === 0) return null;

  const cta = block.cta;

  return (
    <Carousel className="w-full bg-amber-300">
      <CarouselContent className="h-full">
        {founders.map((person) => (
          <CarouselItem key={person.key} className="relative h-full">
            {typeof person.photoSrc === "string" ? (
              <Image
                src={person.photoSrc}
                alt={person.photoAlt}
                width={1600}
                height={900}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={person.photoSrc}
                alt={person.photoAlt}
                className="object-cover w-full h-full"
              />
            )}

            <div className="top-0 end-[200px] absolute grid lg:grid-cols-3 h-full p-4">
              <div className="flex flex-col items-start justify-end lg:justify-center lg:col-start-3 text-white gap-y-4">
                <h2 className="typography-S34 text-white uppercase">
                  {person.title}
                </h2>
                <h6 className="typography-S16">{person.name}</h6>
                {person.description && (
                  <p className="typography-R14 leading-5 w-[400px]">
                    {person.description}
                  </p>
                )}
                {cta?.label && cta?.url ? (
                  <StartNowBtn
                    href={cta.url}
                    className="border-1 hover:bg-white hover:text-black border-white"
                  >
                    {cta.label}
                  </StartNowBtn>
                ) : (
                  <StartNowBtn className="border-1 hover:bg-white hover:text-black border-white">
                    Contact Us
                  </StartNowBtn>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 text-white border-white" />
      <CarouselNext className="right-4 text-white border-white" />
    </Carousel>
  );
}
