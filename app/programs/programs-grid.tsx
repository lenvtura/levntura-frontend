import { ProgramCard } from "./program-card";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import type { Program } from "./programs-data";

interface ProgramsGridProps {
  programs: Program[];
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  if (programs.length === 0) {
    return (
      <div className="container py-12">
        <p className="text-center text-lev-gray typography-M18">
          No programs found matching your criteria.
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
              image={program.image}
              title={program.title}
              country={program.country}
              countryCode={program.countryCode}
              duration={program.duration}
              description={program.description}
              href={program.href}
            />
          </FadeUpAnimator>
        ))}
      </div>
    </section>
  );
}
