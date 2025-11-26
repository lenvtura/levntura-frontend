import { StartNowBtn } from "@/atoms/start-now-btn";
import { SectionTitle } from "./section-title";
import { SectionWrapper } from "./section-wrapper";
import Image from "next/image";

import firstPhoto from "@/assets/photos/3.png";
import secondPhoto from "@/assets/photos/4.png";
import thirdPhoto from "@/assets/photos/5.png";
import fourthPhoto from "@/assets/photos/6.png";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

export function AreYouReadySection() {
  return (
    <div className="relative bg-lev-yellow-light">
      <SectionWrapper sectionColor="bg-lev-yellow-light">
        <div className="h-[500px] flex justify-between">
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <Image src={firstPhoto} alt="" />
          </FadeUpAnimator>
          <FadeUpAnimator transition={{ delay: 0.2 }}>
            <Image src={secondPhoto} alt="" className="mt-10" />
          </FadeUpAnimator>
        </div>
        <div className="flex gap-10 flex-col items-center">
          <FadeUpAnimator transition={{ delay: 0.3 }}>
            <SectionTitle className="text-center max-w-[650px]">
              Are You Ready to Change Your World?
            </SectionTitle>
          </FadeUpAnimator>

          <FadeUpAnimator transition={{ delay: 0.4 }}>
            <StartNowBtn />
          </FadeUpAnimator>
        </div>
      </SectionWrapper>
      <div className="flex gap-14 overflow-hidden">
        <FadeUpAnimator transition={{ delay: 0.5 }} className="w-full ">
          <Image src={fourthPhoto} alt="" className=" " />
        </FadeUpAnimator>
        <FadeUpAnimator transition={{ delay: 0.6 }} className="w-full">
          <Image src={thirdPhoto} alt="" className="ml-auto mr-6" />
        </FadeUpAnimator>
      </div>
    </div>
  );
}
