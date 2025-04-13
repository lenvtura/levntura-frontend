import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import happyFriendship from "@/assets/photos/happy-friendship.png";
import { cn } from "@/design-system/helpers";
import { SectionTitle } from "./section-title";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { MoveRightIcon } from "lucide-react";
import { Button } from "@/design-system/button";
import { FaceboocBoxLogoSvg } from "@/assets/logos/facebooc-box-logo-svg";

const SocialMediaStats = [
  {
    number: "6.5K",
    numberColor: "text-lev-blue-light",
    category: "Students",
    paragraph:
      "Join our thriving community of 6.5K ambitious students who have seized the opportunity to elevate their skills",
  },
  {
    number: "1.5K",
    numberColor: "text-lev-yellow",
    category: "Universities",
    paragraph:
      "With partnerships spanning across 1.5K prestigious universities, our program opens doors to unparalleled academic and professional networks.",
  },
  {
    number: "20+",
    numberColor: "text-lev-green-light",
    category: "Countries",
    paragraph:
      "Whether you're drawn to the historic charm of Europe, the bustling energy of Asia, or the scenic beauty of the Americas, our program provides a passport to unforgettable experiences.",
  },
];

export function SocialMediaSection() {
  return (
    <div>
      <SectionWrapper>
        <div className="grid md:grid-cols-3 items-start justify-center gap-6  mb-16">
          {SocialMediaStats.map((stat) => (
            // <div
            //   className="relative pr-6 max-md:after:mb-6 max-md:after:bottom-0  after:mr-6 last:after:relative after:top-1/2 after:-translate-y-[50%] after:absolute after:bg-lev-blue-dark after:right-0 after:inset-y-0 after:w-[2px] after:h-[96px]  last:border-0 last:pr-0 border-lev-blue-dark"
            //   key={stat.number}
            // >
            <div
              className="relative pr-6 border-r-2 last:border-0 last:pr-0 border-lev-blue-dark"
              key={stat.number}
            >
              <div className="flex mb-4 gap-6 items-center">
                <span className={cn("typography-EB74", stat.numberColor)}>
                  {stat.number}
                </span>
                <span className="typography-M16">{stat.category}</span>
              </div>
              <p className="text-lev-blue-dark">{stat.paragraph}</p>
            </div>
          ))}
        </div>
        <div className="relative flex flex-col justify-center p-8 max-md:h-max h-[650]">
          <div className="z-20 flex flex-col gap-6 justify-center items-start h-full relative text-white">
            <div className="flex gap-4 flex-wrap">
              <div className="shrink-0 ">
                <FaceboocBoxLogoSvg />
              </div>
              <p className="max-w-[350px] bg-blend-overlay mix-blend-overlay opacity-70">
                Join the USA Work and Travel Program and make this summer the
                one you’ll always remember. Embrace the thrill, enhance your
                skills, and create memories that will last a lifetime.
              </p>
            </div>
            <SectionTitle className="text-white inline-block">
              JOIN OUR <br /> COMMUNITY
            </SectionTitle>
            <Link
              href={Routes.contact}
              className="  inline-flex typography-R18 items-center gap-4 "
            >
              <span className="whitespace-nowrap">Join Now</span>
              <Button className="border-white" size="icon-md">
                <MoveRightIcon />
              </Button>
            </Link>
          </div>
          <Image
            alt=""
            src={happyFriendship}
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-y-0 min-w-3/5 bg-gradient-to-r from-black to-[rgba(0,0,0,0)] left-0" />
        </div>
      </SectionWrapper>
    </div>
  );
}
