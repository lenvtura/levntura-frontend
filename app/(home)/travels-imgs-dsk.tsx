"use client";

import { Slider } from "../programs/work-and-travel/jobs-slider";
import Image from "next/image";
import { Travels } from "@/constants/travels";

export function TravelsImgsDsk() {
  return (
    <div className="-mt-[200px] relative z-[900] min-w-[1500px] overflow-hidden max-md:hidden h-[400px]">
      <Slider
        data={Travels}
        renderItem={(item) => {
          return (
            <div
              key={item.label}
              className="shrink-0 relative w-[400px] overflow-hidden h-full"
            >
              <Image
                alt=""
                width={300}
                height={300}
                src={item.src}
                className="object-cover group-hover:scale-105 transition-[scale] pointer-events-none w-full h-full"
              />
              <div className="absolute typography-B48 left-[16px] bottom-[16px] text-white">
                {item.label}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
