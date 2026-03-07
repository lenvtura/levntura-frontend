import { StaticImageData } from "next/image";
import counselorImage from "@/assets/photos/counselor.png";

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
    id: "camp-counselor",
    title: "Camp Counselor",
    country: "USA",
    countryCode: "USA",
    duration: "3 month",
    description:
      "Compassionate counselor skilled in supporting individuals through life's challenges. I create a safe, non-judgmental space for clients to explore and grow.",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_camp.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=N5ForCdnZ8PpzphAkYOnYf4BdBM%3D&Expires=1772913994",
    category: ["All", "Usa"],
    href: "/programs/calendly/counselor",
  },
  {
    id: "work-and-travel",
    title: "Work & Travel",
    country: "USA",
    countryCode: "USA",
    duration: "3-4 month",
    description:
      "Compassionate counselor skilled in supporting individuals through life's challenges. I create a safe, non-judgmental space for clients to explore and grow.",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/programs_work-and-travel.JPG?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=FUWbXzDw%2BTSkFc63OTeSjIlNtHA%3D&Expires=1772913786",
    category: ["All", "Usa"],
    href: "/programs/work-and-travel",
  },
  {
    id: "study-abroad",
    title: "Study Abroad",
    country: "USA",
    countryCode: "USA",
    duration: "2 weeks",
    description:
      "Compassionate counselor skilled in supporting individuals through life's challenges. I create a safe, non-judgmental space for clients to explore and grow.",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/programs_study-abroad.JPG?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=n%2B%2BfEOfiVclzU2pbcKp6fRJDyaU%3D&Expires=1772913382",
    category: ["All", "Usa"],
    href: "/programs/calendly/counselor",
  },
  {
    id: "internship",
    title: "Internship",
    country: "USA",
    countryCode: "USA",
    duration: "12 month",
    description:
      "Experience the American dream while working and traveling. Gain professional experience, improve your English skills, and explore the United States.",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/programs_internship.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=PLvGTGO5tcwLtBmVGLbMCW7n%2BvY%3D&Expires=1772913600",
    category: ["All", "Usa"],
    href: "/programs/work-and-travel",
  },
  {
    id: "volunteering",
    title: "Volunteering",
    country: "USA",
    countryCode: "USA",
    duration: "1 month",
    description:
      "Combine academic excellence with cultural immersion. Study at prestigious institutions while experiencing American culture and lifestyle.",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_our-programs_volunteering.jpg?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=NA7a%2F60EtOkTHY0q3WQyg5Ylcw0%3D&Expires=1772913256",
    category: ["All", "Usa"],
    href: "/programs/calendly/study-travel",
  },
];
