import type { Block } from 'payload'

/**
 * Hero block for blog post detail pages.
 *
 * Content fields are pulled from the Blog doc itself (title, featuredImage,
 * author, publishedAt, readingTime). This block only configures *how* that
 * data is rendered — variant + which meta to show.
 */
export const HeroBlogPostBlock: Block = {
  slug: 'heroBlogPost',
  labels: {
    singular: 'Hero — Blog Post',
    plural: 'Hero — Blog Posts',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'centered',
      options: [
        { label: 'Centered (title + image stacked)', value: 'centered' },
        { label: 'Split — image on the right', value: 'split-right' },
        { label: 'Split — image on the left', value: 'split-left' },
        { label: 'Full background image', value: 'full-background' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional small text above the title (e.g. category name).',
      },
    },
    {
      name: 'showAuthor',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the author byline.' },
    },
    {
      name: 'showDate',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the published date.' },
    },
    {
      name: 'showReadingTime',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the estimated reading time.' },
    },
  ],
}
