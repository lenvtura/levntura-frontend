import type { Block } from 'payload'

const BG_COLORS = [
  { label: 'White', value: 'white' },
  { label: 'Transparent / None', value: 'none' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Pink', value: 'lev-pink' },
] as const

export const PhotoGridBlock: Block = {
  slug: 'photoGrid',
  labels: { singular: 'Photo Grid', plural: 'Photo Grids' },
  fields: [
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description:
          'Pick photos from the Media library (multi-select). Bulk-upload to Media first if you have many. Leave empty to use the packaged fallback set.',
      },
    },
    {
      name: 'initialCount',
      type: 'number',
      defaultValue: 12,
      min: 1,
      admin: {
        description: 'How many images to show before clicking "Show more".',
      },
    },
    {
      name: 'batchSize',
      type: 'number',
      defaultValue: 12,
      min: 1,
      admin: {
        description: 'How many more images to reveal per "Show more" click.',
      },
    },
    {
      name: 'showMoreLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Show more',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      enumName: 'enum_photo_grid_bg',
      options: [...BG_COLORS],
    },
  ],
}
