import Image from "next/image";
import { SectionTitle } from "../(home)/section-title";
import { SectionWrapper } from "../(home)/section-wrapper";
import london from "@/assets/photos/london.png";

export function ProgramsHero() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div className="bg-lev-green-dark" />
        <div className="relative min-h-[200px] md:min-h-[400px] lg:min-h-full">
          <Image
            src={london}
            alt="Big Ben Clock Tower"
            fill
            className="object-cover object-top size-full"
            priority
          />
        </div>
      </div>
      <SectionWrapper className="relative grid grid-cols-1 lg:grid-cols-2 z-10">
        {/* Left Side - Content */}
        <div className="flex items-center py-12 md:py-16 lg:py-24">
          <div className="max-w-xl space-y-6 md:space-y-8">
            <SectionTitle className="text-white">
              OUR <br /> PROGRAMS
            </SectionTitle>
            <p className="typography-R16 text-white/60 leading-relaxed">
              Explore dynamic programs that combine travel, learning, and
              cultural discovery—crafted to expand your horizons and challenge
              your potential.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
