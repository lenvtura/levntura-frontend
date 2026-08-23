/**
 * One-off migration: build each program's `sections` block list from its
 * legacy fixed `detail*` fields, so the program page can render entirely
 * from `sections` (the same page-builder model as Pages).
 *
 * SAFE BY DESIGN:
 *   - Reads the `detail*` fields — never deletes them.
 *   - Writes the built blocks as a DRAFT (nothing is auto-published). Review
 *     each program in the admin, then publish when it looks right.
 *   - Preserves any existing "Extra sections" (appended after the migrated
 *     blocks, matching the legacy render order).
 *   - Idempotent: skips a program whose sections already start with a
 *     `programHero` block (i.e. already migrated). Set MIGRATE_FORCE=1 to
 *     re-run — that strips previously-migrated program blocks first.
 *   - Matches EN/AR blocks by a shared `syncKey`, so translations stay linked.
 *
 * The block-building logic lives in `../lib/seeds/buildProgramSections` and is
 * shared with the seed, so the two never drift apart.
 */

import 'dotenv/config'
import { randomUUID } from 'crypto'
import { getPayload } from 'payload'

import config from '../payload.config'
import {
  decideSlots,
  buildBlock,
  MIGRATED_MEMORIES_PREFIX,
} from '../lib/seeds/buildProgramSections'

const log = (m: string) => process.stdout.write(`[migrate-programs] ${m}\n`)

const FORCE = process.env.MIGRATE_FORCE === '1'

// Block slugs this migration owns — used for idempotency / force cleanup.
const PROGRAM_BLOCK_TYPES = new Set([
  'programHero',
  'programIntro',
  'programWhatIs',
  'programPhotoBreak',
  'programPictureYourself',
  'programWhyParticipate',
  'programJobs',
  'programDestinations',
  'programBenefitsShowcase',
  'programRequirements',
  'programWhyChoose',
  'programApply',
])

type Any = Record<string, unknown>

const isMigratedBlock = (b: Any): boolean =>
  PROGRAM_BLOCK_TYPES.has(b.blockType as string) ||
  (b.blockType === 'memoriesGrid' &&
    typeof b.syncKey === 'string' &&
    (b.syncKey as string).startsWith(MIGRATED_MEMORIES_PREFIX))

const migrate = async (): Promise<void> => {
  log('booting payload...')
  const payload = await getPayload({ config })

  const { docs: programs } = await payload.find({
    collection: 'programs',
    limit: 1000,
    depth: 0,
    draft: true,
    overrideAccess: true,
    pagination: false,
  })

  log(`found ${programs.length} program(s)`)
  let migrated = 0
  let skipped = 0

  for (const prog of programs as unknown as Any[]) {
    const id = prog.id as string | number
    const title = (prog.title as string) ?? String(id)

    // Read both locales at depth 0 (relations as ids).
    const [rawEn, rawAr] = (await Promise.all([
      payload.findByID({ collection: 'programs', id, locale: 'en', depth: 0, draft: true, overrideAccess: true }),
      payload.findByID({ collection: 'programs', id, locale: 'ar', depth: 0, draft: true, overrideAccess: true }),
    ])) as unknown as [Any, Any]

    const existingEn = Array.isArray(rawEn.sections) ? (rawEn.sections as Any[]) : []
    const existingAr = Array.isArray(rawAr.sections) ? (rawAr.sections as Any[]) : []

    const alreadyMigrated = existingEn.some((b) => b.blockType === 'programHero')
    if (alreadyMigrated && !FORCE) {
      log(`• skip "${title}" (already migrated)`)
      skipped++
      continue
    }

    // On --force, drop previously-migrated blocks, keep the rest.
    const keepEn = FORCE ? existingEn.filter((b) => !isMigratedBlock(b)) : existingEn
    const keepAr = FORCE ? existingAr.filter((b) => !isMigratedBlock(b)) : existingAr

    // Decide structure from EN; generate one syncKey per slot (shared EN/AR).
    const slots = decideSlots(rawEn)
    const keys: Record<string, string> = {}
    slots.forEach((s) => (keys[s] = randomUUID()))

    const enBlocks = slots.map((s) => buildBlock(s, rawEn, keys[s])).filter(Boolean) as Any[]
    const arBlocks = slots.map((s) => buildBlock(s, rawAr, keys[s])).filter(Boolean) as Any[]

    // Write as DRAFT, suppress the translation sync hook (autoSeed).
    await payload.update({
      collection: 'programs',
      id,
      locale: 'en',
      draft: true,
      overrideAccess: true,
      context: { autoSeed: true },
      data: { sections: [...enBlocks, ...keepEn] },
    })
    await payload.update({
      collection: 'programs',
      id,
      locale: 'ar',
      draft: true,
      overrideAccess: true,
      context: { autoSeed: true },
      data: { sections: [...arBlocks, ...keepAr] },
    })

    log(`✓ "${title}" → ${enBlocks.length} block(s)`)
    migrated++
  }

  log(`done. migrated=${migrated}, skipped=${skipped}`)
  process.exit(0)
}

migrate().catch((err) => {
  log(`FAILED: ${(err as Error).stack ?? (err as Error).message}`)
  process.exit(1)
})
