import Image from "next/image";
import img1 from "@/assets/photos/about-more.png";
import { SectionWrapper } from "../(home)/section-wrapper";
import { CenetLogoSvg } from "@/assets/logos/cenet-logo-svg";
import { IenaLogoSvg } from "@/assets/logos/iena-logo-svg";
import { RoyalAcademyLogoSvg } from "@/assets/logos/royal-academy-logo-svg";
import { UnitedStudiesLogoSvg } from "@/assets/logos/united-studies-logo-svg";
import { WiseLogoSvg } from "@/assets/logos/wise-logo-svg";
import { Button } from "@/design-system/button";
import { StartNowBtn } from "@/atoms/start-now-btn";

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
      <article className="space-y-16 mb-12 w-full mx-auto flex flex-col items-center justify-center">
        <h2 className="typography-R24 text-lev-red-dark md:typography-R34 leading-8 lg:leading-12! w-5/6">
          From exchange programs to a vibrant community, we democratize global
          opportunities. Levntura isn’t just an organization; it’s a movement
          toward enriching global cultures through every journey.
        </h2>

        <h1 className="text-4xl text-lev-red-dark sm:text-6xl font-extrabold lg:typography-EB74 leading-10 lg:leading-16 sm:leading-13 w-5/6 uppercase">
          <span className="text-lev-orange">
            Levntura began with a <br />
            belief
          </span>{" "}
          in cultural exchange’s transformative power.
        </h1>
      </article>
      <article className="flex relative min-w-[1000px] h-[100px] overflow-hidden items-center  text-lev-red-dark mb-[64px] gap-4">
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
      <article className="flex flex-col md:flex-row-reverse container-md">
        <div className="shrink-0">
          <Image src={img1} alt="img1" />
        </div>
        <div className="space-y-8">
          <p className="w-2/3 text-lev-red-dark typography-R14 leading-relaxed">
            From exchange programs to a global movement, Levntura was founded on
            the belief that cultural exchange has the power to transform lives.
            What started as a small initiative in the Middle East has grown into
            a regional hub for international education and youth empowerment. We
            believe that every cultural experience is a catalyst for
            growth—shaping global citizens who think differently, lead
            confidently, and value diversity.
          </p>

          <StartNowBtn />
        </div>
      </article>
    </SectionWrapper>
  );
}
