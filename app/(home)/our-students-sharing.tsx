import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import { SectionWrapper } from "./section-wrapper";
import { Button } from "@/design-system/button";
// import ved1 from '@/assets/videos';

export function OurStudentsSharing() {
  return (
    <SectionWrapper className="min-h-screen space-y-4">
      <h2 className="typography-EB48 lg:typography-EB74 leading-12 lg:leading-16 uppercase sm:w-1/2">
        our students are already sharing
      </h2>
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
            <h4 className="typography-R24 leading-6">
              Never before <br />
              Freedom to choose
            </h4>
          </div>
          <video className="h-[45vh] mt-6" controls muted loop>
            <source src="../../assets/videos/media-2.mp4" type="video/mp4" />
          </video>
          <p className="typography-R14 leading-4 col-span-2">
            Unlock your potential with Levntura’s seasoned counselors. Dive into
            a world where expert advice meets personalized support, guiding you
            towards your educational and career aspirations. Let’s chart your
            journey to success together.
          </p>
          <Button className="self-end justify-self-start">See more</Button>
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
        <h4 className="typography-R24 leading-6">
          Never before <br />
          Freedom to choose
        </h4>
        <p className="typography-R14 leading-4 col-span-2 max-w-xl">
          Unlock your potential with Levntura’s seasoned counselors. Dive into a
          world where expert advice meets personalized support, guiding you
          towards your educational and career aspirations. Let’s chart your
          journey to success together.
        </p>
        <Button className="self-end justify-self-start">See more</Button>
      </article>
    </SectionWrapper>
  );
}
