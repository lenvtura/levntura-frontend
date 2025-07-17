"use client";

import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

import { Routes } from "@/constants/routes";
import { Button } from "@/design-system/button";
import Image from "next/image";
import { useScroll } from "motion/react";

import heroImage from "@/assets/photos/1.png";
// import heroVideo from "@/assets/videos/demo.mp4";

import { SocialMedia } from "@/atoms/social-media";
import { HEADER_HEIGHT } from "@/constants/header-height";
import { useRef } from "react";
import { OurProgramSection } from "./our-program-section";
import { WhoWeAreSection } from "./who-we-are-section";
import { WorkAndTravelSection } from "./work-and-travel-section";
import { VentureSection } from "./venture-section";
import { CampusLifeSection } from "./campus-life-section";
import { SocialMediaSection } from "./social-media-section";
import { AreYouReadySection } from "./are-you-ready-section";
import { TravelsImgsDsk } from "./travels-imgs-dsk";
import { TravelsImgsMobile } from "./travels-imgs-mobile";
import { MoreToRead } from "./more-to-read";
import { PublicationAndMedia } from "./publication-and-media";
import { OurStudentsSharing } from "./our-students-sharing";

const Opportunities = [
  "Study & Travel",
  "Work & Travel",
  "Internship",
  "Counselor",
];

const PART_HEIGHT_APPEAR_IN_NEXT_SECTION = 200;

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // const translateXa = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 50,
  //   restDelta: 0.001,
  // });

  // const photoContainerRef = useRef<HTMLDivElement>(null);
  // const [photoContainerWidth, setPhotoContainerWidth] = useState(0);
  // useEffect(() => {
  //   setPhotoContainerWidth(photoContainerRef.current?.clientWidth);
  // }, [photoContainerRef.current?.clientWidth]);

  // const [windowWidth, setWindowWidth] = useState(0);
  // useEffect(() => {
  //   setWindowWidth(window.document.body.clientWidth);
  // }, []);

  // const translateX = useTransform(
  //   translateXa,
  //   [0, 1],
  //   [`${windowWidth / 2}px`, "0px"],
  //   {
  //     ease: easeIn,
  //   }
  // );
  // const [trX, setTrX] = useState(0);

  // useEffect(() => {
  //   translateX.on("change", (value) => {
  //     console.log({ value });
  //     setTrX(Number(value));
  //   });
  // }, [translateX]);
  // console.log({
  //   mi: photoContainerWidth - +translateX.get(),
  //   translateX: trX,
  //   photoContainerWidth,
  // });

  return (
    <div>
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
          <div className="mt-auto py-8 container">
            <div className="flex max-lg:flex-col-reverse max-lg:items-start gap-8 justify-between items-end mb-8">
              <h1 className="uppercase typography-EB74 max-sm:typography-EB48 text-white">
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "2px white" }}
                >
                  Converting <br /> studies
                </span>
                <br /> into adventures
              </h1>
              <div className="flex flex-col gap-4">
                {Opportunities.map((opp) => (
                  <span key={opp}>{opp}</span>
                ))}
              </div>
            </div>

            <div className="h-[2px] w-[90%] bg-amber-50 bg-blend-overlay mix-blend-overlay" />

            <div className="flex justify-between mt-4">
              <div className="flex items-center justify-between">
                <Link
                  href={Routes.contact}
                  className="flex typography-R18 max-sm:hidden items-center gap-4 "
                >
                  <span>Start the journy</span>
                  <Button className="border-white" size="icon-md">
                    <MoveRightIcon />
                  </Button>
                </Link>
              </div>

              <div className="flex gap-2">
                <SocialMedia />
              </div>
            </div>
          </div>
          <div className="h-[64px] inset-x-0 bottom-0 w-[50%] max-md:w-[90%] bg-white " />
        </div>
      </div>

      {/*  */}
      <div ref={containerRef} className=" relative py-8 bg-gray-100">
        <div
          style={{
            marginTop: `-${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px`,
            height: `${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px`,
          }}
          className="absolute inset-x-0 top-0 w-[50%] max-md:w-[90%] -z-[1] bg-white "
        />

        <div className=" w-full max-md:flex flex-col grid grid-cols-2">
          <div
            style={{ marginTop: `-${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px` }}
            className="bg-white p-8"
          >
            <div className="max-w-[615px] md:h-[700px] max-md:min-h-[500px] ml-auto">
              <h4 className="typography-EB34 uppercase leading-[1.3]  mb-12">
                We change lives <br /> throughout leadership <br /> development.
                Where are <br /> you going next?
              </h4>
              <p className="text-lev-black/50">
                Levntura has rapidly become a beacon for those seeking to expand
                their horizons through educational services and cultural
                exchange programs. With a mission to empower the next generation
                of global leaders, we offer experiences that challenge,
                enlighten, and open doors to limitless opportunities
              </p>
            </div>
            <TravelsImgsMobile scrollYProgress={scrollYProgress} />
          </div>

          <div className=" max-w-[625px] flex justify-end p-8 max-md:pl-8 pl-[90px]">
            <p className="text-lev-black ">
              From our headquarters in Amman Jordan, to our office in Egypt, we
              have been providing the aspiring Middle Eastern Youth with
              exceptional cultural exchange, study abroad and Professional
              training opportunities in North America, Europe and Australia.
              What we offer is far more superior to opportunities; We change
              lives throughout leadership development, our contributions to
              language acquisition, and most significantly, igniting the spirit
              of adventure and ambition in the Youngsters.
            </p>
          </div>
        </div>

        <TravelsImgsDsk scrollYProgress={scrollYProgress} />
      </div>

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
