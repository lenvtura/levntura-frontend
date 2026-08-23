/**
 * Shared idempotent "download + upload to Media" helper for seed scripts.
 *
 * Why this exists:
 *   - The Media collection has `formatOptions: { format: 'webp' }`, so
 *     uploading `foo.jpg` ends up stored as `foo.webp` in DB / S3.
 *   - On any name collision Payload silently appends `-1`, `-2`, …
 *   - Querying by the original `filename` (e.g. `foo.jpg`) therefore never
 *     matches the stored `foo.webp` → seeds re-upload the same image on
 *     every run, producing duplicates in DO Spaces.
 *
 * The fix: query by basename via the case-insensitive `like` operator,
 * which matches `foo.webp`, `foo-1.webp`, `foo-2.webp`, etc. Seed callers
 * use systematic basenames (`prog-internship-...`, `gallery-01`, …) so
 * false-positive collisions are not a real concern.
 *
 * Caller passes a log function so each seed script keeps its own prefix
 * (`[seed-programs]`, `[seed-program-details]`, etc.).
 */

import type { Payload } from 'payload'

export type SeedLogger = (msg: string) => void

const NOOP_LOGGER: SeedLogger = () => {}

export async function ensureMediaFromUrl(
  payload: Payload,
  url: string,
  filename: string,
  alt: string,
  logger: SeedLogger = NOOP_LOGGER,
): Promise<number | null> {
  // Strip the source extension so the query is extension-agnostic. Then
  // the `like` (case-insensitive contains) finds `foo.webp`, `foo-1.webp`,
  // etc. — handles Payload's webp conversion + collision suffix.
  const basename = filename.replace(/\.[^./]+$/, '')

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { like: basename } },
    limit: 1,
  })
  if (existing.docs[0]) {
    logger(`  ↳ reusing existing media for ${basename}.* (id=${existing.docs[0].id})`)
    return existing.docs[0].id as number
  }

  // Fetch the bytes from the source URL.
  let buffer: Buffer
  let contentType: string
  try {
    const res = await fetch(url)
    if (!res.ok) {
      logger(`  ⚠ ${filename}: fetch ${res.status} — skipping`)
      return null
    }
    const arrayBuffer = await res.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
    const lower = filename.toLowerCase()
    contentType =
      res.headers.get('content-type') ??
      (lower.endsWith('.png')
        ? 'image/png'
        : lower.endsWith('.webp')
          ? 'image/webp'
          : lower.endsWith('.svg')
            ? 'image/svg+xml'
            : 'image/jpeg')
  } catch (err) {
    logger(`  ⚠ ${filename}: fetch failed (${(err as Error).message}) — skipping`)
    return null
  }

  // Upload to Media (which the S3 plugin routes to DO Spaces in prod).
  try {
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: contentType,
        name: filename,
        size: buffer.length,
      },
    })
    logger(`  ✓ uploaded ${filename} → media id=${created.id}`)
    return created.id as number
  } catch (err) {
    logger(`  ⚠ ${filename}: upload failed (${(err as Error).message}) — skipping`)
    return null
  }
}
