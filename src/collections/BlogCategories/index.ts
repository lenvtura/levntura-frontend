import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { seoFields, pageSchemaFields } from '../../fields/seo'
import { slugField } from '../../fields/slug'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'
import { createRedirectOnSlugChange } from '../../hooks/createRedirectOnSlugChange'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: {
    singular: 'Blog Category',
    plural: 'Blog Categories',
  },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', '_status'],
    description: 'Categories for organizing blog posts.',
  },

  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 20,
  },

  // See Pages collection — locking re-enabled after fixing the
  // seedTranslation no-op writes that used to false-alarm the poll.
  lockDocuments: { duration: 300 },
  trash: true,

  hooks: {
    beforeChange: [populatePublishedAt, populateDateModified, translationGate],
    afterChange: [
      createRedirectOnSlugChange('blog-categories', { prefix: '/blogs/category' }),
      seedTranslation,
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Shown on the category page.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional image for category cards.',
              },
            },
            {
              name: 'color',
              type: 'text',
              admin: {
                description: 'Optional accent color (hex). Used in tags/badges.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [...seoFields, ...pageSchemaFields],
        },
      ],
    },

    ...slugField('name'),

    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
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
  ],
}
