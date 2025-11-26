"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

export const Slider = <T,>({
  data = [],
  renderItem,
}: {
  data: T[];
  renderItem: (item: T) => ReactNode;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && sliderRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const sliderWidth = sliderRef.current.scrollWidth;
        const halfCard = cardRef.current?.clientWidth
          ? cardRef.current?.clientWidth / 2
          : 0;
        const centerOffset = containerWidth / 2 - halfCard;

        // Allow dragging so last card centers
        const maxDrag = -(sliderWidth - containerWidth - centerOffset);

        setDragConstraints({
          left: maxDrag,
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full flex items-center">
      <motion.div
        ref={sliderRef}
        className="flex gap-8 active:cursor-grabbing"
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.05}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{
          width: "max-content",
          paddingLeft: "calc(50vw - 30rem)", // Centers first card
          paddingRight: "calc(50vw - 10rem)", // Centers last card
        }}
      >
        {data.map((item, index) => (
          <motion.div
            ref={cardRef}
            key={index}
            className="flex-shrink-0 select-none"
            whileHover={!isDragging ? { scale: 1.02, y: -5 } : {}}
            transition={{ duration: 0.2 }}
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
