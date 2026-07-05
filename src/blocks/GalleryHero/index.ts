import type { Block } from 'payload'

/**
 * GalleryHero — 1:1 port of the legacy static `app/gallery/gallery-hero.tsx`.
 *
 * Renders the brand "WE ARE CREATING MEMORIES, ARE YOU JOINING?" headline
 * with the exact multi-color span treatment (alternating lev-red-dark +
 * lev-red across 6 word groups) plus a centered intro paragraph.
 *
 * Why a dedicated block instead of reusing the generic Hero block:
 *   - The headline structure is brand-specific (6 colored spans on 3
 *     lines) and can't be expressed with the Hero block's single
 *     highlightedWord field.
 *   - The vertical padding + body width match the legacy SectionTitle
 *     layout exactly (py-30, max-w-3xl) — different from the generic
 *     Hero's centered variant.
 *
 * Editor controls intentionally minimal:
 *   - body: the intro paragraph under the title (localized)
 *   - backgroundColor: optional section bg
 *
 * The headline text is fixed in the frontend component to preserve the
 * exact visual. If a future page needs a different headline, fork this
 * block or add a `headingOverride` field then.
 */
export const GalleryHeroBlock: Block = {
  slug: 'galleryHero',
  labels: { singular: 'Gallery Hero', plural: 'Gallery Heros' },
  fields: [
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      defaultValue:
        "At Levntura, every picture tells a story—a story of discovery, friendship, and unforgettable moments that shape who we are. From summer adventures in the U.S. to cultural exchanges around the world, our gallery captures the essence of what it means to explore, connect, and grow. These are the memories we're proud to create together—moments that remind us that every journey starts with a single step",
      admin: {
        description: 'Centered intro paragraph rendered below the headline.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'none',
      enumName: 'enum_gallery_hero_bg',
      options: [
        { label: 'None', value: 'none' },
        { label: 'White', value: 'white' },
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Pink', value: 'lev-pink' },
      ],
    },
  ],
}
