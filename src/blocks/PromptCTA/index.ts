import type { Block } from 'payload'

/**
 * PromptCTA — mirrors `app/careers/suggest-new-opportunities.tsx`.
 *
 * Wide horizontal section: image on the left, large heading + button on
 * the right. Image expands on hover. Useful for "Suggest a program",
 * "Apply now", "Talk to advisor" style CTAs across any page.
 */
export const PromptCTABlock: Block = {
  slug: 'promptCTA',
  labels: { singular: 'Prompt CTA', plural: 'Prompt CTAs' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'SUGGEST NEW\nOPPORTUNITIES',
      admin: { description: 'Heading. Use \\n for a line break.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Wide image on the left. Falls back to the students.png photo when empty.',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'APPLY',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '/careers/suggest',
        },
      ],
    },
  ],
}
