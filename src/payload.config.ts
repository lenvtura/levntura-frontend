import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/Users'
import { Media } from './collections/Media/Media'
import { Pages } from './collections/Pages'
import { Redirects } from './collections/Redirects'
import { ProgramTypes } from './collections/ProgramTypes'
import { Programs } from './collections/Programs'
import { BlogCategories } from './collections/BlogCategories'
import { Blog } from './collections/Blog'

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

import { isAdmin, isContentEditor } from './access/roles'
import { authenticated } from './access/authenticated'

import { dashboardEmailAdapter } from './lib/email/emailAdapter'
import { dispatchWebhookHook } from './lib/webhooks'
import { notifyFormSubmission } from './hooks/notifyFormSubmission'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Single source of truth for the public domain (frontend + Payload share one
// origin now). PAYLOAD_PUBLIC_SERVER_URL stays supported as an optional
// override, but NEXT_PUBLIC_SITE_URL alone is enough.
const siteOrigins = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || siteOrigins[0] || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: {
      Component: '@/components/admin/AdminAvatar',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  serverURL,

  // Single origin now — the server URL and the site origins are the same.
  cors: Array.from(new Set([serverURL, ...siteOrigins])),

  csrf: Array.from(new Set([serverURL, ...siteOrigins])),

  collections: [
    Users,
    Media,
    Pages,
    Redirects,
    ProgramTypes,
    Programs,
    BlogCategories,
    Blog,
  ],

  globals: [SiteSettings, Header, Footer],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    // ⚠️ push: true auto-syncs the schema (great for local dev). Before going
    // to production, switch to `process.env.NODE_ENV !== 'production'` and apply
    // changes via committed migrations — push can drop columns on schema drift.
    push: process.env.NODE_ENV !== 'production',
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // ssl: { rejectUnauthorized: false },
    },
  }),

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'العربية', code: 'ar', rtl: true },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  email: dashboardEmailAdapter,

  sharp,

  plugins: [
    formBuilderPlugin({
      // Files uploaded via form fields are stored as Media docs so they
      // share storage + DO Spaces with the rest of the site.
      uploadCollections: ['media'],
      formOverrides: {
        slug: 'forms',
        labels: { singular: 'Form', plural: 'Forms' },
        access: {
          read: () => true,
          create: isContentEditor,
          update: isContentEditor,
          delete: isAdmin,
        },
        admin: {
          useAsTitle: 'title',
          defaultColumns: ['title', 'updatedAt'],
        },
      },

      formSubmissionOverrides: {
        slug: 'form-submissions',
        labels: { singular: 'Submission', plural: 'Submissions' },
        access: {
          // Public form POSTs come in without an authenticated user, so we
          // allow `create` only when there is NO user on the request — that
          // hides the "Create New" button in admin (where req.user is set)
          // while keeping the public submission endpoint functional.
          create: ({ req }) => !req.user,
          read: authenticated,
          update: isContentEditor,
          delete: isAdmin,
        },
        defaultSort: '-createdAt',
        admin: {
          useAsTitle: 'id',
          // submissionData first so the editor sees who submitted at a glance.
          defaultColumns: ['submissionData', 'form', 'status', 'createdAt'],
          components: {
            beforeListTable: ['@/components/admin/SubmissionsExportButton'],
          },
        },
        // `as never` casts below sidestep Payload's discriminated-union
        // field type; the runtime shape is valid.
        fields: ({ defaultFields }) => {
          const customizedDefaults = defaultFields.map((f) => {
            if ('name' in f && f.name === 'submissionData') {
              const field = f as { admin?: { components?: Record<string, unknown> } }
              return {
                ...f,
                admin: {
                  ...(field.admin ?? {}),
                  readOnly: true,
                  components: {
                    ...(field.admin?.components ?? {}),
                    Cell: '@/components/admin/SubmissionDataCell',
                    Field: '@/components/admin/SubmissionDataField',
                  },
                },
              } as never
            }
            if ('name' in f && f.name === 'form') {
              const field = f as { admin?: Record<string, unknown> }
              return {
                ...f,
                admin: {
                  ...(field.admin ?? {}),
                  readOnly: true,
                },
              } as never
            }
            if ('name' in f && f.name === 'submissionUploads') {
              const field = f as { admin?: Record<string, unknown> }
              return {
                ...f,
                admin: {
                  ...(field.admin ?? {}),
                  condition: (_: unknown, sibling: Record<string, unknown>) => {
                    const uploads = sibling?.submissionUploads
                    return Array.isArray(uploads) && uploads.length > 0
                  },
                },
              } as never
            }
            return f
          })

          return [
            ...customizedDefaults,
            {
              name: 'status',
              type: 'select',
              defaultValue: 'pending',
              admin: { position: 'sidebar' },
              options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Read', value: 'read' },
                { label: 'Replied', value: 'replied' },
                { label: 'Archived', value: 'archived' },
              ],
            },
            {
              name: 'internalNotes',
              type: 'textarea',
              admin: {
                position: 'sidebar',
                description: 'Private notes for the team. Not shown to the submitter.',
              },
            },
          ]
        },
        hooks: {
          afterChange: [
            notifyFormSubmission,
            dispatchWebhookHook('form_submission'),
          ],
        },
      },

      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        number: true,
        checkbox: true,
        message: true,
        country: true,
        state: true,
        // CV upload on Program Application form (and any other form that
        // needs file fields). Uploaded files become Media docs.
        upload: true,
      },

      defaultToEmail: process.env.DEFAULT_NOTIFICATION_EMAIL || 'admin@levntura.com',
      redirectRelationships: ['pages'],
    }),

    // Activates only when DO_SPACES_BUCKET is set — falls back to local /media in dev.
    ...(process.env.DO_SPACES_BUCKET
      ? [
          s3Storage({
            collections: { media: true },
            bucket: process.env.DO_SPACES_BUCKET,
            config: {
              endpoint: process.env.DO_SPACES_ENDPOINT,
              region: process.env.DO_SPACES_REGION,
              credentials: {
                accessKeyId: process.env.DO_SPACES_ACCESS_KEY!,
                secretAccessKey: process.env.DO_SPACES_SECRET_KEY!,
              },
              forcePathStyle: false,
            },
          }),
        ]
      : []),
  ],
})
