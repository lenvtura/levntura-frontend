import { Metadata } from "next";
import CulturalExchange from "./cultural-exchange";
import { EductionAndPurposes } from "./eduction-and-purposes";
import Map from "./map";
import { OurFoundersCarousel } from "./our-founders-carousel";
import { Testimonial } from "./testimonial";
import TourImages from "./tour-images";
import ValuesWeLiveBy from "./values-we-live-by";
import { Venture } from "./venture";
import { WhereJourneysBegin } from "./where-journeys-begin";
import { SectionWrapper } from "../(home)/section-wrapper";

export const metadata: Metadata = {
  title: "About | Levntura",
};

export default function AboutPage() {
  return (
    <>
      <WhereJourneysBegin />
      <EductionAndPurposes />
      <OurFoundersCarousel />
      <Venture />
      <ValuesWeLiveBy />
      <Map />
      <SectionWrapper sectionColor="bg-lev-yellow-light">
        <TourImages gradientProps={{ className: "from-lev-yellow-light" }} />
      </SectionWrapper>
      <CulturalExchange />
      <Testimonial />
    </>
  );
}
