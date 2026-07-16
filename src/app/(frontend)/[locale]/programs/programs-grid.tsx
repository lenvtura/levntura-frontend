"use client";

import { useTranslations } from "next-intl";

import { ProgramCard } from "./program-card";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import type { Program } from "@/lib/types";

interface ProgramsGridProps {
  programs: Program[];
  locale: "en" | "ar";
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  const t = useTranslations("programs");

  if (programs.length === 0) {
    return (
      <div className="container py-12">
        <p className="text-center text-lev-gray typography-M18">
          {t("emptyState")}
        </p>
      </div>
    );
  }

  return (
    <section className="container-md pb-12 lg:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
        {programs.map((program, index) => (
          <FadeUpAnimator
            key={program.id}
            transition={{ delay: 0.1 * (index % 6) }}
            className="h-full"
          >
            <ProgramCard
              image={
                typeof program.featuredImage === "object" && program.featuredImage?.url
                  ? program.featuredImage.url
                  : null
              }
              title={program.title}
              country={program.country === "US" ? "USA" : program.country === "UK" ? "UK" : program.country}
              countryCode={program.country}
              duration={program.duration || ""}
              description={program.shortDescription || ""}
              href={`/programs/${program.slug}`}
            />
          </FadeUpAnimator>
        ))}
      </div>
    </section>
  );
}
