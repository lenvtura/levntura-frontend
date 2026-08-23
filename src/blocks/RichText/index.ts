import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text Sections' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Narrow (prose)', value: 'narrow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
      ],
    },
  ],
}