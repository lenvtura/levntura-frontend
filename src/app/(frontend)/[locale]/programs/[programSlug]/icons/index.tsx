/**
 * Icon registry for the structured program detail page.
 *
 * Maps the `iconKey` enum stored in the CMS to a packaged SVG component.
 * Adding a new icon is a 3-step change:
 *   1. Drop the SVG file in this folder
 *   2. Import it below
 *   3. Add the key + label to the matching `enum_prog_*_icon` select in
 *      the Programs collection schema (backend)
 */

import { PassportSvg } from "./passport-svg";
import { CollegeSvg } from "./college-svg";
import { LanguageSvg } from "./language-svg";
import { AgeSvg } from "./age-svg";
import { DiplomaSvg } from "./diploma-svg";
import { StarSvg } from "./star-svg";
import { BagSvg } from "./bag-svg";
import { HandSvg } from "./hand-svg";
import { PeopleSvg } from "./people-svg";
import { FaceSvg } from "./face-svg";
import { CheckSvg } from "./check-svg";

import type {
  ProgramFeatureIcon,
  ProgramRequirementIcon,
} from "@/lib/types";

type IconComponent = React.ComponentType;

const REQUIREMENT_ICONS: Record<ProgramRequirementIcon, IconComponent> = {
  passport: PassportSvg,
  college: CollegeSvg,
  language: LanguageSvg,
  age: AgeSvg,
  diploma: DiplomaSvg,
};

const FEATURE_ICONS: Record<ProgramFeatureIcon, IconComponent> = {
  star: StarSvg,
  bag: BagSvg,
  hand: HandSvg,
  people: PeopleSvg,
  face: FaceSvg,
  check: CheckSvg,
};

export function RequirementIcon({ icon }: { icon: ProgramRequirementIcon }) {
  const Component = REQUIREMENT_ICONS[icon] ?? PassportSvg;
  return <Component />;
}

export function FeatureIcon({ icon }: { icon: ProgramFeatureIcon }) {
  const Component = FEATURE_ICONS[icon] ?? StarSvg;
  return <Component />;
}
