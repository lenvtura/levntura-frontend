import type { Block } from 'payload'

import { PROGRAM_COUNTRY_OPTIONS } from '../../fields/countries'

/**
 * ProgramsList — dynamic cards block.
 *
 * Stores filtering and display preferences only.
 * The frontend queries the Programs collection at render time.
 */
export const ProgramsListBlock: Block = {
  slug: 'programsList',
  dbName: 'pl',
  labels: {
    singular: 'Programs List',
    plural: 'Programs Lists',
  },

  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
    },

    {
      name: 'displayMode',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (use filters below)', value: 'auto' },
        { label: 'Manual (pick specific programs)', value: 'manual' },
      ],
    },

    {
      name: 'selectedPrograms',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      admin: {
        condition: (_, sib) => sib?.displayMode === 'manual',
      },
    },

    {
      name: 'filters',
      type: 'group',
      label: 'Filters',
      admin: {
        condition: (_, sib) => sib?.displayMode === 'auto',
      },
      fields: [
        {
          name: 'byType',
          type: 'relationship',
          relationTo: 'program-types',
          hasMany: true,
          admin: {
            description: 'Empty = show all types.',
          },
        },
        {
          name: 'byCountry',
          type: 'select',
          hasMany: true,
          admin: {
            description: 'Empty = show all countries.',
          },
          // Shared with the Programs collection — see
          // `src/fields/countries/index.ts` for the single source.
          options: [...PROGRAM_COUNTRY_OPTIONS],
        },
        {
          name: 'onlyOpen',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'limit',
          type: 'number',
          defaultValue: 6,
          min: 1,
          max: 24,
        },
        {
          name: 'sortBy',
          type: 'select',
          defaultValue: 'newest',
          // NOTE: `deadline` and `random` used to be options here but
          // neither was wired up — `deadline` has no matching field on
          // Programs, and `random` had no shuffling logic in the frontend
          // api (both silently fell back to `-publishedAt`). Removed to
          // stop misleading editors. Add back only with matching logic in
          // `levntura-frontend/lib/api.ts → getPrograms`.
          options: [
            { label: 'Newest first', value: 'newest' },
            { label: 'Oldest first', value: 'oldest' },
            { label: 'Title A-Z', value: 'titleAZ' },
          ],
        },
      ],
    },

    {
      name: 'layout',
      type: 'group',
      label: 'Layout & Display',
      fields: [
        {
          name: 'cardsPerRow',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 per row', value: '2' },
            { label: '3 per row', value: '3' },
            { label: '4 per row', value: '4' },
          ],
        },
        {
          name: 'cardStyle',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Compact', value: 'compact' },
            { label: 'Featured', value: 'featured' },
          ],
        },
        {
          name: 'showCountry',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDuration',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDeadline',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    {
      name: 'cta',
      type: 'group',
      label: 'Bottom Link',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'View all programs',
          admin: {
            condition: (_, sib) => Boolean(sib?.enabled),
          },
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/programs',
          admin: {
            condition: (_, sib) => Boolean(sib?.enabled),
          },
        },
      ],
    },

    {
      name: 'emptyMessage',
      type: 'text',

      localized: true,
      defaultValue: 'No programs available right now.',
    },
  ],
}
