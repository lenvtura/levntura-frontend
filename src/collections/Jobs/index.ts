import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { PROGRAM_COUNTRY_OPTIONS } from '../../fields/countries'
import { seoFields, pageSchemaFields } from '../../fields/seo'
import { slugField } from '../../fields/slug'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'
import { revalidatePath } from '../../hooks/revalidatePath'
import { createRedirectOnSlugChange } from '../../hooks/createRedirectOnSlugChange'

import { jobBlocks } from '../../blocks'

import { LIVE_PREVIEW_BREAKPOINTS, livePreviewURL } from '../../lib/livePreview'

/**
 * Jobs — individual internship positions/openings. Each job belongs to a
 * `country` and a `job-type`, carries a card summary (title, short desc,
 * image), and has its own block-based detail page at /internship/[slug].
 *
 * Surfaced through the DynamicSlider block: inside a country's internship
 * program (filtered by country + type) and on the Careers page (all jobs).
 */
export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Job',
    plural: 'Jobs',
  },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'jobType', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'shortDescription'],
    group: 'Careers',
    livePreview: {
      url: livePreviewURL({ prefix: '/internship' }),
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
  trash: true,

  hooks: {
    beforeChange: [populatePublishedAt, populateDateModified, translationGate],
    afterChange: [
      revalidatePath('jobs', (doc) => `/internship/${doc.slug}`),
      createRedirectOnSlugChange('jobs', { prefix: '/internship' }),
      seedTranslation,
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Job / position title (e.g. "Software Engineering Intern").',
      },
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Short summary shown on the job card in the slider.',
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
                  // Shared with the DynamicSlider filter + Programs — single
                  // source in src/fields/countries/index.ts.
                  options: [...PROGRAM_COUNTRY_OPTIONS],
                },
                {
                  name: 'jobType',
                  type: 'relationship',
                  relationTo: 'job-types',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Category used to filter jobs.',
                  },
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Banner image shown on the job card.',
              },
            },
            {
              name: 'employmentType',
              type: 'select',
              defaultValue: 'full-time',
              options: [
                { label: 'Full-time', value: 'full-time' },
                { label: 'Part-time', value: 'part-time' },
                { label: 'Internship', value: 'internship' },
                { label: 'Contract', value: 'contract' },
                { label: 'Seasonal', value: 'seasonal' },
              ],
              admin: {
                description: 'Shown as the badge on the card (e.g. FULLTIME).',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'dd MMM yyyy' },
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'dd MMM yyyy' },
                  },
                },
              ],
            },
            {
              name: 'salary',
              type: 'group',
              admin: {
                description: 'Optional pay shown on the card (e.g. 6595$/m).',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'amount',
                      type: 'number',
                      admin: { width: '40%' },
                    },
                    {
                      name: 'currency',
                      type: 'text',
                      defaultValue: '$',
                      admin: { width: '30%' },
                    },
                    {
                      name: 'period',
                      type: 'select',
                      defaultValue: '/m',
                      options: [
                        { label: 'per month (/m)', value: '/m' },
                        { label: 'per week (/wk)', value: '/wk' },
                        { label: 'per year (/yr)', value: '/yr' },
                        { label: 'total (one-time)', value: 'total' },
                      ],
                      admin: { width: '30%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'applyUrl',
              type: 'text',
              admin: {
                description: 'Link for the APPLY button. Empty = hide Apply.',
              },
            },
            {
              name: 'relatedJobs',
              type: 'relationship',
              relationTo: 'jobs',
              hasMany: true,
              admin: {
                description:
                  'Similar jobs shown in the sidebar. Leave empty to auto-fill by same country / job type.',
              },
            },
          ],
        },

        {
          label: 'Content',
          fields: [
            {
              name: 'sections',
              label: 'Page sections',
              type: 'blocks',
              required: true,
              localized: true,
              admin: {
                description: 'Build the job page by adding sections. Drag to reorder.',
              },
              blocks: jobBlocks,
            },
          ],
        },

        {
          label: 'SEO',
          fields: [...seoFields, ...pageSchemaFields],
        },
      ],
    },

    ...slugField('title'),

    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the slider.',
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
