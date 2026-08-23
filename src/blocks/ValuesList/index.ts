import type { Block } from 'payload'

/**
 * ValuesList — mirrors `app/about/values-we-live-by.tsx`.
 *
 * Section title + 3-column grid of numbered values. Each value: 2-digit
 * number, title, short description.
 */
export const ValuesListBlock: Block = {
  slug: 'valuesList',
  labels: { singular: 'Values List', plural: 'Values Lists' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Values We\nLive By',
      admin: { description: 'Section heading. Use \\n for a line break.' },
    },
    {
      name: 'values',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Value', plural: 'Values' },
      defaultValue: [
        {
          number: '01',
          title: 'Trust',
          description:
            'We build lasting relationships founded on honesty, transparency, and integrity—with our partners, clients, and team.',
        },
        {
          number: '02',
          title: 'Commitment',
          description:
            'We keep our word and deliver excellence—because actions speak louder than promises.',
        },
        {
          number: '03',
          title: 'Fun',
          description:
            "We believe joy fuels creativity—we're meant to learn, grow, and have a blast doing it.",
        },
        {
          number: '04',
          title: 'Growth',
          description:
            'We design growth—by pushing boundaries, learning continuously, and inspiring transformation.',
        },
        {
          number: '05',
          title: 'Empowerment',
          description:
            'We open minds, broaden horizons, and enable every young person to become a confident global leader.',
        },
      ],
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow-light',
      enumName: 'enum_vl_bg_color',
      options: [
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Pink', value: 'lev-pink' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
