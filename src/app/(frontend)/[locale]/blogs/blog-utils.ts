import type { StaticImageData } from "next/image";

/**
 * UI-side shape for blog cards on the listing page. The page maps CMS
 * docs into this shape so the existing card components keep working.
 */
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

export const BLOGS_PER_PAGE = 6;

export function getPaginatedBlogs(
  blogs: BlogPost[],
  page: number,
  perPage: number = BLOGS_PER_PAGE,
) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return blogs.slice(startIndex, endIndex);
}

export function getTotalPages(
  totalBlogs: number,
  perPage: number = BLOGS_PER_PAGE,
) {
  return Math.ceil(totalBlogs / perPage);
}
