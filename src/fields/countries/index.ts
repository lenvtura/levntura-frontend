/**
 * Shared country list used by both the Programs collection (single-select)
 * and the ProgramsList block filter (multi-select).
 *
 * Why this exists:
 *   The two lists used to be hand-maintained copies. They drifted — Ireland,
 *   South Africa, and "Multiple" were added to Programs but never copied to
 *   the ProgramsList filter, so editors couldn't filter a list-block by those
 *   countries (the option was silently missing from the dropdown).
 *
 * If you add a country here:
 *   1. Both admin selectors get the new option automatically.
 *   2. Update the frontend `ProgramCountry` type in
 *      `levntura-frontend/lib/types.ts` so TS knows about it.
 *   3. (Optional) Add a flag mapping in
 *      `levntura-frontend/app/programs/programs-header.tsx`
 *      (COUNTRY_FLAG_CODE) if the 2-letter code differs from the flagcdn
 *      ISO code (e.g. UK → gb).
 */
export const PROGRAM_COUNTRY_OPTIONS = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Canada', value: 'CA' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Spain', value: 'ES' },
  { label: 'Italy', value: 'IT' },
  { label: 'Australia', value: 'AU' },
  { label: 'Ireland', value: 'IE' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'Egypt', value: 'EG' },
  { label: 'Jordan', value: 'JO' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'UAE', value: 'AE' },
  { label: 'Multiple', value: 'multi' },
] as const

export type ProgramCountryValue = (typeof PROGRAM_COUNTRY_OPTIONS)[number]['value']
