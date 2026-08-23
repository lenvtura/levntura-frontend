import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Auto-set the current user as author when creating a new post.
 * Skipped if author is already set (e.g. admin assigning to someone else).
 */
export const setDefaultAuthor: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation !== 'create') return data
  if (data.author) return data
  if (!req.user) return data

  return {
    ...data,
    author: req.user.id,
  }
}
