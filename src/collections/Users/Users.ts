
import type { CollectionConfig } from 'payload'
import { seedTranslation } from '../../hooks/seedTranslation'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },

  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // 7 days
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes lockout
  },

  hooks: {
    afterChange: [seedTranslation],
  },



  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },


   access: {
    // Only admins can create new users
    create: ({ req: { user } }) => user?.role === 'admin',

    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',

    // Public read so blog post authors can be displayed on the frontend.
    // Payload still protects email/password automatically; the only fields
    // exposed are name, role, and avatar.
    read: () => true,

    // Admins can update anyone; everyone else can only update themselves
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
  },

 
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
       required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'seo', value: 'seo' },
        { label: 'Editor', value: 'editor' },
        // { label: 'User', value: 'user' },
      ],
       defaultValue: 'editor',
       access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
     
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
    position: 'sidebar',
  },
    },
  ],
}
