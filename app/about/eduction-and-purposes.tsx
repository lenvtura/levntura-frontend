import React from "react";
import { SectionWrapper } from "../(home)/section-wrapper";
import { Button } from "@/design-system/button";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export function EductionAndPurposes() {
  return (
    <SectionWrapper className="grid lg:grid-cols-2 gap-y-8">
      <article className="flex flex-col items-start gap-y-4">
        <h2 className="typography-S34 leading-9 text-lev-red-dark">
          HIGHER EDUCATION <br />
          GREATER IMPACT
        </h2>

        <p className="w- text-lev-red-dark typography-R16 opacity-50 leading-4 lg:w-1/2 mt-6">
          At Levntura, we cultivate the next generation of global achievers
          through immersive, life-changing educational journeys.Our tailor-made
          programs go beyond studying abroad—they shape leaders who think
          globally, act compassionately, and create change wherever they go.With
          Levntura, every student gains access to the world’s classrooms,
          industries, and cultures—unlocking a future without limits.
        </p>

        <Button className="border-1">
          <Link href={Routes.programs}>PROGRAMS</Link>
        </Button>
      </article>
      <article className="grid sm:grid-cols-2 gap-y-16">
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">1.5K</h2>

            <h6 className="typography-M16 text-lev-red-dark">UNIVERSITIES</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            Our global partnerships connect students to 1.5K prestigious
            universities and institutions, opening doors to academic excellence
            and professional growth.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">6.5K</h2>

            <h6 className="typography-M16 text-lev-red-dark">STUDENTS</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            A thriving community of more than 6.5K ambitious youth who turned
            opportunities into success stories and lifelong global networks.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">20+</h2>

            <h6 className="typography-M16 text-lev-red-dark">COUNTRIES</h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            From the historic charm of Europe to the innovation hubs of North
            America and the cultural richness of Asia—our reach spans across
            continents.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-x-8">
            <h2 className="typography-S34 text-lev-orange">8+</h2>

            <h6 className="typography-M16 text-lev-red-dark">
              YEARS OF IMPACT
            </h6>
          </div>

          <p className="typography-R14 leading-4 text-lev-red-dark w-4/5">
            With over a decade of experience, Levntura continues to empower
            Middle Eastern youth through trusted, transformative exchange
            programs worldwide.
          </p>
        </div>
      </article>
    </SectionWrapper>
  );
}
