import {
  motion,
  useSpring,
  easeIn,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Travels } from "@/constants/travels";

export function TravelsImgsDsk({
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

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.document.body.clientWidth);
  }, []);

  const translateX = useTransform(
    translateXa,
    [0, 1],
    [`${windowWidth / 2}px`, "0px"],
    {
      ease: easeIn,
    }
  );
  return (
    <div
      ref={photoContainerRef}
      className="-mt-[200px] relative z-[900]  min-w-[1500px] overflow-hidden  max-md:hidden"
    >
      <motion.div
        dragConstraints={{
          left: -photoContainerWidth / 2,
          right: 0,
        }}
        style={{ translateX }}
        drag={"x"}
        whileDrag={{ cursor: "grabbing" }}
        className="flex gap-4 p-2  w-full "
      >
        {Travels.map((t) => (
          <div
            key={t.label}
            className="w-full h-full pointer-events-none relative  overflow-hidden "
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
