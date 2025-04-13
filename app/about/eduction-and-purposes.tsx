import React from "react";
import { SectionWrapper } from "../(home)/section-wrapper";
import { Button } from "@/design-system/button";

export function EductionAndPurposes() {
  return (
    <SectionWrapper className="grid lg:grid-cols-2 gap-y-8">
      <article className="flex flex-col items-start gap-y-4">
        <h2 className="typography-S34 leading-9 text-lev-red-dark">
          HIGHER EDUCATION <br />
          HIGHER PURPOSES
        </h2>

        <p className="w- text-lev-red-dark typography-R16 opacity-50 leading-4 lg:w-1/2 mt-6">
          Cultivate the next generation of global leaders through immersive
          international experiences. Our tailor-made programs are designed not
          just to traverse borders, but to transcend them—offering you the keys
          to a realm where your potential knows no bounds. With Levntura, embark
          on a voyage that enriches, enlightens, and empowers.
        </p>

        <Button className="border-1">PROGRAMS</Button>
      </article>
      <article className="grid sm:grid-cols-2 gap-y-16">
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">1.5K</h2>

            <h6 className="typography-M16 text-lev-red-dark">UNIVIRSITIES</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            With partnerships spanning across 1.5K prestigious universities, our
            program opens doors to unparalleled academic and professional
            networks.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">6.5K</h2>

            <h6 className="typography-M16 text-lev-red-dark">STUDENTS</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            Join our thriving community of 6.5K ambitious students who have
            seized the opportunity to elevate their skills.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">20+</h2>

            <h6 className="typography-M16 text-lev-red-dark">COUNTRIES</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            Whether you&apos;re drawn to the historic charm of Europe, the
            bustling energy of Asia, or the scenic beauty of the Americas, our
            program provides a passport to unforgettable experiences.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">14+</h2>

            <h6 className="typography-M16 text-lev-red-dark">COUNTRIES</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            Whether you&apos;re drawn to the historic charm of Europe, the
            bustling energy of Asia, or the scenic beauty of the Americas, our
            program provides a passport to unforgettable experiences.
          </p>
        </div>
      </article>
    </SectionWrapper>
  );
}
