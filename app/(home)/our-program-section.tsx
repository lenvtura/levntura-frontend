import { Routes } from "@/constants/routes";
import { Button } from "@/design-system/button";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";

import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";
import counselorImage from "@/assets/photos/counselor.png";
import Image from "next/image";
import { SectionTitle } from "./section-title";

const Opportunities = [
  "Study & Travel",
  "Work & Travel",
  "Internship",
  "Counselor",
];

const Programs = [
  { label: "Study & Travel", src: studyImage },
  { label: "Work & Travel", src: workImage },
  { label: "Internship", src: internshipImage },
  { label: "Counselor", src: counselorImage },
];

export function OurProgramSection() {
  const ref = useRef(null);
  const constraintRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start end", "end center"],
  // });

  // const translateXa = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 50,
  //   restDelta: 0.001,
  // });

  // const translateX = useTransform(translateXa, [0, 1], ["50%", "0%"], {
  //   ease: easeIn,
  // });
  return (
    <div ref={ref} className=" py-[100px] bg-[#D8E6E6]">
      <div className="container">
        <div className="flex max-md:flex-col-reverse relative mb-12 gap-4">
          <div className="flex max-md:mt-4 max-md:grid grid-cols-2 mr-4 flex-col gap-4">
            {Opportunities.map((opp) => (
              <span className="whitespace-nowrap" key={opp}>
                {opp}
              </span>
            ))}
          </div>

          <div className="w-full items-start justify-between">
            <Link
              href={Routes.contact}
              className="float-right max-md:-mt-2 flex ml-auto  top-0 right-0 typography-R18  items-center gap-4 "
            >
              <span className="whitespace-nowrap">Start Now!</span>
              <Button className="border-lev-green-dark" size="icon-md">
                <MoveRightIcon />
              </Button>
            </Link>

            <SectionTitle className="text-lev-green-dark">
              Our Programs
            </SectionTitle>
          </div>
        </div>
      </div>

      <div className="container">
        <motion.div className="w-full overflow-hidden bg-red-300">
          <motion.div
            ref={constraintRef}
            dragConstraints={{ left: 20, right: 20 }}
            //   style={{ translateX }}
            drag={"x"}
            whileDrag={{ cursor: "grabbing" }}
            className="flex  gap-4 bg-amber-300/35  w-full"
          >
            {Programs.map((t) => (
              <div
                style={{ width: `${(1 / Programs.length) * 100}%` }}
                key={t.label}
                className="  shrink-0  relative  overflow-hidden h-full"
              >
                <Image
                  alt=""
                  src={t.src}
                  className="object-contain group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
                />
                <div className="absolute typography-B34 left-[16px] bottom-[16px] text-white">
                  {t.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
