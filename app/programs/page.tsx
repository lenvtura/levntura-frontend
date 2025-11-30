"use client";

import { useState, useMemo } from "react";
import { ProgramsHeader } from "./programs-header";
import { ProgramsGrid } from "./programs-grid";
import { PROGRAMS_DATA } from "./programs-data";

export default function ProgramsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter((program) => {
      // Filter by category
      const matchesCategory = program.category.includes(activeFilter);

      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.duration.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <ProgramsHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ProgramsGrid programs={filteredPrograms} />
    </div>
  );
}
