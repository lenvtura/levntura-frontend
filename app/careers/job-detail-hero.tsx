import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

interface JobDetailHeroProps {
  heroText: string;
  images: StaticImageData[];
}

export function JobDetailHero({ heroText, images }: JobDetailHeroProps) {
  return (
    <div className="mb-12">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-8 mb-12">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <p className="text-lev-black leading-relaxed text-sm lg:text-base">
            {heroText}
          </p>
        </FadeUpAnimator>

        <div className="relative">
          {/* Large top image */}
          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <div className="relative w-full h-[250px] lg:h-[350px] mb-4 overflow-hidden">
              <Image
                src={images[0]}
                alt="Job detail"
                fill
                className="object-cover object-center"
              />
            </div>
          </FadeUpAnimator>

          {/* Bottom two images - not perfectly aligned */}
          <div className="flex gap-4 items-start">
            <FadeUpAnimator transition={{ delay: 0.3 }} className="w-[48%]">
              <div className="relative w-full h-[150px] lg:h-[200px] overflow-hidden">
                <Image
                  src={images[1] || images[0]}
                  alt="Job detail"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeUpAnimator>

            <FadeUpAnimator
              transition={{ delay: 0.4 }}
              className="w-[48%] mt-4"
            >
              <div className="relative w-full h-[150px] lg:h-[200px] overflow-hidden">
                <Image
                  src={images[2] || images[0]}
                  alt="Job detail"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeUpAnimator>
          </div>
        </div>
      </div>
    </div>
  );
}

