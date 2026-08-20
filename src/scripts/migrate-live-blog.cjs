/**
 * ONE-TIME live migration for the Blog "single language" + Picture-Yourself
 * title changes. Run BEFORE deploying the matching code.
 *
 *   node src/scripts/migrate-live-blog.cjs
 *
 * What it does (ALL inside a single transaction — either everything succeeds or
 * NOTHING changes and live is left exactly as it was):
 *
 *   A. blog.language enum column (+ _blog_v.version_language), default 'en'
 *      → existing English posts become 'en' automatically.
 *   B. Blog fields title/excerpt/sections become NON-localized:
 *      - add blog.title / blog.excerpt (+ version columns), copy the English
 *        locale value into them, then drop the old localized columns.
 *      - drop `_locale` from every blog block sub-table (keeping the English
 *        rows) so the article body is stored once, not per-locale.
 *      Live blog is English-only, so no translation is lost.
 *   C. Picture-Yourself gets a `title` column on pgm_py / ppg_py / jbg_py
 *      (+ their _v version tables) — a plain additive column (empty → the
 *      section keeps showing its "Picture yourself" fallback until edited).
 *
 * Safety:
 *   - Everything runs in a TRANSACTION; any error → full ROLLBACK.
 *   - Writes a JSON backup of blog title/excerpt/language BEFORE the changes.
 *   - Idempotent guards (IF NOT EXISTS / IF EXISTS) so a re-run is safe.
 *   - Prints a verification summary at the end.
 *
 * Point `.env` DATABASE_URL at LIVE before running.
 */

