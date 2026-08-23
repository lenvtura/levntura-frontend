import type { Block } from 'payload'

/**
 * Multi-column content with optional heading and links.
 * Each column can be 1/3, 1/2, 2/3, or full width.
 */
export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content', plural: 'Content Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Optional section heading shown above the columns. Rendered in the brand SectionTitle style (uppercase, blue-dark, large).',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Optional supporting text shown below the heading.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'One Third', value: 'oneThird' },
            { label: 'Half', value: 'half' },
            { label: 'Two Thirds', value: 'twoThirds' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
        },
        {
          name: 'link',
          type: 'group',
          admin: {
            condition: (_, sib) => Boolean(sib?.enableLink),
          },
          fields: [
            { name: 'label', type: 'text', localized: true, required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}