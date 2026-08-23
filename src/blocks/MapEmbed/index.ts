import type { Block } from 'payload'

/**
 * MapEmbed — mirrors `app/about/map.tsx`.
 *
 * Section with: small eyebrow + title on top-left, supporting paragraph
 * floating on top-right, decorative map image overlay, and a stat
 * (big number + label + paragraph) at the bottom-left.
 */
export const MapEmbedBlock: Block = {
  slug: 'mapEmbed',
  labels: { singular: 'Map Section', plural: 'Map Sections' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'vision',
      admin: { description: 'Small uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Our sights\nare set on\nbig goals',
      admin: { description: 'Section heading. Use \\n for line breaks.' },
    },
    {
      name: 'supportingParagraphs',
      type: 'array',
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      defaultValue: [
        {
          text: 'From poverty alleviation among youth to supporting affordable education worldwide.',
        },
        {
          text: 'We are committed to increasing awareness of international education privileges and providing development opportunities to 25,000 futuristic students and young adults in the next 5 years. We will achieve this by fostering intercultural understanding with our partners, extending our branches to other continents and negotiating better opportunities for the youth.',
        },
      ],
      fields: [
        { name: 'text', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Decorative map image. Falls back to the original Group 6210.png if empty.',
      },
    },
    {
      name: 'mapLink',
      type: 'text',
      admin: {
        description:
          'Optional Google Maps share link. Editor can copy from Google Maps. Leave empty for a static image-only section.',
      },
    },
    {
      name: 'stat',
      type: 'group',
      label: 'Bottom Stat',
      fields: [
        {
          name: 'value',
          type: 'text',
          defaultValue: '20+',
          admin: { description: 'Big number.' },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'COUNTRIES',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Across more than 20 countries, Levntura opens doors to exploration, learning, and cultural connection. From the timeless charm of Europe to the vibrant energy of Asia and the breathtaking landscapes of the Americas, our programs are crafted to give every student a passport to unforgettable global experiences. Whether your dream is to study, work, or lead abroad—Levntura is your gateway to a world without borders.',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow-light',
      enumName: 'enum_map_bg_color',
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
