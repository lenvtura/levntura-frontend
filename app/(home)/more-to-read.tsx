import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "./section-wrapper";
import img1 from "@/assets/photos/home/k-1.png";
import img2 from "@/assets/photos/home/k2.png";
import img3 from "@/assets/photos/home/k3.png";
import { Button } from "@/design-system/button";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Routes } from "@/constants/routes";

export function MoreToRead() {
  return (
    <SectionWrapper
      sectionColor="bg-lev-yellow-light"
      className="flex flex-col gap-12"
    >
      <article className="grid lg:grid-cols-[2fr_1fr]">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <h2 className="hidden lg:block typography-EB74 leading-16 text-lev-blue-dark">
            MORE TO READ, <br /> BETTER TO KNOW.
          </h2>
        </FadeUpAnimator>
        <div className="flex flex-col gap-8">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h4 className="text-lev-orange typography-S20">KNOWLEDGE</h4>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h2 className="lg:hidden typography-EB48 md:typography-EB74">
              MORE TO READ, BETTER TO KNOW.
            </h2>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <p className="typography-R16 leading-6 sm:w-3/4">
              Expand your mind through stories that celebrate discovery,
              learning, and culture. Every journey teaches something new—here’s
              where we share the lessons that shaped our path and inspired
              thousands of youth to see the world differently
            </p>
          </FadeUpAnimator>
        </div>
      </article>
      <article className="grid sm:grid-cols-3 sm:mt-32 gap-8 ">
        <FadeUpAnimator
          transition={{ delay: 0.3 }}
          className="space-y-6 sm:-translate-y-[100px]"
        >
          <Image
            className="hover:scale-105 w-full transition-transform duration-300"
            src={img1}
            alt=""
          />

          <h2 className="typography-M24 lg:typography-M34">
            The Power of Cultural Immersion
          </h2>
        </FadeUpAnimator>

        <FadeUpAnimator transition={{ delay: 0.4 }} className="space-y-6">
          <Image
            className="hover:scale-105 w-full transition-transform duration-300"
            src={img2}
            alt=""
          />

          <h2 className="typography-M24 lg:typography-M34">
            Transformative Travel Experiences
          </h2>
        </FadeUpAnimator>

        <FadeUpAnimator
          transition={{ delay: 0.5 }}
          className="space-y-6 sm:-translate-y-[100px]"
        >
          <Image
            className="hover:scale-105 w-full transition-transform duration-300"
            src={img3}
            alt=""
          />

          <h2 className="typography-M24 lg:typography-M34">
            Unveiling Cultural Exchange
          </h2>
        </FadeUpAnimator>
      </article>
      <Button asChild className="self-center">
        <Link href={Routes.blogs}>Blogs</Link>
      </Button>
    </SectionWrapper>
  );
}
