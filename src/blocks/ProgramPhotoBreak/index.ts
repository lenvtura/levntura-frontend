import type { Block } from 'payload'

/**
 * ProgramPhotoBreak — section 4 of the program page: a single decorative
 * photo rendered at its natural size (a visual break between sections).
 * Rendered by `program-photo-break.tsx`; falls back to a bundled image when
 * empty so the section still shows something.
 */
export const ProgramPhotoBreakBlock: Block = {
  slug: 'programPhotoBreak',
  labels: { singular: 'Program Photo Break', plural: 'Program Photo Breaks' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Decorative photo between sections. If left empty, a default image is shown.',
      },
    },
  ],
}
