// Populates structured detail-page fields on each Program doc.
// Idempotent: skips programs whose detail fields are already filled.
// First run downloads ~60 images and can take a few minutes.

import type { Payload } from 'payload'

import {
  PROGRAM_DETAIL_BY_SLUG,
  type ProgramDetailBenefitData,
  type ProgramDetailContentData,
  type ProgramDetailDestinationData,
  type ProgramDetailJobData,
} from './data/programDetailContent'

const log = (msg: string) => {
  process.stdout.write(`[seed-program-details] ${msg}\n`)
}

import { ensureMediaFromUrl as ensureMediaFromUrlShared } from './utils/ensureMediaFromUrl'
import { ensureMediaFromFile as ensureMediaFromFileShared } from './utils/ensureMediaFromFile'

const ensureMediaFromUrl = (
  payload: Payload,
  url: string,
  filename: string,
  alt: string,
) => ensureMediaFromUrlShared(payload, url, filename, alt, log)

const ensureMediaFromFile = (
  payload: Payload,
  relativeName: string,
  alt: string,
) => ensureMediaFromFileShared(payload, relativeName, alt, log)

/**
 * Resolve a media reference that may come from either a remote URL or a
 * bundled local file (under `src/lib/seeds/data/local-images/`). Used for
 * detail fields whose original assets lived inside the frontend repo
 * rather than on DO Spaces — without this helper the seed left those
 * fields empty and admin showed blank slots.
 *
 * Returns the resulting Media id or null on failure.
 */
async function resolveImageRef(
  payload: Payload,
  source: { imageUrl?: string; localFile?: string },
  derivedRemoteName: string,
  alt: string,
): Promise<number | null> {
  if (source.localFile) {
    return ensureMediaFromFile(payload, source.localFile, alt)
  }
  if (source.imageUrl) {
    return ensureMediaFromUrl(payload, source.imageUrl, derivedRemoteName, alt)
  }
  return null
}

// ─── Filename helpers ─────────────────────────────────────────────────────

/**
 * Strip the trailing random hash that legacy DO Spaces URLs include
 * (`_RandomChars` before the extension) and prefix with program slug so
 * uploads across programs don't collide on filename.
 *
 * Example:
 *   work_and_travel-cook_sAoQyNF.jpg → prog-work-and-travel-cook.jpg
 */
function deriveFilename(programSlug: string, url: string): string {
  // Pick the URL's last segment as the base.
  const parts = url.split('/')
  const last = parts[parts.length - 1] || 'image'
  const cleaned = last
    .replace(/_[A-Za-z0-9]{6,}(\.[a-zA-Z]+)$/, '$1') // drop random hash
    .toLowerCase()
  return `prog-${programSlug}-${cleaned}`
}

// ─── Detail seed (per program) ────────────────────────────────────────────

interface PatchInput {
  programId: string | number
  programSlug: string
  data: ProgramDetailContentData
}

