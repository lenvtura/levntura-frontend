import { Routes } from "@/constants/routes";

import { CenetLogoSvg } from "@/assets/logos/cenet-logo-svg";
import { IenaLogoSvg } from "@/assets/logos/iena-logo-svg";
import { RoyalAcademyLogoSvg } from "@/assets/logos/royal-academy-logo-svg";
import { UnitedStudiesLogoSvg } from "@/assets/logos/united-studies-logo-svg";
import { WiseLogoSvg } from "@/assets/logos/wise-logo-svg";

import { SectionWrapper } from "./section-wrapper";
import { SectionTitle } from "./section-title";
import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

const Logos = [
  CenetLogoSvg,
  IenaLogoSvg,
  RoyalAcademyLogoSvg,
  UnitedStudiesLogoSvg,
  WiseLogoSvg,
];

export function WhoWeAreSection() {
  return (
    <SectionWrapper>
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <SectionTitle className="mb-[64px]">Who We Are</SectionTitle>
      </FadeUpAnimator>
      <div className="overflow-hidden mb-[64px]">
        <FadeUpAnimator
          transition={{ delay: 0.2 }}
          className="flex relative min-w-[1000px] h-[100px] overflow-hidden items-center  text-gray-500 gap-4"
        >
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
        </FadeUpAnimator>
      </div>
      <div className="flex max-md:grid grid-cols-1 gap-[32px] text-lev-blue-dark">
        <FadeUpAnimator transition={{ delay: 0.3 }}>
          <ButtonWithArrow
            href={Routes.about}
            iconClassName="border-lev-blue-dark"
          >
            About us
          </ButtonWithArrow>
        </FadeUpAnimator>

        <FadeUpAnimator transition={{ delay: 0.4 }}>
          <p>
            Levntura was founded on the belief that learning should go beyond
            classrooms—it should be an adventure that shapes minds and futures,
            we empower Middle Eastern youth to explore new cultures, dream
            bigger, and grow through meaningful travel and learning experiences,
            Our mission is simple: to inspire transformation through experience
            and prepare students not just for success—but for life.
          </p>
        </FadeUpAnimator>
        <FadeUpAnimator transition={{ delay: 0.5 }}>
          <p>
            Headquartered in Amman, Jordan, with a regional office in Cairo,
            Egypt, Levntura has become one of the leading youth mobility
            platforms in the Middle East. We collaborate with internationally
            recognized educational and cultural organizations to deliver
            high-quality exchange and internship opportunities worldwide. Our
            programs span across North America, Europe, Australia, and soon Asia
            and South Africa—empowering students to experience a blend of
            personal growth and professional development through global
            exposure.
          </p>
        </FadeUpAnimator>
      </div>
    </SectionWrapper>
  );
}
