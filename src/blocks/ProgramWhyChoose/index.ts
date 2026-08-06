import type { Block } from 'payload'

/**
 * ProgramWhyChoose — section 12: a title + a two-column grid of features
 * (icon + title + description). Rendered by `program-why-choose.tsx`.
 */
export const ProgramWhyChooseBlock: Block = {
  slug: 'programWhyChoose',
  labels: { singular: 'Program — Why Choose', plural: 'Program — Why Choose' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Why Choose\nLevntura?',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'Levntura?',
      admin: {
        description:
          'Exact consecutive words from the heading to color in the accent. Leave empty for a single-color title.',
      },
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      labels: { singular: 'Feature', plural: 'Features' },
      defaultValue: [
        { iconKey: 'star', title: 'Trusted experience' },
        { iconKey: 'people', title: 'Personal support' },
      ],
      fields: [
        {
          name: 'iconKey',
          type: 'select',
          required: true,
          defaultValue: 'star',
          enumName: 'enum_prog_block_feat_icon',
          options: [
            { label: 'Star', value: 'star' },
            { label: 'Bag', value: 'bag' },
            { label: 'Hand', value: 'hand' },
            { label: 'People', value: 'people' },
            { label: 'Face / Smile', value: 'face' },
            { label: 'Check', value: 'check' },
          ],
        },
        { name: 'title', type: 'text', required: true, defaultValue: 'Feature' },
        { name: 'description', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional image shown instead of the icon. Leave empty to use the icon.',
          },
        },
      ],
    },
  ],
}
