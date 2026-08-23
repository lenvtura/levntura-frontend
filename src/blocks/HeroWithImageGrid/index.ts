import type { Block } from 'payload'

/**
 * HeroWithImageGrid — mirrors `app/careers/careers-hero.tsx`.
 *
 * Generic page hero pattern: text column on the left (eyebrow + heading
 * with optional highlighted word + paragraph), 2-3 image grid on the right.
 * Useful for About / Careers / Programs landing pages.
 */
export const HeroWithImageGridBlock: Block = {
  slug: 'heroWithImageGrid',
  labels: { singular: 'Hero — Image Grid', plural: 'Hero — Image Grids' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'FROM LEVNTURA',
      admin: { description: 'Small uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'JOIN THE BEST TEAM IN THE WORLD',
    },
    {
      name: 'highlightedWord',
      type: 'text',
      localized: true,
      defaultValue: 'THE BEST',
      admin: {
        description:
          'Substring inside the heading to highlight in a brand color. Leave empty for no highlight.',
      },
    },
    {
      name: 'highlightColor',
      type: 'select',
      defaultValue: 'lev-green-light',
      enumName: 'enum_higrid_highlight',
      options: [
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Orange', value: 'lev-orange' },
        { label: 'Brand Red', value: 'lev-red' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        "At Levntura, we're here to guide you every step of the way on your journey of discovery. Whether you have questions about our programs, want to share feedback, or simply want to say hello, we'd love to hear from you. Get in touch with us using any of the following methods:",
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Image', plural: 'Images' },
      admin: {
        description:
          '2-3 images. First spans both columns, others split underneath. Falls back to the home m-1, m-3, m-4 set when empty.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text', localized: true },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-green-dark',
      enumName: 'enum_higrid_bg_color',
      options: [
        { label: 'Brand Green Dark', value: 'lev-green-dark' },
        { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
        { label: 'Brand Black', value: 'lev-black' },
        { label: 'Brand Red Dark', value: 'lev-red-dark' },
        { label: 'Brand Orange', value: 'lev-orange' },
      ],
    },
  ],
}
