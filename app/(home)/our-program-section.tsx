import { Routes } from "@/constants/routes";
import { Button } from "@/design-system/button";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";
import counselorImage from "@/assets/photos/counselor.png";
import { SectionTitle } from "./section-title";
import { Slider } from "../programs/work-and-travel/jobs-slider";
import Image from "next/image";

const Opportunities = [
  "Study & Travel",
  "Work & Travel",
  "Internship",
  "Counselor",
];

const programs = [
  { label: "Study & Travel", src: studyImage },
  { label: "Work & Travel", src: workImage },
  { label: "Internship", src: internshipImage },
  { label: "Counselor", src: counselorImage },
];

export function OurProgramSection() {
  return (
    <div className=" py-[100px] bg-[#D8E6E6]">
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
              Our program
            </SectionTitle>
          </div>
        </div>
      </div>

      <Slider
        data={programs}
        renderItem={(item) => {
          return (
            <div
              key={item.label}
              className="  shrink-0  relative w-[480px] overflow-hidden h-full"
            >
              <Image
                alt=""
                src={item.src}
                className="object-contain group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
              />
              <div className="absolute typography-B34 left-[16px] bottom-[16px] text-white">
                {item.label}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
