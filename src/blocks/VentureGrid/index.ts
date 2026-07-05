import type { Block } from 'payload'

const BG_COLORS = [
  { label: 'Transparent / None', value: 'none' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Pink', value: 'lev-pink' },
  { label: 'White', value: 'white' },
] as const

const HEADING_COLORS = [
  { label: 'Brand Blue Dark (default)', value: 'lev-blue-dark' },
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Black', value: 'lev-black' },
] as const

/**
 * VentureGrid — mirrors `app/about/venture.tsx` ("Designed for Global
 * Adventures").
 *
 * Two-row layout:
 *   Top:    heading + small subtitle on the left, first 2 image cards on right.
 *   Bottom: last 2 image cards + 2 short paragraphs on the right.
 *
 * Each card is just an image with a label rendered over the bottom — NO
 * colored panel or Start Now button (which is what `FeatureCards` does on the
 * home Work-and-Travel section). Keep both blocks separate so editors can
 * pick the right pattern for the page.
 */
export const VentureGridBlock: Block = {
  slug: 'ventureGrid',
  labels: { singular: 'Venture Grid', plural: 'Venture Grids' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Designed\nfor Global\nAdventureS',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue: 'Venture',
      admin: { description: 'Small label under the heading (e.g. "Venture").' },
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 0,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description:
          'Exactly 4 cards is the intended layout — 2 in the top row + 2 in the bottom row. Falls back to the original Internship / Counselor / Study & Travel / Work & Travel set when left empty.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      defaultValue: [
        { label: 'Internship' },
        { label: 'Counselor' },
        { label: 'Study & Travel' },
        { label: 'Work & Travel' },
      ],
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Explore Our Curated Programs Designed for Global Adventurers. From the sun-kissed beaches during our Summer Work & Travel to the enriching experience of being a Camp Counselor, each program is a step towards discovering your potential and igniting your future.',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow-light',
      enumName: 'enum_venture_bg',
      options: [...BG_COLORS],
    },
    {
      name: 'headingColor',
      type: 'select',
      defaultValue: 'lev-blue-dark',
      enumName: 'enum_venture_heading',
      options: [...HEADING_COLORS],
    },
  ],
}
