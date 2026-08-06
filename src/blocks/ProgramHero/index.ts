import type { Block } from 'payload'

/**
 * ProgramHero — the full-screen hero at the top of a program page, as a
 * block so the whole program page can be built from `sections` (the same
 * page-builder model as Pages) instead of fixed structured fields.
 *
 * 1:1 with the legacy fixed hero: background image (or green fallback),
 * a centered Start-now button, and a centered uppercase stack of
 * tag / heading / subtitle / note. Rendered by `program-hero.tsx`.
 */
export const ProgramHeroBlock: Block = {
  slug: 'programHero',
  labels: { singular: 'Program Hero', plural: 'Program Heroes' },
  fields: [
    {
      name: 'tag',
      type: 'text',
      localized: true,
      defaultValue: 'SUMMER',
      admin: { description: 'Small label above the title, e.g. "SUMMER".' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'PROGRAM NAME',
      admin: { description: 'The big hero title (usually the program name).' },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: "BACHELOR & MASTER'S DEGREE STUDENTS",
      admin: { description: 'e.g. "BACHELOR & MASTER\'S DEGREE STUDENTS".' },
    },
    {
      name: 'note',
      type: 'text',
      localized: true,
      defaultValue: 'Program only to USA.',
      admin: { description: 'e.g. "Program only to USA.".' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Full-screen hero background. If left empty, a default hero image is shown so the section still looks complete.',
      },
    },
  ],
}
