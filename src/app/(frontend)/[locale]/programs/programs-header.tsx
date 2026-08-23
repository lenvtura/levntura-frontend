"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";
import { Search } from "lucide-react";
import Image from "next/image";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/design-system/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/select";
import { ProgramType } from "@/lib/types";

import { ALL_COUNTRIES } from "./programs-view";

interface ProgramsHeaderProps {
  types: ProgramType[];
  activeTypeSlug?: string;
  /**
   * Switch the active type filter. Pass `null` to clear the filter
   * (i.e. show all types). ProgramsView owns the URL sync.
   */
  onTypeChange: (slug: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableCountries: string[];
  countryFilter: string;
  onCountryChange: (country: string) => void;
}

// Maps a program's `country` field (free-text, but usually a 2/3-letter code)
// to the flag image hosted on flagcdn.com. Falls back to whatever lowercase
// version of the country the editor entered — if it doesn't match a real ISO
// code the image just won't render and the text label still shows.
//
// flagcdn.com hostname is already allow-listed in next.config.ts.
const COUNTRY_FLAG_CODE: Record<string, string> = {
  US: "us",
  USA: "us",
  UK: "gb",
  GB: "gb",
};

function flagSrcFor(country: string): string {
  const code = COUNTRY_FLAG_CODE[country.toUpperCase()] ?? country.toLowerCase();
  return `https://flagcdn.com/w40/${code}.png`;
}

// Human-readable label for the dropdown. For codes we know we expand them;
// otherwise display the country code as-is so editors can use any value.
function countryLabel(country: string): string {
  switch (country.toUpperCase()) {
    case "US":
    case "USA":
      return "United States";
    case "UK":
    case "GB":
      return "United Kingdom";
    default:
      return country;
  }
}

export function ProgramsHeader({
  types,
  activeTypeSlug,
  onTypeChange,
  searchQuery,
  onSearchChange,
  availableCountries,
  countryFilter,
  onCountryChange,
}: ProgramsHeaderProps) {
  // Two namespaces — programs-specific labels in `programs`, the "All" pill
  // and search placeholder live in `common`.
  const tPrograms = useTranslations("programs");
  const tCommon = useTranslations("common");

  return (
    <div className="container-md py-12 lg:py-24">
      <FadeUpAnimator transition={{ delay: 0.1 }}>
        <h1 className="typography-EB48 lg:typography-EB74 uppercase text-lev-green-dark mb-4">
          {tPrograms("listing.title")}
        </h1>
      </FadeUpAnimator>

      <FadeUpAnimator transition={{ delay: 0.2 }}>
        <p className="text-lev-gray max-w-[600px] mb-12 leading-relaxed">
          {tPrograms("listing.intro")}
        </p>
      </FadeUpAnimator>

      {/* Row 1 — program type pills (own row so they can wrap without pushing
          the search input around). Buttons (not Links) so clicking only
          updates client state + URL via history.replaceState — no full
          page navigation, no hero re-mount, no flash. */}
      <FadeUpAnimator
        transition={{ delay: 0.3 }}
        className="flex gap-3 flex-wrap mb-6"
      >
        <Button
          type="button"
          variant={!activeTypeSlug ? "default" : "ghost"}
          onClick={() => onTypeChange(null)}
          className={cn(
            "typography-S14 border-0 rounded-lg transition-colors",
            !activeTypeSlug &&
              "bg-lev-green-dark text-white hover:bg-lev-green-dark/90"
          )}
        >
          {tCommon("all")}
        </Button>
        {types.map((type) => (
          <Button
            key={type.id}
            type="button"
            variant={activeTypeSlug === type.slug ? "default" : "ghost"}
            onClick={() => onTypeChange(type.slug)}
            className={cn(
              "typography-S14 border-0 rounded-lg transition-colors",
              activeTypeSlug === type.slug &&
                "bg-lev-green-dark text-white hover:bg-lev-green-dark/90"
            )}
          >
            {type.name}
          </Button>
        ))}
      </FadeUpAnimator>

      {/* Row 2 — country dropdown on the left, search on the right. */}
      <div className="flex max-md:flex-col gap-4 items-stretch md:items-center justify-between">
        {availableCountries.length > 1 ? (
          <FadeUpAnimator
            transition={{ delay: 0.35 }}
            className="w-full md:w-auto md:min-w-[220px]"
          >
            <Select value={countryFilter} onValueChange={onCountryChange}>
              <SelectTrigger
                className="typography-S14 rounded-lg border-lev-gray/30"
                aria-label={tPrograms("filters.countryLabel")}
              >
                <SelectValue placeholder={tPrograms("filters.allCountries")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_COUNTRIES}>
                  <span className="inline-flex items-center gap-2">
                    {tPrograms("filters.allCountries")}
                  </span>
                </SelectItem>
                {availableCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    <span className="inline-flex items-center gap-2">
                      <Image
                        src={flagSrcFor(country)}
                        alt=""
                        width={20}
                        height={14}
                        className="rounded-[2px] shrink-0 object-cover"
                        unoptimized
                      />
                      <span>{countryLabel(country)}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FadeUpAnimator>
        ) : (
          // Empty spacer keeps the search right-aligned even when the country
          // dropdown is hidden (only one distinct country available).
          <div className="hidden md:block" />
        )}

        <FadeUpAnimator
          transition={{ delay: 0.4 }}
          className="relative w-full md:w-auto md:min-w-[300px]"
        >
          <InputGroup className="rounded-none shadow-none">
            <InputGroupInput
              placeholder={tCommon("searchPlaceholder")}
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
