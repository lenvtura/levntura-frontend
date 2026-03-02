import { Routes } from "@/constants/routes";
import Image from "next/image";

import heroImage from "@/assets/photos/1.png";
// import heroVideo from "@/assets/videos/demo.mp4";

import { HEADER_HEIGHT } from "@/constants/header-height";
import { OurProgramSection } from "./our-program-section";
import { WhoWeAreSection } from "./who-we-are-section";
import { WorkAndTravelSection } from "./work-and-travel-section";
import { VentureSection } from "./venture-section";
import { CampusLifeSection } from "./campus-life-section";
import { SocialMediaSection } from "./social-media-section";
import { AreYouReadySection } from "./are-you-ready-section";
import { MoreToRead } from "./more-to-read";
import { PublicationAndMedia } from "./publication-and-media";
import { OurStudentsSharing } from "./our-students-sharing";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { SocialShareIcons } from "@/atoms/social-share-icons";
import { TravelImgSection } from "./travel-img-section";
import { PART_HEIGHT_APPEAR_IN_NEXT_SECTION } from "./constant";

const Opportunities = [
  "Study & Travel",
  "Work & Travel",
  "Internship",
  "Counselor",
];

const HERO_HEADLINE = "Explore with Levntura!";
const HERO_SUBHEADLINE = "Where Learning Meets Adventure";
const HERO_CTA = "Start Your Global Experience";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div
        style={{
          height: `calc(100dvh + ${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px)`,
        }}
        className="absolute top-0 -z-1 inset-x-0 h-full w-full"
      >
        {/* <video src={heroVideo}  /> */}
        <Image
          alt=""
          src={heroImage}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <div
        style={{
          height: `calc(100dvh + ${
            PART_HEIGHT_APPEAR_IN_NEXT_SECTION - HEADER_HEIGHT
          }px)`,
        }}
        className=" text-white"
      >
        <div
          style={{ height: `calc(100dvh - ${HEADER_HEIGHT}px)` }}
          className="  flex-col flex"
        >
          <div className="mt-auto py-8 container-md w-full">
            <div className="flex max-lg:flex-col-reverse max-lg:items-start gap-8 justify-between items-end mb-8">
              <FadeUpAnimator transition={{ delay: 0.2 }}>
                <h1 className="uppercase typography-EB74 max-sm:typography-EB48 text-white">
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "2px white" }}
                  >
                    {HERO_HEADLINE}
                  </span>
                  <br /> {HERO_SUBHEADLINE}
                </h1>
              </FadeUpAnimator>
              <FadeUpAnimator
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4"
              >
                {Opportunities.map((opp) => (
                  <span key={opp}>{opp}</span>
                ))}
              </FadeUpAnimator>
            </div>

            <FadeUpAnimator
              transition={{ delay: 0.5 }}
              className="h-[2px] w-[90%] bg-amber-50 bg-blend-overlay mix-blend-overlay"
            />

            <div className="flex justify-between mt-4">
              <FadeUpAnimator
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between"
              >
                <ButtonWithArrow
                  href={Routes.contact}
                  iconClassName="border-white"
                >
                  {HERO_CTA} →
                </ButtonWithArrow>
              </FadeUpAnimator>

              <FadeUpAnimator
                transition={{ delay: 0.7 }}
                className="flex gap-2"
              >
                <SocialShareIcons size="sm" variant="white-border" />
              </FadeUpAnimator>
            </div>
          </div>
          <div className="h-[64px] inset-x-0 bottom-0 w-[50%] max-md:w-[90%] bg-white " />
        </div>
      </div>

      <TravelImgSection />

      <OurProgramSection />

      <WhoWeAreSection />

      <WorkAndTravelSection />

      <VentureSection />

      <MoreToRead />

      <PublicationAndMedia />

      <CampusLifeSection />

      <OurStudentsSharing />

      <SocialMediaSection />

      {/* <FreshNewsSection /> */}

      <AreYouReadySection />
    </div>
  );
}
