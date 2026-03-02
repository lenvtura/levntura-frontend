"use client";

import { Routes } from "@/constants/routes";

import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";
import counselorImage from "@/assets/photos/counselor.png";
import { SectionTitle } from "./section-title";
import { Slider } from "../programs/work-and-travel/jobs-slider";
import Image from "next/image";
import { ButtonWithArrow } from "@/atoms/button-with-arrow";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

const ProgramTypes = [
  "Summer Work & Travel",
  "Camp Counselor",
  "Internship & Trainee Programs",
  "Study Abroad",
  "Language Programs",
  "Summer Camp",
  "Volunteering Programs",
];

const programs = [
  { label: "Summer Work & Travel", src: workImage },
  { label: "Camp Counselor", src: counselorImage },
  { label: "Internship & Trainee", src: internshipImage },
  { label: "Study Abroad", src: studyImage },
];

export function OurProgramSection() {
  return (
    <div className=" py-[100px] bg-[#D8E6E6]">
      <div className="container">
        <div className="flex max-md:flex-col-reverse relative mb-12 gap-4">
          <FadeUpAnimator
            transition={{ delay: 0.2 }}
            className="flex max-md:mt-4 max-md:grid grid-cols-2 mr-4 flex-col gap-4"
          >
            {ProgramTypes.map((programType) => (
              <span className="whitespace-nowrap" key={programType}>
                {programType}
              </span>
            ))}
          </FadeUpAnimator>

          <div className="w-full items-start justify-between">
            <FadeUpAnimator transition={{ delay: 0.4 }}>
              <ButtonWithArrow
                className="float-right max-md:-mt-2 flex ml-auto  top-0 right-0 typography-R18  items-center gap-4"
                href={Routes.programs}
                iconClassName="border-lev-green-dark"
              >
                Explore Our Programs →
              </ButtonWithArrow>
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <SectionTitle className="text-lev-green-dark">
                Our Programs
              </SectionTitle>
            </FadeUpAnimator>
          </div>
        </div>
      </div>

      <Slider
        data={programs}
        renderItem={(item) => {
          return (
            <div
              key={item.label}
              className="  shrink-0  relative w-[400px] overflow-hidden h-full"
            >
              <Image
                alt=""
                src={item.src}
                className="object-contain group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
              />
              <div className="absolute typography-R34 left-[16px] bottom-[16px] text-white">
                {item.label}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
