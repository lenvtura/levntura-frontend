import type { Block } from 'payload'

/**
 * TravelDestinations — the scrolling/parallax row of destination image
 * cards. Mirrors the legacy components:
 *   - app/(home)/travels-imgs-dsk.tsx     (desktop drag-slider)
 *   - app/(home)/travels-imgs-mobile.tsx  (mobile scroll-bound parallax)
 *
 * Visually this block overlays the bottom of the previous section via a
 * negative `-mt-[200px]` margin in the frontend component — so on the
 * home page it's placed RIGHT AFTER the HeroHome block to recreate the
 * legacy `TravelImgSection` look (the strip sits at the bottom of the
 * Hero's "Empowering Youth..." intro area).
 *
 * Just the image strip — no text fields. The intro heading + paragraphs
 * live in `HeroHome.intro` because they're conceptually part of the hero
 * landing area. Editors who want only the strip (e.g. on About) can
 * place this block on its own; editors who want the full Hero look use
 * HeroHome → TravelDestinations as a pair.
 *
 * Each card supports an optional `url` — leave it blank for a static
 * image, or set a path/URL to make the whole card clickable.
 */
export const TravelDestinationsBlock: Block = {
  slug: 'travelDestinations',
  dbName: 'tdsts',
  labels: {
    singular: 'Travel Destinations Strip',
    plural: 'Travel Destinations Strips',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Destination Cards',
      labels: { singular: 'Destination', plural: 'Destinations' },
      minRows: 0,
      maxRows: 12,
      admin: {
        description:
          'Horizontal strip of destination cards. Reorder by dragging. Empty list hides the block entirely.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Card photo. Recommended ~600×600, landscape or square works.',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Caption shown in the bottom-left corner (e.g. "Australia", "Spain").',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description:
              'Optional. If set, the whole card becomes a link. Use a path for internal pages (e.g. "/programs/work-and-travel") or a full URL for external sites ("https://...").',
          },
        },
      ],
    },
  ],
}
