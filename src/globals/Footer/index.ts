import type { GlobalConfig } from 'payload'
import { isContentEditor } from '../../access/roles'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',

  access: {
    read: () => true,
    update: isContentEditor,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        
        {
          label: 'Link Columns',
          fields: [
            {
              name: 'columns',
              type: 'array',
              maxRows: 4,
              labels: {
                singular: 'Column',
                plural: 'Columns',
              },
              admin: {
                description: 'Footer navigation columns (max 4).',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  admin: {
                    description:
                      'Column heading. Leave empty for an untitled column.',
                  },
                },
                {
                  name: 'links',
                  type: 'array',
                  labels: {
                    singular: 'Link',
                    plural: 'Links',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'e.g. /programs, /about, /contact',
                      },
                    },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },

    
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'addresses',
              type: 'array',
              labels: {
                singular: 'Address',
                plural: 'Addresses',
              },
              admin: {
                description: 'Office addresses shown in the footer.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Optional label (e.g. "Jordan Office").',
                  },
                },
                {
                  name: 'address',
                  type: 'textarea',
                  required: true,
                  localized: true,
                  admin: {
                    description:
                      'Full address, e.g. "Mecca st, Buld 145, office 408, Amman Jordan, 11185"',
                  },
                },
              ],
            },
            {
              name: 'phones',
              type: 'array',
              labels: {
                singular: 'Phone',
                plural: 'Phone Numbers',
              },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. +962 79 082 2202',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Optional label (e.g. "Jordan").',
                  },
                },
              ],
            },
            {
              name: 'email',
              type: 'email',
              admin: {
                description: 'Public contact email (optional).',
              },
            },
          ],
        },

      
        {
          label: 'Social & Branding',
          fields: [
            {
              name: 'showLogo',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show the logo in the footer (uses Site Settings logo).',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: {
                description: 'Optional short description next to the logo.',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              labels: {
                singular: 'Social Link',
                plural: 'Social Links',
              },
              admin: {
                description:
                  'Social media icons. Order here = order in footer.',
              },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'Telegram', value: 'telegram' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'showWatermark',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'Show the large "levntura" watermark text behind the footer.',
              },
            },
          ],
        },

      
        {
          label: 'Legal',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              localized: true,
              admin: {
                description: 'e.g. "© 2025 Levntura. All rights reserved."',
              },
            },
            {
              name: 'bottomLinks',
              type: 'array',
              labels: {
                singular: 'Bottom Link',
                plural: 'Bottom Links',
              },
              admin: {
                description: 'Privacy Policy, Terms, etc.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}