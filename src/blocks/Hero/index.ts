import type { Block } from 'payload'

const HERO_BG_COLORS = [
  { label: 'Transparent / None', value: 'none' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Pink', value: 'lev-pink' },
  { label: 'Brand Black', value: 'lev-black' },
  { label: 'White', value: 'white' },
] as const

const HIGHLIGHT_COLORS = [
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
] as const

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'splitRight',
      enumName: 'enum_hero_variant',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Split — Image Right', value: 'splitRight' },
        { label: 'Split — Image Left', value: 'splitLeft' },
        { label: 'Full Background', value: 'fullBackground' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'DISCOVER LEVNTURA',
      admin: { description: 'Small text above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'WHERE JOURNEYS\nBEGIN',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWord',
      type: 'text',
      localized: true,
      defaultValue: 'BEGIN',
      admin: {
        description:
          'Substring of the heading rendered in the highlight color. Leave empty for a single-color heading.',
      },
    },
    {
      name: 'highlightColor',
      type: 'select',
      defaultValue: 'lev-orange',
      enumName: 'enum_hero_highlight',
      options: [...HIGHLIGHT_COLORS],
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Body text below the heading. Use line breaks to split into paragraphs.',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'actions',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          enumName: 'enum_hero_action_style',
          options: [
            { label: 'Primary (filled)', value: 'primary' },
            { label: 'Secondary (outlined)', value: 'secondary' },
            { label: 'Ghost (text only)', value: 'ghost' },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow',
      enumName: 'enum_hero_bg_color',
      admin: {
        description:
          'Section background color (ignored when variant is "Full Background" — that uses the uploaded image).',
      },
      options: [...HERO_BG_COLORS],
    },
    {
      name: 'textColor',
      type: 'select',
      defaultValue: 'dark',
      enumName: 'enum_hero_text_color',
      admin: {
        description: 'Text + UI color, choose based on bg contrast.',
      },
      options: [
        { label: 'Dark (for light backgrounds)', value: 'dark' },
        { label: 'Light (for dark backgrounds)', value: 'light' },
      ],
    },
  ],
}
