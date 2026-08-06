import type { Block } from 'payload'

/**
 * ProgramApply — section 13 ("Are You Ready?"): decorative photos + title +
 * the program's application form (Calendly or the dynamic form). The form
 * itself is program-specific, so it is built on the server in the program
 * page and passed into the renderer; this block only owns the surrounding
 * layout + editable heading. Rendered by `program-apply.tsx`.
 */
export const ProgramApplyBlock: Block = {
  slug: 'programApply',
  labels: {
    singular: 'Program — Apply (Are You Ready)',
    plural: 'Program — Apply (Are You Ready)',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description:
          "The application form shown in this section. Leave empty to use the program's own form (or its type's form).",
      },
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Are You\nReady to\nChange\nYour\nWorld?',
      admin: {
        description:
          'Use \\n for line breaks. The application form is added automatically from the program.',
      },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'Change',
      admin: {
        description:
          'Exact consecutive words from the heading to color in the accent. Leave empty for a single-color title.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'photoTopLeft',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Decorative photo, top-left. A default is shown if empty.' },
        },
        {
          name: 'photoTopRight',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Decorative photo, top-right. A default is shown if empty.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'photoBottomLeft',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Decorative photo, bottom-left. A default is shown if empty.' },
        },
        {
          name: 'photoBottomRight',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Decorative photo, bottom-right. A default is shown if empty.' },
        },
      ],
    },
  ],
}
