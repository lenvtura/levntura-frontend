import type { Block } from 'payload'

/**
 * FAQ block. When `enableSchema` is on, the frontend will emit
 * FAQPage JSON-LD automatically (handled in the SEO utility).
 */
export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Question', plural: 'Questions' },
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'richText', required: true, localized: true },
      ],
    },
    {
      name: 'enableSearch',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show search box',
    },
    {
      name: 'pageSize',
      type: 'number',
      defaultValue: 8,
      min: 1,
      max: 50,
      admin: {
        description: 'How many questions to show per page (rest go under the page numbers).',
      },
    },
    {
      name: 'enableSchema',
      type: 'checkbox',
      defaultValue: true,
      label: 'Output FAQPage JSON-LD on this page',
    },
  ],
}