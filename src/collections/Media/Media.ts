import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { isAdmin, isContentEditor } from '../../access/roles'
import { seedTranslation } from '../../hooks/seedTranslation'
import { defaultAltFromFilename } from './hooks/defaultAltFromFilename'
import { setSpacesPublicAcl } from './hooks/setSpacesPublicAcl'

export const Media: CollectionConfig = {
  slug: 'media',
  trash: true,
  labels: {
    singular: 'Media',
    plural: 'Media',
  },

  access: {
    read: anyone,
    create: anyone,
    update: isContentEditor,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },

  hooks: {
    beforeValidate: [defaultAltFromFilename],
    afterChange: [seedTranslation, setSpacesPublicAcl],
  },

  upload: {
    staticDir: 'media',
    focalPoint: true,
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    adminThumbnail: 'thumbnail',

    // Right-sizing happens HERE (sharp, once, at upload time) — not at request
    // time via Vercel's Image Optimization. `next.config.ts` sets
    // `unoptimized: true` because that optimizer's quota is exhausted and
    // returns 402 for any transform it hasn't cached. Every variant below is
    // written to DO Spaces alongside the original and served straight from it.
    //
    // Names must stay in sync with the `Media['sizes']` union in
    // `src/lib/types.ts` and the `size` argument of `mediaUrl()` in
    // `src/lib/url.ts` — that helper is what picks a variant, with the
    // original as fallback.
    //
    // `withoutEnlargement` keeps sharp from upscaling an original that is
    // already smaller than the target (it emits the original dimensions
    // instead), so a small logo never becomes a bloated 1400px file.
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 72 } },
      },
      {
        name: 'card',
        width: 768,
        height: undefined,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 76 } },
      },
      {
        name: 'feature',
        width: 1400,
        height: undefined,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      // Fixed 1200x630 crop — social scrapers require exact OG dimensions,
      // so this one intentionally does not preserve aspect ratio.
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        withoutEnlargement: false,
        formatOptions: { format: 'jpeg', options: { quality: 82 } },
      },
    ],
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description:
          'Short description for accessibility and SEO. Different per language.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Longer internal description to help find this image later.',
      },
    },
  ],
}
