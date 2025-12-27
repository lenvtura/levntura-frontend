import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/design-system/carousel";
import aboAlMashaikh from "@/assets/photos/founder.png";
import johnDoe from "@/assets/photos/mask-group30.png";
import { StartNowBtn } from "@/atoms/start-now-btn";

const founders = [
  {
    title: "Co-Founder",
    name: "Ahmad Al-Mashaikh",
    description:
      "Driven by a passion for global education, Ahmad Al-Mashaikh co-founded Levntura to redefine international experiences for today’s youth. With extensive experience in global mobility, he believes learning goes beyond classrooms—it’s about people, purpose, and perspective. His mission is to empower young leaders to explore the world with confidence, connecting ambition with opportunity through transformative programs.",
    photo: aboAlMashaikh,
  },
  {
    title: "Co-Founder",
    name: "Abdulrahman Soman",
    description:
      "Abdulrahman Soman is a visionary co-founder of Levntura, driving its growth through innovation and strategic leadership. He is passionate about transforming global student mobility by creating smarter, more connected pathways between students and institutions. Through his vision, Levntura continues to empower youth and redefine how international education bridges opportunity and impact worldwide.",
    photo: johnDoe,
  },
];

export function OurFoundersCarousel() {
  return (
    <Carousel className="w-full bg-amber-300">
      <CarouselContent className="h-full">
        {founders.map((person, index) => (
          <CarouselItem key={index} className="relative h-full">
            <Image
              src={person.photo}
              alt={person.name}
              // height={700}
              // width={900}
              className="object-cover w-full h-full"
            />

            <div className=" top-0 right-[200px] absolute grid lg:grid-cols-3 h-full p-4">
              <div className="flex flex-col items-start justify-end lg:justify-center lg:col-start-3 text-white gap-y-4">
                <h2 className="typography-S34 text-white uppercase">
                  {person.title}
                </h2>
                <h6 className="typography-S16">{person.name}</h6>
                <p className="typography-R14 leading-5 w-[400px]">
                  {person.description}
                </p>
                <StartNowBtn className="border-1 hover:bg-white hover:text-black border-white">
                  Contact Us
                </StartNowBtn>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 text-white border-white" />
      <CarouselNext className="right-4 text-white border-white" />
    </Carousel>
  );
}
