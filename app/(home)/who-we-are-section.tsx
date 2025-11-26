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
            Incepted in the vibrant city of Amman, Jordan, Levntura has rapidly
            expanded, solidifying its presence across the Middle-Eastern
            corridor. Our network spans from our headquarters in Jordan to our
            office in Egypt, collaborating closely with globally renowned
            institutions and organizations. We are a powerhouse fostering the
            spirit of adventure, leadership development, and language
            acquisition, driving a change that resonates at a global scale.
          </p>
        </FadeUpAnimator>
        <FadeUpAnimator transition={{ delay: 0.5 }}>
          <p>
            From our headquarters in Amman Jordan, to our office in Egypt, we
            have been providing the aspiring Middle Eastern Youth with
            exceptional cultural exchange, study abroad and Professional
            training opportunities in North America, Europe and Australia. What
            we offer is far more superior to opportunities; We change lives
            throughout leadership development, our contributions to language
            acquisition, and most significantly, igniting the spirit of
            adventure and ambition in the Youngsters.{" "}
          </p>
        </FadeUpAnimator>
      </div>
    </SectionWrapper>
  );
}
