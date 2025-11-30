"use client";

import { useState, useMemo } from "react";
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

export default function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Get featured blog
  const featuredBlog = useMemo(
    () => BLOGS_DATA.find((blog) => blog.featured),
    []
  );

  // Filter blogs (excluding featured)
  const filteredBlogs = useMemo(() => {
    return BLOGS_DATA.filter((blog) => {
      // Exclude featured blog from grid
      if (blog.featured) return false;

      // Filter by category
      const matchesCategory = blog.categories.includes(activeFilter);

      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Paginate filtered blogs
  const paginatedBlogs = useMemo(() => {
    return getPaginatedBlogs(filteredBlogs, currentPage, BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const totalPages = getTotalPages(filteredBlogs.length, BLOGS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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
          onPageChange={setCurrentPage}
        />
      )}

      <BecomePartOfConversation />
    </div>
  );
}
