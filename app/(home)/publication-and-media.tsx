"use client";

import { SectionWrapper } from "./section-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import img1 from "@/assets/photos/home/m-1.png";
import img2 from "@/assets/photos/home/m-2.png";
import img3 from "@/assets/photos/home/m-3.png";
import img4 from "@/assets/photos/home/m-4.png";
import { SectionTitle } from "./section-title";

export function PublicationAndMedia() {
  return (
    <SectionWrapper className="space-y-8 lg:space-y-0">
      <article className="justify-between space-y-8">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle className="typography-EB74 uppercase text-lev-blue-dark leading-16 md:w-1/2">
            Publication <br />& Media
          </SectionTitle>
        </FadeUpAnimator>

        <div className="w-full flex lg:translate-x-[70px] lg:-translate-y-[50px] justify-center items-center">
          <FadeUpAnimator className="sm:w-1/2 md:w-1/3 text-lev-red-dark typography-R18 leading-6">
            Step into the stories that shaped Levntura&apos;s journey. From
            global adventures to cultural milestones, each moment reflects our
            spirit of exploration, leadership, and connection. Every image tells
            a story of growth—students discovering their strength, building
            friendships across borders, and creating memories that last a
            lifetime.
          </FadeUpAnimator>
        </div>
      </article>
      <Carousel
        className="w-full over"
        plugins={[Autoplay({ delay: 2000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1">
          <CarouselItem className="pl-4 md:basis-auto lg:basis-auto">
            <Image src={img1} alt="" />
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-auto lg:basis-auto">
            <Image src={img2} alt="" />
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-auto lg:basis-auto">
            <Image src={img3} alt="" />
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-auto lg:basis-auto">
            <Image src={img4} alt="" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </SectionWrapper>
  );
}
