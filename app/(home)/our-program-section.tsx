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
  { label: "Summer Work & Travel", src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_work-and-travel.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=Qma16OAk4Fej%2FGr3oy%2FlIOwaCZo%3D&Expires=1772908770" },
  { label: "Camp Counselor", src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_camp.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=kCp%2FHwNB3ZHn26oX2eGfDCbBqEU%3D&Expires=1772908878" },
  { label: "Internship & Trainee", src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-program_internship.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=nM0sYN2tPguWb5%2BEL0Zv8Xt0fho%3D&Expires=1772908924" },
  { label: "Study Abroad", src: studyImage },
  { label: "Language Programs", src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_language.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=rFOWtLtcsKXA8Zskna0LmKCfjes%3D&Expires=1772909197" },
  { label: "Summer Camp", src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_summer-camp.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=%2B5Z4dm0Gx1pgDZELLKEgP1vYHFo%3D&Expires=1772908989" },
  { label: "Volunteering Programs", src: "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_volunteering.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=27ej%2BTx%2B%2BQvsN4uMUU8BJN7w93Y%3D&Expires=1772909545" },
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
