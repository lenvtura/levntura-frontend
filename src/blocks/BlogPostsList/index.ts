import type { Block } from 'payload'

/**
 * BlogPostsList — mirrors `more-to-read.tsx`.
 *
 * Two-column header (title + supporting paragraph) + 3-column blog post
 * grid. Posts can be auto-fetched from the Blog collection (sorted by
 * publishedAt) or manually picked.
 */
export const BlogPostsListBlock: Block = {
  slug: 'blogPostsList',
  labels: { singular: 'Blog Posts List', plural: 'Blog Posts Lists' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'KNOWLEDGE',
      admin: { description: 'Small uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'MORE TO READ, BETTER TO KNOW.',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Expand your mind through stories that celebrate discovery, learning, and culture. Every journey teaches something new—here's where we share the lessons that shaped our path and inspired thousands of youth to see the world differently.",
    },
    {
      name: 'displayMode',
      type: 'radio',
      defaultValue: 'auto',
      admin: { layout: 'horizontal' },
      options: [
        { label: 'Auto — latest from Blog', value: 'auto' },
        { label: 'Manual pick', value: 'manual' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      admin: {
        description: 'Number of posts to fetch (auto mode only).',
        condition: (_, sib) => sib?.displayMode === 'auto',
      },
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      relationTo: 'blog',
      hasMany: true,
      admin: {
        description: 'Pick specific posts to show.',
        condition: (_, sib) => sib?.displayMode === 'manual',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Bottom CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Blogs',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/blogs',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-yellow-light',
      admin: { description: 'Section background color.' },
      options: [
        { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Blue Light', value: 'lev-blue-light' },
        { label: 'Brand Green Light', value: 'lev-green-light' },
        { label: 'Brand Pink', value: 'lev-pink' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
