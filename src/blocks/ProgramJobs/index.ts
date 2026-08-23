import type { Block } from 'payload'

/**
 * ProgramJobs — section 7: title + body + a slider of round-image job cards.
 * Rendered by `program-jobs.tsx`.
 */
export const ProgramJobsBlock: Block = {
  slug: 'programJobs',
  labels: { singular: 'Program — Jobs', plural: 'Program — Jobs' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'What you will\nbe doing',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      defaultValue: 'be doing',
      admin: {
        description:
          'Exact consecutive words from the heading to color in the accent. Leave empty for a single-color title.',
      },
    },
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      localized: true,
      labels: { singular: 'Job', plural: 'Jobs' },
      defaultValue: [{ title: 'Job title' }],
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true, defaultValue: 'Job title' },
      ],
    },
  ],
}
