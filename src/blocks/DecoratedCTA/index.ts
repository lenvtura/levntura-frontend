import type { Block } from 'payload'

/**
 * DecoratedCTA — call-to-action with decorative images above and below.
 *
 * Mirrors the `AreYouReadySection` static design: a centered title +
 * paragraph + button, sandwiched between top and bottom decorative images.
 */
export const DecoratedCTABlock: Block = {
  slug: 'decoratedCTA',
  labels: { singular: 'Decorated CTA', plural: 'Decorated CTAs' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Ready to Start Your Global Journey?',
      admin: {
        description: 'Centered heading rendered in SectionTitle style.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Join thousands of ambitious students shaping their future through Levntura's programs. Let's build your next adventure together.",
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
          defaultValue: 'Start Now!',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'topImages',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Top Image', plural: 'Top Images' },
      admin: {
        description: 'Decorative images shown above the CTA. Usually 2 images.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'bottomImages',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Bottom Image', plural: 'Bottom Images' },
      admin: {
        description: 'Decorative images shown below the CTA. Usually 2 images.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow-light',
      admin: {
        description: 'Background color for the section.',
      },
      options: [
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Pink', value: 'lev-pink' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
