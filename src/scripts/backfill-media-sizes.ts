/**
 * Backfill image variants for media uploaded BEFORE `Media.upload.imageSizes`
 * existed.
 *
 *   pnpm backfill:media
 *
 * Those docs have a single object in DO Spaces (the original) and empty
 * `sizes.*` columns, so `mediaUrl(doc, 'card')` falls back to the full-size
 * original — which is exactly the 750KB-to-mobile problem the variants exist
 * to solve.
 *
 * Payload only runs sharp on *upload*, so the only way to generate variants
 * for an existing doc is to feed the original bytes back through `update()`
 * with a `file`. Downloading from the doc's own public URL and re-uploading
 * under the SAME filename with `overwriteExistingFiles: true` makes this
 * idempotent: the original object is rewritten byte-for-byte in place and the
 * variants appear alongside it. Re-running skips anything already done.
 *
 * Runs with NODE_ENV=production (set in the npm script) purely to force
 * `push: false` in the Postgres adapter. Without it, booting Payload locally
 * against a production DATABASE_URL auto-pushes the schema — which is how this
 * database drifted out of sync with its migrations in the first place.
 *
 * Flags:
 *   --force   re-generate even for docs that already have variants
 *   --limit=N stop after N docs (useful for a smoke test on prod)
 */

import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

const SIZE_NAMES = ['thumbnail', 'card', 'feature', 'og'] as const

const log = (msg: string): void => {
  process.stdout.write(`[backfill:media] ${msg}\n`)
}

const arg = (name: string): string | undefined =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]

const run = async (): Promise<void> => {
  const force = process.argv.includes('--force')
  const limit = Number(arg('limit') ?? '0') || Infinity

  log('booting payload...')
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'media',
    // Variants only make sense for raster images — the collection also accepts
    // video/* and application/pdf, which sharp cannot process.
    where: { mimeType: { like: 'image/' } },
    limit: 0, // all
    depth: 0,
    pagination: false,
  })

  log(`found ${docs.length} image docs`)

  const report = { processed: 0, skipped: 0, failed: 0 }

  for (const doc of docs) {
    if (report.processed >= limit) break

    const id = doc.id
    const filename = typeof doc.filename === 'string' ? doc.filename : null
    const url = typeof doc.url === 'string' ? doc.url : null

    if (!filename || !url) {
      log(`  ⚠ id=${id}: missing filename/url — skipping`)
      report.skipped += 1
      continue
    }

    // SVGs have no meaningful raster variants and sharp would rasterise them,
    // losing the whole point of a vector logo.
    if (doc.mimeType === 'image/svg+xml') {
      report.skipped += 1
      continue
    }

    const sizes = (doc as { sizes?: Record<string, { filename?: string | null }> }).sizes
    const alreadyDone = SIZE_NAMES.every((n) => Boolean(sizes?.[n]?.filename))
    if (alreadyDone && !force) {
      report.skipped += 1
      continue
    }

    try {
      const res = await fetch(url)
      if (!res.ok) {
        log(`  ⚠ id=${id} ${filename}: fetch ${res.status} — skipping`)
        report.failed += 1
        continue
      }
      const buffer = Buffer.from(await res.arrayBuffer())

      await payload.update({
        collection: 'media',
        id,
        data: {},
        file: {
          data: buffer,
          mimetype: doc.mimeType ?? res.headers.get('content-type') ?? 'image/webp',
          name: filename,
          size: buffer.length,
        },
        // Same filename → the original object in Spaces is rewritten in place
        // rather than gaining a `-1` collision suffix.
        overwriteExistingFiles: true,
      })

      report.processed += 1
      log(`  ✓ ${filename} (${(buffer.length / 1024).toFixed(0)}KB) → variants generated`)
    } catch (err) {
      report.failed += 1
      log(`  ⚠ id=${id} ${filename}: ${(err as Error).message}`)
    }
  }

  log(JSON.stringify(report))
  process.exit(report.failed > 0 ? 1 : 0)
}

run().catch((err) => {
  process.stderr.write(`[backfill:media] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