async function buildAndPatchProgramDetail(
  payload: Payload,
  { programId, programSlug, data }: PatchInput,
): Promise<void> {
  // 1. Hero image (URL or bundled local file)
  const heroImageId = await resolveImageRef(
    payload,
    data.hero,
    data.hero.imageUrl ? deriveFilename(programSlug, data.hero.imageUrl) : '',
    `${programSlug} hero`,
  )

  // Photo break (legacy `photo2.webp`) and Picture-Yourself round photo
  // (legacy `photo3.webp`) — both originally bundled in the frontend, so
  // they only have local-file sources.
  const photoMiddleId = data.photoMiddleLocalFile
    ? await ensureMediaFromFile(payload, data.photoMiddleLocalFile, `${programSlug} photo middle`)
    : null
  const pictureYourselfId = data.pictureYourselfLocalFile
    ? await ensureMediaFromFile(payload, data.pictureYourselfLocalFile, `${programSlug} picture yourself`)
    : null

  // 2. Benefits — image may come from remote URL or bundled local file
  const benefits = await Promise.all(
    (data.whyParticipate?.benefits ?? []).map(async (b: ProgramDetailBenefitData) => {
      const imageId = await resolveImageRef(
        payload,
        b,
        b.imageUrl ? deriveFilename(programSlug, b.imageUrl) : '',
        b.title,
      )
      return {
        title: b.title,
        description: b.description ?? '',
        ...(imageId ? { image: imageId } : {}),
      }
    }),
  )

  // 3. Jobs slider
  const jobs = await Promise.all(
    (data.jobs?.items ?? []).map(async (j: ProgramDetailJobData) => {
      const imageId = await resolveImageRef(
        payload,
        j,
        j.imageUrl ? deriveFilename(programSlug, j.imageUrl) : '',
        j.title,
      )
      return {
        title: j.title,
        ...(imageId ? { image: imageId } : {}),
      }
    }),
  )

  // 4. Destinations slider
  const destinations = await Promise.all(
    (data.destinations?.items ?? []).map(async (d: ProgramDetailDestinationData) => {
      const imageId = await resolveImageRef(
        payload,
        d,
        d.imageUrl ? deriveFilename(programSlug, d.imageUrl) : '',
        d.area,
      )
      return {
        area: d.area,
        country: d.country ?? '',
        ...(imageId ? { image: imageId } : {}),
      }
    }),
  )

  // Build the patch payload — every top-level field is the entire group, not
  // a partial. Payload merges arrays naïvely (replaces), which is what we want
  // for an idempotent first-time seed.
  const patch: Record<string, unknown> = {
    detailHero: {
      tag: data.hero.tag ?? '',
      subtitle: data.hero.subtitle ?? '',
      note: data.hero.note ?? '',
      ...(heroImageId ? { image: heroImageId } : {}),
    },
    detailIntro: data.intro ?? {},
    detailWhatIs: data.whatIs ?? {},
    ...(photoMiddleId ? { detailPhotoMiddle: photoMiddleId } : {}),
    detailPictureYourself: {
      ...(data.pictureYourself ?? {}),
      ...(pictureYourselfId ? { photo: pictureYourselfId } : {}),
    },
    detailWhyParticipate: {
      body: data.whyParticipate?.body ?? '',
      benefits,
    },
    detailJobs: {
      body: data.jobs?.body ?? '',
      items: jobs,
    },
    detailDestinations: {
      leadText: data.destinations?.leadText ?? '',
      items: destinations,
    },
    detailBenefitsShowcase: {
      title: data.benefitsShowcase?.title ?? '',
      items: (data.benefitsShowcase?.items ?? []).map((text) => ({ text })),
    },
    detailRequirements: data.requirements ?? [],
    detailMemories: data.memories ?? {},
    detailFeatures: data.features ?? [],
  }

  await payload.update({
    collection: 'programs',
    id: programId,
    data: patch as never,
  })
}

// ─── Public API ───────────────────────────────────────────────────────────

export interface SeedProgramDetailsResult {
  ok: boolean
  message: string
  patched: string[]
  skipped: string[]
  errors: string[]
}

/**
 * Patch the detail fields on every program that has a known config AND is
 * still missing structured content. `programIdsBySlug` comes from the
 * preceding seedPrograms run.
 *
 * If a program's `detailHero` already has any value, we treat it as "edited
 * by the editor" and leave it alone — re-runs preserve manual changes.
 */
export async function seedProgramDetails(
  payload: Payload,
  programIdsBySlug: Record<string, string | number>,
): Promise<SeedProgramDetailsResult> {
  const result: SeedProgramDetailsResult = {
    ok: true,
    message: '',
    patched: [],
    skipped: [],
    errors: [],
  }

  for (const [slug, programId] of Object.entries(programIdsBySlug)) {
    const data = PROGRAM_DETAIL_BY_SLUG[slug]
    if (!data) {
      result.skipped.push(`${slug} (no config)`)
      continue
    }

    try {
      const existing = await payload.findByID({
        collection: 'programs',
        id: programId,
        depth: 0,
      })
      const existingHero = (existing as { detailHero?: { subtitle?: string; tag?: string; note?: string } } | null)?.detailHero
      const alreadyHasContent = Boolean(
        existingHero && (existingHero.subtitle || existingHero.tag || existingHero.note),
      )

      if (alreadyHasContent) {
        log(`${slug} already has detail content — skipping (set detailHero fields empty to re-seed)`)
        result.skipped.push(`${slug} (already populated)`)
        continue
      }

      log(`patching ${slug}...`)
      await buildAndPatchProgramDetail(payload, { programId, programSlug: slug, data })
      log(`  ✓ patched ${slug}`)
      result.patched.push(slug)
    } catch (err) {
      log(`  ⚠ ${slug}: ${(err as Error).message}`)
      result.errors.push(`${slug}: ${(err as Error).message}`)
    }
  }

  result.message = `Program details seed done. patched=${result.patched.length}, skipped=${result.skipped.length}, errors=${result.errors.length}.`
  if (result.errors.length) result.ok = false
  return result
}
