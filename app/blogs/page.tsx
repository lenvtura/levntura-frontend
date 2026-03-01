"use client";

import { useMemo, useState } from "react";
import { BlogsHeader } from "./blogs-header";
import { FeaturedBlogCard } from "./featured-blog-card";
import { BlogsGrid } from "./blogs-grid";
import { Pagination } from "./pagination";
import { BecomePartOfConversation } from "./become-part-of-conversation";
import {
  BLOGS_DATA,
  getPaginatedBlogs,
  getTotalPages,
  BLOGS_PER_PAGE,
} from "./blogs-data";

// Memoized filter function (rerender-memo)
const filterBlogs = (
  blogs: typeof BLOGS_DATA,
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

// Memoized pagination function (rerender-memo)
const paginateBlogs = (
  filteredBlogs: typeof BLOGS_DATA,
  currentPage: number,
) => {
  return getPaginatedBlogs(filteredBlogs, currentPage, BLOGS_PER_PAGE);
};

export default function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredBlog = useMemo(
    () => BLOGS_DATA.find((blog) => blog.featured),
    [],
  );

  const filteredBlogs = useMemo(
    () => filterBlogs(BLOGS_DATA, activeFilter, searchQuery),
    [activeFilter, searchQuery],
  );

  const paginatedBlogs = useMemo(
    () => paginateBlogs(filteredBlogs, currentPage),
    [filteredBlogs, currentPage],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredBlogs.length, BLOGS_PER_PAGE),
    [filteredBlogs.length],
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <BecomePartOfConversation />
    </div>
  );
}
