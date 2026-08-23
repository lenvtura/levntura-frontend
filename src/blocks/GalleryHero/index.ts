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
 * Editor controls:
 *   - heading: the headline, line breaks preserved (localized)
 *   - highlightedWords: consecutive words from the headline rendered in
 *     the bright accent red — the rest renders in dark red (localized)
 *   - body: the intro paragraph under the title (localized)
 *   - backgroundColor: optional section bg
 */
export const GalleryHeroBlock: Block = {
  slug: 'galleryHero',
  labels: { singular: 'Gallery Hero', plural: 'Gallery Heros' },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      localized: true,
      defaultValue: 'WE ARE CREATING\nMEMORIES, ARE\nYOU JOINING?',
      admin: {
        description:
          'Headline — line breaks are kept. Words listed in "Highlighted Words" render in bright red.',
      },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'CREATING MEMORIES,',
      admin: {
        description:
          'Exact consecutive words from the headline to color in bright red (e.g. "CREATING MEMORIES,").',
      },
    },
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
