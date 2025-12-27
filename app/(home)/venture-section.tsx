import type { ComponentProps } from "react";
import Image from "next/image";
import { cn } from "@/design-system/helpers";

import studentPhoto from "@/assets/photos/students.png";
import happyYoungManPhoto from "@/assets/photos/happy-young-man.png";
import { SectionWrapper } from "./section-wrapper";
import { SectionTitle } from "./section-title";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

const FirstRowParagraph = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p className={cn("", className)} {...props}>
      Explore dynamic programs that combine travel, learning, and cultural
      discovery—crafted to expand your horizons and challenge your potential.
    </p>
  );
};

export function VentureSection() {
  return (
    <SectionWrapper>
      <FadeUpAnimator className="grid md:grid-cols-2 mb-28 justify-between gap-8">
        <div className="row-start-1 md:sticky md:top-[100px] md:self-start">
          <span className="uppercase  text-lev-orange typography-R20 inline-block md:mb-8">
            venture
          </span>
          <FirstRowParagraph className="max-md:hidden" />
        </div>

        <div>
          <SectionTitle className=" md:col-start-2 self-end">
            EMBARK ON YOUR BOUNDLESS NEW ADVENTURE
          </SectionTitle>
        </div>

        <FirstRowParagraph className="md:hidden" />
      </FadeUpAnimator>

      <FadeUpAnimator className="flex flex-col-reverse md:flex-row mb-28 justify-between gap-8">
        <div className="max-md:h-[364px] ">
          <Image
            src={studentPhoto}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:flex-2/3">
          <span className="uppercase bg-lev-yellow px-2 py-1 typography-R14 rounded-full inline-block mb-4">
            Explore
          </span>
          <h5 className="typography-B34 leading-[1.1] mb-4">
            Adventure Awaits <br />
            with Global <br />
            Internships
          </h5>
          <p>
            Take your first step into the world of professional growth.
            Levntura’s Global Internship Programs connect students with
            international companies and organizations that value ambition,
            creativity, and fresh perspectives.
          </p>
        </div>
      </FadeUpAnimator>

      <FadeUpAnimator className="flex flex-col md:flex-row justify-between gap-8 ">
        <div className="lg:flex-2/3">
          <span className="uppercase bg-lev-yellow px-2 py-1 typography-R14 rounded-full inline-block mb-4">
            Empower
          </span>
          <h5 className="typography-B34 leading-[1.1] mb-4">
            Expert Guidance to Unlock Your Potential
          </h5>
          <p>
            Our expert counsellors are here to guide your path—from choosing the
            right program to building your confidence abroad. With personal
            mentorship and continuous support, we help you navigate challenges,
            seize opportunities, and shape a journey that reflects your goals.
          </p>
        </div>

        <div className="max-md:h-[364px] max-md:row-start-1">
          <Image
            src={happyYoungManPhoto}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </FadeUpAnimator>
    </SectionWrapper>
  );
}
