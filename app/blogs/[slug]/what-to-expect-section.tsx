import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import counselorImage from "@/assets/photos/counselor.png";

export function WhatToExpectSection() {
  return (
    <section id="what-to-expect" className="scroll-mt-24 mb-16 lg:mb-24">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 capitalize text-lev-black mb-6">
          what can you expect from our programs?
        </h2>
      </FadeUpAnimator>

      <p className="mb-8 text-lev-black leading-relaxed">
        Our programs are designed with your growth and safety in mind:
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="mb-6">
          <h3 className="typography-M24 mb-4 text-lev-black">
            Structured Placements
          </h3>
          <p className="mb-4 text-lev-black leading-relaxed">
            We place you in vetted work positions suited to your academic
            background and career aspirations.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="typography-M24 mb-4 text-lev-black">Accommodation</h3>
          <p className="mb-4 text-lev-black leading-relaxed">
            Safe, comfortable housing is arranged for all participants, along
            with logistical support throughout your stay.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="typography-M24 mb-4 text-lev-black">
            Cultural Activities
          </h3>
          <p className="mb-4 text-lev-black leading-relaxed">
            Participate in guided tours, cooking classes, and local festivals to
            enrich your understanding of the region.
          </p>
        </div>
      </div>

      <FadeUpAnimator transition={{ delay: 0.2 }} className="mb-8">
        <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-sm">
          <Image
            src={counselorImage}
            alt="what to expect"
            fill
            className="object-cover"
          />
        </div>
      </FadeUpAnimator>
    </section>
  );
}

