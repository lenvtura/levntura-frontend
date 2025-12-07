"use client";

import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Slider } from "@/app/programs/work-and-travel/jobs-slider";
import { SectionTitle } from "@/app/(home)/section-title";
import australiaImage from "@/assets/photos/australia.png";
import canadaImage from "@/assets/photos/canada.png";
import londonImage from "@/assets/photos/london.png";
import usaImage from "@/assets/photos/usa.png";
import { TitleWithBreaks } from "@/app/programs/work-and-travel/title-with-breaks";

interface MoreToReadSectionProps {
  title: string;
  subtitle: string;
  description: string;
  images: (StaticImageData | string)[];
}

const images = [
  { src: australiaImage, title: "Unveiling Cultural Exchange" },
  { src: canadaImage, title: "Unveiling Cultural Exchange" },
  { src: londonImage, title: "Unveiling Cultural Exchange" },
  { src: usaImage, title: "The Power of Cultural Immersion" },
];

export function MoreToReadSection({
  title,
  subtitle,
  description,
}: MoreToReadSectionProps) {
  return (
    <section className="mb-16 lg:mb-24">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <FadeUpAnimator
            transition={{ delay: 0.1 }}
            className="flex justify-between w-full"
          >
            <SectionTitle className=" text-lev-blue-dark">
              {title}
              <br />
              {subtitle}
            </SectionTitle>
            <p className="typography-S14 uppercase text-lev-orange mb-2">
              KNOWLEDGE
            </p>
          </FadeUpAnimator>
        </div>
        <FadeUpAnimator transition={{ delay: 0.2 }} className="w-full mb-18">
          <p className="text-lev-red-dark typography-R14 leading-relaxed text-left max-w-xs ml-auto">
            {description}
          </p>
        </FadeUpAnimator>

        <Slider
          data={images}
          renderItem={(image) => (
            <div className="relative h-[400px] sm:h-[670px] w-[300px] sm:w-[480px] flex flex-col gap-7">
              <Image
                src={image.src}
                alt={`More to read `}
                fill
                className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300"
              />
              <TitleWithBreaks
                title={image.title}
                className="typography-EB34 sm:typography-EB48 text-white absolute bottom-10 left-10 uppercase "
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}

