import type { Block } from 'payload'

const BG_COLORS = [
  { label: 'Transparent / None', value: 'none' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Pink', value: 'lev-pink' },
  { label: 'White', value: 'white' },
] as const

/**
 * MemoriesGrid — mirrors `app/about/tour-images.tsx`.
 *
 * 3-column masonry of photos with a gradient fade at the bottom revealing a
 * centered title + primary CTA + secondary "See all photos" link. Used on
 * About for "WE ARE CREATING MEMORIES, ARE YOU JOINING?".
 *
 * Falls back to the 8 packaged tour-images photos when no images are uploaded,
 * so the section looks correct even before DO Spaces is wired.
 */
export const MemoriesGridBlock: Block = {
  slug: 'memoriesGrid',
  labels: { singular: 'Memories Grid', plural: 'Memories Grids' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'We are creating memories, are you joining?',
      admin: { description: 'Overlay title shown centered at the bottom.' },
    },
    {
      // Single `upload` field with `hasMany: true` so editors can pick
      // (and bulk-select) photos from the Media library in one dialog —
      // much faster than the previous "Add Image" array of cards.
      // The alt text flows directly from each Media doc's `alt`, so we
      // intentionally do NOT carry a per-block `alt` here. Mirrors the
      // PhotoGrid pattern.
      //
      // Workflow:
      //   1. Bulk-upload photos via Media collection's "Bulk Upload" button
      //   2. Open this block, multi-select the new photos in one go
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description:
          'Pick photos from the Media library (multi-select). Distributed across 3 columns in masonry layout. Leave empty to use the packaged fallback set (8 photos).',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Start now!',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'secondaryLink',
      type: 'group',
      label: 'Secondary Link',
      admin: { description: 'Small text link under the primary CTA.' },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'See all photos',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/gallery',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow-light',
      enumName: 'enum_memories_grid_bg',
      admin: {
        description:
          'Section background. The gradient fade at the bottom is matched to this color.',
      },
      options: [...BG_COLORS],
    },
  ],
}
