import { SectionWrapper } from "../(home)/section-wrapper";
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
              src="https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_internship.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=eGT37Q4nwT1x5KWkw2bLxUUAbVE%3D&Expires=1772910176"
              width={300}
              height={300}
              alt="img1"
              className="w-full h-full hover:scale-110 transition-transform duration-300"
            />

            <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
              Internship
            </h3>
          </div>

          <div className="relative w-70 h-90 overflow-hidden">
            <Image
              src="https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_camp.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=oGWaV5rbDZhRtNcJRpUKMt%2B5oWQ%3D&Expires=1772910128"
              alt="img2"
              width={300}
              height={300}
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
          <div className="relative hover:translate-x-[-100px] transition-transform duration-300 w-70 h-90 overflow-hidden">
            <Image
              src={"https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_study.jpeg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=WIsI9V2ww14cRxJ%2FmBopAKXJYgE%3D&Expires=1772909930"}
              width={300}
              height={300}
              alt="img3"
              className="w-full h-full hover:scale-110 transition-transform duration-300"
            />

            <h3 className="absolute bottom-3 left-3 typography-M24 text-white">
              Study & Travel
            </h3>
          </div>

          <div className="relative w-70 h-90 overflow-hidden">
            <Image
              src="https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_work-and-travel.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=KmR8kIt0p0kMu%2FG78L9RknHO8XE%3D&Expires=1772910220"
              alt="img4"
              width={300}
              height={300}
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
