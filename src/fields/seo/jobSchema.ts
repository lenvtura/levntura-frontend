import type { Field } from 'payload'

export const jobSchemaFields: Field[] = [
  {
    name: 'job',
    type: 'group',
    label: 'Job Posting Schema',
    admin: {
      description: 'Fields used to emit JobPosting structured data. Required for Google for Jobs.',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'employmentType',
        type: 'select',
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
        },
        options: [
          { label: 'Full Time', value: 'FULL_TIME' },
          { label: 'Part Time', value: 'PART_TIME' },
          { label: 'Contract', value: 'CONTRACTOR' },
          { label: 'Internship', value: 'INTERN' },
          { label: 'Volunteer', value: 'VOLUNTEER' },
          { label: 'Temporary', value: 'TEMPORARY' },
        ],
      },
      {
        name: 'datePosted',
        type: 'date',
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
          date: { pickerAppearance: 'dayOnly' },
        },
      },
      {
        name: 'validThrough',
        type: 'date',
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
          date: { pickerAppearance: 'dayOnly' },
        },
      },
      {
        name: 'remoteOK',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
        },
      },
      {
        name: 'location',
        type: 'group',
        label: 'Job Location',
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
        },
        fields: [
          { name: 'streetAddress', type: 'text', localized: true },
          { name: 'city', type: 'text', localized: true },
          { name: 'region', type: 'text', localized: true },
          { name: 'country', type: 'text', defaultValue: 'US' },
          { name: 'postalCode', type: 'text' },
        ],
      },
      {
        name: 'salary',
        type: 'group',
        label: 'Salary / Compensation',
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
        },
        fields: [
          { name: 'currency', type: 'text', defaultValue: 'USD' },
          { name: 'minValue', type: 'number' },
          { name: 'maxValue', type: 'number' },
          {
            name: 'unitText',
            type: 'select',
            defaultValue: 'MONTH',
            options: [
              { label: 'Hour', value: 'HOUR' },
              { label: 'Day', value: 'DAY' },
              { label: 'Week', value: 'WEEK' },
              { label: 'Month', value: 'MONTH' },
              { label: 'Year', value: 'YEAR' },
            ],
          },
        ],
      },
      {
        name: 'experienceRequirements',
        type: 'text',
        localized: true,
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
        },
      },
      {
        name: 'educationRequirements',
        type: 'text',
        localized: true,
        admin: {
          condition: (_, sib) => Boolean(sib?.enabled),
        },
      },
    ],
  },
]
