import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdmin, isContentEditor } from '../../access/roles'

import { seoFields, pageSchemaFields } from '../../fields/seo'
import { slugField } from '../../fields/slug'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateDateModified } from '../../hooks/populateDateModified'
import { translationGate } from '../../hooks/translationGate'
import { seedTranslation } from '../../hooks/seedTranslation'
import { createRedirectOnSlugChange } from '../../hooks/createRedirectOnSlugChange'

import { withBlockMeta } from '../../blocks/withBlockMeta'
import { HeroBlock } from '../../blocks/Hero'
import { HeroHomeBlock } from '../../blocks/HeroHome'
import { TravelDestinationsBlock } from '../../blocks/TravelDestinations'
import { RichTextBlock } from '../../blocks/RichText'
import { ContentBlock } from '../../blocks/Content'
import { GalleryBlock } from '../../blocks/Gallery'
import { FAQBlock } from '../../blocks/FAQ'
import { CTABlock } from '../../blocks/CTA'
import { ImageFeatureBlock } from '../../blocks/ImageFeature'
import { MediaShowcaseBlock } from '../../blocks/MediaShowcase'
import { DecoratedCTABlock } from '../../blocks/DecoratedCTA'
import { PartnersCarouselBlock } from '../../blocks/PartnersCarousel'
import { FeatureCardsBlock } from '../../blocks/FeatureCards'
import { AlternatingContentBlock } from '../../blocks/AlternatingContent'
import { BlogPostsListBlock } from '../../blocks/BlogPostsList'
import { VideoTestimonialsBlock } from '../../blocks/VideoTestimonials'
import { SocialFeedBlock } from '../../blocks/SocialFeed'
import { ProgramShowcaseBlock } from '../../blocks/ProgramShowcase'
import { FoundersCarouselBlock } from '../../blocks/FoundersCarousel'
import { MissionStatsBlock } from '../../blocks/MissionStats'
import { ValuesListBlock } from '../../blocks/ValuesList'
import { TextTestimonialsBlock } from '../../blocks/TextTestimonials'
import { MapEmbedBlock } from '../../blocks/MapEmbed'
import { ContactFormBlock } from '../../blocks/ContactForm'
import { AddressListBlock } from '../../blocks/AddressList'
import { HeroWithImageGridBlock } from '../../blocks/HeroWithImageGrid'
import { MemoriesGridBlock } from '../../blocks/MemoriesGrid'
import { EducationStatsBlock } from '../../blocks/EducationStats'
import { VentureGridBlock } from '../../blocks/VentureGrid'
import { PhotoGridBlock } from '../../blocks/PhotoGrid'
import { GalleryHeroBlock } from '../../blocks/GalleryHero'
import { GalleryCtaBlock } from '../../blocks/GalleryCta'
import { FormBlock } from '../../blocks/FormBlock'
import { PromptCTABlock } from '../../blocks/PromptCTA'
import { RelatedItemsBlock } from '../../blocks/RelatedItems'

import { LIVE_PREVIEW_BREAKPOINTS, livePreviewURL } from '../../lib/livePreview'

import { revalidatePage } from './hooks/revalidatePage'
import { buildFullPath } from './hooks/buildFullPath'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },

  access: {
    read: authenticatedOrPublished,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    livePreview: {
      url: livePreviewURL({
        resolveSlug: (slug) => (slug === 'home' || !slug ? '' : `/${slug}`),
      }),
      breakpoints: [...LIVE_PREVIEW_BREAKPOINTS],
    },
  },

  versions: {
    drafts: true,
    maxPerDoc: 50,
  },

  // Document locking (WordPress-style "someone is editing / take over" UX) is
  // ON. It was previously disabled because the seedTranslation hook wrote to
  // the doc on every save — even no-op writes — bumping updatedAt and tripping
  // the 10s poll into a false "Document modified" alarm, even in single-tab
  // editing. That root cause is fixed (the hook now skips no-op writes and
  // bypasses the lock via overrideLock), so locking is safe to enable.
  lockDocuments: { duration: 300 },

  hooks: {
    beforeChange: [
      populatePublishedAt,
      populateDateModified,
      translationGate,
      buildFullPath,
    ],
    afterChange: [revalidatePage, createRedirectOnSlugChange('pages'), seedTranslation],
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
          label: 'Content',
          fields: [
            {
              name: 'sections',
              label: 'Page sections',
              type: 'blocks',
              required: true,
              localized: true,
              admin: {
                description: 'Build the page by adding sections. Drag to reorder.',
              },
              blocks: [
                HeroHomeBlock,
                TravelDestinationsBlock,
                HeroBlock,
                RichTextBlock,
                ContentBlock,
                GalleryBlock,
                FAQBlock,
                CTABlock,
                ImageFeatureBlock,
                MediaShowcaseBlock,
                DecoratedCTABlock,
                PartnersCarouselBlock,
                FeatureCardsBlock,
                AlternatingContentBlock,
                BlogPostsListBlock,
                VideoTestimonialsBlock,
                SocialFeedBlock,
                ProgramShowcaseBlock,
                FoundersCarouselBlock,
                MissionStatsBlock,
                ValuesListBlock,
                TextTestimonialsBlock,
                MapEmbedBlock,
                ContactFormBlock,
                AddressListBlock,
                HeroWithImageGridBlock,
                MemoriesGridBlock,
                EducationStatsBlock,
                VentureGridBlock,
                PhotoGridBlock,
                GalleryHeroBlock,
                GalleryCtaBlock,
                FormBlock,
                PromptCTABlock,
                RelatedItemsBlock,
                // Every block gets the shared section meta (hide toggle + sync key).
              ].map(withBlockMeta),
            },
          ],
        },

        {
          label: 'SEO',
          fields: [...seoFields, ...pageSchemaFields],
        },

        {
          label: 'Settings',
          fields: [
            { name: 'showHeader', type: 'checkbox', defaultValue: true },
            { name: 'showFooter', type: 'checkbox', defaultValue: true },
            {
              name: 'parent',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                description: 'Optional parent page for nested URLs (e.g. /services/web).',
              },
            },
          ],
        },
      ],
    },

    ...slugField('title'),

    {
      name: 'fullPath',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description:
          'Auto-built from parent chain. Used as the actual URL path.',
      },
    },

    {
      name: 'translationComplete',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Tick this when the Arabic translation is complete and reviewed. Required before publishing AR.',
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
        description: 'Auto-updated on every publish.',
      },
    },
  ],
}
