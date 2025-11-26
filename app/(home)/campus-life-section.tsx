import Image from "next/image";
import { SectionTitle } from "./section-title";
import { SectionWrapper } from "./section-wrapper";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

import studentAtCollege from "@/assets/photos/student-at-college.png";

export function CampusLifeSection() {
  return (
    <div>
      <SectionWrapper sectionColor="bg-lev-yellow">
        <div className="grid md:grid-cols-[1fr_3fr]">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <span className="uppercase typography-M18 max-md:mb-10">
              Campus life
            </span>
          </FadeUpAnimator>
          <div>
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <SectionTitle className="mb-8">
                UNIVERSITY IS THE BEST TIME OF YOUR LIFE
              </SectionTitle>
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <p className="max-w-[80ch]">
                Experience the vibrant tapestry of global cultures by choosing
                from our diverse selection of 20 countries. Whether you&apos;re
                drawn to the historic charm of Europe, the bustling energy of
                Asia, or the scenic beauty of the Americas, our program provides a
                passport to unforgettable experiences.
              </p>
            </FadeUpAnimator>
          </div>
        </div>
      </SectionWrapper>
      <FadeUpAnimator
        transition={{ delay: 0.4 }}
        className="max-md:h-[350px] h-[650]"
      >
        <Image
          alt=""
          src={studentAtCollege}
          className="object-cover w-full h-full"
        />
      </FadeUpAnimator>
    </div>
  );
}
