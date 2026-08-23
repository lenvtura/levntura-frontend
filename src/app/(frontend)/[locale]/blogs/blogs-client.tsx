"use client";

import { useMemo, useState } from "react";
import { BlogsHeader } from "./blogs-header";
import { FeaturedBlogCard } from "./featured-blog-card";
import { BlogsGrid } from "./blogs-grid";
import { Pagination } from "./pagination";
import { BecomePartOfConversation } from "./become-part-of-conversation";
import { type BlogPost, BLOGS_PER_PAGE, getPaginatedBlogs, getTotalPages } from "./blog-utils";
import type { Locale } from "@/lib/types";

interface BlogsClientProps {
  posts: BlogPost[];
  filterOptions?: string[];
  /**
   * Reserved for API compatibility (BlogsClient used to thread the locale
   * down to every child). All translations now flow through next-intl's
   * client provider, so this prop is no longer consumed here.
   */
  locale?: Locale;
}

const filterBlogs = (
  blogs: BlogPost[],
  activeFilter: string,
  searchQuery: string,
) => {
  const searchLower = searchQuery.toLowerCase();

  return blogs.filter((blog) => {
    const matchesCategory = blog.categories.includes(activeFilter);

    const matchesSearch =
      searchLower === "" ||
      blog.title.toLowerCase().includes(searchLower) ||
      blog.description.toLowerCase().includes(searchLower) ||
      blog.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });
};

export function BlogsClient({ posts, filterOptions }: BlogsClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredBlog = useMemo(
    () => posts.find((blog) => blog.featured),
    [posts],
  );

  const filteredBlogs = useMemo(
    () => filterBlogs(posts, activeFilter, searchQuery),
    [posts, activeFilter, searchQuery],
  );

  const paginatedBlogs = useMemo(
    () => getPaginatedBlogs(filteredBlogs, currentPage, BLOGS_PER_PAGE),
    [filteredBlogs, currentPage],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredBlogs.length, BLOGS_PER_PAGE),
    [filteredBlogs.length],
  );

  return (
    <div className="min-h-screen bg-white">
      <BlogsHeader />

      {featuredBlog && (
        <FeaturedBlogCard
          image={featuredBlog.image}
          category={featuredBlog.category}
          readTime={featuredBlog.readTime}
          title={featuredBlog.title}
          description={featuredBlog.description}
          date={featuredBlog.date}
          href={featuredBlog.href}
        />
      )}

      <BlogsGrid
        blogs={paginatedBlogs}
        activeFilter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        filterOptions={filterOptions}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <BecomePartOfConversation />
    </div>
  );
}
