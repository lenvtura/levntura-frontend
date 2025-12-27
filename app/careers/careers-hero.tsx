import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "../(home)/section-wrapper";
import { SectionTitle } from "../(home)/section-title";

import img4 from "@/assets/photos/home/m-4.png";
import img1 from "@/assets/photos/home/m-1.png";
import img3 from "@/assets/photos/home/m-3.png";

export function CareersHero() {
  return (
    <SectionWrapper sectionColor="bg-lev-green-dark">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center pt-10 lg:pt-0">
        <div>
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <p className="typography-R14 uppercase text-lev-orange mb-4">
              FROM LEVNTURA
            </p>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <SectionTitle className="text-white mb-6">
              JOIN <span className="text-lev-green-light">THE BEST</span> TEAM
              IN THE WORLD
            </SectionTitle>
          </FadeUpAnimator>

          <FadeUpAnimator
            className="text-white typography-R16 leading-relaxed max-w-[600px]"
            transition={{ delay: 0.3 }}
          >
            At Levntura, we&apos;re here to guide you every step of the way on
            your journey of discovery. Whether you have questions about our
            programs, want to share feedback, or simply want to say hello,
            we&apos;d love to hear from you. Get in touch with us using any of
            the following methods:
          </FadeUpAnimator>
        </div>

        <div className=" grid grid-cols-2 gap-4">
          <FadeUpAnimator
            transition={{ delay: 0.4 }}
            className="col-span-2 h-[200px] lg:h-[280px]"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={img1}
                alt="Team photo"
                fill
                className="object-cover"
              />
            </div>
          </FadeUpAnimator>

          <FadeUpAnimator
            transition={{ delay: 0.5 }}
            className="h-[200px] lg:h-[280px]"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={img4}
                alt="Team photo"
                fill
                className="object-cover"
              />
            </div>
          </FadeUpAnimator>

          <FadeUpAnimator
            transition={{ delay: 0.6 }}
            className="h-[200px] lg:h-[280px]"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={img3}
                alt="Team photo"
                fill
                className="object-cover"
              />
            </div>
          </FadeUpAnimator>
        </div>
      </div>
    </SectionWrapper>
  );
}
