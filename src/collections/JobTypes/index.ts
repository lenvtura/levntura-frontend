import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { slugField } from '../../fields/slug'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'

/**
 * Job Types — a simple taxonomy for internship job categories (e.g.
 * "Engineering", "Hospitality", "Marketing"). Used to tag `jobs` and to
 * filter the DynamicSlider block. Mirrors the ProgramTypes pattern but
 * leaner (no page/sections — it's a filter category, not a page).
 */
export const JobTypes: CollectionConfig = {
  slug: 'job-types',
  labels: {
    singular: 'Job Type',
    plural: 'Job Types',
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
    description: 'Categories for internship jobs (Engineering, Hospitality, etc.)',
    group: 'Careers',
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
    afterChange: [seedTranslation],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Display name (e.g. "Engineering", "Hospitality").',
      },
    },

    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Optional brief description of this job category.',
      },
    },

    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional small icon used in filters/cards.',
      },
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
