import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

import { Routes } from "@/constants/routes";
import { Button } from "@/design-system/button";

import womanStudyPhoto from "@/assets/photos/woman-study.png";
import manStudyPhoto from "@/assets/photos/man-study.png";
import Image from "next/image";
import { cn } from "@/design-system/helpers";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { SectionWrapper } from "./section-wrapper";
import { SectionTitle } from "./section-title";

const Cards = [
  {
    label: "Work & Travel",
    src: womanStudyPhoto,
    color: "bg-lev-blue-light",
  },
  { label: "Study & Travel", src: manStudyPhoto, color: "bg-lev-orange" },
];

export function WorkAndTravelSection() {
  return (
    <SectionWrapper
      className="flex flex-col text-white gap-[32px]"
      sectionColor="bg-lev-blue-dark"
    >
      <SectionTitle className="text-white">work & travel</SectionTitle>

      <p className="">
        Experience the vibrant tapestry of global cultures by choosing from our
        diverse selection of 20 countries. Whether you&apos;re drawn to the
        historic charm of Europe, the bustling energy of Asia, or the scenic
        beauty of the Americas, our program provides a passport to unforgettable
        experiences.
      </p>
      <Link
        href={Routes.programs}
        className=" max-md:-mt-2 inline-flex typography-R18 items-center gap-4 "
      >
        <span className="whitespace-nowrap">All Programs</span>
        <Button className="border-white" size="icon-md">
          <MoveRightIcon />
        </Button>
      </Link>
      <div className="flex md:ml-auto  max-md:flex-col gap-6">
        {Cards.map((card) => (
          <div className="max-w-[500px]" key={card.label}>
            <Image
              width={500}
              height={500}
              className="w-full object-cover"
              src={card.src}
              alt=""
            />
            <div
              className={cn(
                "flex justify-between gap-4 items-center flex-wrap px-4 py-8 typography-R24",
                card.color
              )}
            >
              <span>{card.label}</span>
              <StartNowBtn className="border-white" />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
