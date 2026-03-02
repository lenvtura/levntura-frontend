import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import { SectionWrapper } from "./section-wrapper";
import { Button } from "@/design-system/button";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Routes } from "@/constants/routes";
// import ved1 from '@/assets/videos';

export function OurStudentsSharing() {
  return (
    <SectionWrapper className="min-h-screen space-y-4">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-EB48 lg:typography-EB74 leading-12 lg:leading-16 uppercase sm:w-1/2">
          our students are already sharing
        </h2>
      </FadeUpAnimator>
      {/* Desktop */}
      <section className="hidden lg:grid lg:grid-cols-2 lg:gap-x-4">
        <article className="hidden lg:block">
          <video className="h-[70vh]" controls muted loop>
            <source src="../../assets/videos/media-1.mp4" type="video/mp4" />
          </video>
        </article>
        <article className="grid grid-cols-2 gap-x-4">
          <div className="space-y-4 -mt-20">
            <video className="h-[55vh]" controls height="1000" muted loop>
              <source src="../../assets/videos/media-1.mp4" type="video/mp4" />
            </video>
            <h4 className="typography-S34 leading-8">
              Never before <br />
              Freedom to choose
            </h4>
          </div>
          <video className="h-[45vh] mt-6" controls muted loop>
            <source src="../../assets/videos/media-2.mp4" type="video/mp4" />
          </video>
          <p className="typography-R14 text-lev-red-dark leading-5 col-span-2">
            Real stories. Real journeys. Real change. From classrooms to
            airports, our students are living the Levntura experience—studying
            abroad, working in new cultures, and growing beyond borders. Each
            story is a glimpse into what it means to take the leap, explore the
            world, and come back transformed.
          </p>
          <Button asChild className="self-end justify-self-start">
            <Link href={Routes.blogs}>See More →</Link>
          </Button>
        </article>
      </section>
      {/* mobile */}

      <Carousel
        className="w-full overflow-hidden lg:hidden"
        // plugins={[Autoplay({ delay: 2000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1">
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto w-100">
            <video className="h-[70vh]" controls muted loop>
              <source src="../../assets/videos/media-1.mp4" type="video/mp4" />
            </video>
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto w-100">
            <video className="h-[70vh]" controls muted loop>
              <source src="../../assets/videos/media-1.mp4" type="video/mp4" />
            </video>
          </CarouselItem>
          <CarouselItem className="pl-1 md:basis-auto lg:basis-auto w-100">
            <video className="h-[45vh] mt-6" controls muted loop>
              <source src="../../assets/videos/media-2.mp4" type="video/mp4" />
            </video>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <article className="space-y-4 lg:hidden">
        <FadeUpAnimator transition={{ delay: 0.3 }}>
          <h4 className="typography-R24 leading-6">
            Never before <br />
            Freedom to choose
          </h4>
        </FadeUpAnimator>
        <FadeUpAnimator transition={{ delay: 0.4 }}>
          <p className="typography-R14 leading-4 col-span-2 max-w-xl">
            Real stories. Real journeys. Real change. From classrooms to
            airports, our students are living the Levntura experience—studying
            abroad, working in new cultures, and growing beyond borders. Each
            story is a glimpse into what it means to take the leap, explore the
            world, and come back transformed.
          </p>
        </FadeUpAnimator>
        <FadeUpAnimator transition={{ delay: 0.5 }}>
          <Button asChild className="self-end justify-self-start">
          <Link href={Routes.blogs}>See More →</Link>
        </Button>
        </FadeUpAnimator>
      </article>
    </SectionWrapper>
  );
}
