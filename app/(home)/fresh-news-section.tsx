import Image from "next/image";
import { SectionTitle } from "./section-title";
import { SectionWrapper } from "./section-wrapper";

import workingTogether from "@/assets/photos/working-together.png";
import { Button } from "@/design-system/button";

const News = [
  {
    image: workingTogether,
    title: "The Power of Cultural Immersion1",
    description:
      "Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience.",
  },
  {
    image: workingTogether,
    title: "The Power of Cultural Immersion2",
    description:
      "Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience.",
  },
  {
    image: workingTogether,
    title: "The Power of Cultural Immersion3",
    description:
      "Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience.",
  },
  {
    image: workingTogether,
    title: "The Power of Cultural Immersion4",
    description:
      "Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience.",
  },
];

export function FreshNewsSection() {
  return (
    <SectionWrapper
      sectionColor="bg-lev-yellow-light"
      className="grid  grid-cols-[3fr_2fr] gap-10"
    >
      <div className="flex flex-col gap-4">
        <SectionTitle>
          Our fresh <br /> news
        </SectionTitle>
        <p className="self-end w-1/2 opacity-50">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet
        </p>
        <div>
          <Image
            src={workingTogether}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-between">
        <Button className="uppercase self-center">See all news</Button>
        {News.map((sn) => (
          <div key={sn.title} className="flex gap-4">
            <div className="w-[150px]  shrink-0">
              <Image
                src={sn.image}
                alt=""
                className="flex w-full object-cover h-full"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="typography-S20">{sn.title}</h5>
              <p className="typography-R14 leading-5 opacity-50">
                {sn.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
