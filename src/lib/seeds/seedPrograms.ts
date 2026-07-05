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

/**
 * Default `sections` blocks for a generic Program. Editors can customize
 * per-program from admin afterward — this is just so the program detail
 * page never renders blank on first load.
 *
 * Specific programs that need rich starter content (like Work & Travel)
 * override this via `programSectionsBySlug` below.
 */
function defaultProgramSections(
  programTitle: string,
  programDescription: string,
) {
  return [
    {
      blockType: 'content',
      heading: `Why join ${programTitle}?`,
      subheading: programDescription,
    },
    {
      blockType: 'featureCards',
      heading: 'What you get',
      description:
        "Earn, learn, and explore. Every program is built around real growth and lasting memories.",
      sectionCta: { label: 'View all programs', url: '/programs' },
      backgroundColor: 'lev-blue-dark',
      cards: [
        { label: 'Earn', panelColor: 'lev-yellow', overlayTextColor: 'lev-blue-dark', ctaUrl: '/programs' },
        { label: 'Learn', panelColor: 'lev-orange', overlayTextColor: 'white', ctaUrl: '/programs' },
        { label: 'Explore', panelColor: 'lev-green-light', overlayTextColor: 'lev-blue-dark', ctaUrl: '/programs' },
      ],
    },
    {
      blockType: 'decoratedCTA',
      heading: 'Ready to start your journey?',
      description:
        "Don't let another season pass. Apply today and join thousands of students who've already changed their lives.",
      cta: { label: 'Apply now', url: '#apply' },
      backgroundColor: 'lev-yellow-light',
    },
  ]
}

// ─── Rich seed: Work & Travel ────────────────────────────────────────────

/**
 * Full content port of the legacy `app/programs/work-and-travel/` static
 * page mapped onto our CMS blocks.
 *
 * Each section corresponds to a region of the original page:
 *   - intro / what is the program       → content
 *   - picture yourself + features        → alternatingContent
 *   - 6 benefits                         → featureCards
 *   - jobs slider (14 jobs)              → mediaShowcase
 *   - destinations (11 spots)            → mediaShowcase
 *   - amazing experience (7 perks)       → valuesList
 *   - requirements (5)                   → valuesList
 *   - memories title                     → memoriesGrid
 *
 * URLs reference the original DO Spaces images so the section is visually
 * accurate before any editor uploads. Editors can replace images via admin
 * by uploading new Media docs and re-pointing each block.
 *
 * NOTE: image fields here use the *URL* form as `caption` text only —
 * actual `image` relationship can't be set without a Media doc ID. Until
 * DO Spaces is wired, the frontend block fallbacks render packaged images
 * so the layout doesn't break.
 */
