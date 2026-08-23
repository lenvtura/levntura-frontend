import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'CTAs' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'actions',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Brand', value: 'brand' },
        { label: 'Dark', value: 'dark' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, sib) => sib?.background === 'image',
      },
    },
  ],
}