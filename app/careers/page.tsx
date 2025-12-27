"use client";

import { useState, useMemo } from "react";
import { CareersHero } from "./careers-hero";
import { AvailableOpportunities } from "./available-opportunities";
import { CareersPagination } from "./careers-pagination";
import { RelatedPrograms } from "./related-programs";
import { SuggestNewOpportunities } from "./suggest-new-opportunities";
import {
  JOB_OPPORTUNITIES,
  RELATED_PROGRAMS,
  getPaginatedJobs,
  getTotalPages,
  JOBS_PER_PAGE,
} from "./careers-data";

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter jobs by search query
  const filteredJobs = useMemo(() => {
    return JOB_OPPORTUNITIES.filter((job) => {
      if (searchQuery === "") return true;

      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  // Paginate filtered jobs
  const paginatedJobs = useMemo(() => {
    return getPaginatedJobs(filteredJobs, currentPage, JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const totalPages = getTotalPages(filteredJobs.length, JOBS_PER_PAGE);

  // Reset to page 1 when search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <CareersHero />

      <AvailableOpportunities
        opportunities={paginatedJobs}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {totalPages > 1 && (
        <CareersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <RelatedPrograms programs={RELATED_PROGRAMS} />

      <SuggestNewOpportunities />
    </div>
  );
}
