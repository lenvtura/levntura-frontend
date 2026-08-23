import type { Block } from 'payload'

/**
 * MissionStats — mirrors `app/about/mission-and-stats.tsx`.
 *
 * Colored section with a 2-column mission statement at top (SectionTitle +
 * 2 paragraphs), then a big stats strip underneath.
 */
export const MissionStatsBlock: Block = {
  slug: 'missionStats',
  labels: { singular: 'Mission & Stats', plural: 'Mission & Stats' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'WHAT IS OUR\nMISSION',
      admin: {
        description: 'Section heading. Use \\n for a line break.',
      },
    },
    {
      name: 'paragraphs',
      type: 'array',
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      defaultValue: [
        {
          text: 'between their dreams and reality, by providing the opportunities, tools and strategies for achieving the greater result.',
        },
        {
          text: "Levntura facilitates the youth's connection locally and globally, to create leaders with exceptional set of skills, by means of our study abroad programs, personal development seminars, local and global volunteering opportunities, and most importantly, cultural exchange programs.",
        },
      ],
      fields: [
        { name: 'text', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      defaultValue: [
        { value: '20+', label: 'COUNTRIES' },
        { value: '6.5K', label: 'STUDENTS' },
        { value: '1.5K', label: 'UNIVERSITIES' },
      ],
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-orange',
      enumName: 'enum_ms_bg_color',
      options: [
        { label: 'Brand Orange', value: 'lev-orange' },
        { label: 'Brand Red', value: 'lev-red' },
        { label: 'Brand Blue', value: 'lev-blue' },
        { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
        { label: 'Brand Green Dark', value: 'lev-green-dark' },
        { label: 'Brand Black', value: 'lev-black' },
      ],
    },
    {
      name: 'statValueColor',
      type: 'select',
      defaultValue: 'lev-yellow',
      enumName: 'enum_ms_value_color',
      admin: { description: 'Color of the big stat numbers.' },
      options: [
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Orange', value: 'lev-orange' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
