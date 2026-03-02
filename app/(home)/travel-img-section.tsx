"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { PART_HEIGHT_APPEAR_IN_NEXT_SECTION } from "./constant";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { TravelsImgsMobile } from "./travels-imgs-mobile";
import { TravelsImgsDsk } from "./travels-imgs-dsk";

export function TravelImgSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className=" relative py-8 bg-white">
      <div
        style={{
          marginTop: `-${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px`,
          height: `${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px`,
        }}
        className="absolute inset-x-0 top-0 w-[50%] max-md:w-[90%] -z-[1] bg-white "
      />

      <div className="container-md max-md:flex flex-col grid grid-cols-2">
        <div
          style={{ marginTop: `-${PART_HEIGHT_APPEAR_IN_NEXT_SECTION}px` }}
          className=" bg-white ab"
        >
          <div className="max-w-[615px] md:h-[700px] max-md:min-h-[500px] ml-auto">
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <h4 className="typography-EB34 uppercase leading-[1.3]  mb-12">
                Empowering Youth to Lead, <br /> Learn, and Explore <br /> the
                World
              </h4>
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <p className="text-lev-black/50">
                Levntura isn’t just about travel or study—it’s about
                transformation. We help young minds step beyond their comfort
                zones, discover their potential, and develop leadership skills
                that last a lifetime. Through immersive cultural exchange and
                global learning programs, we shape the next generation of
                confident, capable, and connected leaders.
              </p>
            </FadeUpAnimator>
          </div>
          <TravelsImgsMobile scrollYProgress={scrollYProgress} />
        </div>

        <div className=" max-w-[625px] flex justify-end p-8 max-md:pl-8 pl-[90px]">
          <FadeUpAnimator transition={{ delay: 0.5 }}>
            <p className="text-lev-black ">
              From our headquarters in Amman, Jordan, to our regional office in
              Cairo, Egypt, Levntura bridges Middle Eastern youth with
              international opportunities across North America, Europe, and
              Australia. Our mission goes beyond education—it’s about sparking
              ambition, encouraging curiosity, and nurturing growth. We believe
              every student deserves a chance to experience the world, build
              resilience, and return home ready to make a difference.
            </p>
          </FadeUpAnimator>
        </div>
      </div>

      <TravelsImgsDsk scrollYProgress={scrollYProgress} />
    </div>
  );
}
