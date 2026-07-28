import type { CollectionAfterChangeHook, Field } from 'payload'

const DEFAULT_LOCALE = 'en'
const TARGET_LOCALE = 'ar'

const isEmpty = (value: unknown): boolean => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>
    if (v.root && typeof v.root === 'object') {
      const root = v.root as { children?: unknown[] }
      return !root.children || root.children.length === 0
    }
    return Object.keys(v).length === 0
  }
  return false
}

const collectLocalizedPaths = (
  fields: Field[],
  prefix: string[] = [],
): string[][] => {
  const paths: string[][] = []

  for (const field of fields) {
    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        paths.push(...collectLocalizedPaths(tab.fields, prefix))
      }
      continue
    }

    if (field.type === 'row' || field.type === 'collapsible') {
      paths.push(...collectLocalizedPaths(field.fields, prefix))
      continue
    }

    if (!('name' in field) || !field.name) continue

    if ('localized' in field && field.localized === true) {
      paths.push([...prefix, field.name])
      continue
    }

    if (field.type === 'group' && 'fields' in field && Array.isArray(field.fields)) {
      paths.push(...collectLocalizedPaths(field.fields, [...prefix, field.name]))
    }
  }

  return paths
}

const getByPath = (obj: unknown, path: string[]): unknown => {
  let curr: unknown = obj
  for (const key of path) {
    if (curr == null || typeof curr !== 'object') return undefined
    curr = (curr as Record<string, unknown>)[key]
  }
  return curr
}

const setByPath = (
  obj: Record<string, unknown>,
  path: string[],
  value: unknown,
): void => {
  let curr: Record<string, unknown> = obj
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (curr[key] == null || typeof curr[key] !== 'object') {
      curr[key] = {}
    }
    curr = curr[key] as Record<string, unknown>
  }
  curr[path[path.length - 1]] = value
}

const stripIds = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(stripIds)
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'id' || key === '_id') continue
      out[key] = stripIds(v)
    }
    return out
  }
  return value
}

// Deferred copy jobs started by the hook. Seed scripts MUST await
// `flushSeedTranslations()` before `process.exit`, otherwise pending
// copies (especially for the last-created docs) are killed mid-flight.
const pendingCopies = new Set<Promise<void>>()

export const flushSeedTranslations = async (): Promise<void> => {
  while (pendingCopies.size > 0) {
    await Promise.allSettled([...pendingCopies])
  }
}

export const seedTranslation: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  collection,
}) => {
  const { payload, locale, context } = req
  const sourceLocale = locale || DEFAULT_LOCALE

  if ((context as { autoSeed?: boolean })?.autoSeed) return doc
  if (!doc?.id) return doc

  // Create-only: copying on update would overwrite the other locale's
  // translations on every save. Exception: seed patches (e.g. program
  // detail content added right after create) opt in via
  // `context.seedTranslate` — the target locale is still fresh there.
  const seedPatch = Boolean((context as { seedTranslate?: boolean })?.seedTranslate)
  if (operation !== 'create' && !seedPatch) return doc

  // Mirror to the "other" locale, whichever side the doc was created on.
  if (sourceLocale !== 'en' && sourceLocale !== 'ar') return doc
  const targetLocale = sourceLocale === 'en' ? TARGET_LOCALE : DEFAULT_LOCALE

  const docId = doc.id
  const collectionSlug = collection.slug
  const supportsDrafts = Boolean(collection.versions && collection.versions.drafts)

  // Deferred until AFTER the create's transaction commits:
  //  - a nested read inside the same transaction can't see the new row
  //    ("Not Found")
  //  - a failed statement inside a shared Postgres transaction poisons it
  //    and rolls back the document creation itself.
  const job = new Promise<void>((resolveJob) => {
    setImmediate(async () => {
    try {
      // depth 0 → relationship/upload fields come back as plain IDs. The
      // populated `doc` from afterChange carries full objects, which the
      // target-locale write can't store in relation columns.
      const raw = await payload.findByID({
        collection: collectionSlug,
        id: docId,
        locale: sourceLocale,
        depth: 0,
        ...(supportsDrafts ? { draft: true } : {}),
      })

      const paths = collectLocalizedPaths(collection.fields as Field[])
      const updates: Record<string, unknown> = {}

      for (const path of paths) {
        const value = getByPath(raw, path)
        if (isEmpty(value)) continue
        setByPath(updates, path, stripIds(value))
      }

      if (Object.keys(updates).length === 0) return

      await payload.update({
        collection: collectionSlug,
        id: docId,
        locale: targetLocale,
        data: updates,
        overrideAccess: true,
        context: { autoSeed: true },
        ...(supportsDrafts ? { draft: true } : {}),
      })

      payload.logger.info(
        `[seedTranslation] ${collectionSlug}/${docId} → copied ${Object.keys(updates).length} field(s) ${sourceLocale} → ${targetLocale}`,
      )
    } catch (err) {
      payload.logger.warn(
        `[seedTranslation] ${collectionSlug}/${docId} translation seed failed: ${(err as Error).message}`,
      )
    } finally {
      resolveJob()
    }
    })
  })
  pendingCopies.add(job)
  void job.finally(() => pendingCopies.delete(job))

  return doc
}
