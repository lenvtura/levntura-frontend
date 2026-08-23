import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'meta',
    type: 'group',
    label: 'Meta tags',
    fields: [
      {
        name: 'title',
        type: 'text',
        localized: true,
        admin: {
          description: '50-60 chars. Falls back to page title.',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        localized: true,
        admin: {
          description: '150-160 chars.',
        },
      },
      {
        name: 'keywords',
        type: 'text',
        localized: true,
        admin: {
          description:
            'Optional. Most search engines ignore this, but harmless to fill.',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: '1200x630 recommended. Used for social sharing previews.',
        },
      },
      {
        name: 'canonicalURL',
        type: 'text',
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'noFollow',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  },

  {
    name: 'openGraph',
    type: 'group',
    label: 'Open Graph (social sharing)',
    admin: {
      description: 'Optional overrides for social shares. Falls back to meta fields if empty.',
    },
    fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
    ],
  },

  {
    name: 'sitemap',
    type: 'group',
    label: 'Sitemap',
    fields: [
      {
        name: 'excludeFromSitemap',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Hide this page from sitemap.xml',
        },
      },
    ],
  },
]

export const pageSchemaFields: Field[] = [
  {
    name: 'structuredData',
    type: 'group',
    label: 'Schema.org / JSON-LD',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'type',
        type: 'select',
        defaultValue: 'auto',
        admin: {
          description: '"Auto" detects from page content (FAQ block → FAQPage, etc.).',
        },
        options: [
          { label: 'Auto-detect', value: 'auto' },
          { label: 'WebPage', value: 'WebPage' },
          { label: 'AboutPage', value: 'AboutPage' },
          { label: 'ContactPage', value: 'ContactPage' },
          { label: 'FAQPage', value: 'FAQPage' },
        ],
      },
    ],
  },
]
