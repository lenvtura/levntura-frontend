"use client";

import { useState, useMemo, useCallback } from "react";
import { ProgramsHero } from "./programs-hero";
import { ProgramsHeader } from "./programs-header";
import { ProgramsGrid } from "./programs-grid";
import type { Program, ProgramType } from "@/lib/types";

interface ProgramsViewProps {
  programs: Program[];
  types: ProgramType[];
  activeTypeSlug?: string;
  locale: "en" | "ar";
}

const ALL_COUNTRIES = "__all__";

export function ProgramsView({ programs, types, activeTypeSlug, locale }: ProgramsViewProps) {
  // selectedType is initialised from the URL-derived `activeTypeSlug` so
  // direct visits to /programs/category/X show the right pill active on
  // first paint. After mount it's controlled purely client-side — pill
  // clicks update state + URL via history.replaceState (no navigation).
  const [selectedType, setSelectedType] = useState<string | null>(activeTypeSlug ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>(ALL_COUNTRIES);

  /**
   * Pure client-side filter, matching the legacy `app/programs/page.tsx`
   * behaviour exactly: just update state. Deliberately NO URL sync.
   *
   * We tried `window.history.replaceState` here to keep the URL in sync
   * with the active filter (for shareability), but it triggered visible
   * scroll jumps on the user's side — likely interacting with the
   * `ScrollRestore` component on the root layout. Falling back to pure
   * state keeps the type pills as smooth as the legacy site, at the
   * cost of URL shareability for active filters. If we need that back
   * later, the path is: replace the global ScrollRestore with one that
   * only fires on real router events (not history.replaceState).
   */
  const handleTypeChange = useCallback((slug: string | null) => {
    setSelectedType(slug);
  }, []);

  // Distinct country codes derived from the actual programs the page received.
  // Sorted alphabetically so the dropdown order is stable across re-renders.
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    programs.forEach((p) => {
      if (p.country) set.add(p.country);
    });
    return Array.from(set).sort();
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      // Type filter — `type` is an array of ProgramType refs at depth=2.
      // Each entry can be either a populated ProgramType object (with
      // `slug`) or a bare id reference; we only match against the
      // populated objects to avoid silent false negatives.
      if (selectedType) {
        const types = Array.isArray(program.type) ? program.type : [];
        const matched = types.some(
          (t) => typeof t === "object" && t !== null && "slug" in t && t.slug === selectedType,
        );
        if (!matched) return false;
      }
      // Country filter
      if (countryFilter !== ALL_COUNTRIES && program.country !== countryFilter) {
        return false;
      }
      // Search filter
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        program.title?.toLowerCase().includes(query) ||
        program.shortDescription?.toLowerCase().includes(query) ||
        program.country?.toLowerCase().includes(query) ||
        program.duration?.toLowerCase().includes(query)
      );
    });
  }, [programs, selectedType, searchQuery, countryFilter]);

  return (
    <div className="min-h-screen bg-white">
      <ProgramsHero />
      <ProgramsHeader
        types={types}
        activeTypeSlug={selectedType ?? undefined}
        onTypeChange={handleTypeChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        availableCountries={availableCountries}
        countryFilter={countryFilter}
        onCountryChange={setCountryFilter}
      />
      <ProgramsGrid programs={filteredPrograms} locale={locale} />
    </div>
  );
}

// Sentinel value reused by ProgramsHeader as the "All" option in the country
// dropdown. Exported so both components agree on what "no filter" means.
export { ALL_COUNTRIES };
