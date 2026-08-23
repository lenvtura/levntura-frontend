import type { Block } from 'payload'

/**
 * ProgramShowcase — mirrors `our-program-section.tsx`.
 *
 * Light teal section: tag column + SectionTitle "Our Programs" + arrow CTA,
 * followed by a horizontal slider of program cards (image + label).
 *
 * Self-contained: the program list lives inside this block (not linked to
 * the Programs collection). For an auto-fetched variant tied to Programs,
 * use the separate `ProgramsList` block instead.
 */
export const ProgramShowcaseBlock: Block = {
  slug: 'programShowcase',
  labels: { singular: 'Program Showcase', plural: 'Program Showcases' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Our Programs',
    },
    {
      name: 'programTypes',
      type: 'array',
      labels: { singular: 'Program Type', plural: 'Program Types' },
      admin: {
        description: 'Tag list shown to the left of the heading.',
      },
      defaultValue: [
        { label: 'Summer Work & Travel' },
        { label: 'Camp Counselor' },
        { label: 'Internship & Trainee Programs' },
        { label: 'Study Abroad' },
        { label: 'Language Programs' },
        { label: 'Summer Camp' },
        { label: 'Volunteering Programs' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Explore Our Programs',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/programs',
        },
      ],
    },
    {
      name: 'programs',
      type: 'array',
      labels: { singular: 'Program Card', plural: 'Program Cards' },
      admin: {
        description:
          'Cards shown in the horizontal slider. Leave empty to render the original 7 program set as a fallback.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'tealLight',
      admin: { description: 'Section background.' },
      options: [
        { label: 'Teal Light (#D8E6E6)', value: 'tealLight' },
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Pink', value: 'lev-pink' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
