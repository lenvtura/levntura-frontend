import type { Field } from 'payload'

/**
 * Course schema enrichment fields — for Study Abroad and educational programs.
 *
 * Every program automatically emits Course JSON-LD built from its own fields
 * (title, description, duration, image). These OPTIONAL fields just enrich it
 * with course-specific details (delivery mode, level, dates) — no toggle, no
 * required input.
 */
export const courseSchemaFields: Field[] = [
  {
    name: 'course',
    type: 'group',
    label: 'Course Schema (extra details)',
    admin: {
      description:
        'Optional. The program already emits Course structured data automatically — these fields just add delivery mode, level and dates.',
    },
    fields: [
      {
        name: 'courseCode',
        type: 'text',
        admin: { description: 'Internal course code if any (e.g. "SA-2025-USA").' },
      },
      {
        name: 'educationalLevel',
        type: 'select',
        options: [
          { label: 'Beginner', value: 'Beginner' },
          { label: 'Intermediate', value: 'Intermediate' },
          { label: 'Advanced', value: 'Advanced' },
        ],
      },
      {
        name: 'courseMode',
        type: 'select',
        admin: { description: 'How the course is delivered.' },
        options: [
          { label: 'Online', value: 'online' },
          { label: 'Onsite (in-person)', value: 'onsite' },
          { label: 'Blended (hybrid)', value: 'blended' },
        ],
      },
      {
        name: 'duration',
        type: 'text',
        admin: {
          description:
            'ISO 8601, e.g. "P30D" (30 days). Defaults to the program duration.',
        },
      },
      {
        name: 'provider',
        type: 'text',
        localized: true,
        admin: {
          description: 'Institution offering this course. Defaults to the site name.',
        },
      },
      {
        name: 'startDate',
        type: 'date',
        admin: {
          date: { pickerAppearance: 'dayOnly' },
          description: 'When does the course start?',
        },
      },
      {
        name: 'endDate',
        type: 'date',
        admin: { date: { pickerAppearance: 'dayOnly' } },
      },
    ],
  },
]
