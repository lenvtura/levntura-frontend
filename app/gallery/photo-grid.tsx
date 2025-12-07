import Image, { StaticImageData } from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { cn } from "@/design-system/helpers";

interface PhotoGridProps {
  images: (StaticImageData | string)[];
  columns?: 2 | 3 | 4;
}

export function PhotoGrid({ images }: PhotoGridProps) {
  // For 3x3 grid, we need 9 slots but only 8 images (bottom-right empty)

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="container">
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-5 gap-4 lg:gap-6`}
        >
          {Array.from({ length: 12 }).map((_, index) => {
            // For 3x3 grid, skip rendering the last slot (index 8)

            const image = images[index];

            const imageNumber2 = index === 1;
            const imageNumber6 = index === 5;
            const imageNumber8 = index === 7;
            const imageNumber11 = index === 10;
            const imageNumber12 = index === 11;

            return (
              <FadeUpAnimator
                key={index}
                transition={{ delay: 0.1 * (index % 6) }}
                className={cn(
                  "relative aspect-square overflow-hidden group cursor-pointer",
                  imageNumber2 && "row-span-2 h-full w-full",
                  imageNumber6 && "row-span-2 h-full w-full",
                  imageNumber8 && "row-span-2 h-full w-full",
                  imageNumber11 && "row-span-2 h-full w-full"
                )}
              >
                <Image
                  src={image}
                  alt={`Gallery photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </FadeUpAnimator>
            );
          })}
        </div>
      </div>
    </div>
  );
}
