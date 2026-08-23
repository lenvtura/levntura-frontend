import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Auto-update `dateModified` only when the published version changes.
 *
 * Behavior:
 *   - On first publish: sets dateModified to publishedAt
 *   - On re-publish: updates dateModified to now
 *   - On draft save: does NOT update dateModified
 *     (drafts shouldn't affect public-facing "last updated" date)
 */
export const populateDateModified: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  operation,
}) => {
  // Only care about published content
  if (data._status !== 'published') {
    return data
  }

  // First publish: set to publishedAt or now
  if (operation === 'create' || originalDoc?._status !== 'published') {
    return {
      ...data,
      dateModified: data.publishedAt || new Date(),
    }
  }

  // Re-publish (was published, still published, but content changed): update to now
  if (operation === 'update') {
    return { ...data, dateModified: new Date() }
  }

  return data
}
