import type { Block } from 'payload'

const HIGHLIGHT_COLORS = [
  { label: 'None (use heading color)', value: 'none' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
] as const

const HEADING_COLORS = [
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Black', value: 'lev-black' },
] as const

/**
 * GalleryCta — mirrors `app/gallery/gallery-cta-section.tsx`.
 *
 * Two-column section:
 *   Left  — big SectionTitle with an optional highlighted word.
 *   Right — light gray card with a form heading + embedded form.
 *
 * The form is rendered via the same Forms-collection pattern as the
 * ContactForm block, so submissions land in admin Submissions automatically.
 *
 * Visually different from ContactForm (which is full-width dark): this is a
 * compact gray card used at the bottom of Gallery / lead-capture pages.
 */
export const GalleryCtaBlock: Block = {
  slug: 'galleryCta',
  labels: { singular: 'Gallery CTA', plural: 'Gallery CTAs' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'HELLO! LETS START FRESH & NEW',
      admin: { description: 'Big heading on the left. Use \\n for line breaks.' },
    },
    {
      name: 'highlightedWord',
      type: 'text',
      localized: true,
      defaultValue: 'START',
      admin: {
        description:
          'Substring of the heading rendered in the highlight color. Leave empty for a single-color heading.',
      },
    },
    {
      name: 'highlightColor',
      type: 'select',
      defaultValue: 'lev-red',
      enumName: 'enum_gallery_cta_highlight',
      options: [...HIGHLIGHT_COLORS],
    },
    {
      name: 'headingColor',
      type: 'select',
      defaultValue: 'lev-red-dark',
      enumName: 'enum_gallery_cta_heading',
      options: [...HEADING_COLORS],
    },
    {
      name: 'formTitle',
      type: 'text',
      localized: true,
      defaultValue: 'LITTLE EFFORT, ULTIMATE EXPERIENCE.',
      admin: { description: 'Small heading rendered on top of the form card.' },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: false,
      admin: {
        description:
          'Form to render inside the card. Submissions are stored in admin Submissions. Recommended: the seeded "Program Application" form.',
      },
    },
    {
      name: 'contactLink',
      type: 'group',
      label: 'Secondary "Contact Us" Link',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'CONTACT US',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'showDotPattern',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Subtle dot pattern behind the section (matches the original Gallery design).',
      },
    },
  ],
}
