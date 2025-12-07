import { StaticImageData } from "next/image";
import workImage from "@/assets/photos/work.png";
import studyImage from "@/assets/photos/study.png";
import counselorImage from "@/assets/photos/counselor.png";
import studentsImage from "@/assets/photos/students.png";
import australiaImage from "@/assets/photos/australia.png";
import canadaImage from "@/assets/photos/canada.png";
import londonImage from "@/assets/photos/london.png";
import usaImage from "@/assets/photos/usa.png";

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  image?: StaticImageData | string;
  imagePosition?: "left" | "right" | "full";
}

export interface BlogDetail {
  slug: string;
  heroImage: StaticImageData | string;
  breadcrumbs: string[];
  title: string;
  sections: BlogSection[];
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
  "unlock-new-worlds": {
    slug: "unlock-new-worlds",
    heroImage: workImage,
    breadcrumbs: ["Home", "World"],
    title:
      "unlock new worlds: summer work and travel opportunities in the arab world",
    sections: [
      {
        id: "introduction",
        title: "introduction",
        content: `Are you ready to embark on an adventure that will not only enhance your resume but also expand your cultural horizons? "Levntura" invites students like you to dive into the vibrant cultures of the Arab world through our tailored summer work and travel programs. Whether you're looking to gain practical experience, learn a new language, or meet people from diverse backgrounds, our programs offer something unique for everyone.`,
        image: studentsImage,
        imagePosition: "full",
      },
      {
        id: "cultural-exchange-program",
        title: "why choose a cultural exchange program in the arab world?",
        content: `The Arab world, with its rich history and diverse cultures, offers a unique backdrop for a transformative summer experience. From the bustling markets of Marrakech to the modern skylines of Dubai, each destination offers a blend of tradition and modernity. By choosing to work and travel in this region, you'll gain:

1. Professional Experience
Work in sectors like tourism, education, or non-profit organizations, gaining skills that employers value.

2. Cultural Immersion
Live like a local, learn Arabic phrases, and experience daily life in a completely new cultural setting.

3. Network Building
Connect with professionals and peers from around the world, creating international networks that last a lifetime.`,
        image: studyImage,
        imagePosition: "right",
      },
      {
        id: "what-to-expect",
        title: "what can you expect from our programs?",
        content: `Our programs are designed with your growth and safety in mind:

Structured Placements
We place you in vetted work positions suited to your academic background and career aspirations.

Accommodation
Safe, comfortable housing is arranged for all participants, along with logistical support throughout your stay.

Cultural Activities
Participate in guided tours, cooking classes, and local festivals to enrich your understanding of the region.`,
        image: counselorImage,
        imagePosition: "full",
      },
    ],
    pastStudent: {
      image: studentsImage,
      name: "Sarah Ripley",
      bio: `Sarah Ripley Is An Investigative Journalist And A New York Times Bestselling Author. Her Latest Book Is High Conflict: Why We Get Trapped And How We Get Out.`,
    },
    moreToRead: {
      title: "more to read,",
      subtitle: "better to know.",
      description:
        "Explore University's 10+ courses across various specialisations that provoke intellectual and intuitive learning among students.",
      images: [australiaImage, canadaImage, londonImage, usaImage],
    },
  },
};
