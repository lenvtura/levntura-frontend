import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { seoFields } from '../../fields/seo'
import { slugField } from '../../fields/slug'
import { articleBlocks } from '../../blocks'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'
import { revalidatePath } from '../../hooks/revalidatePath'
import { createRedirectOnSlugChange } from '../../hooks/createRedirectOnSlugChange'
import { setDefaultAuthor } from './hooks/setDefaultAuthor'

import { calculateReadingTime } from './hooks/calculateReadingTime'

import { LIVE_PREVIEW_BREAKPOINTS, livePreviewURL } from '../../lib/livePreview'

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status', 'publishedAt'],
    description: 'Blog articles and posts.',
    listSearchableFields: ['title', 'excerpt'],
    livePreview: {
      url: livePreviewURL({ prefix: '/blogs' }),
      breakpoints: [...LIVE_PREVIEW_BREAKPOINTS],
    },
  },

  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 30,
  },

  // See Pages collection — locking re-enabled after fixing the
  // seedTranslation no-op writes that used to false-alarm the poll.
  lockDocuments: { duration: 300 },

  hooks: {
    beforeChange: [
      setDefaultAuthor,
      populatePublishedAt,
      populateDateModified,
      translationGate,
      calculateReadingTime,
    ],
    afterChange: [
      revalidatePath('blog', (doc) => `/blogs/${doc.slug}`),
      createRedirectOnSlugChange('blog', { prefix: '/blogs' }),
      seedTranslation,
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },

    {
      type: 'tabs',
      tabs: [
        // Tab 1: Content
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Short summary shown on blog listing pages (140-200 chars).',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the post (used in cards and hero).',
              },
            },
            {
              name: 'sections',
              label: 'Article body',
              type: 'blocks',
              localized: true,
              required: true,
              minRows: 1,
              admin: {
                description: 'Build the article with content blocks.',
              },
              blocks: articleBlocks,
            },
          ],
        },

        // Tab 2: Categorization
        {
          label: 'Categorization',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'blog-categories',
              required: true,
            },
            {
              name: 'tags',
              type: 'array',
              labels: { singular: 'Tag', plural: 'Tags' },
              admin: {
                description: 'Free-form tags. Shared across all locales (keywords, not prose).',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blog',
              hasMany: true,
              // maxDepth: 2 so the frontend can render related cards with
              // their featuredImage + category populated. Higher values risk
              // expanding circular blog→blog chains.
              maxDepth: 2,
              admin: {
                description: 'Other posts to suggest at the bottom.',
              },
              filterOptions: ({ id }) => {
                // Don't allow a post to relate to itself
                return id ? { id: { not_equals: id } } : true
              },
            },
          ],
        },

        // Tab 3: SEO
        {
          label: 'SEO',
          fields: [...seoFields],
        },
      ],
    },

    ...slugField('title'),

    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Defaults to the user creating the post.',
      },
    },

    {
      name: 'translationComplete',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },

    {
      name: 'dateModified',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },

    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated minutes to read.',
      },
    },

    {
      name: 'wordCount',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated.',
      },
    },

    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in "Featured Posts" sections.',
      },
    },
  ],
}
