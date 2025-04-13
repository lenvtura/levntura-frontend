import Image from "next/image";
import { SectionWrapper } from "../(home)/section-wrapper";
import img1 from "@/assets/photos/tour-images/i1.png";
import img2 from "@/assets/photos/tour-images/i2.png";
import img3 from "@/assets/photos/tour-images/i3.png";
import img4 from "@/assets/photos/tour-images/i4.png";
import img5 from "@/assets/photos/tour-images/i5.png";
import img6 from "@/assets/photos/tour-images/i6.png";
import img8 from "@/assets/photos/tour-images/i8.png";
import img9 from "@/assets/photos/tour-images/i9.png";
import gred from "@/assets/photos/tour-images/gardinets.png";
import { Button } from "@/design-system/button";

export default function TourImages() {
  return (
    <SectionWrapper sectionColor="bg-lev-yellow-light">
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 max-w-full sm:flex-1/2 sm:max-w-1/2 md:flex-1/3 md:max-w-1/3">
            <Image src={img1} alt="img1" className="mt-2 w-full align-middle" />
            <Image src={img4} alt="img4" className="mt-2 w-full align-middle" />
          </div>

          <div className="flex-1/3 max-w-1/3">
            <Image src={img2} alt="img2" className="mt-2 w-full align-middle" />
            <Image src={img5} alt="img5" className="mt-2 w-full align-middle" />
            <Image src={img8} alt="img8" className="mt-2 w-full align-middle" />
          </div>

          <div className="flex-1/3 max-w-1/3">
            <Image src={img3} alt="img3" className="mt-2 w-full align-middle" />
            <Image src={img6} alt="img6" className="mt-2 w-full align-middle" />
            <Image src={img9} alt="img9" className="mt-2 w-full align-middle" />
          </div>
        </div>
        <Image
          src={gred}
          alt="grediants"
          className="absolute left-0 right-0 bottom-0"
        />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl sm:text-6xl font-semibold lg:typography-S74 uppercase text-center">
          We are creating <br />
          memories, are <br />
          you joining?
        </h1>

        <Button className="">Start Now!</Button>

        <p className="opacity-50"> See all photos </p>
      </div>
    </SectionWrapper>
  );
}
