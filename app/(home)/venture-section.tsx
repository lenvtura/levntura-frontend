import type { ComponentProps } from "react";
import Image from "next/image";
import { cn } from "@/design-system/helpers";

import studentPhoto from "@/assets/photos/students.png";
import happyYoungManPhoto from "@/assets/photos/happy-young-man.png";
import { SectionWrapper } from "./section-wrapper";
import { SectionTitle } from "./section-title";

const FirstRowParagraph = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p className={cn("", className)} {...props}>
      Explore University&apos;s 10+ courses across variouGs specialisations that
      provoke intellectual and intuitive learning among students.
    </p>
  );
};

export function VentureSection() {
  return (
    <SectionWrapper>
      <div className="grid md:grid-cols-2 mb-28 justify-between gap-8">
        <div className="row-start-1">
          <span className="uppercase  text-lev-orange typography-R20 inline-block md:mb-8">
            venture
          </span>
          <FirstRowParagraph className="max-md:hidden" />
        </div>

        <SectionTitle className=" md:col-start-2 self-end">
          Embark on Your Boundless new Adventure
        </SectionTitle>

        <FirstRowParagraph className="md:hidden" />
      </div>

      <div className="grid md:grid-cols-2 mb-28 justify-between gap-8">
        <div className="max-md:h-[364px]">
          <Image
            src={studentPhoto}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="uppercase bg-lev-yellow px-2 py-1 typography-R14 rounded-full inline-block mb-4">
            Explore
          </span>
          <h5 className="typography-B34 leading-[1.1] mb-4">
            Adventure Awaits <br />
            with Global <br />
            Internships
          </h5>
          <p>
            Dive into Levntura’s Global Internships, where career development
            meets adventure. Propel your professional journey in dynamic,
            international settings, enhancing your skills amidst diverse
            cultures. Ready to transform ambition into global action? Let’s
            embark together.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 justify-between gap-8">
        <div>
          <span className="uppercase bg-lev-yellow px-2 py-1 typography-R14 rounded-full inline-block mb-4">
            Empower
          </span>
          <h5 className="typography-B34 leading-[1.1] mb-4">
            Expert Guidance to Unlock Your Potential
          </h5>
          <p>
            Unlock your potential with Levntura’s seasoned counselors. Dive into
            a world where expert advice meets personalized support, guiding you
            towards your educational and career aspirations. Let’s chart your
            journey to success together.
          </p>
        </div>

        <div className="max-md:h-[364px] max-md:row-start-1">
          <Image
            src={happyYoungManPhoto}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
