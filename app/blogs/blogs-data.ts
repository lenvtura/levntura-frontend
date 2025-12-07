import { StaticImageData } from "next/image";

// Using existing images from the codebase
import counselorImage from "@/assets/photos/counselor.png";
import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";
import australiaImage from "@/assets/photos/australia.png";
import canadaImage from "@/assets/photos/canada.png";
import londonImage from "@/assets/photos/london.png";
import usaImage from "@/assets/photos/usa.png";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  date: string;
  image: StaticImageData | string;
  categories: string[];
  href: string;
  featured?: boolean;
}

export const BLOGS_DATA: BlogPost[] = [
  {
    id: "unlock-new-worlds",
    title: "UNLOCK NEW WORLDS: SUMMER WORK AND TRAVEL",
    category: "GETTING STARTED",
    readTime: "6MIN READ",
    description:
      "Are you ready to embark on an adventure that will not only enhance your resume but also expand your cultural horizons?",
    date: "JAN 12,2024",
    image: workImage,
    categories: ["All", "Articles"],
    href: "/blogs/unlock-new-worlds",
    featured: true,
  },
  {
    id: "power-of-cultural-immersion-1",
    title: "THE POWER OF CULTURAL IMMERSION",
    category: "GETTING STARTED",
    readTime: "6MIN READ",
    description:
      "Are You Ready To Embark On An Adventure That Will Not Only Enhance Your Resume But Also Expand Your Cultural Horizons?",
    date: "JAN 12,2024",
    image: australiaImage,
    categories: ["All", "Articles"],
    href: "/blogs/power-of-cultural-immersion-1",
  },
  {
    id: "power-of-cultural-immersion-2",
    title: "THE POWER OF CULTURAL IMMERSION",
    category: "GETTING STARTED",
    readTime: "6MIN READ",
    description:
      "Are You Ready To Embark On An Adventure That Will Not Only Enhance Your Resume But Also Expand Your Cultural Horizons?",
    date: "JAN 12,2024",
    image: londonImage,
    categories: ["All", "Articles"],
    href: "/blogs/power-of-cultural-immersion-2",
  },
  {
    id: "power-of-cultural-immersion-3",
    title: "THE POWER OF CULTURAL IMMERSION",
    category: "GETTING STARTED",
    readTime: "6MIN READ",
    description:
      "Are You Ready To Embark On An Adventure That Will Not Only Enhance Your Resume But Also Expand Your Cultural Horizons?",
    date: "JAN 12,2024",
    image: usaImage,
    categories: ["All", "Articles"],
    href: "/blogs/power-of-cultural-immersion-3",
  },
  {
    id: "student-success-story",
    title: "FROM CLASSROOM TO ADVENTURE",
    category: "ALUMNI",
    readTime: "8MIN READ",
    description:
      "Discover how our alumni transformed their educational journey into life-changing adventures across the globe.",
    date: "JAN 10,2024",
    image: studyImage,
    categories: ["All", "Alumni"],
    href: "/blogs/student-success-story",
  },
  {
    id: "internship-opportunities",
    title: "PROFESSIONAL GROWTH ABROAD",
    category: "ARTICLES",
    readTime: "7MIN READ",
    description:
      "Learn how international internships can accelerate your career and provide invaluable professional experience.",
    date: "JAN 08,2024",
    image: internshipImage,
    categories: ["All", "Articles"],
    href: "/blogs/internship-opportunities",
  },
  {
    id: "camp-counselor-experience",
    title: "MAKING A DIFFERENCE AS A COUNSELOR",
    category: "STORIES",
    readTime: "5MIN READ",
    description:
      "Heartwarming stories from camp counselors who made lasting impacts on young lives while growing themselves.",
    date: "JAN 05,2024",
    image: counselorImage,
    categories: ["All", "Stories"],
    href: "/blogs/camp-counselor-experience",
  },
  {
    id: "canada-adventure",
    title: "DISCOVERING CANADA",
    category: "STORIES",
    readTime: "6MIN READ",
    description:
      "A journey through Canada's breathtaking landscapes and multicultural cities that changed one student's perspective.",
    date: "DEC 28,2023",
    image: canadaImage,
    categories: ["All", "Stories"],
    href: "/blogs/canada-adventure",
  },
  {
    id: "study-tips",
    title: "BALANCING STUDY AND TRAVEL",
    category: "ARTICLES",
    readTime: "5MIN READ",
    description:
      "Essential tips for maintaining academic excellence while exploring new cultures and destinations.",
    date: "DEC 25,2023",
    image: studyImage,
    categories: ["All", "Articles"],
    href: "/blogs/study-tips",
  },
];

// Pagination helper
export const BLOGS_PER_PAGE = 6;

export function getPaginatedBlogs(
  blogs: BlogPost[],
  page: number,
  perPage: number = BLOGS_PER_PAGE
) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return blogs.slice(startIndex, endIndex);
}

export function getTotalPages(
  totalBlogs: number,
  perPage: number = BLOGS_PER_PAGE
) {
  return Math.ceil(totalBlogs / perPage);
}