require('dotenv').config()
const fs = require('fs')
const { createRequire } = require('module')
const req = createRequire(require.resolve('@payloadcms/db-postgres'))
const { Client } = req('pg')

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

  // ---- 0. Safety backup (title/excerpt/language of every post) ----------
  try {
    const backup = await client.query(
      `SELECT b.id, b.slug,
              (SELECT bl.title FROM blog_locales bl WHERE bl._parent_id=b.id AND bl._locale='en') AS en_title,
              (SELECT bl.excerpt FROM blog_locales bl WHERE bl._parent_id=b.id AND bl._locale='en') AS en_excerpt
       FROM blog b`,
    )
    const file = `blog-live-backup-${host.replace(/[^a-z0-9]/gi, '_')}.json`
    fs.writeFileSync(file, JSON.stringify(backup.rows, null, 2))
    console.log(`Safety backup written: ${file} (${backup.rows.length} posts)`)
  } catch (e) {
    console.log('Backup step skipped (columns may already be migrated):', e.message)
  }

  const run = (sql) => client.query(sql)

  try {
    await run('BEGIN')

    // ===================================================================
    // A. blog.language enum column
    // ===================================================================
    await run(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='enum_blog_language') THEN
        CREATE TYPE "enum_blog_language" AS ENUM ('en','ar');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='enum__blog_v_version_language') THEN
        CREATE TYPE "enum__blog_v_version_language" AS ENUM ('en','ar');
      END IF;
    END $$;`)
    await run(`ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "language" "enum_blog_language" DEFAULT 'en' NOT NULL;`)
    await run(`ALTER TABLE "_blog_v" ADD COLUMN IF NOT EXISTS "version_language" "enum__blog_v_version_language" DEFAULT 'en';`)
    console.log('A. language column ✓')

    // ===================================================================
    // B. Blog title/excerpt → non-localized (copy EN, then drop localized)
    // ===================================================================
    await run(`ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "title" varchar;`)
    await run(`ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "excerpt" varchar;`)
    // Only copy from blog_locales if those localized columns still exist.
    await run(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_locales' AND column_name='title') THEN
        UPDATE "blog" b SET
          "title"   = COALESCE(b."title",   (SELECT bl."title"   FROM "blog_locales" bl WHERE bl."_parent_id"=b.id AND bl."_locale"='en' LIMIT 1)),
          "excerpt" = COALESCE(b."excerpt", (SELECT bl."excerpt" FROM "blog_locales" bl WHERE bl."_parent_id"=b.id AND bl."_locale"='en' LIMIT 1));
      END IF;
    END $$;`)
    await run(`ALTER TABLE "blog_locales" DROP COLUMN IF EXISTS "title";`)
    await run(`ALTER TABLE "blog_locales" DROP COLUMN IF EXISTS "excerpt";`)

    // versions
    await run(`ALTER TABLE "_blog_v" ADD COLUMN IF NOT EXISTS "version_title" varchar;`)
    await run(`ALTER TABLE "_blog_v" ADD COLUMN IF NOT EXISTS "version_excerpt" varchar;`)
    await run(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='_blog_v_locales' AND column_name='version_title') THEN
        UPDATE "_blog_v" v SET
          "version_title"   = COALESCE(v."version_title",   (SELECT vl."version_title"   FROM "_blog_v_locales" vl WHERE vl."_parent_id"=v.id AND vl."_locale"='en' LIMIT 1)),
          "version_excerpt" = COALESCE(v."version_excerpt", (SELECT vl."version_excerpt" FROM "_blog_v_locales" vl WHERE vl."_parent_id"=v.id AND vl."_locale"='en' LIMIT 1));
      END IF;
    END $$;`)
    await run(`ALTER TABLE "_blog_v_locales" DROP COLUMN IF EXISTS "version_title";`)
    await run(`ALTER TABLE "_blog_v_locales" DROP COLUMN IF EXISTS "version_excerpt";`)
    console.log('B1. title/excerpt non-localized ✓')

    // ===================================================================
    // B2. Blog block (sections) tables → drop `_locale` (keep English rows)
    //     Dynamic: every blog_blocks_* / _blog_v_blocks_* that still has a
    //     `_locale` column, EXCEPT the field-level `*_locales` tables (those
    //     stay localized on purpose, e.g. hero_blog_post_locales).
    // ===================================================================
    await run(`DO $$
    DECLARE t text;
    BEGIN
      FOR t IN
        SELECT c.table_name FROM information_schema.columns c
        WHERE c.table_schema='public' AND c.column_name='_locale'
          AND (c.table_name LIKE 'blog_blocks_%' OR c.table_name LIKE '_blog_v_blocks_%')
          AND c.table_name NOT LIKE '%_locales'
      LOOP
        EXECUTE format('DELETE FROM %I WHERE "_locale" <> ''en''', t);
        EXECUTE format('ALTER TABLE %I DROP COLUMN "_locale"', t);
      END LOOP;
    END $$;`)
    console.log('B2. block tables de-localized ✓')

    // ===================================================================
    // C. Picture-Yourself `title` column (additive) on all 3 collections
    // ===================================================================
    for (const tbl of ['pgm_py', 'ppg_py', 'jbg_py', '_pgm_py_v', '_ppg_py_v', '_jbg_py_v']) {
      await run(`DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='${tbl}') THEN
          ALTER TABLE "${tbl}" ADD COLUMN IF NOT EXISTS "title" varchar;
        END IF;
      END $$;`)
    }
    console.log('C. picture-yourself title column ✓')

    await run('COMMIT')
    console.log('\n=== COMMITTED ===')
  } catch (e) {
    await run('ROLLBACK').catch(() => {})
    console.error('\nERROR — rolled back, live is UNCHANGED:\n', e.message)
    await client.end()
    process.exit(1)
  }

  // ---- Verify ------------------------------------------------------------
  const check = async (label, sql) => {
    const r = await client.query(sql)
    console.log(`${label}:`, r.rows[0] ? Object.values(r.rows[0]).join(' ') : '(none)')
  }
  console.log('\n=== verification ===')
  await check('blog.title/excerpt/language exist',
    `SELECT count(*) FILTER (WHERE column_name IN ('title','excerpt','language')) AS n FROM information_schema.columns WHERE table_schema='public' AND table_name='blog'`)
  await check('blog_locales still has title/excerpt? (want 0)',
    `SELECT count(*) AS n FROM information_schema.columns WHERE table_schema='public' AND table_name='blog_locales' AND column_name IN ('title','excerpt')`)
  await check('block tables still with _locale? (want 0)',
    `SELECT count(*) AS n FROM information_schema.columns WHERE table_schema='public' AND column_name='_locale' AND (table_name LIKE 'blog_blocks_%' OR table_name LIKE '_blog_v_blocks_%') AND table_name NOT LIKE '%_locales'`)
  await check('posts by language',
    `SELECT string_agg(language || ':' || n, ', ') AS s FROM (SELECT language, count(*) n FROM blog GROUP BY language) x`)
  await check('posts with a title',
    `SELECT count(*) AS n FROM blog WHERE title IS NOT NULL AND title <> ''`)

  await client.end()
  console.log('\nDone.')
})().catch((e) => {
  console.error('FATAL:', e.message)
  process.exit(1)
})
