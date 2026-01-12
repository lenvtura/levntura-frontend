"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, (value) =>
    Math.round(value * 100)
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          style={{
            scaleX,
            transformOrigin: "left",
          }}
          className="h-full bg-lev-red"
        />
      </div>
      {/* <motion.div
        className="fixed top-[300px] left-6 lg:left-20 z-50 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded border border-gray-200"
        style={{ opacity: scrollYProgress }}
      >
        <span className="typography-S12 text-lev-black">
          <motion.span>{percentage}</motion.span>% Read
        </span>
      </motion.div> */}
    </>
  );
}
