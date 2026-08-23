/**
 * One-time schema step for the Blog "single language" feature on production.
 *
 *   node src/scripts/apply-blog-language.cjs
 *
 * Adds the non-localized `language` enum column to `blog` (+ `version_language`
 * on the `_blog_v` versions table). On local dev the postgres adapter's `push`
 * adds these automatically; production has `push` OFF, so we add the exact same
 * objects here.
 *
 * 100% idempotent and non-destructive: enums are created only if missing, and
 * columns use ADD COLUMN IF NOT EXISTS with DEFAULT 'en' — so every existing
 * blog post becomes English automatically (matching the current content), and
 * nothing else is touched. Safe to run multiple times.
 *
 * Point `.env` DATABASE_URL at the target DB (live) before running.
 */

require('dotenv').config()
const { createRequire } = require('module')
const req = createRequire(require.resolve('@payloadcms/db-postgres'))
const { Client } = req('pg')

const statements = [
  `DO $$ BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_blog_language') THEN
       CREATE TYPE "enum_blog_language" AS ENUM ('en', 'ar');
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__blog_v_version_language') THEN
       CREATE TYPE "enum__blog_v_version_language" AS ENUM ('en', 'ar');
     END IF;
   END $$;`,
  `ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "language" "enum_blog_language" DEFAULT 'en' NOT NULL;`,
  `ALTER TABLE "_blog_v" ADD COLUMN IF NOT EXISTS "version_language" "enum__blog_v_version_language" DEFAULT 'en';`,
]

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
  for (const sql of statements) {
    await client.query(sql)
    console.log('ok:', sql.split('\n')[0].slice(0, 70))
  }

  const { rows } = await client.query(
    `SELECT language, count(*)::int AS n FROM blog GROUP BY language`,
  )
  console.log('\nDone. Blog posts by language:')
  for (const r of rows) console.log(`  ${r.language ?? 'NULL'}: ${r.n}`)
  await client.end()
})().catch((e) => {
  console.error('ERROR:', e.message)
  process.exit(1)
})
