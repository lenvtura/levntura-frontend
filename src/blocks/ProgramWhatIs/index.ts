import type { Block } from 'payload'

/**
 * ProgramWhatIs — section 3 of the program page: a large title (with line
 * breaks) + a side-aligned body that supports **bold** markers. Rendered by
 * `program-what-is.tsx`.
 */
export const ProgramWhatIsBlock: Block = {
  slug: 'programWhatIs',
  labels: { singular: 'Program — What Is', plural: 'Program — What Is' },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'WHAT IS\nTHE PROGRAM?',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Exact consecutive words from the title to color in the accent. Leave empty for a single-color title.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      defaultValue: 'Describe what the program is about here.',
      admin: { description: 'Use **bold** markers around words to make them bold.' },
    },
  ],
}
