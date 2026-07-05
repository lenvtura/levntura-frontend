import type { Block } from 'payload'

/**
 * ImageFeature — eyebrow + heading + paragraph + full-width image below.
 *
 * Mirrors the `CampusLifeSection` static design exactly. The whole section
 * sits on a configurable brand background color.
 */
export const ImageFeatureBlock: Block = {
  slug: 'imageFeature',
  labels: { singular: 'Image Feature', plural: 'Image Features' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Campus life',
      admin: {
        description: 'Small label above the heading. Rendered uppercase.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'UNIVERSITY IS THE BEST TIME OF YOUR LIFE',
      admin: {
        description: 'Section heading. Rendered uppercase in SectionTitle style.',
      },
    },
    {
      name: 'paragraph',
      type: 'textarea',
      localized: true,
      defaultValue:
        "University life isn't just about lectures and exams—it's where you grow, explore, and discover who you truly are. At Levntura, we open doors for students to experience global campuses that blend learning with adventure. Meet new people, share ideas, and live moments that shape your future. From late-night study sessions to weekend cultural trips, every experience becomes a story you'll carry forever.",
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Full-width image shown below the content.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow',
      admin: {
        description: 'Background color for the content area.',
      },
      options: [
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Pink', value: 'lev-pink' },
        { label: 'Brand Gray Light', value: 'lev-gray-light' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
