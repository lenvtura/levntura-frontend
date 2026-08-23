/**
 * Applies the media `sizes_*` schema change to the database — the one step
 * `pnpm payload migrate` cannot safely do here.
 *
 *   pnpm migrate:media          # show what it would do, change nothing
 *   pnpm migrate:media --commit # actually apply
 *
 * WHY THIS EXISTS INSTEAD OF `payload migrate`
 * --------------------------------------------
 * The database was schema-*pushed* in dev mode rather than migrated, which
 * left two problems that `payload migrate` handles badly:
 *
 *  1. `20260806_122240` is recorded as NOT run, but its `up()` is already
 *     fully present in the database (verified: all 40 tables, 2 enum types,
 *     416 columns, and all 14 drops). Running it would execute
 *     `CREATE TABLE "pgm_hero"` against an existing table and abort.
 *
 *  2. `payload_migrations` holds a `dev` row with `batch = -1`. Payload sees
 *     it and stops on an interactive "data loss will occur" confirmation.
 *
 * So this script records `20260806_122240` as applied (bookkeeping only — it
 * runs none of that migration's SQL) and then applies the media-sizes DDL,
 * both inside ONE transaction that rolls back entirely on any error.
 *
 * The DDL is read out of `src/migrations/20260823_000000_media_image_sizes.ts`
 * at runtime rather than duplicated here, so this can never drift from the
 * committed migration. Every statement is IF NOT EXISTS-guarded, so re-running
 * is harmless.
 */

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { Client } from 'pg'

const MIGRATION = '20260823_000000_media_image_sizes'
const PRESUMED_APPLIED = '20260806_122240'

const log = (m: string): void => process.stdout.write(`[migrate:media] ${m}\n`)

/** Read the `up()` SQL out of the committed migration file. */
function readUpSql(): string {
  const file = path.join(process.cwd(), 'src/migrations', `${MIGRATION}.ts`)
  const src = fs.readFileSync(file, 'utf8')
  const up = src.slice(
    src.indexOf('export async function up'),
    src.indexOf('export async function down'),
  )
  const match = up.match(/sql`([\s\S]*?)`\)/)
  if (!match) throw new Error(`could not extract SQL from ${file}`)
  return match[1]
}

const run = async (): Promise<void> => {
  const commit = process.argv.includes('--commit')
  const ddl = readUpSql()
  const statements = ddl.split(';').map((s) => s.trim()).filter(Boolean)

  log(`${statements.length} DDL statements read from ${MIGRATION}.ts`)
  if (!commit) {
    statements.forEach((s) => process.stdout.write(`  ${s};\n`))
    log('DRY RUN — nothing was written. Re-run with --commit to apply.')
    return
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()

  try {
    await client.query('BEGIN')

    await client.query(ddl)
    log(`applied ${statements.length} DDL statements`)

    // Bookkeeping only — none of this migration's SQL is executed, because
    // its schema is already present (see header).
    const already = await client.query(
      'SELECT 1 FROM payload_migrations WHERE name = $1',
      [PRESUMED_APPLIED],
    )
    if (already.rowCount === 0) {
      await client.query(
        'INSERT INTO payload_migrations (name, batch) VALUES ($1, 3)',
        [PRESUMED_APPLIED],
      )
      log(`recorded ${PRESUMED_APPLIED} as applied (bookkeeping only)`)
    }

    // Its own batch, so `payload migrate:down` rolls back the media change
    // alone and does not touch anything else.
    const mine = await client.query(
      'SELECT 1 FROM payload_migrations WHERE name = $1',
      [MIGRATION],
    )
    if (mine.rowCount === 0) {
      await client.query(
        'INSERT INTO payload_migrations (name, batch) VALUES ($1, 4)',
        [MIGRATION],
      )
      log(`recorded ${MIGRATION} as applied`)
    }

    await client.query('COMMIT')
    log('COMMITTED')

    const check = await client.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = 'media' AND column_name LIKE 'sizes%' ORDER BY 1`,
    )
    log(`verify: media now has ${check.rowCount} sizes_* columns (expected 24)`)
  } catch (err) {
    await client.query('ROLLBACK')
    log(`ROLLED BACK — nothing changed: ${(err as Error).message}`)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

run().catch((err) => {
  process.stderr.write(`[migrate:media] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
