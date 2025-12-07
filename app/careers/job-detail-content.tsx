import { Button } from "@/design-system/button";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import Link from "next/link";
import { CountryFlag } from "./country-flag";
import { CheckIcon, CircleSmallIcon } from "lucide-react";
import { Separator } from "@/design-system/separator";
import studentsImage from "@/assets/photos/students.png";
import Image from "next/image";
import { ShareCard } from "./share-card";

interface JobDetailContentProps {
  type: string;
  title: string;
  category: string;
  dates: string;
  country: string;
  countryCode: "USA" | "UK";
  description: string;
  requirements: string[];
  benefits: string[];
  applyHref: string;
}

export function JobDetailContent({
  type,
  title,
  category,
  dates,
  country,
  countryCode,
  description,
  requirements,
  benefits,
  applyHref,
}: JobDetailContentProps) {
  return (
    <div className="bg-white relative">
      <div className="max-h-[300px] overflow-hidden">
        <Image src={studentsImage} alt={title} className="object-cover" />
      </div>
      {/* Badge at top left */}
      <div className=" p-8 lg:p-12 ">
        <FadeUpAnimator className="mb-4 flex justify-between  items-center gap-2">
          <span className="typography-R14 uppercase rounded text-lev-orange ">
            {type}
          </span>
          <div className="flex items-center gap-2">
            <span className="typography-R12 uppercase text-lev-black">
              {country}
            </span>
            <CountryFlag countryCode={countryCode} />
          </div>
        </FadeUpAnimator>

        <div>
          {/* Large title */}
          <FadeUpAnimator>
            <h1 className="typography-EB34 lg:typography-EB48 uppercase text-lev-red-dark max-w-xs mb-4 leading-tight">
              {title}
            </h1>
          </FadeUpAnimator>

          {/* Category */}
          <FadeUpAnimator>
            <p className="typography-R16 text-lev-gray mb-4 lowercase">
              {category}
            </p>
          </FadeUpAnimator>

          {/* Dates and Country */}
          <FadeUpAnimator>
            <div className="flex items-center gap-4 mb-6">
              <p className="typography-R14 text-lev-gray">{dates}</p>
            </div>
          </FadeUpAnimator>
        </div>

        {/* Description */}
        <FadeUpAnimator>
          <p className="text-lev-black leading-relaxed mb-6">{description}</p>
        </FadeUpAnimator>

        {/* Salary */}
        <FadeUpAnimator>
          <p className="text-lev-red-dark leading-relaxed mb-12 typography-R24">
            6595$/m
          </p>
        </FadeUpAnimator>

        {/* Requirements */}
        <FadeUpAnimator>
          <h2 className="typography-S24 text-lev-black mb-4">Requirements</h2>
          <ul className="space-y-2 mb-8">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                <CircleSmallIcon
                  fill="currentColor"
                  className="size-2 text-lev-black"
                />
                <span className="text-lev-red-dark leading-relaxed text-sm">
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </FadeUpAnimator>

        {/* Benefits */}
        <FadeUpAnimator>
          <h2 className="typography-S24 text-lev-black mb-4">Benefits</h2>
          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckIcon className="size-3 stroke-3 text-lev-black" />
                <span className="text-lev-black leading-relaxed text-sm">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </FadeUpAnimator>

        <Separator className="my-8" />

        {/* Apply Button */}
        <FadeUpAnimator>
          <Button
            asChild
            className="border-lev-black text-lev-black hover:bg-lev-black hover:text-white px-6 py-3"
          >
            <Link href={applyHref}>APPLY</Link>
          </Button>
        </FadeUpAnimator>
      </div>
    </div>
  );
}
