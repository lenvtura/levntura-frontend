"use client";

import { motion, Transition } from "motion/react";
import { ComponentProps } from "react";

const fadeUpAnimation = (transition?: Transition) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut", ...transition },
});

export const FadeUpAnimator = ({
  children,
  transition,
  ...props
}: ComponentProps<typeof motion.div>) => {
  return (
    <motion.div {...fadeUpAnimation(transition)} {...props}>
      {children}
    </motion.div>
  );
};
