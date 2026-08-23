/**
 * Shared builder that turns a program's structured detail content into the
 * `sections` blocks array (the program page-builder blocks). Used by BOTH:
 *   - the seed (`seedProgramDetails`) — builds sections from seed data, and
 *   - the one-off migration (`migrate-programs-to-sections`) — builds them
 *     from the legacy `detail*` fields already on each program doc.
 *
 * The input `source` is a plain object shaped like the legacy detail fields
 * (detailHero, detailIntro, ...), plus `title`, `featuredImage`, `isOpen`.
 * Relations may be ids or shallow objects — both are normalised to ids.
 */
import { randomUUID } from 'crypto'

export const MIGRATED_MEMORIES_PREFIX = 'mig-memories-'

type Any = Record<string, unknown>

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim().length > 0 ? v : undefined

const nonEmpty = (v: unknown): boolean =>
  typeof v === 'string' ? v.trim().length > 0 : v != null

const mediaId = (v: unknown): string | number | undefined => {
  if (v == null) return undefined
  if (typeof v === 'string' || typeof v === 'number') return v
  if (typeof v === 'object' && 'id' in (v as Any)) return (v as Any).id as string | number
  return undefined
}

/** Decide which section slots a program has, based on its detail content. */
export function decideSlots(p: Any): string[] {
  const slots: string[] = ['hero'] // hero always present (falls back to featuredImage)
  const g = (k: string) => (p[k] ?? {}) as Any
  const arr = (v: unknown) => (Array.isArray(v) ? v : [])

  const intro = g('detailIntro')
  if (nonEmpty(intro.eyebrow) || nonEmpty(intro.body)) slots.push('intro')

  const whatIs = g('detailWhatIs')
  if (nonEmpty(whatIs.title) || nonEmpty(whatIs.body)) slots.push('whatIs')

  if (p.detailPhotoMiddle) slots.push('photo')

  const py = g('detailPictureYourself')
  if (
    nonEmpty(py.eyebrow) ||
    nonEmpty(py.body) ||
    nonEmpty(py.circleHeading) ||
    nonEmpty(py.circleBody) ||
    py.photo
  )
    slots.push('picture')

  const wp = g('detailWhyParticipate')
  if (nonEmpty(wp.body) || arr(wp.benefits).length) slots.push('whyParticipate')

  const jobs = g('detailJobs')
  if (nonEmpty(jobs.body) || arr(jobs.items).length) slots.push('jobs')

  const dest = g('detailDestinations')
  if (nonEmpty(dest.leadText) || arr(dest.items).length) slots.push('destinations')

  const bs = g('detailBenefitsShowcase')
  if (nonEmpty(bs.title) || arr(bs.items).length) slots.push('showcase')

  if (arr(p.detailRequirements).length) slots.push('requirements')

  const mem = g('detailMemories')
  if (nonEmpty(mem.title)) slots.push('memories')

  if (arr(p.detailFeatures).length) slots.push('whyChoose')

  if (p.isOpen) slots.push('apply')

  slots.push('share') // always last — share the current page

  return slots
}

