import { StaticImageData } from "next/image";
import studentsImage from "@/assets/photos/students.png";
import workingTogetherImage from "@/assets/photos/working-together.png";
import happyFriendshipImage from "@/assets/photos/happy-friendship.png";

export interface CareerDetail {
  slug: string;
  image: StaticImageData | string;
  title: string;
  dates: string;
  type: string;
  typeColor: "green" | "orange";
  country: string;
  countryCode: "USA" | "UK";
  category: string;
  description: string;
  salary: string;
  heroText: string;
  heroImages: StaticImageData[];
  requirements: string[];
  benefits: string[];
  applyHref: string;
  moreHref: string;
}

export const CAREER_DETAIL_DATA: CareerDetail[] = [
  {
    slug: "uiux-designer-fulltime",
    image: studentsImage,
    title: "UIUX DESIGNER",
    dates: "22 JAN,2024 - 01 JAN,2025",
    type: "FULLTIME",
    typeColor: "green",
    country: "USA",
    countryCode: "USA",
    category: "Computer science",
    description:
      "With partnerships spanning across 1.5K prestigious universities, our program opens doors to unparalleled academic and professional networks.",
    salary: "6595$/m",
    heroText:
      "Although we like to publish rates on our job specs, this is a new skillset for us, so we appreciate that we will have to be driven by the market.",
    heroImages: [studentsImage, workingTogetherImage, happyFriendshipImage],
    requirements: [
      "Experience in UI/UX design (2-5 years, DTC brands preferred)",
      "Proficiency with no-code website builders (Webflow, Framer, etc.)",
      "Strong understanding of design principles and user experience",
      "Experience with A/B testing and conversion optimization",
      "Excellent communication and collaboration skills",
      "Proactive mindset with ability to work independently",
    ],
    benefits: [
      "Health insurance coverage",
      "Life insurance",
      "Disability insurance",
      "Paid time off",
      "401(k) retirement plan",
    ],
    applyHref: "/careers/apply/uiux-designer-fulltime",
    moreHref: "/careers/uiux-designer-fulltime",
  },
  {
    slug: "uiux-designer-parttime",
    image: studentsImage,
    title: "UIUX DESIGNER",
    dates: "22 JAN,2024 - 01 JAN,2025",
    type: "PART TIME",
    typeColor: "orange",
    country: "USA",
    countryCode: "USA",
    category: "Computer science",
    description:
      "With partnerships spanning across 1.5K prestigious universities, our program opens doors to unparalleled academic and professional networks.",
    salary: "6595$/m",
    heroText:
      "Although we like to publish rates on our job specs, this is a new skillset for us, so we appreciate that we will have to be driven by the market.",
    heroImages: [studentsImage, workingTogetherImage, happyFriendshipImage],
    requirements: [
      "Experience in UI/UX design (2-5 years, DTC brands preferred)",
      "Proficiency with no-code website builders (Webflow, Framer, etc.)",
      "Strong understanding of design principles and user experience",
      "Experience with A/B testing and conversion optimization",
      "Excellent communication and collaboration skills",
      "Proactive mindset with ability to work independently",
    ],
    benefits: [
      "Health insurance coverage",
      "Life insurance",
      "Disability insurance",
      "Paid time off",
      "401(k) retirement plan",
    ],
    applyHref: "/careers/apply/uiux-designer-parttime",
    moreHref: "/careers/uiux-designer-parttime",
  },
];

