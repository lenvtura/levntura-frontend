import type { CollectionConfig } from 'payload'
import { isAdmin, isContentEditor } from '../../access/roles'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },

  access: {
    read: () => true,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type', 'enabled', 'updatedAt'],
    description: 'Old URLs that should forward to new ones.',
  },

  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Old path (e.g. /about-us). Must start with /. Without domain.',
      },
    },
    {
      name: 'to',
      type: 'group',
      label: 'Redirect to',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'page',
          options: [
            { label: 'Internal Page', value: 'page' },
            { label: 'External URL', value: 'external' },
            { label: 'Custom Path', value: 'path' },
          ],
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, sib) => sib?.type === 'page',
            description: 'The page this old URL should now point to.',
          },
        },
        {
          name: 'externalURL',
          type: 'text',
          admin: {
            condition: (_, sib) => sib?.type === 'external',
            description: 'Full URL including https://',
          },
        },
        {
          name: 'customPath',
          type: 'text',
          admin: {
            condition: (_, sib) => sib?.type === 'path',
            description: 'Internal path (e.g. /blog/new-article)',
          },
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: '301',
      options: [
        {
          label: '301 — Permanent (recommended for SEO)',
          value: '301',
        },
        {
          label: '302 — Temporary',
          value: '302',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Turn off without deleting.',
      },
    },
    {
      name: 'note',
      type: 'text',
      admin: {
        description: 'Internal note — why was this redirect created?',
      },
    },
  ],
}