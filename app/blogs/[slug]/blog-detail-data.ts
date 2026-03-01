import { StaticImageData } from "next/image";
import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";
import counselorImage from "@/assets/photos/counselor.png";
import studentsImage from "@/assets/photos/students.png";
import australiaImage from "@/assets/photos/australia.png";
import canadaImage from "@/assets/photos/canada.png";
import londonImage from "@/assets/photos/london.png";
import usaImage from "@/assets/photos/usa.png";
import { j1AgenciesInKsa } from "./data/j1-agencies-in-ksa";
import { scholarshipsForSaudiStudentsToStudyAbroad } from "./data/scholarships-for-saudi-students-to-study-abroad";
import { studyAbroadAgenciesInKsa } from "./data/study-abroad-agencies-in-ksa";
import { workAndTravel } from "./data/work-and-travel";

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  image?: StaticImageData | string;
  imagePosition?: "left" | "right" | "full";
}

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface BlogDetail {
  slug: string;
  heroImage: StaticImageData | string;
  /** Alt text for hero image (e.g. "Work and Travel in Agency KSA") */
  heroImageAlt?: string;
  breadcrumbs: string[];
  title: string;
  sections: BlogSection[];
  seo?: BlogSEO;
  pastStudent?: {
    image: StaticImageData | string;
    name: string;
    bio: string;
  };
  moreToRead?: {
    title: string;
    subtitle: string;
    description: string;
    images: (StaticImageData | string)[];
  };
}

export const BLOG_DETAIL_DATA: Record<string, BlogDetail> = {
  "study-abroad-agencies-in-ksa": studyAbroadAgenciesInKsa,
  "j1-agencies-in-ksa": j1AgenciesInKsa,
  "scholarships-for-saudi-students-to-study-abroad":
    scholarshipsForSaudiStudentsToStudyAbroad,
  "work-and-travel-in-agency-ksa": workAndTravel,
};
