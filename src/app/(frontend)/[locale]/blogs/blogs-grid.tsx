"use client";

import { useTranslations } from "next-intl";

import { Input } from "@/design-system/input";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";
import { Search } from "lucide-react";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { BlogCard } from "./blog-card";
import type { BlogPost } from "./blog-utils";

const DEFAULT_FILTER_OPTIONS = ["All", "Articles", "Alumni", "Stories"];

interface BlogsGridProps {
  blogs: BlogPost[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterOptions?: string[];
}

export function BlogsGrid({
  blogs,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  filterOptions,
}: BlogsGridProps) {
  // Two namespaces — feature labels live in `blogs`, generic chrome
  // (search box, "All" filter) lives in `common`.
  const tBlogs = useTranslations("blogs");
  const tCommon = useTranslations("common");
  const FILTER_OPTIONS = filterOptions && filterOptions.length > 0
    ? filterOptions
    : DEFAULT_FILTER_OPTIONS;
  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="container-md">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <h2 className="typography-EB34 lg:typography-EB48 text-lev-green-dark mb-8">
            {tBlogs("latestArticles")}
          </h2>
        </FadeUpAnimator>

        <div className="flex max-md:flex-col gap-6 items-start md:items-center justify-between mb-12">
          <FadeUpAnimator
            transition={{ delay: 0.2 }}
            className="flex gap-3 flex-wrap"
          >
            {FILTER_OPTIONS.map((filter) => (
              <Button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={cn(
                  "typography-S14 rounded-lg px-4 border-0",
                  activeFilter === filter
                    ? "bg-lev-red text-white hover:bg-lev-red/90"
                    : "bg-white text-lev-black hover:text-lev-black hover:bg-lev-red/10"
                )}
              >
                {filter === "All" ? tCommon("all") : filter}
              </Button>
            ))}
          </FadeUpAnimator>

          <FadeUpAnimator
            transition={{ delay: 0.3 }}
            className="relative w-full md:w-auto md:min-w-[300px]"
          >
            <Input
              type="text"
              placeholder={tCommon("search")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-lev-gray w-5 h-5" />
          </FadeUpAnimator>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-lev-gray typography-M18 py-12">
            {tBlogs("noArticles")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 auto-rows-fr">
            {blogs.map((blog, index) => (
              <FadeUpAnimator
                key={blog.id}
                transition={{ delay: 0.1 * (index % 6) }}
                className="h-full"
              >
                <BlogCard
                  image={blog.image}
                  category={blog.category}
                  readTime={blog.readTime}
                  title={blog.title}
                  description={blog.description}
                  date={blog.date}
                  href={blog.href}
                />
              </FadeUpAnimator>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
