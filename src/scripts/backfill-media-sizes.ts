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
 * Safe to point at a remote database: `shouldPushSchema()` in src/lib/db.ts
 * keeps the adapter from auto-syncing the schema unless DATABASE_URL is local.
 *
 * Flags:
 *   --force   re-generate even for docs that already have variants
 *   --limit=N stop after N docs (useful for a smoke test on prod)
 */

import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

const SIZE_NAMES = ['thumbnail', 'card', 'feature', 'og'] as const

const UNPROCESSABLE_MIMES = new Set([
  'image/svg+xml',
  'image/heic',
  'image/heif',
  'image/x-icon',
  'image/vnd.microsoft.icon',
])

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

  const report = { processed: 0, skipped: 0, orphaned: 0, failed: 0 }

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

    // Formats sharp cannot resize, or should not. These can never succeed, so
    // they are skipped rather than counted as failures — otherwise every future
    // run exits non-zero on the same handful of files and the exit code stops
    // meaning anything.
    //   svg  - rasterising a vector logo defeats the point
    //   heic - sharp needs libheif, which is not built in here
    //   ico  - not a resizable raster format
    if (doc.mimeType && UNPROCESSABLE_MIMES.has(doc.mimeType)) {
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
        // An orphaned row: the record outlived its object in Spaces. Nothing a
        // re-run can fix, so it is not counted as a failure.
        log(`  ⚠ id=${id} ${filename}: fetch ${res.status} — orphaned record, skipping`)
        report.orphaned += 1
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
  // Flush stdout before exiting: process.exit() truncates buffered writes to a
  // pipe, which previously swallowed this very report line when piped to grep.
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(report.failed > 0 ? 1 : 0)
}

// A dropped connection to Spaces or Postgres surfaces as an unhandled 'error'
// event on the pg client, outside the per-document try/catch. Without these
// guards the process died mid-run reporting exit 0, which read as a clean
// finish - the run looked complete when a third of the images were untouched.
process.on('unhandledRejection', (err) => {
  process.stderr.write(
    `[backfill:media] unhandled rejection: ${
      err instanceof Error ? err.message : String(err)
    }\n`,
  )
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  process.stderr.write(`[backfill:media] uncaught exception: ${err.message}\n`)
  process.exit(1)
})

run().catch((err) => {
  process.stderr.write(`[backfill:media] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
