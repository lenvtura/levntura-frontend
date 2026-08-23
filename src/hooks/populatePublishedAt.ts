import type { CollectionBeforeChangeHook } from 'payload'

/**
 * When a doc is published for the first time, set publishedAt automatically.
 * Use on any collection with a draft/published flow.
 */
export const populatePublishedAt: CollectionBeforeChangeHook = ({
  data,
  operation,
}) => {
  if (operation === 'create' || operation === 'update') {
    if (data._status === 'published' && !data.publishedAt) {
      return { ...data, publishedAt: new Date() }
    }
  }
  return data
}