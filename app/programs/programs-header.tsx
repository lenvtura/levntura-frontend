"use client";

import { Input } from "@/design-system/input";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";
import { Search } from "lucide-react";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/design-system/input-group";

const FILTER_OPTIONS = ["All", "Usa", "Uk", "Stories"];

interface ProgramsHeaderProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProgramsHeader({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ProgramsHeaderProps) {
  return (
    <div className="container py-12 lg:py-24">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h1 className="typography-EB48 lg:typography-EB74 uppercase text-lev-green-dark mb-4">
          OUR PROGRAMS
        </h1>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }}>
        <p className="text-lev-gray max-w-[600px] mb-12 leading-relaxed">
          Discover Our Programs: personalized support, workshops, and counseling
          services designed to empower and enhance well-being.
        </p>
      </FadeUpAnimator>

      <div className="flex max-md:flex-col gap-6 items-start md:items-center justify-between">
        <FadeUpAnimator
          transition={{ delay: 0.3 }}
          className="flex gap-3 flex-wrap"
        >
          {FILTER_OPTIONS.map((filter) => (
            <Button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "typography-S14 border-0 rounded-lg transition-colors",
                activeFilter === filter
                  ? "bg-lev-green-dark text-white hover:bg-lev-green-dark/90"
                  : "bg-white text-lev-black hover:bg-lev-black/5"
              )}
            >
              {filter}
            </Button>
          ))}
        </FadeUpAnimator>

        <FadeUpAnimator
          transition={{ delay: 0.4 }}
          className="relative w-full md:w-auto md:min-w-[300px]"
        >
          <InputGroup className="rounded-none shadow-none">
            <InputGroupInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <Search className="size-5 text-lev-gray" />
            </InputGroupAddon>
          </InputGroup>
        </FadeUpAnimator>
      </div>
    </div>
  );
}
