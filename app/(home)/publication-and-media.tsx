import { SectionWrapper } from "./section-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import img1 from "@/assets/photos/home/m-1.png";
import img2 from "@/assets/photos/home/m-2.png";
import img3 from "@/assets/photos/home/m-3.png";
import img4 from "@/assets/photos/home/m-4.png";

export function PublicationAndMedia() {
  return (
    <SectionWrapper className="space-y-12">
      <article className="lg:flex justify-between space-y-8">
        <h2 className="typography-EB74 leading-16 md:w-1/2">
          Publication & Media
        </h2>

        <h4 className="sm:w-1/2 md:w-1/3 typography-M18 leading-8">
          Explore University&apos;s 10+ courses across variouGs specialisations
          that provoke intellectual and intuitive learning among students.
        </h4>
      </article>
      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 2000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1">
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto">
            <Image src={img1} alt="" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto">
            <Image src={img2} alt="" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto">
            <Image src={img3} alt="" />
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto">
            <Image src={img4} alt="" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </SectionWrapper>
  );
}
