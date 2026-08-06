import type { Block } from 'payload'

/**
 * ProgramPictureYourself — section 5 of the program page: an eyebrow + the
 * brand "Picture yourself" title + body, followed by a round photo with an
 * optional yellow circle overlay (heading + body). Rendered by
 * `program-picture-yourself.tsx`; the photo falls back to a bundled image.
 */
export const ProgramPictureYourselfBlock: Block = {
  slug: 'programPictureYourself',
  labels: { singular: 'Picture Yourself', plural: 'Picture Yourself' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'IMAGINE',
      admin: { description: 'Small label above the "Picture yourself" title.' },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      defaultValue: 'Picture yourself living this experience.',
    },
    {
      name: 'circleHeading',
      type: 'text',
      localized: true,
      admin: { description: 'Bold text inside the yellow circle overlay.' },
    },
    {
      name: 'circleBody',
      type: 'textarea',
      localized: true,
      admin: { description: 'Smaller text under the circle heading.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Round photo behind the yellow circle. A default is shown if empty.',
      },
    },
  ],
}
