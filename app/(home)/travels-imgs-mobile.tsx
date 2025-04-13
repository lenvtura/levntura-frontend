import {
  motion,
  useSpring,
  easeIn,
  useTransform,
  MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Travels } from "@/constants/travels";

export function TravelsImgsMobile({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const translateXa = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  const photoContainerRef = useRef<HTMLDivElement>(null);
  const [photoContainerWidth, setPhotoContainerWidth] = useState(0);
  useEffect(() => {
    setPhotoContainerWidth(photoContainerRef.current?.clientWidth || 0);
  }, [photoContainerRef.current?.clientWidth]);

  const translateX = useTransform(translateXa, [0, 0.8], [`0%`, "-60%"], {
    ease: easeIn,
  });
  return (
    <div className="mt-[24px]  md:hidden ">
      <motion.div
        ref={photoContainerRef}
        dragConstraints={{
          left: -photoContainerWidth / 5,
          right: photoContainerWidth / 5,
        }}
        style={{ translateX }}
        drag={"x"}
        whileDrag={{ cursor: "grabbing" }}
        className="flex w-full gap-4 p-2 min-w-[1500px] "
      >
        {Travels.map((t) => (
          <div
            key={t.label}
            className="w-full h-fullshrink-0 pointer-events-none relative  overflow-hidden"
          >
            <Image
              alt=""
              src={t.src}
              className="object-contain pointer-events-none w-full h-full"
            />
            <div className="absolute typography-B48 left-[16px] bottom-[16px] text-white">
              {t.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
