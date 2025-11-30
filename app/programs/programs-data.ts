import { StaticImageData } from "next/image";
import counselorImage from "@/assets/photos/counselor.png";
import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";

export interface Program {
  id: string;
  title: string;
  country: string;
  countryCode: "USA" | "UK";
  duration: string;
  description: string;
  image: StaticImageData | string;
  category: string[];
  href: string;
}

export const PROGRAMS_DATA: Program[] = [
  {
    id: "counselor-3-month",
    title: "Counselor",
    country: "USA",
    countryCode: "USA",
    duration: "3 month",
    description:
      "Compassionate counselor skilled in supporting individuals through life's challenges. I create a safe, non-judgmental space for clients to explore and grow.",
    image: counselorImage,
    category: ["All", "Usa"],
    href: "/programs/calendly/counselor",
  },
  {
    id: "counselor-3-4-month",
    title: "Counselor",
    country: "USA",
    countryCode: "USA",
    duration: "3-4 month",
    description:
      "Compassionate counselor skilled in supporting individuals through life's challenges. I create a safe, non-judgmental space for clients to explore and grow.",
    image: counselorImage,
    category: ["All", "Usa"],
    href: "/programs/calendly/counselor",
  },
  {
    id: "counselor-2-weeks",
    title: "Counselor",
    country: "USA",
    countryCode: "USA",
    duration: "2 weeks",
    description:
      "Compassionate counselor skilled in supporting individuals through life's challenges. I create a safe, non-judgmental space for clients to explore and grow.",
    image: counselorImage,
    category: ["All", "Usa"],
    href: "/programs/calendly/counselor",
  },
  {
    id: "work-travel-usa",
    title: "Work & Travel",
    country: "USA",
    countryCode: "USA",
    duration: "3-4 month",
    description:
      "Experience the American dream while working and traveling. Gain professional experience, improve your English skills, and explore the United States.",
    image: workImage,
    category: ["All", "Usa"],
    href: "/programs/work-and-travel",
  },
  {
    id: "study-travel-usa",
    title: "Study & Travel",
    country: "USA",
    countryCode: "USA",
    duration: "1 semester",
    description:
      "Combine academic excellence with cultural immersion. Study at prestigious institutions while experiencing American culture and lifestyle.",
    image: studyImage,
    category: ["All", "Usa"],
    href: "/programs/calendly/study-travel",
  },
  {
    id: "internship-usa",
    title: "Internship",
    country: "USA",
    countryCode: "USA",
    duration: "6 month",
    description:
      "Professional internship opportunities in leading American companies. Gain valuable work experience and build your international career.",
    image: internshipImage,
    category: ["All", "Usa"],
    href: "/programs/calendly/internship",
  },
  {
    id: "study-travel-uk",
    title: "Study & Travel",
    country: "UK",
    countryCode: "UK",
    duration: "1 semester",
    description:
      "Experience British education excellence while exploring the rich history and culture of the United Kingdom.",
    image: studyImage,
    category: ["All", "Uk"],
    href: "/programs/calendly/study-travel",
  },
  {
    id: "internship-uk",
    title: "Internship",
    country: "UK",
    countryCode: "UK",
    duration: "6 month",
    description:
      "Professional internship opportunities in the UK. Work with leading British companies and enhance your international career prospects.",
    image: internshipImage,
    category: ["All", "Uk"],
    href: "/programs/calendly/internship",
  },
];
