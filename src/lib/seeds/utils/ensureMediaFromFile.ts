/**
 * "Read from disk + upload to Media" variant of `ensureMediaFromUrl`.
 *
 * Why this exists: some sections of the legacy static site referenced
 * images that were bundled in the frontend repo as static assets (.svg,
 * .webp) rather than uploaded to DO Spaces. The URL-based seed helper
 * can't reach those files, so editors saw the matching admin fields
 * empty even though the public site rendered the bundled fallback.
 *
 * We now copy those files into `src/lib/seeds/data/local-images/` and
 * upload them via this helper so every Programs detail field shows the
 * actual image in admin — editors know what's on the page and can swap
 * pieces individually instead of starting from empty slots.
 *
 * Idempotent via the same filename-basename match as `ensureMediaFromUrl`.
 */

import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Payload } from 'payload'

import type { SeedLogger } from './ensureMediaFromUrl'

const NOOP_LOGGER: SeedLogger = () => {}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// `src/lib/seeds/utils/...` → resolve once back up to `src/lib/seeds/data/local-images/`
const LOCAL_IMAGES_DIR = path.resolve(__dirname, '..', 'data', 'local-images')

/**
 * @param relativeName  filename within `src/lib/seeds/data/local-images/`
 * @param alt           Media `alt` text (translated per locale later)
 */
export async function ensureMediaFromFile(
  payload: Payload,
  relativeName: string,
  alt: string,
  logger: SeedLogger = NOOP_LOGGER,
): Promise<number | null> {
  // Dedup by basename so re-runs reuse the upload — same logic as the
  // URL helper, handles Payload's webp conversion + `-N` suffix.
  const basename = relativeName.replace(/\.[^./]+$/, '')

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { like: basename } },
    limit: 1,
  })
  if (existing.docs[0]) {
    logger(`  ↳ reusing existing media for ${basename}.* (id=${existing.docs[0].id})`)
    return existing.docs[0].id as number
  }

  const fullPath = path.join(LOCAL_IMAGES_DIR, relativeName)
  let buffer: Buffer
  try {
    buffer = readFileSync(fullPath)
  } catch (err) {
    logger(`  ⚠ ${relativeName}: read failed (${(err as Error).message}) — skipping`)
    return null
  }

  const lower = relativeName.toLowerCase()
  const contentType = lower.endsWith('.svg')
    ? 'image/svg+xml'
    : lower.endsWith('.webp')
      ? 'image/webp'
      : lower.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg'

  try {
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: contentType,
        name: relativeName,
        size: buffer.length,
      },
    })
    logger(`  ✓ uploaded local ${relativeName} → media id=${created.id}`)
    return created.id as number
  } catch (err) {
    logger(`  ⚠ ${relativeName}: upload failed (${(err as Error).message}) — skipping`)
    return null
  }
}
