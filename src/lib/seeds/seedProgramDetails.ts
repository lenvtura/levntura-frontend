// Populates structured detail-page fields on each Program doc.
// Idempotent: skips programs whose detail fields are already filled.
// First run downloads ~60 images and can take a few minutes.

import type { Payload } from 'payload'

import {
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
import { buildProgramSections } from './buildProgramSections'

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

interface ResolveInput {
  programSlug: string
  data: ProgramDetailContentData
  title?: string
  featuredImageId?: string | number | null
  isOpen?: boolean
}

/**
 * Resolve a program's detail content (downloading/linking ~all its images)
 * into the `sections` blocks array. Called by seedPrograms BEFORE create, so
 * the program is created in one step with its full page — exactly like Pages,
 * which means the seedTranslation copy fires on create too.
 */
export async function resolveProgramSectionsFromData(
  payload: Payload,
  { programSlug, data, title, featuredImageId, isOpen }: ResolveInput,
): Promise<Record<string, unknown>[]> {
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

  // Memories grid — resolve each photo (bundled tour images) so the block
  // stores real Media ids and the admin shows the photos, not just a blank
  // grid that relies on the component fallback.
  const memoryImages = (
    await Promise.all(
      (data.memories?.images ?? []).map(async (m, i) =>
        resolveImageRef(
          payload,
          m,
          m.imageUrl ? deriveFilename(programSlug, m.imageUrl) : '',
          m.alt ?? `${programSlug} memory ${i + 1}`,
        ),
      ),
    )
  )
    .filter((id): id is number => id != null)
    .map((id) => ({ image: id }))

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
    detailMemories: { ...(data.memories ?? {}), images: memoryImages },
    detailFeatures: data.features ?? [],
  }

  // Apply-section decorative photos (bundled brand images) — seeded so the
  // admin shows real, editable uploads instead of relying on the fallback.
  const applyPhotos = {
    topLeft: await ensureMediaFromFile(payload, 'apply-decor-top-left.png', `${programSlug} apply photo`),
    topRight: await ensureMediaFromFile(payload, 'apply-decor-top-right.png', `${programSlug} apply photo`),
    bottomLeft: await ensureMediaFromFile(payload, 'apply-decor-bottom-left.png', `${programSlug} apply photo`),
    bottomRight: await ensureMediaFromFile(payload, 'apply-decor-bottom-right.png', `${programSlug} apply photo`),
  }

  // Turn the resolved detail content into the program `sections` blocks. The
  // caller creates the program with these, so the page is built in one step.
  return buildProgramSections({
    title,
    featuredImage: featuredImageId ?? undefined,
    isOpen,
    applyPhotos,
    ...patch,
  })
}

// The public `seedProgramDetails` loop is gone: seedPrograms now calls
// `resolveProgramSectionsFromData` directly and creates each program with its
// sections in one step (see seedPrograms).
