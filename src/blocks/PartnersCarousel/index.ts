import type { Block } from 'payload'

const HIGHLIGHT_COLORS = [
  { label: 'None (use default heading color)', value: 'none' },
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
] as const

const HEADING_COLORS = [
  { label: 'Brand Blue Dark (default)', value: 'lev-blue-dark' },
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Black', value: 'lev-black' },
  { label: 'White', value: 'white' },
] as const

const BG_COLORS = [
  { label: 'Transparent / None', value: 'none' },
  { label: 'White', value: 'white' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Pink', value: 'lev-pink' },
] as const

/**
 * PartnersCarousel — mirrors `who-we-are-section.tsx` and About's
 * `cultural-exchange.tsx`.
 *
 * SectionTitle (optional eyebrow above, optional highlighted prefix) +
 * scrolling logo strip + CTA + 2 paragraphs.
 */
export const PartnersCarouselBlock: Block = {
  slug: 'partnersCarousel',
  labels: { singular: 'Partners Carousel', plural: 'Partners Carousels' },
  fields: [
    {
      name: 'eyebrow',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Optional intro paragraph rendered above the main heading (used on About for the "From exchange programs..." intro).',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Who We Are',
      admin: {
        description:
          'Main heading. Use \\n for line breaks. The "highlightedWord" substring (if set) is rendered in the highlight color.',
      },
    },
    {
      name: 'highlightedWord',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Substring of the heading rendered in the highlight color. Leave empty for a single-color heading.',
      },
    },
    {
      name: 'highlightColor',
      type: 'select',
      defaultValue: 'none',
      enumName: 'enum_partners_highlight',
      options: [...HIGHLIGHT_COLORS],
    },
    {
      name: 'headingColor',
      type: 'select',
      defaultValue: 'lev-blue-dark',
      enumName: 'enum_partners_heading',
      admin: { description: 'Color of the (non-highlighted part of) the heading.' },
      options: [...HEADING_COLORS],
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Levntura was founded on the belief that learning should go beyond classrooms—it should be an adventure that shapes minds and futures, we empower Middle Eastern youth to explore new cultures, dream bigger, and grow through meaningful travel and learning experiences. Our mission is simple: to inspire transformation through experience and prepare students not just for success—but for life.',
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Headquartered in Amman, Jordan, with a regional office in Cairo, Egypt, Levntura has become one of the leading youth mobility platforms in the Middle East. We collaborate with internationally recognized educational and cultural organizations to deliver high-quality exchange and internship opportunities worldwide.',
    },
    {
      name: 'partners',
      type: 'array',
      labels: { singular: 'Partner Logo', plural: 'Partner Logos' },
      admin: {
        description:
          'Upload partner / university logos. Leave the list empty to render the original 5 logo set as a fallback.',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          admin: { description: 'Alt text — used by screen readers.' },
        },
      ],
    },
    {
      name: 'storyImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional photo rendered on the right side next to paragraph2 + CTA (mirrors the "pool team" photo in the About Cultural Exchange section).',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'About us',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/about',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'none',
      enumName: 'enum_partners_bg',
      admin: { description: 'Section background color.' },
      options: [...BG_COLORS],
    },
  ],
}
