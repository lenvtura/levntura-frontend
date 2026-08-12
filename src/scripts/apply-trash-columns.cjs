/**
 * One-time schema step for enabling Trash (soft-delete) on production.
 *
 *   node src/scripts/apply-trash-columns.cjs
 *
 * Why this exists: `trash: true` on a collection makes Payload expect a
 * `deleted_at` column (and `version_deleted_at` on its `_v` versions table).
 * On local dev the postgres adapter's `push` adds these automatically, but on
 * production `push` is OFF — so we add the exact same columns/indexes here.
 *
 * 100% idempotent and non-destructive: every statement is ADD COLUMN /
 * CREATE INDEX "IF NOT EXISTS". Adding a nullable column is instant in
 * Postgres (no table rewrite, no lock on existing rows) and never touches
 * existing data. Safe to run multiple times.
 *
 * Point `.env` DATABASE_URL at the target DB (live) before running.
 */

require('dotenv').config()
const { createRequire } = require('module')
// Resolve `pg` via the db-postgres package (avoids hard-coding a .pnpm path).
const req = createRequire(require.resolve('@payloadcms/db-postgres'))
const { Client } = req('pg')

// Collections with `trash: true`. Main table → deleted_at.
const MAIN_TABLES = [
  'pages',
  'jobs',
  'job_types',
  'programs',
  'program_types',
  'blog',
  'blog_categories',
  'media',
]

// Versioned collections (drafts) also mirror the field on their `_v` table
// as `version_deleted_at`. `media` has no versions, so it is not listed here.
const VERSION_TABLES = [
  '_pages_v',
  '_jobs_v',
  '_job_types_v',
  '_programs_v',
  '_program_types_v',
  '_blog_v',
  '_blog_categories_v',
]

const statements = []
for (const t of MAIN_TABLES) {
  statements.push(
    `ALTER TABLE "${t}" ADD COLUMN IF NOT EXISTS "deleted_at" timestamp(3) with time zone;`,
  )
  statements.push(
    `CREATE INDEX IF NOT EXISTS "${t}_deleted_at_idx" ON "${t}" USING btree ("deleted_at");`,
  )
}
for (const t of VERSION_TABLES) {
  statements.push(
    `ALTER TABLE "${t}" ADD COLUMN IF NOT EXISTS "version_deleted_at" timestamp(3) with time zone;`,
  )
  statements.push(
    `CREATE INDEX IF NOT EXISTS "${t}_version_version_deleted_at_idx" ON "${t}" USING btree ("version_deleted_at");`,
  )
}

;(async () => {
  const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URI
  if (!connectionString) {
    console.error('No DATABASE_URL / DATABASE_URI in env')
    process.exit(1)
  }
  const host = (connectionString.match(/@([^/:]+)/) || [])[1] || '(unknown)'
  const isLocal = /localhost|127\.0\.0\.1/.test(connectionString)
  const ssl = process.env.VERCEL || !isLocal ? { rejectUnauthorized: false } : undefined
  console.log(`Target DB host: ${host}  (${isLocal ? 'LOCAL' : 'REMOTE/LIVE'})`)

  const client = new Client({ connectionString, ssl })
  await client.connect()
  let applied = 0
  for (const sql of statements) {
    await client.query(sql)
    applied++
    console.log('ok:', sql)
  }

  // Verify
  const { rows } = await client.query(
    `SELECT count(*)::int AS n FROM information_schema.columns
     WHERE table_schema='public' AND column_name LIKE '%deleted_at%'`,
  )
  console.log(`\nDone. Ran ${applied} statements. deleted_at columns present: ${rows[0].n}`)
  await client.end()
})().catch((e) => {
  console.error('ERROR:', e.message)
  process.exit(1)
})
