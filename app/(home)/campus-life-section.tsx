import Image from "next/image";
import { SectionTitle } from "./section-title";
import { SectionWrapper } from "./section-wrapper";

import studentAtCollege from "@/assets/photos/student-at-college.png";

export function CampusLifeSection() {
  return (
    <div>
      <SectionWrapper sectionColor="bg-lev-yellow">
        <div className="grid md:grid-cols-[1fr_3fr]">
          <span className="uppercase typography-M18 max-md:mb-10">
            Campus life
          </span>
          <div>
            <SectionTitle className="mb-8">
              UNIVERSITY IS THE BEST TIME OF YOUR LIFE
            </SectionTitle>
            <p className="max-w-[80ch]">
              Experience the vibrant tapestry of global cultures by choosing
              from our diverse selection of 20 countries. Whether you&apos;re
              drawn to the historic charm of Europe, the bustling energy of
              Asia, or the scenic beauty of the Americas, our program provides a
              passport to unforgettable experiences.
            </p>
          </div>
        </div>
      </SectionWrapper>
      <div className="max-md:h-[350px] h-[650]">
        <Image
          alt=""
          src={studentAtCollege}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
