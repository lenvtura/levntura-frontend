import { StaticImageData } from "next/image";
import counselorImage from "@/assets/photos/counselor.png";
import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";
import studentsImage from "@/assets/photos/students.png";
import workingTogetherImage from "@/assets/photos/working-together.png";
import happyFriendshipImage from "@/assets/photos/happy-friendship.png";

export interface JobOpportunity {
  id: string;
  image: StaticImageData | string;
  type: string;
  country: string;
  countryCode: "USA" | "UK";
  title: string;
  category: string;
  dates: string;
  description: string;
  salary: string;
  applyHref: string;
  moreHref: string;
}

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: "uiux-designer-1",
    image: studentsImage,
    type: "FULLTIME",
    country: "USA",
    countryCode: "USA",
    title: "UIUX DESIGNER",
    category: "computer science",
    dates: "22 Jan, 2024 - 01 Jan, 2025",
    description:
      "With partnerships spanning across 1.5K prestigious universities, our program opens doors to unparalleled academic and professional networks.",
    salary: "6595$/m",
    applyHref: "/careers/apply/uiux-designer-1",
    moreHref: "/careers/uiux-designer-1",
  },
  {
    id: "uiux-designer-2",
    image: workingTogetherImage,
    type: "FULLTIME",
    country: "USA",
    countryCode: "USA",
    title: "UIUX DESIGNER",
    category: "computer science",
    dates: "22 Jan, 2024 - 01 Jan, 2025",
    description:
      "With partnerships spanning across 1.5K prestigious universities, our program opens doors to unparalleled academic and professional networks.",
    salary: "6595$/m",
    applyHref: "/careers/apply/uiux-designer-2",
    moreHref: "/careers/uiux-designer-2",
  },
  {
    id: "software-engineer",
    image: studentsImage,
    type: "FULLTIME",
    country: "USA",
    countryCode: "USA",
    title: "SOFTWARE ENGINEER",
    category: "computer science",
    dates: "15 Feb, 2024 - 15 Feb, 2025",
    description:
      "Join our dynamic team to build innovative solutions that transform how students experience international education programs.",
    salary: "7500$/m",
    applyHref: "/careers/apply/software-engineer",
    moreHref: "/careers/software-engineer",
  },
  {
    id: "marketing-specialist",
    image: happyFriendshipImage,
    type: "FULLTIME",
    country: "UK",
    countryCode: "UK",
    title: "MARKETING SPECIALIST",
    category: "marketing",
    dates: "01 Mar, 2024 - 01 Mar, 2025",
    description:
      "Drive brand awareness and student engagement through creative marketing campaigns across multiple international markets.",
    salary: "5500$/m",
    applyHref: "/careers/apply/marketing-specialist",
    moreHref: "/careers/marketing-specialist",
  },
];

export const RELATED_PROGRAMS = [
  {
    id: "counselor",
    title: "Counselor",
    image: counselorImage,
    href: "/programs/calendly/counselor",
  },
  {
    id: "internship",
    title: "Internship",
    image: internshipImage,
    href: "/programs/calendly/internship",
  },
  {
    id: "work-travel",
    title: "Work & Travel",
    image: workImage,
    href: "/programs/work-and-travel",
  },
  {
    id: "study-travel",
    title: "Study & Travel",
    image: studyImage,
    href: "/programs/calendly/study-travel",
  },
];

// Team photos for hero section
export const TEAM_PHOTOS = [
  studentsImage,
  workingTogetherImage,
  happyFriendshipImage,
];

// Image for suggest new opportunities section
export const SUGGEST_OPPORTUNITIES_IMAGE = workingTogetherImage;

// Pagination helper
export const JOBS_PER_PAGE = 4;

export function getPaginatedJobs(
  jobs: JobOpportunity[],
  page: number,
  perPage: number = JOBS_PER_PAGE
) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return jobs.slice(startIndex, endIndex);
}

export function getTotalPages(
  totalJobs: number,
  perPage: number = JOBS_PER_PAGE
) {
  return Math.ceil(totalJobs / perPage);
}
