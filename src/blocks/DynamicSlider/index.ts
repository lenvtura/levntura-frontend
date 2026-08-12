import type { Block } from 'payload'

import { PROGRAM_COUNTRY_OPTIONS } from '../../fields/countries'

/**
 * DynamicSlider — one unified slider block that renders EITHER internship
 * jobs OR internship programs, chosen by `source`. Stores filter/display
 * prefs only; the frontend queries the right collection at render time.
 *
 *  - source = jobs         → cards link to /internship/[job-slug]
 *  - source = internships  → cards link to /programs/[program-slug]
 *
 * Used inside a country's internship program (filter by country + job type)
 * and on the Careers page (all jobs, or all internship programs).
 */
export const DynamicSliderBlock: Block = {
  slug: 'dynamicSlider',
  labels: {
    singular: 'Dynamic Slider',
    plural: 'Dynamic Sliders',
  },

  fields: [
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'jobs',
      options: [
        { label: 'Jobs (internship positions)', value: 'jobs' },
        { label: 'Internship programs', value: 'internships' },
      ],
      admin: {
        description: 'What this slider shows.',
      },
    },

    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      admin: {
        description: 'Words within the heading to color (matched exactly).',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Optional short text beside the heading.',
      },
    },

    {
      name: 'byCountry',
      type: 'select',
      hasMany: true,
      options: [...PROGRAM_COUNTRY_OPTIONS],
      admin: {
        description: 'Empty = all countries.',
      },
    },
    {
      name: 'byJobType',
      type: 'relationship',
      relationTo: 'job-types',
      hasMany: true,
      admin: {
        condition: (_, sib) => sib?.source === 'jobs',
        description: 'Empty = all job types.',
      },
    },
    {
      name: 'byProgramType',
      type: 'relationship',
      relationTo: 'program-types',
      hasMany: true,
      admin: {
        condition: (_, sib) => sib?.source === 'internships',
        description: 'Empty = all program types.',
      },
    },

    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      min: 1,
      max: 24,
    },

    {
      name: 'emptyMessage',
      type: 'text',
      localized: true,
      admin: {
        description: 'Shown when nothing matches. Empty = hide the section.',
      },
    },
  ],
}
