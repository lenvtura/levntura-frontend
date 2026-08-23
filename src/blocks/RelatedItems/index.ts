import type { Block } from 'payload'

/**
 * RelatedItems — mirrors `app/careers/related-programs.tsx`.
 *
 * Section heading + small "View All" link + 2-4 column card grid. Each
 * card: full-bleed image + dark gradient + title at the bottom + link.
 * Useful for "Related Programs", "See Also", "More Reading" patterns.
 */
export const RelatedItemsBlock: Block = {
  slug: 'relatedItems',
  labels: { singular: 'Related Items', plural: 'Related Items' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Related Programs',
    },
    {
      name: 'sectionLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Programs',
      admin: {
        description: 'Small label on the left of the "View All" row.',
      },
    },
    {
      name: 'viewAll',
      type: 'group',
      label: 'View All Link',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'View All',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/programs',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { description: 'Where the card links to.' },
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      enumName: 'enum_ri_columns',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-green-dark',
      enumName: 'enum_ri_bg_color',
      options: [
        { label: 'Brand Green Dark', value: 'lev-green-dark' },
        { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
        { label: 'Brand Black', value: 'lev-black' },
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
