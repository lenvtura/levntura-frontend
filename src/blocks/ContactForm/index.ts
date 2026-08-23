import type { Block } from 'payload'

/**
 * ContactForm — mirrors `app/contact/social-and-form.tsx`.
 *
 * Two-column dark section: text + social links on the left, a CMS-managed
 * form on the right. The form itself lives in the Forms collection
 * (created via the form-builder plugin) — editors can build / edit / swap
 * forms without touching code.
 */
export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'HELLO!\nLETS START\nFRESH &\nNEW',
      admin: {
        description:
          'Section heading. Use \\n for line breaks. The word "START" is highlighted by default in the frontend — edit `highlightedWord` to change it.',
      },
    },
    {
      name: 'highlightedWord',
      type: 'text',
      localized: true,
      defaultValue: 'START',
      admin: {
        description:
          'Word inside the heading to highlight in lev-blue-light. Case-sensitive substring match.',
      },
    },
    {
      name: 'socialsLabel',
      type: 'text',
      localized: true,
      defaultValue: 'OUR SOCIALS',
      admin: { description: 'Small label above the social icon row.' },
    },
    {
      name: 'showSocials',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description:
          'Pick the form to display. Create / edit forms in Globals → Forms (or the Forms collection). Leave empty to render a placeholder.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-blue-dark',
      enumName: 'enum_cf_bg_color',
      options: [
        { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
        { label: 'Brand Black', value: 'lev-black' },
        { label: 'Brand Green Dark', value: 'lev-green-dark' },
        { label: 'Brand Red Dark', value: 'lev-red-dark' },
      ],
    },
  ],
}
