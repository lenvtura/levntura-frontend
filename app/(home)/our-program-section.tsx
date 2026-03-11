"use client";

import { Routes } from "@/constants/routes";

import studyImage from "@/assets/photos/study.png";
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
  {
    label: "Summer Work & Travel",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_work-and-travel_24LYy63.jpg",
  },
  {
    label: "Camp Counselor",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_camp_kBDwgKc.jpg",
  },
  {
    label: "Internship & Trainee",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_internship_6JEKEIn.jpg",
  },
  { label: "Study Abroad", src: studyImage },
  {
    label: "Language Programs",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_language_xMMqzY7.jpg",
  },
  {
    label: "Summer Camp",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_summer-camp_2hf7glA.jpg",
  },
  {
    label: "Volunteering Programs",
    src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_volunteering_V6OdEt3.jpg",
  },
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
              className="  shrink-0 relative w-[325px] overflow-hidden h-full"
            >
              <Image
                alt=""
                width={300}
                height={300}
                src={item.src}
                className="object-cover group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
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
