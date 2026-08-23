import type { GlobalConfig } from 'payload'
import { isAdmin } from '../../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',

  access: {
    read: () => true,
    update: isAdmin,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Levntura',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Main logo. Used in header.' },
            },
            {
              name: 'logoLight',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional light version (for dark backgrounds).',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Browser tab icon. Use a square image (32x32 or 64x64).'
,
              },
            },
          ],
        },

        {
          label: 'Default SEO',
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'Used when a page has no SEO title set.',
              },
            },
            {
              name: 'titleTemplate',
              type: 'text',
              defaultValue: '%s | Levntura',
              admin: {
                description:
                  'Template used in HTML <title>. %s is replaced with the page title.',
              },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'defaultOGImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Fallback social share image (1200x630).',
              },
            },
          ],
        },

        {
          label: 'Social Links',
          fields: [
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                  ],
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

        {
          label: 'Email',
          description: 'SMTP settings for form notifications. Toggle off to disable silently.',
          fields: [
            {
              name: 'email',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Enable Email Notifications',
                  admin: {
                    description: 'Off = no emails sent, no errors. Acts as if not configured.',
                  },
                },
                {
                  name: 'fromAddress',
                  type: 'email',
                  admin: {
                    condition: (_, sibling) => Boolean(sibling?.enabled),
                    description: 'Sender address. Example: noreply@levntura.com',
                  },
                },
                {
                  name: 'fromName',
                  type: 'text',
                  defaultValue: 'Levntura',
                  admin: {
                    condition: (_, sibling) => Boolean(sibling?.enabled),
                  },
                },
                {
                  name: 'notificationEmail',
                  type: 'email',
                  admin: {
                    condition: (_, sibling) => Boolean(sibling?.enabled),
                    description:
                      'Where to send admin notifications (new applications, form submissions). Defaults to fromAddress if empty.',
                  },
                },
                {
                  name: 'smtp',
                  type: 'group',
                  label: 'SMTP Server',
                  admin: {
                    condition: (_, sibling) => Boolean(sibling?.enabled),
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'host', type: 'text', admin: { width: '70%' } },
                        {
                          name: 'port',
                          type: 'number',
                          defaultValue: 587,
                          admin: { width: '30%' },
                        },
                      ],
                    },
                    {
                      name: 'secure',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description: 'Usually true for port 465, false for 587.',
                      },
                    },
                    { name: 'user', type: 'text' },
                    {
                      name: 'password',
                      type: 'text',
                      admin: {
                        description: 'Use an app-specific password (Gmail/Outlook).',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Integrations',
          description:
            'Outgoing webhooks. POSTed when a form is submitted or an application is received. Use Zapier, HubSpot, Make.com, or any URL that accepts JSON.',
          fields: [
            {
              name: 'integrations',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'webhooks',
                  type: 'array',
                  labels: { singular: 'Webhook', plural: 'Webhooks' },
                  fields: [
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: { description: 'Full https:// URL to POST to.' },
                    },
                    {
                      name: 'events',
                      type: 'select',
                      hasMany: true,
                      required: true,
                      // `Program application` removed — submissions now flow
                      // through `form_submission` since the ProgramApplications
                      // collection is gone.
                      options: [
                        { label: 'Form submission', value: 'form_submission' },
                      ],
                    },
                    {
                      name: 'secret',
                      type: 'text',
                      admin: {
                        description:
                          'Optional. If set, requests include X-Levntura-Signature (HMAC-SHA256 hex).',
                      },
                    },
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Internship',
          description:
            'Forms shown as pop-ups on the Internship page. Manage the fields in Forms; pick which form to use here.',
          fields: [
            {
              name: 'internship',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'applyForm',
                  type: 'relationship',
                  relationTo: 'forms',
                  admin: {
                    description:
                      'Opens when a visitor clicks APPLY NOW on a job card.',
                  },
                },
                {
                  name: 'suggestForm',
                  type: 'relationship',
                  relationTo: 'forms',
                  admin: {
                    description:
                      'Opens from the "Suggest New Opportunities" section button.',
                  },
                },
              ],
            },
          ],
        },

        {
          label: 'Code Injection',
          fields: [
            {
              name: 'headCode',
              type: 'code',
              admin: {
                language: 'html',
                description:
                  'Injected into <head>. Use for Google Analytics, Tag Manager, Pixel, etc.',
              },
            },
            {
              name: 'bodyCode',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Injected before </body>. Use for chat widgets, etc.',
              },
            },
          ],
        },

        {
          label: 'Robots & Sitemap',
          fields: [
            {
              name: 'robotsTxt',
              type: 'code',
              admin: {
                language: 'text',
                description:
                  'Custom robots.txt content. Leave empty to use defaults.',
              },
            },
            {
              name: 'maintenanceMode',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'When ON, the frontend shows a maintenance page to all visitors.',
              },
            },
          ],
        },
      ],
    },
  ],
}