import type { CollectionAfterChangeHook } from 'payload'

type PathBuilder = (doc: Record<string, unknown>) => string

export const revalidatePath = (
  collectionLabel: string,
  buildPath: PathBuilder,
): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req: { payload } }) => {
    const justPublished = doc._status === 'published'
    const wasPublished = previousDoc?._status === 'published'
    if (!justPublished && !wasPublished) return doc

    const path = buildPath(doc as Record<string, unknown>)

    // Single app now — revalidate the Next cache in-process (no cross-domain
    // HTTP, no shared secret). Refresh both the English path and its /ar twin.
    // Dynamic import + try/catch so CLI seed scripts (which run outside a Next
    // request scope) don't crash — there's no page cache to revalidate there.
    try {
      const { revalidatePath: nextRevalidatePath } = await import('next/cache')
      nextRevalidatePath(path)
      nextRevalidatePath(path === '/' ? '/ar' : `/ar${path}`)
      payload.logger.info(`[${collectionLabel}] revalidated ${path}`)
    } catch (err) {
      payload.logger.info(
        `[${collectionLabel}] revalidate skipped (no request scope): ${(err as Error).message}`,
      )
    }

    return doc
  }
