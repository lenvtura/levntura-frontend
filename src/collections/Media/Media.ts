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
