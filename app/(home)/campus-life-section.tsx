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
                University life isn’t just about lectures and exams—it’s where
                you grow, explore, and discover who you truly are. At Levntura,
                we open doors for students to experience global campuses that
                blend learning with adventure. Meet new people, share ideas, and
                live moments that shape your future. From late-night study
                sessions to weekend cultural trips, every experience becomes a
                story you’ll carry forever.
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
