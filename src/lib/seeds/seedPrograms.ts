/**
 * Seed default ProgramTypes (4 categories) and Programs (5 sample programs)
 * with starter sections so the /programs frontend has something to render
 * immediately after a fresh DB setup.
 *
 * Idempotent: matches by slug (types) and slug (programs) — re-running is
 * safe. Editor edits in admin are preserved.
 *
 * Inputs:
 *   - `applicationFormId` — the seeded "Program Application" form's ID,
 *     attached to every Program so the apply button works out of the box.
 *
 * Output report tracks created vs skipped per collection.
 */

import type { Payload } from 'payload'

import { ensureMediaFromUrl as ensureMediaFromUrlShared } from './utils/ensureMediaFromUrl'
import { resolveProgramSectionsFromData } from './seedProgramDetails'
import { PROGRAM_DETAIL_BY_SLUG } from './data/programDetailContent'

const log = (msg: string) => {
  process.stdout.write(`[seed-programs] ${msg}\n`)
}

// Base URL for the legacy program images on DigitalOcean Spaces.
const DO_SPACES_BASE =
  'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images'

// Thin wrapper that forwards this script's log prefix into the shared
// helper. See `utils/ensureMediaFromUrl.ts` for the dedup-by-basename
// logic that prevents webp-conversion duplicates.
const ensureMediaFromUrl = (
  payload: Payload,
  url: string,
  filename: string,
  alt: string,
) => ensureMediaFromUrlShared(payload, url, filename, alt, log)

export interface SeedProgramsResult {
  ok: boolean
  message: string
  types: Record<string, string | number>
  programs: Record<string, string | number>
  created: string[]
  skipped: string[]
  errors: string[]
}

interface ProgramTypeSeed {
  slug: string
  name: string
  shortDescription: string
  order: number
}

const PROGRAM_TYPES: ProgramTypeSeed[] = [
  {
    slug: 'internship',
    name: 'Internship',
    shortDescription:
      'Career-aligned internships in the US for ambitious students.',
    order: 1,
  },
  {
    slug: 'counselor',
    name: 'Counselor',
    shortDescription:
      'Summer camp counselor placements across the United States.',
    order: 2,
  },
  {
    slug: 'study-travel',
    name: 'Study & Travel',
    shortDescription:
      'Short-term study programs combined with cultural travel.',
    order: 3,
  },
  {
    slug: 'work-travel',
    name: 'Work & Travel',
    shortDescription:
      'Summer Work & Travel programs in the USA — earn, learn, explore.',
    order: 4,
  },
]

interface ProgramSeed {
  slug: string
  title: string
  typeSlug: ProgramTypeSeed['slug']
  country: string
  duration: string
  shortDescription: string
  isOpen: boolean
  /**
   * Public URL of the original card image on DO Spaces. Downloaded on
   * seed and attached as featuredImage. Same pattern as seedBlogs.
   */
  featuredImageUrl: string
  /** Filename under which the image is stored in Payload Media (stable
   * so re-runs reuse the existing upload). */
  featuredImageFilename: string
}

const PROGRAMS: ProgramSeed[] = [
  {
    slug: 'camp-counselor',
    title: 'Camp Counselor',
    typeSlug: 'counselor',
    country: 'US',
    duration: '3 months',
    shortDescription:
      "Lead campers through a summer of skill-building and adventure. Live the camp experience while gaining leadership skills American employers value.",
    isOpen: true,
    featuredImageUrl: `${DO_SPACES_BASE}/home_our-programs_camp_kBDwgKc.jpg`,
    featuredImageFilename: 'programs_camp-counselor.jpg',
  },
  {
    slug: 'work-and-travel',
    title: 'Work & Travel',
    typeSlug: 'work-travel',
    country: 'US',
    duration: '3-4 months',
    shortDescription:
      "Spend your summer working and exploring the United States. Earn money, build skills, and create memories that last a lifetime.",
    isOpen: true,
    featuredImageUrl: `${DO_SPACES_BASE}/programs_work-and-travel_oCbFfGz.JPG`,
    featuredImageFilename: 'programs_work-and-travel.jpg',
  },
  {
    slug: 'study-abroad',
    title: 'Study Abroad',
    typeSlug: 'study-travel',
    country: 'US',
    duration: '2 weeks',
    shortDescription:
      'Short, immersive study programs combining academics with cultural exploration. Build your future while seeing the world.',
    isOpen: true,
    featuredImageUrl: `${DO_SPACES_BASE}/programs_study-abroad_fEhPXO1.JPG`,
    featuredImageFilename: 'programs_study-abroad.jpg',
  },
  {
    slug: 'internship',
    title: 'Internship',
    typeSlug: 'internship',
    country: 'US',
    duration: '12 months',
    shortDescription:
      'Gain professional experience in your field while immersed in American workplace culture. Open doors to global career opportunities.',
    isOpen: true,
    featuredImageUrl: `${DO_SPACES_BASE}/programs_internship_k9ifDtY.jpg`,
    featuredImageFilename: 'programs_internship.jpg',
  },
  {
    slug: 'volunteering',
    title: 'Volunteering',
    typeSlug: 'study-travel',
    country: 'US',
    duration: '1 month',
    shortDescription:
      'Give back while you grow. Volunteer abroad, build cross-cultural skills, and discover what drives you.',
    isOpen: true,
    featuredImageUrl: `${DO_SPACES_BASE}/home_our-programs_volunteering_V6OdEt3.jpg`,
    featuredImageFilename: 'programs_volunteering.jpg',
  },
]


