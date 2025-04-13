import { StartNowBtn } from "@/atoms/start-now-btn";
import { SectionTitle } from "./section-title";
import { SectionWrapper } from "./section-wrapper";
import Image from "next/image";

import firstPhoto from "@/assets/photos/3.png";
import secondPhoto from "@/assets/photos/4.png";
import thirdPhoto from "@/assets/photos/5.png";
import fourthPhoto from "@/assets/photos/6.png";

export function AreYouReadySection() {
  return (
    <div className="relative bg-lev-yellow-light">
      <SectionWrapper sectionColor="bg-lev-yellow-light">
        <div className="h-[500px] flex justify-between">
          <div>
            <Image src={firstPhoto} alt="" />
          </div>
          <div className="mt-10">
            <Image src={secondPhoto} alt="" />
          </div>
        </div>
        <div className="flex gap-10 flex-col items-center">
          <SectionTitle className="text-center max-w-[650px]">
            Are You Ready to Change Your World?
          </SectionTitle>

          <StartNowBtn />
        </div>
      </SectionWrapper>
      <div className="flex gap-14">
        <div className="w-full ">
          <Image src={fourthPhoto} alt="" className=" " />
        </div>
        <div className="w-full">
          <Image src={thirdPhoto} alt="" className="ml-auto mr-6" />
        </div>
      </div>
    </div>
  );
}
