import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { isAdmin, isContentEditor } from '../../access/roles'
import { seedTranslation } from '../../hooks/seedTranslation'
import { defaultAltFromFilename } from './hooks/defaultAltFromFilename'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },

  access: {
    read: anyone,
    // `create: anyone` is required so anonymous form submitters can upload
    // files (e.g., the CV field on the Program Application form). Without
    // this the public form returns 403 on the /api/media POST.
    //
    // Risk: arbitrary visitors can write to the bucket. Acceptable for now
    // because (1) read is already public, (2) update/delete stay locked to
    // editors/admins, and (3) the form-builder plugin associates each
    // upload with a submission record so orphan uploads are traceable.
    //
    // If bucket spam becomes a problem, gate this with a token-issuing
    // endpoint on the frontend that mints a short-lived signed token the
    // /api/media POST can validate.
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
    afterChange: [seedTranslation],
  },

  upload: {
    staticDir: 'media',
    focalPoint: true,

    // Allowed upload formats. Wildcards cover every image variant (JPEG,
    // PNG, WebP, SVG, GIF, HEIC, AVIF, …) and every video container (mp4,
    // webm, mov, m4v, mkv, …) so editors don't hit MIME-type errors on
    // common phone / camera exports.
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],

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