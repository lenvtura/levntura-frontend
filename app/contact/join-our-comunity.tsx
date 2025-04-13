import Image from "next/image";
import { SectionWrapper } from "../(home)/section-wrapper";
import fa from "../../assets/photos/fb.png";
import c1 from "../../assets/photos/c-1.png";
import c2 from "../../assets/photos/c-2.png";
import { Button } from "@/design-system/button";

export function JoinOurComunity() {
  return (
    <SectionWrapper sectionColor="bg-lev-blue-dark">
      <div className="text-white grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <Image src={fa} width={60} height={60} alt="" />

          <h1 className="typography-EB74 leading-16">
            JOIN OUR <br /> COMMUNITY
          </h1>

          <Image src={c1} width={1000} height={1000} alt="" />
        </div>

        <div className="flex flex-col items-center justify-between">
          <Image src={c2} width={1000} height={800} alt="" />

          <p className="typography-R20 leading-7 text-white opacity-50">
            join the usa work and travel program and make this summer the one
            you’ll always remember. embrace the thrill, enhance your skills, and
            create memories that will last a lifetime.
          </p>

          <Button className="border-white px-28 py-6">Join Now</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
