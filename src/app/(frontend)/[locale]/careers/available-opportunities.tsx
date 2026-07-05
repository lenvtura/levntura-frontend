"use client";

import { Input } from "@/design-system/input";
import { Search } from "lucide-react";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { JobOpportunityCard } from "./job-opportunity-card";
import type { JobOpportunity } from "./careers-data";

interface AvailableOpportunitiesProps {
  opportunities: JobOpportunity[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AvailableOpportunities({
  opportunities,
  searchQuery,
  onSearchChange,
}: AvailableOpportunitiesProps) {
  return (
    <div className="relative min-h-screen">
      {/* Dark teal left side background */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[30%] bg-lev-green-dark" />
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[24px] bg-lev-green-dark" />

      {/* White right side content */}
      <div className="relative lg:ml-[30%]">
        <div className="container p-12 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <FadeUpAnimator
                className="typography-S34 uppercase text-lev-black"
                transition={{ delay: 0.1 }}
              >
                AVAILABLE <br /> OPPORTUNITIES
              </FadeUpAnimator>
              <div className="opacity-50">
                <FadeUpAnimator
                  transition={{ delay: 0.2 }}
                  className="text-lev-red-dark max-w-[600px] leading-normal"
                >
                  Cultivate the next generation of global leaders through
                  immersive international experiences. Our tailor-made programs
                  are designed not just to traverse borders, but to transcend
                  them.
                </FadeUpAnimator>
              </div>
            </div>
          </div>

          <FadeUpAnimator
            transition={{ delay: 0.3 }}
            className="relative mb-12"
          >
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-lev-gray w-5 h-5" />
          </FadeUpAnimator>

          {opportunities.length === 0 ? (
            <p className="text-center text-lev-gray typography-M18 py-12">
              No opportunities found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {opportunities.map((opportunity, index) => (
                <FadeUpAnimator
                  key={opportunity.id}
                  transition={{ delay: 0.1 * (index % 4) }}
                  className="h-full"
                >
                  <JobOpportunityCard
                    image={opportunity.image}
                    type={opportunity.type}
                    country={opportunity.country}
                    countryCode={opportunity.countryCode}
                    title={opportunity.title}
                    category={opportunity.category}
                    dates={opportunity.dates}
                    description={opportunity.description}
                    salary={opportunity.salary}
                    applyHref={opportunity.applyHref}
                    moreHref={opportunity.moreHref}
                  />
                </FadeUpAnimator>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
