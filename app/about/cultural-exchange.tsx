import Image from "next/image";
import img1 from "@/assets/photos/about-more.png";
import { SectionWrapper } from "../(home)/section-wrapper";
import { CenetLogoSvg } from "@/assets/logos/cenet-logo-svg";
import { IenaLogoSvg } from "@/assets/logos/iena-logo-svg";
import { RoyalAcademyLogoSvg } from "@/assets/logos/royal-academy-logo-svg";
import { UnitedStudiesLogoSvg } from "@/assets/logos/united-studies-logo-svg";
import { WiseLogoSvg } from "@/assets/logos/wise-logo-svg";
import { Button } from "@/design-system/button";

const Logos = [
  CenetLogoSvg,
  IenaLogoSvg,
  RoyalAcademyLogoSvg,
  UnitedStudiesLogoSvg,
  WiseLogoSvg,
];

export default function CulturalExchange() {
  return (
    <SectionWrapper sectionColor="bg-lev-yellow-light" className="space-y-8">
      <article className="space-y-8">
        <h2 className="typography-R24 md:typography-R34 leading-11 w-5/6">
          From exchange programs to a vibrant community, we democratize global
          opportunities. Levntura isn’t just an organization; it’s a movement
          toward enriching global cultures through every journey.
        </h2>

        <h1 className="text-4xl sm:text-6xl font-extrabold lg:typography-EB74 leading-10 lg:leading-16 sm:leading-13 w-5/6 uppercase">
          <span className="text-lev-orange">
            Levntura began with a <br />
            belief
          </span>{" "}
          in cultural exchange’s transformative power.
        </h1>
      </article>
      <article className="flex relative min-w-[1000px] h-[100px] overflow-hidden items-center  text-gray-500 mb-[64px] gap-4">
        {Logos.map((Logo, i) => (
          <div
            key={i}
            style={{
              animationDelay: `calc(30s / ${Logos.length} * (${
                Logos.length
              } - ${i + 1}) * -1)`,
              animationName: "scrollLeft",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationDuration: "30s",
              left: `max(calc(50px * ${Logo.length}), 100%)`,
            }}
            className="absolute w-[120px] left-full"
          >
            {<Logo />}
          </div>
        ))}
      </article>
      <article className="flex flex-col md:flex-row-reverse">
        <div className="shrink-0">
          <Image src={img1} alt="img1" />
        </div>
        <div className="space-y-8">
          <p className="w-2/3">
            Levntura’s origin story is one of inspiration and vision. Founded on
            the belief in the transformative power of cultural exchange,
            Levntura emerged from humble beginnings. From participating in
            exchange programs to fostering a vibrant community of explorers, our
            journey began. Driven by a mission to democratize global
            opportunities, Levntura became more than an organization—it became a
            movement. Each step forward reflects our commitment to enriching
            global cultures, one journey at a time.
          </p>

          <Button className="">Start Now!</Button>
        </div>
      </article>
    </SectionWrapper>
  );
}
