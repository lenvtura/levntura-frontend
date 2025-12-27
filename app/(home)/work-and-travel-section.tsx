import { Routes } from "@/constants/routes";

import womanStudyPhoto from "@/assets/photos/woman-study.png";
import manStudyPhoto from "@/assets/photos/man-study.png";
import Image from "next/image";
import { cn } from "@/design-system/helpers";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { SectionWrapper } from "./section-wrapper";
import { SectionTitle } from "./section-title";
import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

const Cards = [
  {
    label: "Work & Travel",
    src: womanStudyPhoto,
    bgColor: "bg-lev-blue-light",
    textColor: "text-lev-blue-light",
  },
  {
    label: "Camp Counselor",
    src: manStudyPhoto,
    bgColor: "bg-lev-orange",
    textColor: "text-lev-orange",
  },
];

export function WorkAndTravelSection() {
  return (
    <SectionWrapper
      className="flex flex-col text-white gap-4"
      sectionColor="bg-lev-blue-dark"
    >
      <div className="flex gap-8 flex-col md:flex-row">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle className="text-white shrink-1">
            work & <br /> travel
          </SectionTitle>
        </FadeUpAnimator>

        <FadeUpAnimator
          transition={{ delay: 0.3 }}
          className=" md:max-w-[40%] typography-R14 mb-8 md:mb-0 leading-5 flex-1"
        >
          <p>
            Spend your summer living, working, and exploring the United States.
            The Work & Travel Program offers students the chance to experience
            American culture, build independence, and create memories that last
            a lifetime. Affordable, exciting, and empowering—you’ll earn, learn,
            and travel across the States while discovering new friendships and a
            new version of yourself.
          </p>
        </FadeUpAnimator>
      </div>

      <div className="flex gap-4 flex-wrap items-start">
        <FadeUpAnimator transition={{ delay: 0.4 }}>
          <ButtonWithArrow href={Routes.programs}>
            Explore all programs
          </ButtonWithArrow>
        </FadeUpAnimator>
        <div className="flex md:ml-auto  max-md:flex-col gap-6">
          {Cards.map((card, index) => (
            <FadeUpAnimator
              key={card.label}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="max-w-[500px] group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  className="w-full group-hover:scale-110 transition-transform duration-300 object-cover"
                  src={card.src}
                  alt=""
                />
                <p
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typography-R48 w-full text-center",
                    card.textColor
                  )}
                >
                  {card.label}
                </p>
              </div>
              <div
                className={cn(
                  "flex justify-between gap-4 items-center flex-wrap px-4 py-8 typography-R24",
                  card.bgColor
                )}
              >
                <span>{card.label}</span>
                <StartNowBtn className="border-white" />
              </div>
            </FadeUpAnimator>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
