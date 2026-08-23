import type { Block } from 'payload'

/**
 * ProgramIntro — section 2 of the program page: a centered eyebrow + intro
 * paragraph. Rendered by `program-intro.tsx`.
 */
export const ProgramIntroBlock: Block = {
  slug: 'programIntro',
  labels: { singular: 'Program Intro', plural: 'Program Intros' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'ABOUT THE PROGRAM',
      admin: { description: 'Small centered label above the intro text.' },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      defaultValue: 'A short, welcoming introduction to the program goes here.',
    },
  ],
}
