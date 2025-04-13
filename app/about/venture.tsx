import { SectionWrapper } from "../(home)/section-wrapper";
import img1 from "@/assets/photos/a-v-1.png";
import img2 from "@/assets/photos/a-v-2.png";
import img3 from "@/assets/photos/a-v-3.png";
import img4 from "@/assets/photos/a-v-4.png";
import Image from "next/image";

export function Venture() {
  return (
    <SectionWrapper
      className="space-y-4 lg:space-y-8"
      sectionColor="bg-lev-yellow-light"
    >
      <div className="lg:flex items-start justify-between space-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold lg:typography-B74 sm:leading-16 uppercase text-lev-blue-dark">
            Designed
            <br />
            for Global
            <br />
            AdventureS
          </h1>

          <h4 className="typography-M20 text-lev-orange">Venture</h4>
        </div>

        <div className="sm:flex gap-x-4 space-y-4">
          <div className="relative w-70 h-90 overflow-hidden">
            <Image
              src={img1}
              alt="img1"
              className="w-full h-full hover:scale-110 transition-transform duration-300"
            />

            <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
              Internship
            </h3>
          </div>

          <div className="relative w-70 h-90 overflow-hidden">
            <Image
              src={img2}
              alt="img2"
              className="w-full h-full hover:scale-110 transition-transform duration-300"
            />

            <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
              Counselor
            </h3>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-x-4 justify-end space-y-4">
        <section className="sm:flex gap-x-4 space-y-4">
          <div className="relative w-70 h-90 overflow-hidden">
            <Image
              src={img3}
              alt="img3"
              className="w-full h-full hover:scale-110 transition-transform duration-300"
            />

            <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
              Study & Travel
            </h3>
          </div>

          <div className="relative w-70 h-90 overflow-hidden">
            <Image
              src={img4}
              alt="img4"
              className="w-full h-full hover:scale-110 transition-transform duration-300"
            />

            <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
              Work & Travel
            </h3>
          </div>
        </section>
        <div className="flex flex-col gap-y-8">
          <p className="typography-R16 leading-4 w-80">
            Explore Our Curated Programs Designed for Global Adventurers. From
            the sun-kissed beaches during our Summer Work & Travel to the
            enriching experience of being a Camp Counselor, each program is a
            step towards discovering your potential and igniting your future.
          </p>

          <p className="typography-R16 leading-4 w-80">
            Explore Our Curated Programs Designed for Global Adventurers. From
            the sun-kissed beaches during our Summer Work & Travel to the
            enriching experience of being a Camp Counselor, each program is a
            step towards discovering your potential and igniting your future.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
