import type { Field } from 'payload'
import { formatSlug } from './formatSlug'

/**
 * Reusable slug field. Auto-generates from `fallbackField` (default: 'title').
 *
 * Usage:
 *   fields: [
 *     { name: 'title', type: 'text' },
 *     ...slugField('title'),
 *   ]
 */
export const slugField = (fallbackField = 'title'): Field[] => [
  {
    name: 'slug',
    type: 'text',
    index: true,
    unique: true,
    required: true,
    admin: {
      position: 'sidebar',
      description: 'URL part. Auto-generated from title; you can edit it.',
    },
    hooks: {
      beforeValidate: [formatSlug(fallbackField)],
    },
  },
]