import type { GlobalConfig } from 'payload'
import { isAdmin, isContentEditor } from '../../access/roles'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',

  access: {
    read: () => true,
    update: isContentEditor,
  },

  fields: [
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'page',
          options: [
            { label: 'Page Reference', value: 'page' },
            { label: 'External URL', value: 'external' },
          ],
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, sib) => sib?.type === 'page',
          },
        },
        {
          name: 'externalURL',
          type: 'text',
          admin: {
            condition: (_, sib) => sib?.type === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'submenu',
          type: 'array',
          admin: {
            description: 'Optional dropdown items.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
        },
      ],
    },

    {
      name: 'cta',
      type: 'group',
      label: 'CTA Button (optional)',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: { condition: (_, sib) => Boolean(sib?.enabled) },
        },
        {
          name: 'url',
          type: 'text',
          admin: { condition: (_, sib) => Boolean(sib?.enabled) },
        },
      ],
    },
  ],
}