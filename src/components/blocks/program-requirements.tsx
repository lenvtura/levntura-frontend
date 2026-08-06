"use client";

import { SectionTitle } from "@/components/sections/section-title";
import { TitleWithBreaks } from "@/app/(frontend)/[locale]/programs/work-and-travel/title-with-breaks";
import { Slider } from "@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider";
import { RequirementIcon } from "@/app/(frontend)/[locale]/programs/[programSlug]/icons";

import { HighlightedTitle } from "./highlighted-title";

type RequirementIconKey =
  | "passport"
  | "college"
  | "language"
  | "age"
  | "diploma";

interface Requirement {
  iconKey: RequirementIconKey;
  title: string;
  description?: string;
}

interface ProgramRequirementsBlockData {
  heading?: string;
  highlightedWords?: string;
  items?: Requirement[];
}

/** Block version of program-page section 10 (Requirements). 1:1 original. */
export function ProgramRequirementsBlock({
  block,
}: {
  block: ProgramRequirementsBlockData;
}) {
  const items = block.items ?? [];
  if (items.length === 0) return null;

  return (
    <div className="flex min-h-[60vh] gap-8 flex-col">
      <SectionTitle className="ms-auto me-[40px] lg:me-[350px] uppercase mb-[80px] text-lev-red">
        {block.heading ? (
          <HighlightedTitle
            title={block.heading}
            highlight={block.highlightedWords}
          />
        ) : (
          "Required"
        )}
      </SectionTitle>
      <div className="mb-[120px]">
        <Slider
          data={items}
          renderItem={(req) => (
            <div className="relative grid bg-white w-[250px] h-full gap-7 p-6">
              <span className="mb-14 inline-block">
                <RequirementIcon icon={req.iconKey} />
              </span>
              <TitleWithBreaks
                title={req.title}
                className="typography-S24 lg:typography-M24 self-end"
              />
              {req.description && (
                <p className="typography-R18 leading-6">{req.description}</p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