/** Build one block for a slot from a detail-shaped program object. */
export function buildBlock(slot: string, p: Any, syncKey: string): Any | null {
  const g = (k: string) => (p[k] ?? {}) as Any
  const arr = (v: unknown) => (Array.isArray(v) ? (v as Any[]) : [])
  const base = { syncKey }

  switch (slot) {
    case 'hero': {
      const h = g('detailHero')
      return {
        ...base,
        blockType: 'programHero',
        tag: str(h.tag),
        heading: str(p.title) ?? 'PROGRAM NAME',
        subtitle: str(h.subtitle),
        note: str(h.note),
        image: mediaId(h.image) ?? mediaId(p.featuredImage),
      }
    }
    case 'intro': {
      const i = g('detailIntro')
      return { ...base, blockType: 'programIntro', eyebrow: str(i.eyebrow), body: str(i.body) }
    }
    case 'whatIs': {
      const w = g('detailWhatIs')
      return { ...base, blockType: 'programWhatIs', title: str(w.title), body: str(w.body) }
    }
    case 'photo':
      return { ...base, blockType: 'programPhotoBreak', image: mediaId(p.detailPhotoMiddle) }
    case 'picture': {
      const py = g('detailPictureYourself')
      return {
        ...base,
        blockType: 'programPictureYourself',
        eyebrow: str(py.eyebrow),
        body: str(py.body),
        circleHeading: str(py.circleHeading),
        circleBody: str(py.circleBody),
        photo: mediaId(py.photo),
      }
    }
    case 'whyParticipate': {
      const wp = g('detailWhyParticipate')
      return {
        ...base,
        blockType: 'programWhyParticipate',
        heading: 'Why You\nShould\nParticipate?',
        highlightedWords: 'Participate?',
        body: str(wp.body),
        benefits: arr(wp.benefits).map((b) => ({
          image: mediaId(b.image),
          title: str(b.title) ?? 'BENEFIT',
          description: str(b.description),
        })),
      }
    }
    case 'jobs': {
      const j = g('detailJobs')
      return {
        ...base,
        blockType: 'programJobs',
        heading: 'What you will\nbe doing',
        highlightedWords: 'be doing',
        body: str(j.body),
        items: arr(j.items).map((it) => ({ image: mediaId(it.image), title: str(it.title) ?? 'Job title' })),
      }
    }
    case 'destinations': {
      const d = g('detailDestinations')
      return {
        ...base,
        blockType: 'programDestinations',
        leadText: str(d.leadText),
        heading: 'CHOOSE YOUR\nNEXT ADVENTURE',
        highlightedWords: 'NEXT ADVENTURE',
        items: arr(d.items).map((it) => ({
          image: mediaId(it.image),
          area: str(it.area) ?? 'DESTINATION',
          country: str(it.country),
        })),
      }
    }
    case 'showcase': {
      const bs = g('detailBenefitsShowcase')
      return {
        ...base,
        blockType: 'programBenefitsShowcase',
        title: str(bs.title),
        highlightedWords: 'AMAZING EXPERIENCE',
        items: arr(bs.items).map((it) => ({ text: str(it.text) ?? '' })),
      }
    }
    case 'requirements':
      return {
        ...base,
        blockType: 'programRequirements',
        heading: 'Required',
        items: arr(p.detailRequirements).map((r) => ({
          iconKey: str(r.iconKey) ?? 'passport',
          title: str(r.title) ?? 'Requirement',
          description: str(r.description),
        })),
      }
    case 'memories': {
      const m = g('detailMemories')
      return {
        ...base,
        // tag the shared block so the migration's --force can strip only its own
        syncKey: `${MIGRATED_MEMORIES_PREFIX}${syncKey}`,
        blockType: 'memoriesGrid',
        title: str(m.title),
        images: arr(m.images)
          .map((i) => mediaId(i?.image))
          .filter((x): x is string | number => x != null),
        primaryCta: m.primaryCta,
        secondaryLink: m.secondaryLink,
        backgroundColor: 'none',
      }
    }
    case 'whyChoose':
      return {
        ...base,
        blockType: 'programWhyChoose',
        heading: 'Why Choose\nLevntura?',
        highlightedWords: 'Levntura?',
        features: arr(p.detailFeatures).map((f) => ({
          iconKey: str(f.iconKey) ?? 'star',
          title: str(f.title) ?? 'Feature',
          description: str(f.description),
        })),
      }
    case 'apply': {
      const ap = g('applyPhotos')
      return {
        ...base,
        blockType: 'programApply',
        heading: 'Are You\nReady to\nChange\nYour\nWorld?',
        highlightedWords: 'Change',
        photoTopLeft: mediaId(ap.topLeft),
        photoTopRight: mediaId(ap.topRight),
        photoBottomLeft: mediaId(ap.bottomLeft),
        photoBottomRight: mediaId(ap.bottomRight),
      }
    }
    case 'share':
      return { ...base, blockType: 'programShare', heading: 'Share this program' }
    default:
      return null
  }
}

/**
 * Build the full sections array (single locale) from a detail-shaped source,
 * generating a fresh syncKey per block. For dual-locale callers that need
 * matching keys across locales, use decideSlots + buildBlock directly.
 */
export function buildProgramSections(source: Any): Any[] {
  return decideSlots(source)
    .map((slot) => buildBlock(slot, source, randomUUID()))
    .filter(Boolean) as Any[]
}
