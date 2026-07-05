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

export const seedTranslation: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  collection,
}) => {
  const { payload, locale, context } = req
  const effectiveLocale = locale || DEFAULT_LOCALE

  if ((context as { autoSeed?: boolean })?.autoSeed) return doc
  if (effectiveLocale !== DEFAULT_LOCALE) return doc
  if (!doc?.id) return doc

  // Create-only: running on update would bump `updatedAt` and trigger
  // a "Document modified" warning on the editor's next save.
  if (operation !== 'create') return doc

  const docId = doc.id
  const collectionSlug = collection.slug

  // Awaited (not setImmediate) so the create response includes the bumped
  // updatedAt — prevents the editor's freshly-opened page from going stale.
  try {
    const paths = collectLocalizedPaths(collection.fields as Field[])
    const updates: Record<string, unknown> = {}

    for (const path of paths) {
      const enValue = getByPath(doc, path)
      if (isEmpty(enValue)) continue
      setByPath(updates, path, stripIds(enValue))
    }

    if (Object.keys(updates).length === 0) {
      return doc
    }

    const supportsDrafts = Boolean(collection.versions && collection.versions.drafts)

    await payload.update({
      collection: collectionSlug,
      id: docId,
      locale: TARGET_LOCALE,
      data: updates,
      overrideAccess: true,
      context: { autoSeed: true },
      ...(supportsDrafts ? { draft: true } : {}),
    })

    payload.logger.info(
      `[seedTranslation] ${collectionSlug}/${docId} → copied ${Object.keys(updates).length} field(s) to ar`,
    )
  } catch (err) {
    payload.logger.warn(
      `[seedTranslation] ${collectionSlug}/${docId} translation seed failed: ${(err as Error).message}`,
    )
  }

  return doc
}
