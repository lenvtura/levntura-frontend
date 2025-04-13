import CulturalExchange from './cultural-exchange';
import { EductionAndPurposes } from './eduction-and-purposes';
import Map from './map';
import { OurFoundersCarousel } from './our-founders-carousel';
import {Testimonial} from './testimonial';
import TourImages from './tour-images';
import ValuesWeLiveBy from './values-we-live-by';
import { Venture } from './venture';
import { WhereJourneysBegin } from './where-journeys-begin';

export default function AboutPage() {
  return (
    <>
      <WhereJourneysBegin />
      <EductionAndPurposes />
      <OurFoundersCarousel />
      <Venture />
      <ValuesWeLiveBy />
      <Map />
      <TourImages />
      <CulturalExchange />
      <Testimonial />
    </>
  );
}
