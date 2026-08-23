import type { CollectionAfterChangeHook } from 'payload'

export const createRedirectOnSlugChange = (
  collectionSlug: string,
  options: { prefix?: string } = {},
): CollectionAfterChangeHook => {
  return async ({ doc, previousDoc, operation, req: { payload } }) => {
    if (operation !== 'update') return doc
    if (!previousDoc) return doc

    const oldSlug = previousDoc.slug
    const newSlug = doc.slug

    if (oldSlug === newSlug) return doc
    if (!oldSlug || !newSlug) return doc
    if (doc._status !== 'published') return doc

    const prefix = options.prefix || ''
    const fromPath = oldSlug === 'home' ? '/' : `${prefix}/${oldSlug}`

    try {
      const existing = await payload.find({
        collection: 'redirects',
        where: { from: { equals: fromPath } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'redirects',
          id: existing.docs[0].id,
          data: {
            to: { type: 'page', page: doc.id },
            enabled: true,
          },
        })
        payload.logger.info(`[redirect/${collectionSlug}] Updated: ${fromPath} → ${newSlug}`)
      } else {
        await payload.create({
          collection: 'redirects',
          data: {
            from: fromPath,
            to: { type: 'page', page: doc.id },
            type: '301',
            enabled: true,
            note: `Auto-created in ${collectionSlug}: slug changed "${oldSlug}" → "${newSlug}"`,
          },
        })
        payload.logger.info(`[redirect/${collectionSlug}] Created: ${fromPath} → ${newSlug}`)
      }
    } catch (err) {
      payload.logger.error(`[redirect/${collectionSlug}] Failed: ${(err as Error).message}`)
    }

    return doc
  }
}
