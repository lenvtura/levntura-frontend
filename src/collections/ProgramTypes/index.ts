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
import { contentBlocks } from '@/blocks'

export const ProgramTypes: CollectionConfig = {
  slug: 'program-types',
  labels: {
    singular: 'Program Type',
    plural: 'Program Types',
  },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', '_status', 'updatedAt'],
    description: 'Categories for programs (Internship, Work & Travel, Study Abroad, etc.)',
  },

  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 20,
  },

  // See Pages collection — locking re-enabled after fixing the
  // seedTranslation no-op writes that used to false-alarm the poll.
  lockDocuments: { duration: 300 },

  hooks: {
    beforeChange: [populatePublishedAt, populateDateModified, translationGate],
    afterChange: [
      createRedirectOnSlugChange('program-types', { prefix: '/programs' }),
      seedTranslation,
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Display name (e.g. "Internship", "Work & Travel").',
      },
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Brief intro shown on /programs list page cards.',
              },
            },
            {
              name: 'applicationForm',
              type: 'relationship',
              relationTo: 'forms',
              admin: {
                description: 'Default dynamic form for programs of this type.',
              },
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Small icon used in cards and navigation.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero image for the type page.',
              },
            },
            {
              name: 'sections',
              label: 'Page sections',
              type: 'blocks',
              localized: true,
              admin: {
                description: 'Build the page with blocks. Same blocks as Pages.',
              },
              blocks: contentBlocks,
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
      admin: {
        position: 'sidebar',
      },
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
