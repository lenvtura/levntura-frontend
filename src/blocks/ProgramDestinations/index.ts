import type { Block } from 'payload'

/**
 * ProgramDestinations — section 8: lead text + title + a slider of
 * round-image destination cards (area + country). Rendered by
 * `program-destinations.tsx`.
 */
export const ProgramDestinationsBlock: Block = {
  slug: 'programDestinations',
  labels: {
    singular: 'Program — Destinations',
    plural: 'Program — Destinations',
  },
  fields: [
    { name: 'leadText', type: 'textarea', localized: true },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'CHOOSE YOUR\nNEXT ADVENTURE',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'NEXT ADVENTURE',
      admin: {
        description:
          'Exact consecutive words from the heading to color in the accent. Leave empty for a single-color title.',
      },
    },
    {
      name: 'items',
      type: 'array',
      localized: true,
      labels: { singular: 'Destination', plural: 'Destinations' },
      defaultValue: [{ area: 'DESTINATION' }],
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'area', type: 'text', required: true, defaultValue: 'DESTINATION' },
        { name: 'country', type: 'text' },
      ],
    },
  ],
}
