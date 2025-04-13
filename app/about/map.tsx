import Image from "next/image";
import { SectionWrapper } from "../(home)/section-wrapper";
import mapImg from "@/assets/photos/Group 6210.png";

export default function Map() {
  return (
    <SectionWrapper
      sectionColor="bg-lev-yellow-light"
      className="relative lg:h-screen space-y-4"
    >
      <div className="flex flex-col lg:flex-row gap-y-8 items-start justify-between">
        <h4 className="text-lev-orange typography-S20 uppercase">vission</h4>

        <h1 className="typography-B74 uppercase text-lev-red-dark leading-16">
          Our sights <br /> are set on <br /> big goals
        </h1>
      </div>

      <article className="lg:absolute end-0 bottom-30 w-100">
        <p className="typography-R16 leading-4">
          From poverty alleviation among youth to supporting affordable
          education worldwide.
        </p>
        <br />
        <p className="typography-R16 leading-4">
          We are committed to increasing awareness of international education
          privileges and providing development opportunities to 25,000
          futuristic students and young adults in the next 5 years. We will
          achieve this by fostering intercultural understanding with our
          partners, extending our branches to other continents and negotiating
          better opportunities for the youth.
        </p>
      </article>

      <div className="lg:absolute inset-0">
        <Image src={mapImg} alt="map" />
      </div>

      <div className="lg:absolute left-0 bottom-0 w-100 space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="typography-EB74 text-lev-orange">20+</h1>

          <h6 className="typography-B16">COUNTRIES</h6>
        </div>

        <p className="typography-R16 leading-4">
          Whether you&apos;re drawn to the historic charm of Europe, the
          bustling energy of Asia, or the scenic beauty of the Americas, our
          program provides a passport to unforgettable experiences.
        </p>
      </div>
    </SectionWrapper>
  );
}
