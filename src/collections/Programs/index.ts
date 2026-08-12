import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { PROGRAM_COUNTRY_OPTIONS } from '../../fields/countries'
import { seoFields } from '../../fields/seo'
import { courseSchemaFields } from '../../fields/seo/courseSchema'
import { slugField } from '../../fields/slug'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'
import { revalidatePath } from '../../hooks/revalidatePath'
import { createRedirectOnSlugChange } from '../../hooks/createRedirectOnSlugChange'

import { programBlocks } from '../../blocks'

import { LIVE_PREVIEW_BREAKPOINTS, livePreviewURL } from '../../lib/livePreview'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Program',
    plural: 'Programs',
  },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'isOpen', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'shortDescription'],
    livePreview: {
      url: livePreviewURL({ prefix: '/programs' }),
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
    beforeChange: [populatePublishedAt, populateDateModified, translationGate],
    afterChange: [
      revalidatePath('programs', (doc) => `/programs/${doc.slug}`),
      createRedirectOnSlugChange('programs', { prefix: '/programs' }),
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
        {
          label: 'Overview',
          fields: [
            {
              name: 'type',
              type: 'relationship',
              relationTo: 'program-types',
              hasMany: true,
              required: true,
              admin: {
                description: 'One or more categories for filtering.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'country',
                  type: 'select',
                  required: true,
                  admin: { width: '50%' },
                  // Shared with the ProgramsList block filter — see
                  // `src/fields/countries/index.ts` for the single source.
                  options: [...PROGRAM_COUNTRY_OPTIONS],
                },
                {
                  name: 'duration',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%',
                    description: 'e.g. "3 months", "12 weeks"',
                  },
                },
              ],
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Brief description for cards (50-100 chars).',
              },
            },
            {
              name: 'applicationForm',
              type: 'relationship',
              relationTo: 'forms',
              admin: {
                description: 'Specific dynamic form for this program. Overrides the Program Type form if selected.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main image for the program card and hero.',
              },
            },
            {
              name: 'isOpen',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'When ON, the apply button is shown on the frontend.',
              },
            },
            {
              name: 'calendlyURL',
              type: 'text',
              admin: {
                description: 'Full Calendly booking URL. Used by the apply button.',
                condition: (_, sib) => Boolean(sib?.isOpen),
              },
            },
          ],
        },

        {
          label: 'Content',
          description: 'Build the whole program page by adding sections. Drag to reorder.',
          fields: [
            {
              name: 'sections',
              label: 'Page sections',
              type: 'blocks',
              required: true,
              localized: true,
              admin: {
                description: 'Build the page by adding sections. Drag to reorder.',
              },
              blocks: programBlocks,
            },
          ],
        },

        {
          label: 'SEO',
          fields: [...seoFields, ...courseSchemaFields],
        },
      ],
    },

    ...slugField('title'),

    {
      name: 'translationComplete',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Required before publishing AR version.',
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