function workAndTravelSections() {
  return [
    // ── Intro + What Is the Program ─────────────────────────────────────
    {
      blockType: 'content',
      heading: "What is the Summer Work and Travel Program?",
      subheading:
        "Embark on a Summer Adventure with Levntura's USA Work & Travel Program. Calling all university students ready for a summer that blends adventure, cultural discovery, and real-world experience! If you're eager to improve your English, meet new friends from around the globe, and gain professional growth along the way, the USA Work & Travel Program, officially designated by the U.S. Department of State, is your gateway to a truly unforgettable season.\n\nThe Summer Work and Travel Program allows university students to spend their summer working and exploring the United States. It's a unique opportunity for cultural exchange, language improvement, and hands-on work experience within real American communities. Participants engage in seasonal jobs, discover new cities, and build lifelong friendships while immersing themselves in U.S. culture and everyday life.",
    },

    // ── Picture Yourself / Why You Should Participate ───────────────────
    {
      blockType: 'imageFeature',
      eyebrow: 'Why You Should Participate',
      heading: 'PICTURE YOURSELF ON AN UNFORGETTABLE JOURNEY',
      paragraph:
        "Meeting friends from every corner of the world, discovering new places, and gaining hands-on experience under the summer sun. The USA Work & Travel Program isn't just a seasonal job; it's your ticket to a life-changing adventure. By joining, you'll grow personally and professionally while enjoying a perfect mix of cultural exchange, language improvement, and unforgettable joy.",
      backgroundColor: 'lev-yellow-light',
    },

    // ── 6 Benefit Cards ──────────────────────────────────────────────────
    {
      blockType: 'featureCards',
      heading: 'WHY PARTICIPATE',
      description:
        "Immerse yourself in a once-in-a-lifetime journey that blends work experience, cultural discovery, and language growth, all wrapped in the excitement of an American summer.",
      sectionCta: { label: 'Apply now', url: '#apply' },
      backgroundColor: 'lev-blue-dark',
      cards: [
        { label: 'Meet New Friends', panelColor: 'lev-yellow', overlayTextColor: 'white', ctaUrl: '#apply' },
        { label: 'Travel Around USA', panelColor: 'lev-orange', overlayTextColor: 'white', ctaUrl: '#apply' },
        { label: 'Cultural Exchange', panelColor: 'lev-green-light', overlayTextColor: 'white', ctaUrl: '#apply' },
        { label: 'Discover Yourself', panelColor: 'lev-pink', overlayTextColor: 'white', ctaUrl: '#apply' },
      ],
    },

    // ── Jobs (carousel of seasonal jobs) ────────────────────────────────
    {
      blockType: 'mediaShowcase',
      heading: 'AVAILABLE JOBS',
      description:
        "The Summer Work & Travel Program opens doors to exciting seasonal jobs across the U.S., from theme parks and beach resorts to national landmarks and city cafés. Choose a role that matches your interests, sharpen your skills, and experience what it's like to work and live in a new culture.",
      aspectRatio: 'portrait',
      autoplay: true,
      autoplayDelay: 4000,
      items: [
        { caption: 'LIFEGUARD' },
        { caption: 'PHOTOGRAPHY' },
        { caption: 'RIDE OPERATOR' },
        { caption: 'HOUSE KEEPING' },
        { caption: 'WAITER' },
        { caption: 'CHEF' },
        { caption: 'FOOD RUNNER' },
        { caption: 'WATER PARK WORKER' },
        { caption: 'CASHIER' },
        { caption: 'RECEPTIONIST' },
        { caption: 'FOOD SERVICE' },
        { caption: 'DISH WASHER' },
        { caption: 'BARISTA' },
      ],
    },

    // ── Destinations (top employer locations) ───────────────────────────
    {
      blockType: 'mediaShowcase',
      heading: 'NEXT DESTINATION',
      description:
        "Discover your next summer adventure! Explore top employers and destinations across the U.S. through the Work & Travel Program, where every job brings new skills, friendships, and unforgettable memories.",
      aspectRatio: 'landscape',
      autoplay: true,
      autoplayDelay: 5000,
      items: [
        { caption: 'Cedar Point — Ohio' },
        { caption: 'Yellowstone National Park — Montana, Idaho, Wyoming' },
        { caption: 'Grand Canyon National Park — Arizona' },
        { caption: 'Six Flags Great America — Illinois' },
        { caption: 'Continental Pool — Maryland' },
        { caption: 'Smugglers Notch Resort — Vermont' },
        { caption: 'Food Lion — Maryland' },
        { caption: 'Fun City — Colorado' },
        { caption: 'Aramark-Kauffman Stadium — Missouri' },
        { caption: 'Kalahari Resort — Ohio' },
        { caption: 'Point Sebago — Maine' },
      ],
    },

    // ── What You Get (perks) ─────────────────────────────────────────────
    {
      blockType: 'valuesList',
      heading: 'AN AMAZING EXPERIENCE AND YET YOU WILL GET',
      backgroundColor: 'lev-yellow-light',
      values: [
        { number: '01', title: 'Travel Period', description: '30-day travel period after your program ends.' },
        { number: '02', title: 'Housing', description: 'Comfortable housing accommodation throughout your program.' },
        { number: '03', title: 'Insurance', description: 'Comprehensive health insurance coverage.' },
        { number: '04', title: 'Paid Placement', description: 'Paid job placement in your preferred field.' },
        { number: '05', title: 'Work Permit', description: 'Official work permit (DS-2019).' },
        { number: '06', title: 'SSN', description: 'U.S. Social Security number issued during your stay.' },
        { number: '07', title: 'Sponsorship', description: 'Sponsorship & visa assistance from day one.' },
      ],
    },

    // ── Requirements ─────────────────────────────────────────────────────
    {
      blockType: 'valuesList',
      heading: 'REQUIREMENTS',
      backgroundColor: 'white',
      values: [
        { number: '01', title: 'Passport', description: 'Valid passport with at least 6 months remaining.' },
        { number: '02', title: 'Education', description: 'Enrollment as a Full-Time University Student.' },
        { number: '03', title: 'Language', description: 'English language proficiency (conversational level).' },
        { number: '04', title: 'Age', description: 'Between 18–25 years old.' },
        { number: '05', title: 'Interview', description: 'Interview & completed application form.' },
      ],
    },

    // ── Memories ─────────────────────────────────────────────────────────
    {
      blockType: 'memoriesGrid',
      title: "WE'RE CREATING MEMORIES, WILL YOU BE PART OF THEM?",
      backgroundColor: 'lev-yellow-light',
      primaryCta: { label: 'Apply now!', url: '#apply' },
      secondaryLink: { label: 'See all photos', url: '/gallery' },
    },

    // ── Final CTA ─────────────────────────────────────────────────────────
    {
      blockType: 'decoratedCTA',
      heading: 'READY FOR AN AMERICAN SUMMER?',
      description:
        "Apply now and lock in your spot. Our team will walk you through every step — from interview prep to flight tips.",
      cta: { label: 'Apply now', url: '#apply' },
      backgroundColor: 'lev-yellow-light',
    },
  ]
}

// Per-slug overrides for richer starter content. Slugs not listed here get
// the generic `defaultProgramSections` set.
//
// NOTE: Work & Travel's rich seed is deferred until we finalize the unified
// program-detail template (Task #5). The rich version requires uploading 24+
// images for the AVAILABLE JOBS and NEXT DESTINATION carousels — work we'll
// do once as part of the template rebuild rather than now. Until then, all
// programs (including Work & Travel) use `defaultProgramSections` so each
// listing card has an image and the listing page renders.
const programSectionsBySlug: Record<string, () => Array<Record<string, unknown>>> = {
  // 'work-and-travel': workAndTravelSections,  // deferred — see comment above
}
void workAndTravelSections // silence "declared but unused" until re-enabled

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

      // The structured "Detail Page" tab (populated by seedProgramDetails
      // later in this run) now handles every program's main content. We
      // intentionally leave the "Extra Sections" blocks array empty so
      // editors can add ad-hoc CMS blocks AFTER the structured page only
      // when they actually need them.
      void programSectionsBySlug
      void defaultProgramSections

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
          sections: [],
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
