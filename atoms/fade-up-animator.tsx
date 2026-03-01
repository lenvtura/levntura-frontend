"use client";

import { motion, Transition } from "motion/react";
import { Suspense } from "react";

const fadeUpAnimation = (transition?: Transition) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut", ...transition },
});

function FadeUpAnimatorContent({
  children,
  transition,
  className,
  style,
}: {
  children?: React.ReactNode;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      {...fadeUpAnimation(transition)}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export const FadeUpAnimator = ({
  children,
  transition,
  className,
  style,
}: {
  children?: React.ReactNode;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Suspense
      fallback={
        <div className={className} style={style}>
          {/* Fallback content */}
        </div>
      }
    >
      <FadeUpAnimatorContent
        transition={transition}
        className={className}
        style={style}
      >
        {children}
      </FadeUpAnimatorContent>
    </Suspense>
  );
};
