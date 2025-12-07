import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionTitle } from "../(home)/section-title";

interface RelatedProgram {
  id: string;
  title: string;
  image: StaticImageData | string;
  href: string;
}

interface RelatedProgramsProps {
  programs: RelatedProgram[];
}

export function RelatedPrograms({ programs }: RelatedProgramsProps) {
  return (
    <div className="bg-lev-green-dark py-16 lg:py-24">
      <div className="container">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <SectionTitle className="text-white mb-12 text-center">
            RELATED PROGRAMS
          </SectionTitle>
        </FadeUpAnimator>

        <div className="flex items-center justify-between mb-12">
          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <span className="typography-R18 text-white">Programs</span>
          </FadeUpAnimator>
          <div className="flex-1 h-[1px] bg-white/30 mx-6" />
          <FadeUpAnimator transition={{ delay: 0.3 }}>
            <Link
              href="/programs"
              className="flex items-center gap-2 typography-R18 text-white hover:text-lev-green-light transition-colors"
            >
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </FadeUpAnimator>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <FadeUpAnimator
              key={program.id}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link href={program.href}>
                <div className="relative h-[300px] lg:h-[350px] overflow-hidden rounded-sm group cursor-pointer">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="typography-EB24 uppercase text-white">
                      {program.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </FadeUpAnimator>
          ))}
        </div>
      </div>
    </div>
  );
}

