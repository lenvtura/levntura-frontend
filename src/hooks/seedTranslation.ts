import type { CollectionAfterChangeHook, Field } from 'payload'
import { after } from 'next/server'

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

// Order-sensitive for arrays (block order matters), key-order-insensitive for
// objects. Used to skip redundant target-locale writes — see run() below.
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((x, i) => deepEqual(x, b[i]))
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ak = Object.keys(a as Record<string, unknown>)
    const bk = Object.keys(b as Record<string, unknown>)
    if (ak.length !== bk.length) return false
    return ak.every(
      (k) =>
        Object.prototype.hasOwnProperty.call(b, k) &&
        deepEqual(
          (a as Record<string, unknown>)[k],
          (b as Record<string, unknown>)[k],
        ),
    )
  }
  return false
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

type BlockRow = Record<string, unknown> & { blockType?: unknown }

/** Top-level names of localized `blocks` fields (e.g. `sections`). */
const collectLocalizedBlocksFields = (fields: Field[]): string[] => {
  const names: string[] = []
  for (const field of fields) {
    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        names.push(...collectLocalizedBlocksFields(tab.fields))
      }
      continue
    }
    if (field.type === 'row' || field.type === 'collapsible') {
      names.push(...collectLocalizedBlocksFields(field.fields))
      continue
    }
    if (!('name' in field) || !field.name) continue
    if (field.type === 'blocks' && 'localized' in field && field.localized === true) {
      names.push(field.name)
    }
  }
  return names
}

/**
 * Sync a target-locale blocks array to mirror the source-locale structure
 * while preserving existing translations. Blocks are matched by their stable
 * `syncKey` (see withBlockMeta), so translations survive reordering and
 * mid-array inserts — not just appends:
 *   - key found in target       → keep the target (translated) block untouched
 *   - new key (no match)         → clone the source block as a placeholder
 *   - target key absent from src → dropped (section removed in the source)
 *
 * Falls back to position + blockType for legacy blocks that predate syncKey,
 * and stamps the source key onto the kept block so future syncs match by key.
 */
const syncBlocksArray = (sourceArr: unknown, targetArr: unknown): unknown[] => {
  const source = Array.isArray(sourceArr) ? sourceArr : []
  const target = Array.isArray(targetArr) ? targetArr : []

  const keyOf = (b: unknown): string | undefined => {
    const k = (b as BlockRow)?.syncKey
    return typeof k === 'string' && k.length > 0 ? k : undefined
  }

  const targetByKey = new Map<string, BlockRow>()
  for (const b of target) {
    const k = keyOf(b)
    if (k) targetByKey.set(k, b as BlockRow)
  }

  const used = new Set<BlockRow>()

  return source.map((srcBlock, i) => {
    const src = srcBlock as BlockRow
    const key = keyOf(src)

    // 1) stable-key match — survives reorder / mid-insert.
    let tgt = key ? targetByKey.get(key) : undefined

    // 2) legacy fallback — same position + type, only for keyless blocks.
    if (!tgt) {
      const byPos = target[i] as BlockRow | undefined
      if (byPos && !keyOf(byPos) && byPos.blockType === src?.blockType) {
        tgt = byPos
      }
    }

    if (tgt && tgt.blockType === src?.blockType && !used.has(tgt)) {
      used.add(tgt)
      // Keep the translated block; stamp the source key so a legacy block
      // gets linked and matches by key from now on.
      return key ? { ...tgt, syncKey: key } : tgt
    }

    // New / unmatched block → source placeholder. stripIds only removes
    // id/_id, so the block's syncKey is preserved for future matching.
    return stripIds(srcBlock)
  })
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

  // Create / seed-patch → copy every localized field over (target locale is
  // fresh). Update → don't blindly re-copy (that would wipe translations);
  // instead keep the target's localized `blocks` fields (e.g. `sections`) in
  // structural sync with the source — add/remove/reorder mirror across, but
  // blocks that still line up keep their translation. See run() below.
  const seedPatch = Boolean((context as { seedTranslate?: boolean })?.seedTranslate)
  const isFullCopy = operation === 'create' || seedPatch

  // Mirror to the "other" locale, whichever side the doc was created on.
  if (sourceLocale !== 'en' && sourceLocale !== 'ar') return doc
  const targetLocale = sourceLocale === 'en' ? TARGET_LOCALE : DEFAULT_LOCALE

  const docId = doc.id
  const collectionSlug = collection.slug
  const supportsDrafts = Boolean(collection.versions && collection.versions.drafts)

  // The copy runs AFTER the create's transaction commits (a nested read
  // inside the same transaction can't see the new row, and a failed
  // statement inside a shared Postgres transaction would poison it and roll
  // back the document creation itself). It also runs in its own transaction
  // — no `req` is passed to findByID/update.
  const run = async (): Promise<void> => {
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

      const updates: Record<string, unknown> = {}

      if (isFullCopy) {
        // Create / seed-patch: copy every non-empty localized field over.
        const paths = collectLocalizedPaths(collection.fields as Field[])
        for (const path of paths) {
          const value = getByPath(raw, path)
          if (isEmpty(value)) continue
          setByPath(updates, path, stripIds(value))
        }
      } else {
        // Update: mirror the source structure into the target's localized
        // blocks fields (e.g. `sections`), keeping translated blocks that
        // still line up by position + type.
        const blocksFields = collectLocalizedBlocksFields(collection.fields as Field[])
        if (blocksFields.length === 0) return

        const rawTarget = await payload.findByID({
          collection: collectionSlug,
          id: docId,
          locale: targetLocale,
          depth: 0,
          ...(supportsDrafts ? { draft: true } : {}),
        })

        for (const name of blocksFields) {
          const sourceArr = getByPath(raw, [name])
          if (!Array.isArray(sourceArr) || sourceArr.length === 0) continue
          const existingTarget = getByPath(rawTarget, [name])
          const synced = syncBlocksArray(sourceArr, existingTarget)
          // Only write when the structure actually changed. An interactive
          // edit that touched source *content* (not order/add/remove) leaves
          // the synced result identical to what AR already has — writing it
          // anyway would bump the doc's `updatedAt` and make the editor's open
          // view show "Document modified / your view is out of date" on every
          // single save. Skipping the no-op write removes that entirely.
          if (deepEqual(synced, existingTarget)) continue
          updates[name] = synced
        }
      }

      if (Object.keys(updates).length === 0) return

      await payload.update({
        collection: collectionSlug,
        id: docId,
        locale: targetLocale,
        data: updates,
        overrideAccess: true,
        // Document locking is enabled on these collections. Without this, a
        // background sync onto a doc the editor currently holds a lock on
        // would be rejected — breaking translation. The sync is a trusted
        // system write, so it always bypasses the lock.
        overrideLock: true,
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
    }
  }

  // Request-time (admin / REST API): `after()` runs the copy once the
  // response is sent — i.e. after the transaction commits — AND keeps
  // serverless functions (Vercel) alive until it finishes. Without this the
  // function froze after responding, so `setImmediate` never fired and the
  // Arabic side stayed empty in production. On a long-running Node server it
  // behaves the same as before.
  try {
    after(run)
  } catch {
    // No request scope (e.g. a seed script): fall back to a tracked deferred
    // job that flushSeedTranslations() awaits before process.exit.
    const job = new Promise<void>((resolveJob) => {
      setImmediate(async () => {
        try {
          await run()
        } finally {
          resolveJob()
        }
      })
    })
    pendingCopies.add(job)
    void job.finally(() => pendingCopies.delete(job))
  }

  return doc
}
