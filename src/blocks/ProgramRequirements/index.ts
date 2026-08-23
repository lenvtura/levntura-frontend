import type { Block } from 'payload'

/**
 * ProgramRequirements — section 10: "Required" title + a slider of icon
 * cards (icon + title + description). Rendered by `program-requirements.tsx`.
 */
export const ProgramRequirementsBlock: Block = {
  slug: 'programRequirements',
  labels: {
    singular: 'Program — Requirements',
    plural: 'Program — Requirements',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Required',
      admin: { description: 'Section title.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Exact consecutive words from the heading to color in the accent. Leave empty for a single-color title.',
      },
    },
    {
      name: 'items',
      type: 'array',
      localized: true,
      labels: { singular: 'Requirement', plural: 'Requirements' },
      defaultValue: [
        { iconKey: 'passport', title: 'Valid passport' },
        { iconKey: 'college', title: 'Enrolled student' },
      ],
      fields: [
        {
          name: 'iconKey',
          type: 'select',
          required: true,
          defaultValue: 'passport',
          enumName: 'enum_prog_block_req_icon',
          options: [
            { label: 'Passport', value: 'passport' },
            { label: 'College / Education', value: 'college' },
            { label: 'Language', value: 'language' },
            { label: 'Age', value: 'age' },
            { label: 'Diploma / Interview', value: 'diploma' },
          ],
        },
        { name: 'title', type: 'text', required: true, defaultValue: 'Requirement' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
