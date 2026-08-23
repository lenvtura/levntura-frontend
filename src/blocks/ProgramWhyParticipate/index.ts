import type { Block } from 'payload'

/**
 * ProgramWhyParticipate — section 6: title + body + a draggable slider of
 * benefit cards (image background + title + description). Rendered by
 * `program-why-participate.tsx`.
 */
export const ProgramWhyParticipateBlock: Block = {
  slug: 'programWhyParticipate',
  labels: {
    singular: 'Program — Why Participate',
    plural: 'Program — Why Participate',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'WHY YOU\nSHOULD\nPARTICIPATE?',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'PARTICIPATE?',
      admin: {
        description:
          'Exact consecutive words from the heading to color in the accent. Leave empty for a single-color title.',
      },
    },
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      labels: { singular: 'Benefit', plural: 'Benefits' },
      defaultValue: [
        { title: 'MEET NEW\nFRIENDS' },
        { title: 'TRAVEL\nAROUND' },
      ],
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'BENEFIT',
          admin: { description: 'Use \\n for line breaks.' },
        },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
