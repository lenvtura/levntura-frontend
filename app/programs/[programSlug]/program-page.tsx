"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionTitle } from "@/app/(home)/section-title";
import { SectionWrapper } from "@/app/(home)/section-wrapper";
import { Slider } from "@/app/programs/work-and-travel/jobs-slider";
import { BenefitsShowcase } from "@/app/programs/work-and-travel/benefits-showcase";
import TourImages from "@/app/about/tour-images";
import { TitleWithBreaks } from "@/app/programs/work-and-travel/title-with-breaks";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { ContactForm } from "@/app/contact/contact-form";

import firstPhoto from "@/assets/photos/3.png";
import secondPhoto from "@/assets/photos/4.png";
import thirdPhoto from "@/assets/photos/5.png";
import fourthPhoto from "@/assets/photos/6.png";

import type { ProgramPageConfig } from "./program-config";

export function ProgramPage({ config }: { config: ProgramPageConfig }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);

  return (
    <div className="bg-[#F7F7F8]">
      <div
        ref={heroRef}
        className="flex relative bg-gradient-to-b from-lev-gray-light to-transparent justify-center items-center min-h-screen overflow-hidden"
      >
        {/* <motion.div
          style={{ y: imageY }}
          className="min-w-[2000px] w-full absolute z-100 -bottom-[300px] left-1/2 -translate-x-1/2"
        > */}
        <Image
          fill
          src={config.hero.image}
          className="w-full pointer-events-none object-cover"
          alt=""
        />
        <StartNowBtn className="z-10 text-white cursor-pointer border-white absolute top-[350px] left-[50%] translate-x-[-50%]" />
        {/* </motion.div> */}
        <motion.div
          // style={{ y: textY }}
          className="flex flex-col text-white uppercase z-10 gap-4 items-center -translate-y-[200px]"
        >
          <span className="typography-B18">{config.hero.tag}</span>
          <h1 className="typography-EB48! mix-blend-difference! sm:typography-EB74! text-[90px]">
            {config.hero.title}
          </h1>
          <p className="typography-S18 mix-blend-difference">
            {config.hero.subtitle}
          </p>
          <p className="typography-S18">{config.hero.note}</p>
        </motion.div>
      </div>

      <SectionWrapper className="mb-[64px]">
        <p className="typography-S16 text-center text-lev-blue-light mb-4">
          {config.intro.eyebrow}
        </p>
        <p className="typography-S34 leading-9 text-center text-lev-blue-dark">
          {config.intro.body}
        </p>
      </SectionWrapper>

      <SectionWrapper className="container-md">
        <FadeUpAnimator>
          <SectionTitle className="mb-[80px]">
            {config.whatIs.title}
          </SectionTitle>
        </FadeUpAnimator>
        <FadeUpAnimator className="flex">
          <p className="ms-auto text-lev-red-dark w-[300px]">
            {config.whatIs.body}
          </p>
        </FadeUpAnimator>
      </SectionWrapper>

      <SectionWrapper className="flex justify-center items-center">
        <Image src={config.photo2} alt="" />
      </SectionWrapper>

      <SectionWrapper className="container-md">
        <FadeUpAnimator>
          <span className="typography-R18 text-lev-blue mb-8 inline-block">
            {config.pictureYourself.eyebrow}
          </span>
          <SectionTitle className="mb-[40px] sm:mb-0">
            Picture <br /> yourself
          </SectionTitle>
        </FadeUpAnimator>
        <FadeUpAnimator className="flex lg:-translate-y-[50px]">
          <p className="ms-auto text-lev-red-dark w-[300px]">
            {config.pictureYourself.body}
          </p>
        </FadeUpAnimator>
      </SectionWrapper>

      <SectionWrapper className="flex justify-center items-center mb-[200px]">
        <div className="relative max-w-[85%] rounded-full overflow-hidden">
          <Image className="w-full h-full" src={config.photo3} alt="" />
          <div className="absolute hidden lg:flex text-center flex-col gap-6 p-8 justify-center aspect-square shrink-0 items-center end-8 h-[80%] top-1/2 -translate-y-1/2 bg-lev-yellow rounded-full">
            <p className="uppercase text-lev-red-dark typography-EB24">
              {config.pictureYourself.circleHeading}
            </p>
            <p>{config.pictureYourself.circleBody}</p>
          </div>
        </div>
      </SectionWrapper>

      <div className="mb-[180px]">
        <SectionWrapper className="container-md">
          <FadeUpAnimator>
            <SectionTitle className="mb-[100px] text-[120px]">
              Why You <br /> Should <br /> Participate?
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex">
            <p className="ms-auto text-lev-red-dark w-[300px]">
              {config.whyParticipate.body}
            </p>
          </FadeUpAnimator>
        </SectionWrapper>
        <div>
          <Slider
            data={config.whyParticipate.benefits}
            renderItem={(benefit) => (
              <div>
                <div className="relative h-[400px] sm:h-[670px] w-[300px] sm:w-[480px] flex flex-col gap-7">
                  <Image
                    width={500}
                    height={500}
                    className="absolute object-cover pointer-events-none w-full h-full inset-0"
                    src={benefit.src}
                    alt=""
                  />
                  <TitleWithBreaks
                    title={benefit.title}
                    className="typography-EB34 sm:typography-EB48 text-white absolute bottom-10 left-10 uppercase"
                  />
                </div>
                <p className="typography-R16 text-gray-500 w-[300px] sm:w-[480px] mt-4 leading-6">
                  {benefit.description}
                </p>
              </div>
            )}
          />
        </div>
      </div>

      <div className="mb-[150px]">
        <SectionWrapper className="container-md">
          <FadeUpAnimator>
            <SectionTitle className="mb-[40px]">
              What you will <br /> be doing
            </SectionTitle>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex">
            <p className="ms-auto text-lev-red-dark w-[300px]">
              {config.jobs.body}
            </p>
          </FadeUpAnimator>
        </SectionWrapper>

        <div>
          <Slider
            data={config.jobs.items}
            renderItem={(job) => (
              <div className="flex size-[300px] lg:size-[450px] justify-center bg-white p-10 flex-col gap-7">
                <div className="size-[200px] self-center shrink-0 lg:size-[300px] aspect-square overflow-hidden rounded-full">
                  <Image
                    src={job.image}
                    className="object-cover w-full h-full pointer-events-none"
                    width={300}
                    height={300}
                    alt={job.title}
                  />
                </div>
                <h4 className="typography-EB34 min-h-[200px lg:typography-EB48 text-lev-red-dark">
                  {job.title}
                </h4>
              </div>
            )}
          />
        </div>
      </div>

      <div className="mb-[100px] sm:mb-0">
        <SectionWrapper>
          <FadeUpAnimator>
            <p className="mb-12 text-lev-red-dark w-[300px]">
              {config.destinations.leadText}
            </p>
          </FadeUpAnimator>
          <FadeUpAnimator className="flex">
            <SectionTitle className="ms-auto text-end">
              CHOOSE YOUR <br /> NEXT ADVENTURE
            </SectionTitle>
          </FadeUpAnimator>
        </SectionWrapper>
        <Slider
          data={config.destinations.items}
          renderItem={(destination) => (
            <div className="flex flex-col gap-4 w-[400px]">
              <div className="relative shrink-0 overflow-hidden rounded-full h-[300px] aspect-square grid gap-7">
                <Image
                  fill
                  className="pointer-events-none w-full object-cover"
                  src={destination.src}
                  alt=""
                />
              </div>
              <div className="self-center text-center">
                <TitleWithBreaks
                  title={destination.area}
                  className="typography-S24 leading-9! sm:typography-S34 uppercase"
                />
                <p className="typography-R18 leading-6">
                  {destination.country}
                </p>
              </div>
            </div>
          )}
        />
      </div>

      <SectionWrapper>
        <BenefitsShowcase
          title={config.benefitsShowcase.title}
          items={config.benefitsShowcase.items}
        />
      </SectionWrapper>

      <div className="flex h-[60vh] gap-8 flex-col">
        <SectionTitle className="ms-auto me-[40px] lg:me-[350px] uppercase mb-[80px] text-lev-red">
          Required
        </SectionTitle>
        <div className="mb-[120px]">
          <Slider
            data={config.requirements}
            renderItem={(requirement) => (
              <div className="relative grid bg-white w-[250px] h-full gap-7 p-6">
                <span className="mb-14 inline-block">{requirement.svg}</span>
                <TitleWithBreaks
                  title={requirement.title}
                  className="typography-S24 lg:typography-M24 self-end"
                />
                <p className="typography-R18 leading-6">
                  {requirement.description}
                </p>
              </div>
            )}
          />
        </div>
      </div>

      <SectionWrapper sectionColor="bg-[#F7F7F8]">
        <TourImages
          gradientProps={{ className: "from-[#F7F7F8]" }}
          title={config.memories.title}
        />
      </SectionWrapper>

      <SectionWrapper className="min-h-screen container-md mb-[100px]">
        <FadeUpAnimator>
          <SectionTitle className="mb-[90px]">
            Why Choose <br /> Levntura?
          </SectionTitle>
        </FadeUpAnimator>
        <div className="grid gap-y-[120px] gap-x-24 grid-cols-1 lg:grid-cols-2 gap-8">
          {config.features.map((f, index) => (
            <FadeUpAnimator
              transition={{ delay: index * 0.1 }}
              key={f.title}
              className="flex gap-4 lg:gap-10"
            >
              <span className="shrink-0 w-[80px]">{f.icon}</span>
              <div>
                <TitleWithBreaks
                  title={f.title}
                  className="text-lev-blue-dark leading-9 mb-[22px] typography-R34 text-[32px]"
                />
                <p className="typography-R18 leading-6 text-lev-red-dark max-w-[350px]">
                  {f.description}
                </p>
              </div>
            </FadeUpAnimator>
          ))}
        </div>
      </SectionWrapper>

      <div className="relative">
        <SectionWrapper>
          <div className="h-[500px] flex justify-between">
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <Image src={firstPhoto} alt="" />
            </FadeUpAnimator>
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <Image src={secondPhoto} alt="" />
            </FadeUpAnimator>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <FadeUpAnimator>
              <SectionTitle>
                Are You <br /> Ready to <br /> Change <br /> Your <br /> World?
              </SectionTitle>
            </FadeUpAnimator>

            <FadeUpAnimator transition={{ delay: 0.3 }}>
              <ContactForm />
            </FadeUpAnimator>
          </div>
        </SectionWrapper>
        <div className="flex gap-14">
          <FadeUpAnimator className="w-full">
            <Image src={fourthPhoto} alt="" />
          </FadeUpAnimator>
          <FadeUpAnimator className="w-full">
            <Image src={thirdPhoto} alt="" className="ml-auto mr-6" />
          </FadeUpAnimator>
        </div>
      </div>
    </div>
  );
}
