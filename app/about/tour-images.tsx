import Image from "next/image";
import img1 from "@/assets/photos/tour-images/i1.png";
import img2 from "@/assets/photos/tour-images/i2.png";
import img3 from "@/assets/photos/tour-images/i3.png";
import img4 from "@/assets/photos/tour-images/i4.png";
import img5 from "@/assets/photos/tour-images/i5.png";
import img6 from "@/assets/photos/tour-images/i6.png";
import img8 from "@/assets/photos/tour-images/i8.png";
import img9 from "@/assets/photos/tour-images/i9.png";
import { SectionTitle } from "../(home)/section-title";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { ComponentProps } from "react";
import { cn } from "@/design-system/helpers";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export default function TourImages({
  title = "We are creating memories, are you joining?",
  gradientProps: { className, ...props } = {},
}: {
  title?: string;
  gradientProps?: ComponentProps<"div">;
}) {
  return (
    <>
      <div className="relative">
        <div className="flex gap-4">
          <div className="flex-1 max-w-full sm:flex-1/2 sm:max-w-1/2 md:flex-1/3 md:max-w-1/3">
            <Image src={img1} alt="img1" className="mt-4 w-full align-middle" />
            <Image src={img4} alt="img4" className="mt-4 w-full align-middle" />
          </div>

          <div className="flex-1/3 max-w-1/3">
            <Image src={img2} alt="img2" className="mt-4 w-full align-middle" />
            <Image src={img5} alt="img5" className="mt-4 w-full align-middle" />
            <Image src={img8} alt="img8" className="mt-4 w-full align-middle" />
          </div>

          <div className="flex-1/3 max-w-1/3">
            <Image src={img3} alt="img3" className="mt-4 w-full align-middle" />
            <Image src={img6} alt="img6" className="mt-4 w-full align-middle" />
            <Image src={img9} alt="img9" className="mt-4 w-full align-middle" />
          </div>
        </div>
        <div
          className={cn(
            "absolute h-[500px] left-0 right-0 bottom-0 bg-gradient-to-t from-[10%]  from-white to-transparent",
            className,
          )}
          {...props}
        />
      </div>
      <FadeUpAnimator className="flex flex-col -translate-y-[100px] gap-4 items-center">
        <SectionTitle className="text-center w-1/2">{title}</SectionTitle>
        <StartNowBtn />
        <Link
          href={Routes.gallery}
          className="typography-R16 mt-4 text-black hover:text-lev-red transition-colors"
        >
          See all photos
        </Link>
      </FadeUpAnimator>
    </>
  );
}
