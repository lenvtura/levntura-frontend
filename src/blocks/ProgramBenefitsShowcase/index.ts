import type { Block } from 'payload'

/**
 * ProgramBenefitsShowcase — section 9: a title + a pill-grid checklist of
 * short benefit statements. Rendered by `program-benefits-showcase.tsx`.
 */
export const ProgramBenefitsShowcaseBlock: Block = {
  slug: 'programBenefitsShowcase',
  labels: {
    singular: 'Program — Benefits Showcase',
    plural: 'Program — Benefits Showcase',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'AN AMAZING\nEXPERIENCE',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'AMAZING EXPERIENCE',
      admin: {
        description:
          'Exact consecutive words from the title to color in the accent (e.g. "AMAZING EXPERIENCE"). Leave empty for a single-color title.',
      },
    },
    {
      name: 'items',
      type: 'array',
      localized: true,
      labels: { singular: 'Checklist item', plural: 'Checklist items' },
      defaultValue: [
        { text: 'Make lifelong friends' },
        { text: 'Explore new places' },
        { text: 'Grow professionally' },
      ],
      fields: [
        { name: 'text', type: 'text', required: true, defaultValue: 'Checklist item' },
      ],
    },
  ],
}
