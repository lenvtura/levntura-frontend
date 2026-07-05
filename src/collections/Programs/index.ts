import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { PROGRAM_COUNTRY_OPTIONS } from '../../fields/countries'
import { seoFields } from '../../fields/seo'
import { courseSchemaFields } from '../../fields/seo/courseSchema'
import { slugField } from '../../fields/slug'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'
import { revalidatePath } from '../../hooks/revalidatePath'
import { createRedirectOnSlugChange } from '../../hooks/createRedirectOnSlugChange'

import { contentBlocks } from '../../blocks'

import { LIVE_PREVIEW_BREAKPOINTS, livePreviewURL } from '../../lib/livePreview'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Program',
    plural: 'Programs',
  },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'isOpen', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'shortDescription'],
    livePreview: {
      url: livePreviewURL({ prefix: '/programs' }),
      breakpoints: [...LIVE_PREVIEW_BREAKPOINTS],
    },
  },

  versions: {
    drafts: true,
    maxPerDoc: 30,
  },

  // See Pages collection — disabled to stop the spurious "Document
  // modified" warning from the locking poll.
  lockDocuments: false,

  hooks: {
    beforeChange: [populatePublishedAt, populateDateModified, translationGate],
    afterChange: [
      revalidatePath('programs', (doc) => `/programs/${doc.slug}`),
      createRedirectOnSlugChange('programs', { prefix: '/programs' }),
      seedTranslation,
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'type',
              type: 'relationship',
              relationTo: 'program-types',
              hasMany: true,
              required: true,
              admin: {
                description: 'One or more categories for filtering.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'country',
                  type: 'select',
                  required: true,
                  admin: { width: '50%' },
                  // Shared with the ProgramsList block filter — see
                  // `src/fields/countries/index.ts` for the single source.
                  options: [...PROGRAM_COUNTRY_OPTIONS],
                },
                {
                  name: 'duration',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%',
                    description: 'e.g. "3 months", "12 weeks"',
                  },
                },
              ],
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Brief description for cards (50-100 chars).',
              },
            },
            {
              name: 'applicationForm',
              type: 'relationship',
              relationTo: 'forms',
              admin: {
                description: 'Specific dynamic form for this program. Overrides the Program Type form if selected.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main image for the program card and hero.',
              },
            },
            {
              name: 'isOpen',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'When ON, the apply button is shown on the frontend.',
              },
            },
            {
              name: 'calendlyURL',
              type: 'text',
              admin: {
                description: 'Full Calendly booking URL. Used by the apply button.',
                condition: (_, sib) => Boolean(sib?.isOpen),
              },
            },
          ],
        },

        {
          label: 'Detail Page',
          description:
            'The structured detail-page content. Mirrors the legacy static template — every program shares the same layout, you just fill in each section.',
          fields: [
            // ─── Hero ─────────────────────────────────────────────────────
            {
              name: 'detailHero',
              type: 'group',
              label: 'Hero',
              admin: { description: 'Top of the program detail page.' },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  localized: true,
                  admin: { description: 'Small label above the title, e.g. "SUMMER".' },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "BACHELOR & MASTER\'S DEGREE STUDENTS".' },
                },
                {
                  name: 'note',
                  type: 'text',
                  localized: true,
                  admin: { description: 'e.g. "Program only to USA.".' },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Hero background image. Falls back to featuredImage if empty.' },
                },
              ],
            },

            // ─── Intro ────────────────────────────────────────────────────
            {
              name: 'detailIntro',
              type: 'group',
              label: 'Intro',
              fields: [
                { name: 'eyebrow', type: 'text', localized: true },
                { name: 'body', type: 'textarea', localized: true },
              ],
            },

            // ─── What is the program ──────────────────────────────────────
            {
              name: 'detailWhatIs',
              type: 'group',
              label: 'What is the Program?',
              fields: [
                { name: 'title', type: 'text', localized: true },
                {
                  name: 'body',
                  type: 'textarea',
                  localized: true,
                  admin: { description: 'Use **bold** markers around words to make them bold.' },
                },
              ],
            },

            // ─── Photo break #1 ───────────────────────────────────────────
            {
              name: 'detailPhotoMiddle',
              type: 'upload',
              relationTo: 'media',
              label: 'Photo between sections',
              admin: { description: 'Decorative visual break between "What is" and "Picture yourself".' },
            },

            // ─── Picture Yourself ─────────────────────────────────────────
            {
              name: 'detailPictureYourself',
              type: 'group',
              label: 'Picture Yourself',
              fields: [
                { name: 'eyebrow', type: 'text', localized: true },
                { name: 'body', type: 'textarea', localized: true },
                { name: 'circleHeading', type: 'text', localized: true },
                { name: 'circleBody', type: 'textarea', localized: true },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Round photo behind the yellow circle.' },
                },
              ],
            },

            // ─── Why Participate ──────────────────────────────────────────
            {
              name: 'detailWhyParticipate',
              type: 'group',
              label: 'Why You Should Participate',
              fields: [
                { name: 'body', type: 'textarea', localized: true },
                {
                  name: 'benefits',
                  type: 'array',
                  label: 'Benefits',
                  localized: true,
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea' },
                  ],
                },
              ],
            },

            // ─── Jobs slider ──────────────────────────────────────────────
            {
              name: 'detailJobs',
              type: 'group',
              label: 'What You Will Be Doing (Jobs)',
              fields: [
                { name: 'body', type: 'textarea', localized: true },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Jobs',
                  localized: true,
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'title', type: 'text', required: true },
                  ],
                },
              ],
            },

            // ─── Destinations slider ──────────────────────────────────────
            {
              name: 'detailDestinations',
              type: 'group',
              label: 'Destinations (Next Adventure)',
              fields: [
                { name: 'leadText', type: 'textarea', localized: true },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Destinations',
                  localized: true,
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'area', type: 'text', required: true },
                    { name: 'country', type: 'text' },
                  ],
                },
              ],
            },

            // ─── Benefits Showcase (checklist) ────────────────────────────
            {
              name: 'detailBenefitsShowcase',
              type: 'group',
              label: 'Amazing Experience Showcase',
              fields: [
                { name: 'title', type: 'text', localized: true },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Checklist items',
                  localized: true,
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
              ],
            },

            // ─── Requirements ─────────────────────────────────────────────
            {
              name: 'detailRequirements',
              type: 'array',
              label: 'Requirements',
              localized: true,
              fields: [
                {
                  name: 'iconKey',
                  type: 'select',
                  required: true,
                  enumName: 'enum_prog_req_icon',
                  options: [
                    { label: 'Passport', value: 'passport' },
                    { label: 'College / Education', value: 'college' },
                    { label: 'Language', value: 'language' },
                    { label: 'Age', value: 'age' },
                    { label: 'Diploma / Interview', value: 'diploma' },
                  ],
                },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },

            // ─── Memories ─────────────────────────────────────────────────
            {
              name: 'detailMemories',
              type: 'group',
              label: 'Memories',
              admin: {
                description:
                  'Photo grid + heading + CTAs (same look as the about-page Memories block). Editor-uploaded photos are stored in Media. Falls back to packaged tour-images when empty.',
              },
              fields: [
                { name: 'title', type: 'text', localized: true },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Photos',
                  localized: true,
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'alt', type: 'text' },
                  ],
                },
                {
                  name: 'primaryCta',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', localized: true },
                    { name: 'url', type: 'text' },
                  ],
                },
                {
                  name: 'secondaryLink',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', localized: true },
                    { name: 'url', type: 'text' },
                  ],
                },
              ],
            },

            // ─── Features (Why Choose Levntura) ───────────────────────────
            {
              name: 'detailFeatures',
              type: 'array',
              label: 'Features (Why Choose Levntura?)',
              localized: true,
              fields: [
                {
                  name: 'iconKey',
                  type: 'select',
                  required: true,
                  enumName: 'enum_prog_feat_icon',
                  options: [
                    { label: 'Star', value: 'star' },
                    { label: 'Bag', value: 'bag' },
                    { label: 'Hand', value: 'hand' },
                    { label: 'People', value: 'people' },
                    { label: 'Face / Smile', value: 'face' },
                    { label: 'Check', value: 'check' },
                  ],
                },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },

        {
          label: 'Extra Sections',
          description: 'Optional CMS blocks rendered AFTER the structured detail page. Use for ad-hoc content the template doesn\'t cover.',
          fields: [
            {
              name: 'sections',
              label: 'Extra sections',
              type: 'blocks',
              localized: true,
              admin: {
                description: 'Build extra sections with blocks. Drag to reorder.',
              },
              blocks: contentBlocks,
            },
          ],
        },

        {
          label: 'SEO',
          fields: [...seoFields, ...courseSchemaFields],
        },
      ],
    },

    ...slugField('title'),

    {
      name: 'translationComplete',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Required before publishing AR version.',
      },
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },

    {
      name: 'dateModified',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