// ─── Public API ──────────────────────────────────────────────────────────

export async function seedPrograms(
  payload: Payload,
  options: {
    applicationFormId?: string | number
    publish?: boolean
  } = {},
): Promise<SeedProgramsResult> {
  const publish = options.publish ?? true
  const applicationFormId = options.applicationFormId

  const result: SeedProgramsResult = {
    ok: true,
    message: '',
    types: {},
    programs: {},
    created: [],
    skipped: [],
    errors: [],
  }

  // 1) Program Types
  for (const type of PROGRAM_TYPES) {
    try {
      const existing = await payload.find({
        collection: 'program-types',
        where: { slug: { equals: type.slug } },
        limit: 1,
      })

      if (existing.docs[0]) {
        const existingTypeDoc = existing.docs[0] as { id: string | number; applicationForm?: unknown }
        result.types[type.slug] = existingTypeDoc.id

        // If the type exists but is missing the application form (e.g. it
        // was created in an earlier seed run BEFORE the form existed),
        // patch it now so every program of this type inherits the form
        // automatically and the frontend doesn't render an empty Apply
        // section.
        if (!existingTypeDoc.applicationForm && applicationFormId) {
          await payload.update({
            collection: 'program-types',
            id: existingTypeDoc.id,
            data: { applicationForm: applicationFormId } as never,
          })
          log(`  ↻ patched applicationForm on existing type:${type.slug}`)
          result.created.push(`type:${type.slug} (form patched)`)
        } else {
          result.skipped.push(`type:${type.slug}`)
        }
        continue
      }

      const created = await payload.create({
        collection: 'program-types',
        data: {
          name: type.name,
          slug: type.slug,
          shortDescription: type.shortDescription,
          order: type.order,
          translationComplete: true,
          // Type-level form fallback — every program of this type inherits it
          // unless the program overrides via its own applicationForm.
          ...(applicationFormId ? { applicationForm: applicationFormId } : {}),
          _status: publish ? 'published' : 'draft',
        } as never,
        draft: !publish,
      })
      result.types[type.slug] = created.id
      result.created.push(`type:${type.slug}`)
    } catch (err) {
      result.errors.push(`type:${type.slug}: ${(err as Error).message}`)
    }
  }

  // 2) Programs
  for (const program of PROGRAMS) {
    try {
      log(`processing program:${program.slug}...`)

      // Resolve the featured image first (download + upload if needed).
      // We do this BEFORE the existing-check so both create and update paths
      // can attach the image consistently.
      const featuredImageId = await ensureMediaFromUrl(
        payload,
        program.featuredImageUrl,
        program.featuredImageFilename,
        program.title,
      )

      const existing = await payload.find({
        collection: 'programs',
        where: { slug: { equals: program.slug } },
        limit: 1,
      })

      if (existing.docs[0]) {
        const existingDoc = existing.docs[0] as {
          id: string | number
          featuredImage?: unknown
          applicationForm?: unknown
        }
        result.programs[program.slug] = existingDoc.id

        const patch: Record<string, unknown> = {}
        const patchLabels: string[] = []

        if (!existingDoc.featuredImage && featuredImageId) {
          patch.featuredImage = featuredImageId
          patchLabels.push('image')
        }
        if (!existingDoc.applicationForm && applicationFormId) {
          patch.applicationForm = applicationFormId
          patchLabels.push('form')
        }

        if (Object.keys(patch).length > 0) {
          await payload.update({
            collection: 'programs',
            id: existingDoc.id,
            data: patch as never,
          })
          log(`  ↻ patched ${patchLabels.join('+')} on existing program:${program.slug}`)
          result.created.push(`program:${program.slug} (${patchLabels.join('+')} patched)`)
        } else {
          result.skipped.push(`program:${program.slug}`)
        }
        continue
      }

      const typeId = result.types[program.typeSlug]
      if (!typeId) {
        result.errors.push(
          `program:${program.slug}: missing type ${program.typeSlug}`,
        )
        continue
      }

      // Build the whole program page (sections blocks) from its detail
      // content — downloading its images — then create the program with the
      // sections in one step, exactly like Pages. Creating with the content
      // present means the seedTranslation copy fires on create (EN → AR).
      const detailData = PROGRAM_DETAIL_BY_SLUG[program.slug]
      const sections = detailData
        ? await resolveProgramSectionsFromData(payload, {
            programSlug: program.slug,
            data: detailData,
            title: program.title,
            featuredImageId,
            isOpen: program.isOpen,
          })
        : []

      const created = await payload.create({
        collection: 'programs',
        data: {
          title: program.title,
          slug: program.slug,
          type: [typeId],
          country: program.country,
          duration: program.duration,
          shortDescription: program.shortDescription,
          isOpen: program.isOpen,
          ...(featuredImageId ? { featuredImage: featuredImageId } : {}),
          // Attach the application form directly (in addition to the type-
          // level inheritance) so the admin's per-program field shows it
          // selected and editors don't have to pick it manually.
          ...(applicationFormId ? { applicationForm: applicationFormId } : {}),
          sections,
          translationComplete: true,
          _status: publish ? 'published' : 'draft',
        } as never,
        draft: !publish,
      })
      result.programs[program.slug] = created.id
      result.created.push(`program:${program.slug}`)
    } catch (err) {
      result.errors.push(
        `program:${program.slug}: ${(err as Error).message}`,
      )
    }
  }

  result.message = `Programs seed done. created=${result.created.length}, skipped=${result.skipped.length}, errors=${result.errors.length}.`
  if (result.errors.length) result.ok = false

  return result
}
