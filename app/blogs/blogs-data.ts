import { StaticImageData } from "next/image";
import studyImage from "@/assets/photos/study.png";
import workImage from "@/assets/photos/work.png";
import internshipImage from "@/assets/photos/internship.png";

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
    id: "study-abroad-agencies-in-ksa",
    title: "BEST STUDY ABROAD AGENCIES IN KSA | LEVNTURA",
    category: "GETTING STARTED",
    readTime: "12MIN READ",
    description:
      "Looking for trusted study abroad agencies in KSA? Levntura guides Saudi students through universities, internships, visas, and global programs.",
    date: "FEB 24,2025",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/blogs-study_abroad.webp",
    categories: ["All", "Articles"],
    href: "/blogs/study-abroad-agencies-in-ksa",
    featured: true,
  },
  {
    id: "j1-agencies-in-ksa",
    title: "J1 AGENCIES IN KSA | J1 VISA PROGRAMS FOR SAUDI STUDENTS",
    category: "GETTING STARTED",
    readTime: "10MIN READ",
    description:
      "Looking for trusted j1 agencies in KSA? Discover J1 visa programs, eligibility, and agency support for Saudi students in the USA.",
    date: "FEB 24,2025",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/j1-agencies-blog-photo.png?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=MIRt0onwxubqgCH8I82rXdr%2Bf%2B4%3D&Expires=1772340296",
    categories: ["All", "Articles"],
    href: "/blogs/j1-agencies-in-ksa",
  },
  {
    id: "scholarships-for-saudi-students-to-study-abroad",
    title: "SCHOLARSHIPS FOR SAUDI STUDENTS TO STUDY ABROAD | LEVNTURA",
    category: "ARTICLES",
    readTime: "11MIN READ",
    description:
      "Discover scholarships for Saudi students to study abroad. Levntura helps students explore funded programs, universities, and application guidance worldwide.",
    date: "FEB 24,2025",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/scholarships-blog-photo.png?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=JSDrF1Z6WBnyVBwxfy6%2FFFQTENc%3D&Expires=1772340296",
    categories: ["All", "Articles"],
    href: "/blogs/scholarships-for-saudi-students-to-study-abroad",
  },
  {
    id: "work-and-travel-in-agency-ksa",
    title: "WORK AND TRAVEL IN AGENCY KSA | GLOBAL PROGRAMS FOR SAUDI STUDENTS",
    category: "GETTING STARTED",
    readTime: "9MIN READ",
    description:
      "Looking for Work and Travel in Agency KSA? Discover programs, top destinations, and agency support for Saudi students abroad.",
    date: "FEB 24,2025",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/work-and-travel-blog-photo.png?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=SsPggLGf97lKt1AlONo%2BbXncDMw%3D&Expires=1772340296",
    categories: ["All", "Articles"],
    href: "/blogs/work-and-travel-in-agency-ksa",
  },
  {
    id: "scholarships-in-germany-for-saudi-students",
    title: "SCHOLARSHIPS IN GERMANY FOR SAUDI STUDENTS | LEVNTURA",
    category: "GETTING STARTED",
    readTime: "10MIN READ",
    description:
      "Looking for scholarships in Germany for Saudi students? Discover scholarships, eligibility, and agency support for Saudi students in Germany.",
    date: "FEB 24,2025",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/scholarships-in-germany-blog-photo.png?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=DQZuG9cZm4p0JL7RrLzFbYiK%2BXk%3D&Expires=1772340296",
    categories: ["All", "Articles"],
    href: "/blogs/scholarships-in-germany-for-saudi-students",
  },
  {
    id: "student-exchange-programs-in-ksa",
    title: "STUDENT EXCHANGE PROGRAMS IN KSA | LEVNTURA",
    category: "GETTING STARTED",
    readTime: "10MIN READ",
    description:
      "Looking for student exchange programs in KSA? Discover programs, eligibility, and agency support for Saudi students in KSA.",
    date: "FEB 24,2025",
    image:
      "https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/student-exchange-programs-blog-photo.png?AWSAccessKeyId=DO00JHP28VRPKZVHGEGN&Signature=4DcJIPxXyC9f9yVzN1%2B%2FzJb7E8M%3D&Expires=1772340296",
    categories: ["All", "Articles"],
    href: "/blogs/student-exchange-programs-in-ksa",
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
