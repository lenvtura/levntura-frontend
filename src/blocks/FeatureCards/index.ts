import type { Block } from 'payload'

/**
 * FeatureCards — mirrors `work-and-travel-section.tsx`.
 *
 * Dark-themed section: SectionTitle + intro paragraph + top CTA, plus 1-4
 * feature cards. Each card has its own colored panel and Start-Now button.
 */

const BRAND_COLOR_OPTIONS = [
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Pink', value: 'lev-pink' },
  { label: 'White', value: 'white' },
] as const

export const FeatureCardsBlock: Block = {
  slug: 'featureCards',
  labels: { singular: 'Feature Cards', plural: 'Feature Cards' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'work & travel',
      admin: {
        description:
          'Section heading. Rendered uppercase. Use a line break (\\n) for a 2-line title in HTML markup.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Spend your summer living, working, and exploring the United States. The Work & Travel Program offers students the chance to experience American culture, build independence, and create memories that last a lifetime. Affordable, exciting, and empowering—you'll earn, learn, and travel across the States while discovering new friendships and a new version of yourself.",
    },
    {
      name: 'sectionCta',
      type: 'group',
      label: 'Section CTA (above the cards)',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Explore all programs',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/programs',
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description:
          'Each card: image + label (rendered over the image) + colored panel + Start Now button.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'panelColor',
          type: 'select',
          defaultValue: 'lev-blue-light',
          // Custom Postgres enum name — the auto-generated
          // `enum_<table>_blocks_feature_cards_cards_panel_color`
          // brushes against Postgres's 63-char identifier limit when this
          // block lives inside the `program_types` collection.
          enumName: 'enum_fc_card_panel_color',
          admin: { description: 'Color of the panel below the image.' },
          options: [...BRAND_COLOR_OPTIONS],
        },
        {
          name: 'overlayTextColor',
          type: 'select',
          defaultValue: 'lev-blue-light',
          // Custom enum name — same reason as above; the auto-generated
          // name `..._feature_cards_cards_overlay_text_color` (64 chars)
          // exceeded Postgres's 63-char identifier limit.
          enumName: 'enum_fc_card_text_color',
          admin: { description: 'Color of the label that floats over the image.' },
          options: [...BRAND_COLOR_OPTIONS],
        },
        {
          name: 'ctaUrl',
          type: 'text',
          admin: { description: 'Where the card\'s Start Now button links.' },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-blue-dark',
      enumName: 'enum_fc_bg_color',
      admin: { description: 'Section background color.' },
      options: [...BRAND_COLOR_OPTIONS],
    },
  ],
}
