import type { Access } from 'payload'

/**
 * Public sees published only. Admin sees everything.
 * Use this for collections that have a draft/published flow (Pages, Blog, etc.)
 */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}