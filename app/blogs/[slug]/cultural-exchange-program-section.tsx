import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import studyImage from "@/assets/photos/study.png";

interface BenefitItem {
  number: number;
  title: string;
  description: string;
  image: typeof studyImage;
  imageAlt: string;
}

const benefits: BenefitItem[] = [
  {
    number: 1,
    title: "Professional Experience",
    description:
      "Work in sectors like tourism, education, or non-profit organizations, gaining skills that employers value.",
    image: studyImage,
    imageAlt: "Professional Experience",
  },
  {
    number: 2,
    title: "Cultural Immersion",
    description:
      "Live like a local, learn Arabic phrases, and experience daily life in a completely new cultural setting.",
    image: studyImage,
    imageAlt: "Cultural Immersion",
  },
  {
    number: 3,
    title: "Network Building",
    description:
      "Connect with professionals and peers from around the world, creating international networks that last a lifetime.",
    image: studyImage,
    imageAlt: "Network Building",
  },
];

export function CulturalExchangeProgramSection() {
  return (
    <section
      id="cultural-exchange-program"
      className="scroll-mt-24 mb-16 lg:mb-24"
    >
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h2 className="typography-S34 capitalize text-lev-black mb-6">
          why choose a cultural exchange program in the arab world?
        </h2>
      </FadeUpAnimator>

      <p className="mb-8 text-gray-500 typography-R16 leading-snug">
        The Arab world, with its rich history and diverse cultures, offers a
        unique backdrop for a transformative summer experience. From the
        bustling markets of Marrakech to the modern skylines of Dubai, each
        destination offers a blend of tradition and modernity. By choosing to
        work and travel in this region, you&apos;ll gain:
      </p>

      <div className="flex flex-col gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.number}
            className="flex flex-col lg:flex-row flex-wrap justify-between lg:items-center gap-4 lg:gap-8"
          >
            <div className="flex-1 min-w-0 mb-4 lg:mb-0">
              <h3 className="typography-M24 text-lev-black mb-3">
                {benefit.number}. {benefit.title}
              </h3>
              <p className="text-gray-500 typography-R16 max-w-sm leading-snug">
                {benefit.description}
              </p>
            </div>
            <FadeUpAnimator transition={{ delay: 0.4 + index * 0.1 }}>
              <div className="relative w-full lg:w-[400px] h-[300px] lg:h-[400px] overflow-hidden shrink-0">
                <Image
                  src={benefit.image}
                  alt={benefit.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeUpAnimator>
          </div>
        ))}
      </div>
    </section>
  );
}
