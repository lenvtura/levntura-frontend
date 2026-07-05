/**
 * Seed the 4 default site pages (home, about, gallery, contact) with the
 * full block layout, relying on each block's `defaultValue` to fill in
 * the actual copy. After running, an editor can open any page and start
 * fine-tuning content / uploading per-block images.
 *
 * Idempotent: skips any page whose slug already exists, so editor edits
 * survive re-runs.
 *
 * Depends on `seedForms()` — call that first (or pass the resulting form
 * IDs in `options.forms`) so the `contactForm` block on the Contact page
 * can point to a real form.
 */

import type { Payload } from 'payload'

import { GALLERY_PHOTOS } from './data/galleryImages'
import { ensureMediaFromFile as ensureMediaFromFileShared } from './utils/ensureMediaFromFile'
import { ensureMediaFromUrl as ensureMediaFromUrlShared } from './utils/ensureMediaFromUrl'

const log = (msg: string) => {
  process.stdout.write(`[seed-pages] ${msg}\n`)
}

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

// ─── Travel-destination cards (HeroHome.intro.images) ─────────────────────

/**
 * The 9 destination cards from the legacy home page (Travels constant).
 * Order matters — it's the order they appear on the page. 4 are bundled
 * inside `data/local-images/` (PNGs from the original repo); the other
 * 5 still live on DO Spaces from the legacy site and are downloaded
 * once via `ensureMediaFromUrl` (idempotent via filename match).
 *
 * Every entry seeds a Media doc + becomes one item in the heroHome
 * intro.images array, so the editor opens the admin and sees all 9
 * cards pre-populated with the correct image + label.
 */
const TRAVEL_DESTINATIONS: ReadonlyArray<{
  label: string
  localFile?: string
  url?: string
  filename?: string
}> = [
  { label: 'Australia', localFile: 'australia.png' },
  { label: 'United Kingdom', localFile: 'london.png' },
  { label: 'Canada', localFile: 'canada.png' },
  { label: 'USA', localFile: 'usa.png' },
  {
    label: 'Spain',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_spain_MQCkgip.jpg',
    filename: 'home_spain.jpg',
  },
  {
    label: 'Italy',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_italy_QLvF594.jpg',
    filename: 'home_italy.jpg',
  },
  {
    label: 'Asia',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_asia_J2FyhWS.jpg',
    filename: 'home_asia.jpg',
  },
  {
    label: 'Ireland',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_ireland_AT27L62.jpg',
    filename: 'home_ireland.jpg',
  },
  {
    label: 'South Africa',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/home_south-africa_PzdcgIe.webp',
    filename: 'home_south-africa.webp',
  },
]

/**
 * Resolves every TRAVEL_DESTINATIONS entry to a `{ image, label }` row
 * ready to drop into `heroHome.intro.images`. Items whose image couldn't
 * be resolved (network failure on DO Spaces, missing local file) are
 * filtered out so the strip never renders a broken slot.
 */
async function seedTravelDestinations(
  payload: Payload,
): Promise<Array<{ image: number; label: string }>> {
  log(`seeding ${TRAVEL_DESTINATIONS.length} travel-destination cards…`)
  const rows: Array<{ image: number; label: string }> = []
  for (const dest of TRAVEL_DESTINATIONS) {
    const id = dest.localFile
      ? await ensureMediaFromFile(payload, dest.localFile, `Travel destination — ${dest.label}`)
      : dest.url
        ? await ensureMediaFromUrl(
            payload,
            dest.url,
            dest.filename!,
            `Travel destination — ${dest.label}`,
          )
        : null
    if (id != null) rows.push({ image: id, label: dest.label })
  }
  log(`  ✓ resolved ${rows.length}/${TRAVEL_DESTINATIONS.length} travel cards`)
  return rows
}

// ─── About page assets ────────────────────────────────────────────────────

/**
 * Hero background image for the About page — matches the legacy
 * `app/about/where-journeys-begin.tsx` static src.
 */
const ABOUT_HERO_IMAGE = {
  url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_journeys_dGm3u0H.JPG',
  filename: 'about-us-journeys.jpg',
  alt: 'Where journeys begin — Levntura',
} as const

/**
 * Four "Venture" cards from the original `app/about/venture.tsx` — each
 * is a Card with a label overlay. We seed both the image (from DO Spaces)
 * and the label string so the VentureGrid block renders identical to the
 * static design without the editor having to upload anything.
 */
const ABOUT_VENTURE_CARDS: ReadonlyArray<{
  label: string
  url: string
  filename: string
}> = [
  {
    label: 'Internship',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_internship_YNUWzjn.jpg',
    filename: 'about-us-internship.jpg',
  },
  {
    label: 'Counselor',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_camp_dRkOpqL.jpg',
    filename: 'about-us-counselor.jpg',
  },
  {
    label: 'Study & Travel',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_study_FJIrlWL.jpeg',
    filename: 'about-us-study.jpg',
  },
  {
    label: 'Work & Travel',
    url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_work-and-travel_3iAmDpM.jpg',
    filename: 'about-us-work-and-travel.jpg',
  },
]

/**
 * 8 photos for the MemoriesGrid masonry on About. These were bundled in
 * the legacy frontend at `assets/photos/tour-images/i{1..6,8,9}.png` (no
 * i7 — the legacy file genuinely skipped it). We copy them to
 * `src/lib/seeds/data/local-images/tour-i*.png` and seed via
 * `ensureMediaFromFile` so the editor sees the masonry pre-populated.
 */
const ABOUT_MEMORIES_PHOTOS: ReadonlyArray<{ localFile: string; alt: string }> = [
  { localFile: 'tour-i1.png', alt: 'Memory photo 1' },
  { localFile: 'tour-i2.png', alt: 'Memory photo 2' },
  { localFile: 'tour-i3.png', alt: 'Memory photo 3' },
  { localFile: 'tour-i4.png', alt: 'Memory photo 4' },
  { localFile: 'tour-i5.png', alt: 'Memory photo 5' },
  { localFile: 'tour-i6.png', alt: 'Memory photo 6' },
  { localFile: 'tour-i8.png', alt: 'Memory photo 7' },
  { localFile: 'tour-i9.png', alt: 'Memory photo 8' },
]

/**
 * Two founders for the FoundersCarousel on About — matched by `name`
 * during the backfill so editor-added founders aren't touched.
 *
 * Description is carried here too: when we override the `founders`
 * array in the block create payload, the schema's per-row default
 * value doesn't apply automatically — Payload uses exactly what we
 * pass. So we have to ship the bios alongside the photos, otherwise
 * the admin shows empty description textareas. Copy mirrors the
 * legacy `our-founders-carousel.tsx` bios verbatim.
 */
const ABOUT_FOUNDER_PHOTOS: ReadonlyArray<{
  name: string
  title: string
  description: string
  localFile: string
}> = [
  {
    name: 'Ahmad Al-Mashaikh',
    title: 'Co-Founder',
    description:
      "Driven by a passion for global education, Ahmad Al-Mashaikh co-founded Levntura to redefine international experiences for today's youth. With extensive experience in global mobility, he believes learning goes beyond classrooms—it's about people, purpose, and perspective. His mission is to empower young leaders to explore the world with confidence, connecting ambition with opportunity through transformative programs.",
    localFile: 'founder-ahmad.png',
  },
  {
    name: 'Abdulrahman Soman',
    title: 'Co-Founder',
    description:
      'Abdulrahman Soman is a visionary co-founder of Levntura, driving its growth through innovation and strategic leadership. He is passionate about transforming global student mobility by creating smarter, more connected pathways between students and institutions. Through his vision, Levntura continues to empower youth and redefine how international education bridges opportunity and impact worldwide.',
    localFile: 'founder-abdulrahman.png',
  },
]

/**
 * Story image for the CulturalExchange section (PartnersCarousel block
 * on About). Comes from DO Spaces — the legacy `cultural-exchange.tsx`
 * referenced this exact URL.
 */
const ABOUT_STORY_IMAGE = {
  url: 'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images/about-us_culture-exchange_vF9hqNc.jpeg',
  filename: 'about-us-culture-exchange.jpg',
  alt: 'Cultural exchange — Levntura story',
} as const

/**
 * Decorative photos for the DecoratedCTA "Are you ready?" section.
 * Bundled locally in the legacy frontend as `assets/photos/{3..6}.png`.
 * Top row uses 3 + 4, bottom row uses 5 + 6 (matches the legacy split).
 */
const ABOUT_DECORATED_CTA_PHOTOS: {
  top: ReadonlyArray<{ localFile: string; alt: string }>
  bottom: ReadonlyArray<{ localFile: string; alt: string }>
} = {
  top: [
    { localFile: 'cta-decor-3.png', alt: 'Decorative photo' },
    { localFile: 'cta-decor-4.png', alt: 'Decorative photo' },
  ],
  bottom: [
    { localFile: 'cta-decor-5.png', alt: 'Decorative photo' },
    { localFile: 'cta-decor-6.png', alt: 'Decorative photo' },
  ],
}

/**
 * Map illustration for the MapEmbed block on About — bundled in the
 * legacy frontend as `assets/photos/Group 6210.png`.
 */
const ABOUT_MAP_IMAGE = {
  localFile: 'about-map.png',
  alt: 'Levntura — countries we operate in',
} as const

interface AboutAssets {
  heroImageId: number | null
  ventureCards: Array<{ label: string; image: number }>
  /**
   * Memories Grid uses `upload hasMany: true` (matches PhotoGrid),
   * so we pass a flat array of Media IDs — Payload resolves them at
   * read time. No per-block alt; each Media's own `alt` is used.
   */
  memoriesImages: number[]
  /** Two founders for the FoundersCarousel — matched by `name` on backfill. */
  founders: Array<{ name: string; title: string; description: string; photo: number }>
  /** Single image for the PartnersCarousel's `storyImage` field. */
  storyImageId: number | null
  /** Top + bottom photo rows for the DecoratedCTA block. */
  decoratedCtaTop: Array<{ image: number }>
  decoratedCtaBottom: Array<{ image: number }>
  /** Single map illustration for the MapEmbed `mapImage` field. */
  mapImageId: number | null
}

/**
 * Resolves every About-page image to a Media ID in one pass. Failures
 * are tolerated (returns null / skips the item) so a single broken URL
 * doesn't break the whole seed — the editor sees the rest pre-populated
 * and can manually fill the gap.
 */
async function seedAboutAssets(payload: Payload): Promise<AboutAssets> {
  log(
    'seeding About page images (1 hero + 4 venture + 8 memories + 2 founders + 1 story + 4 cta decor + 1 map)…',
  )

  const heroImageId = await ensureMediaFromUrl(
    payload,
    ABOUT_HERO_IMAGE.url,
    ABOUT_HERO_IMAGE.filename,
    ABOUT_HERO_IMAGE.alt,
  )

  const ventureCards: Array<{ label: string; image: number }> = []
  for (const card of ABOUT_VENTURE_CARDS) {
    const id = await ensureMediaFromUrl(
      payload,
      card.url,
      card.filename,
      `About — ${card.label}`,
    )
    if (id != null) ventureCards.push({ label: card.label, image: id })
  }

  const memoriesImages: number[] = []
  for (const photo of ABOUT_MEMORIES_PHOTOS) {
    const id = await ensureMediaFromFile(payload, photo.localFile, photo.alt)
    if (id != null) memoriesImages.push(id)
  }

  const founders: Array<{ name: string; title: string; description: string; photo: number }> = []
  for (const f of ABOUT_FOUNDER_PHOTOS) {
    const id = await ensureMediaFromFile(payload, f.localFile, `Founder — ${f.name}`)
    if (id != null) {
      founders.push({
        name: f.name,
        title: f.title,
        description: f.description,
        photo: id,
      })
    }
  }

  const storyImageId = await ensureMediaFromUrl(
    payload,
    ABOUT_STORY_IMAGE.url,
    ABOUT_STORY_IMAGE.filename,
    ABOUT_STORY_IMAGE.alt,
  )

  const decoratedCtaTop: Array<{ image: number }> = []
  for (const p of ABOUT_DECORATED_CTA_PHOTOS.top) {
    const id = await ensureMediaFromFile(payload, p.localFile, p.alt)
    if (id != null) decoratedCtaTop.push({ image: id })
  }
  const decoratedCtaBottom: Array<{ image: number }> = []
  for (const p of ABOUT_DECORATED_CTA_PHOTOS.bottom) {
    const id = await ensureMediaFromFile(payload, p.localFile, p.alt)
    if (id != null) decoratedCtaBottom.push({ image: id })
  }

  const mapImageId = await ensureMediaFromFile(
    payload,
    ABOUT_MAP_IMAGE.localFile,
    ABOUT_MAP_IMAGE.alt,
  )

  log(
    `  ✓ resolved About assets: ` +
      `hero=${heroImageId ? '1' : '0'}/1, ` +
      `venture=${ventureCards.length}/${ABOUT_VENTURE_CARDS.length}, ` +
      `memories=${memoriesImages.length}/${ABOUT_MEMORIES_PHOTOS.length}, ` +
      `founders=${founders.length}/${ABOUT_FOUNDER_PHOTOS.length}, ` +
      `story=${storyImageId ? '1' : '0'}/1, ` +
      `cta=${decoratedCtaTop.length + decoratedCtaBottom.length}/4, ` +
      `map=${mapImageId ? '1' : '0'}/1`,
  )

  return {
    heroImageId,
    ventureCards,
    memoriesImages,
    founders,
    storyImageId,
    decoratedCtaTop,
    decoratedCtaBottom,
    mapImageId,
  }
}

/**
 * Download the 30 legacy gallery photos into Media and return their IDs.
 * Skips any photo that's already in Media (matches on filename), so
 * re-running this is fast and never duplicates uploads.
 */
async function seedGalleryPhotos(payload: Payload): Promise<number[]> {
  log(`seeding ${GALLERY_PHOTOS.length} gallery photos…`)
  const ids: number[] = []
  for (const photo of GALLERY_PHOTOS) {
    const id = await ensureMediaFromUrl(payload, photo.url, photo.filename, photo.alt)
    if (id != null) ids.push(id)
  }
  log(`  ✓ resolved ${ids.length}/${GALLERY_PHOTOS.length} gallery photos`)
  return ids
}

export interface SeedPagesResult {
  ok: boolean
  message: string
  pages: Record<string, string | number>
  created: string[]
  skipped: string[]
  errors: string[]
}

export interface SeedPagesOptions {
  forms?: {
    contactFormId?: string | number
    applicationFormId?: string | number
  }
  publish?: boolean // default true — created as published so they show immediately
}

// ─── Page definitions ────────────────────────────────────────────────────

/**
 * Each block is created with just `blockType`. Payload applies field-level
 * defaultValues at create time, so the resulting block has all the seeded
 * copy / images / colors set automatically.
 */

/**
 * The travelDestinations block's images array can't carry a defaultValue
 * (Media IDs only exist after the seed resolves them), so we inject the
 * resolved 9 destination cards here. Editor opens the admin and sees the
 * strip pre-populated with the original Travels constant entries.
 *
 * HeroHome block uses field defaults for everything (background, headline,
 * CTA, opportunities, intro heading + paragraphs).
 */
const buildHomeBlocks = (
  travelDestinations: Array<{ image: number; label: string }>,
) => [
  { blockType: 'heroHome' },
  {
    blockType: 'travelDestinations',
    ...(travelDestinations.length > 0 ? { images: travelDestinations } : {}),
  },
  { blockType: 'programShowcase' },
  { blockType: 'partnersCarousel' },
  { blockType: 'featureCards' },
  { blockType: 'alternatingContent' },
  { blockType: 'blogPostsList' },
  { blockType: 'mediaShowcase' },
  { blockType: 'imageFeature' },
  { blockType: 'videoTestimonials' },
  { blockType: 'socialFeed' },
  { blockType: 'decoratedCTA' },
]

/**
 * About page — mirrors the legacy `app/about/page.tsx` order:
 *   WhereJourneysBegin (Hero, splitRight, yellow) →
 *   EductionAndPurposes (EducationStats: "Higher Education Greater Impact") →
 *   FoundersCarousel →
 *   Venture (FeatureCards: "Designed for Global Adventures") →
 *   MissionAndStats (MissionStats) →
 *   ValuesWeLiveBy (ValuesList) →
 *   Map (MapEmbed) →
 *   TourImages (MemoriesGrid) →
 *   CulturalExchange (PartnersCarousel) →
 *   Testimonial (TextTestimonials) →
 *   AreYouReadySection (DecoratedCTA).
 *
 * Each block override mirrors the copy/colors from the legacy static page so
 * the seed produces an About page that visually matches the original. Editors
 * can still tweak everything in admin.
 */
/**
 * Build the About page block list with all images pre-attached. We use
 * a function (vs a static array) because Hero `media`, VentureGrid
 * `cards`, and MemoriesGrid `images` each need real Media IDs that
 * only exist after the seed has uploaded the assets. Editor opens the
 * admin and sees every image slot already populated with the legacy
 * frontend's matching asset.
 */
const buildAboutBlocks = (assets: AboutAssets) => [
  {
    blockType: 'hero',
    variant: 'splitRight',
    eyebrow: 'DISCOVER LEVNTURA',
    heading: 'WHERE\nJOURNEYS\nBEGIN',
    highlightedWord: 'BEGIN',
    highlightColor: 'lev-orange',
    subheading:
      "From our main hub in Amman, Jordan, to our offices in Egypt, we've been shaping the future of Middle Eastern youth through meaningful global experiences. Levntura connects ambitious students with study abroad, work & travel, and professional training programs across North America, Europe, and Australia. Beyond opportunities, we inspire transformation—building leadership, language skills, and a lifelong sense of adventure that drives young people to dream bigger and achieve more. Levntura stands as a trusted bridge between cultures, guiding students to unlock their full potential and embrace the world as their classroom.\n\nLevntura isn't just a cultural exchange company—it's a movement empowering young dreamers to become global achievers. Rooted in the Middle East and connected to the world, we've built a reputation for authentic programs, personalized mentorship, and transformative experiences that expand horizons and nurture global citizens.",
    backgroundColor: 'lev-yellow',
    textColor: 'dark',
    actions: [
      { label: 'Start now!', url: '/contact', style: 'primary' },
      { label: 'Contact US', url: '/contact', style: 'primary' },
    ],
    // Same image as the legacy `WhereJourneysBegin` <Image>.
    ...(assets.heroImageId ? { media: assets.heroImageId } : {}),
  },
  {
    blockType: 'educationStats',
    // All copy/colors/stats fall back to schema defaults (HIGHER EDUCATION /
    // GREATER IMPACT + 4 stats: universities, students, countries, years).
  },
  {
    blockType: 'foundersCarousel',
    // Same 2 founders + photos + bios as the legacy
    // `our-founders-carousel.tsx`. We pass `description` explicitly
    // because schema per-row defaultValues don't apply when the array
    // itself is overridden — Payload uses what we give it as-is.
    ...(assets.founders.length > 0
      ? {
          founders: assets.founders.map((f) => ({
            name: f.name,
            title: f.title,
            description: f.description,
            photo: f.photo,
          })),
        }
      : {}),
  },
  {
    // Venture section — uses VentureGrid (no colored panels / no Start Now per
    // card), NOT FeatureCards (which is the home Work-and-Travel pattern).
    blockType: 'ventureGrid',
    // Same 4 cards/images as the legacy `Venture` static section.
    ...(assets.ventureCards.length > 0 ? { cards: assets.ventureCards } : {}),
  },
  { blockType: 'missionStats' },
  { blockType: 'valuesList' },
  {
    blockType: 'mapEmbed',
    // Same map illustration as legacy `map.tsx` `Group 6210.png`.
    ...(assets.mapImageId ? { mapImage: assets.mapImageId } : {}),
  },
  {
    blockType: 'memoriesGrid',
    title: 'We are creating memories, are you joining?',
    backgroundColor: 'lev-yellow-light',
    primaryCta: { label: 'Start now!', url: '/contact' },
    secondaryLink: { label: 'See all photos', url: '/gallery' },
    // 8 photos from the legacy `tour-images/i*.png` set.
    ...(assets.memoriesImages.length > 0 ? { images: assets.memoriesImages } : {}),
  },
  {
    blockType: 'partnersCarousel',
    eyebrow:
      "From exchange programs to a vibrant community, we democratize global opportunities. Levntura isn't just an organization; it's a movement toward enriching global cultures through every journey.",
    heading: 'LEVNTURA BEGAN WITH A\nBELIEF in cultural exchange\'s\ntransformative power.',
    highlightedWord: 'LEVNTURA BEGAN WITH A\nBELIEF',
    highlightColor: 'lev-orange',
    headingColor: 'lev-red-dark',
    paragraph1: '',
    paragraph2:
      "From exchange programs to a global movement, Levntura was founded on the belief that cultural exchange has the power to transform lives. What started as a small initiative in the Middle East has grown into a regional hub for international education and youth empowerment. We believe that every cultural experience is a catalyst for growth—shaping global citizens who think differently, lead confidently, and value diversity.",
    cta: { label: 'Start now!', url: '/contact' },
    backgroundColor: 'lev-yellow-light',
    // Same story image as legacy `cultural-exchange.tsx`.
    ...(assets.storyImageId ? { storyImage: assets.storyImageId } : {}),
  },
  { blockType: 'textTestimonials' },
  {
    blockType: 'decoratedCTA',
    // Same 4 decorative photos as the legacy `are-you-ready-section.tsx`:
    // top = 3.png + 4.png, bottom = 5.png + 6.png.
    ...(assets.decoratedCtaTop.length > 0 ? { topImages: assets.decoratedCtaTop } : {}),
    ...(assets.decoratedCtaBottom.length > 0
      ? { bottomImages: assets.decoratedCtaBottom }
      : {}),
  },
]

/**
 * Gallery page — mirrors the legacy 3-section layout:
 *   1. Hero (centered): "WE ARE CREATING MEMORIES, ARE YOU JOINING?"
 *      with "CREATING MEMORIES," highlighted in lev-red.
 *   2. PhotoGrid: masonry of photos with "Show more" pagination.
 *   3. GalleryCta: heading + form card on the right (Program Application form).
 *
 * `applicationFormId` is passed through from seedForms() so the GalleryCta
 * block points at a real form and submissions land in admin Submissions.
 */
function buildGalleryBlocks(
  applicationFormId?: string | number,
  photoIds: number[] = [],
) {
  return [
    // Dedicated GalleryHero block (1:1 port of the legacy static
    // `app/gallery/gallery-hero.tsx`) — keeps the multi-color span
    // treatment and the larger SectionTitle/SectionWrapper sizing that
    // the generic Hero block can't replicate.
    { blockType: 'galleryHero' },
    {
      blockType: 'photoGrid',
      // hasMany upload relationship — array of Media IDs (alt text flows
      // from each Media doc directly, no per-block override needed).
      images: photoIds,
    },
    {
      blockType: 'galleryCta',
      ...(applicationFormId ? { form: applicationFormId } : {}),
    },
  ]
}

function buildContactBlocks(contactFormId?: string | number) {
  return [
    {
      blockType: 'contactForm',
      ...(contactFormId ? { form: contactFormId } : {}),
    },
    { blockType: 'addressList' },
  ]
}

interface PageSeed {
  slug: string
  title: string
  blocks: Array<Record<string, unknown>>
  parentSlug?: string
}

// ─── Helper ──────────────────────────────────────────────────────────────

async function ensurePage(
  payload: Payload,
  page: PageSeed,
  publish: boolean,
): Promise<{ id: string | number; created: boolean }> {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: page.slug } },
    limit: 1,
  })
  if (existing.docs[0]) {
    return { id: existing.docs[0].id, created: false }
  }

  const result = await payload.create({
    collection: 'pages',
    // Pass locale explicitly so Payload writes localized fields (text,
    // textarea, labels inside arrays) to the EN locale's row. Without
    // this, localized fields inside nested arrays (like the destination
    // card labels) can silently end up empty in the locale-resolved API
    // response, which the frontend then renders as blank text.
    locale: 'en',
    data: {
      title: page.title,
      slug: page.slug,
      sections: page.blocks,
      _status: publish ? 'published' : 'draft',
      translationComplete: true,
    } as never,
    draft: !publish,
  })

  return { id: result.id, created: true }
}

// ─── Public API ──────────────────────────────────────────────────────────

export async function seedPages(
  payload: Payload,
  options: SeedPagesOptions = {},
): Promise<SeedPagesResult> {
  const publish = options.publish ?? true
  const contactFormId = options.forms?.contactFormId
  const applicationFormId = options.forms?.applicationFormId

  const result: SeedPagesResult = {
    ok: true,
    message: '',
    pages: {},
    created: [],
    skipped: [],
    errors: [],
  }

  // Download the gallery photos into Media first so we can reference real
  // Media IDs from the PhotoGrid block. Returns the IDs in the same order
  // as GALLERY_PHOTOS — empty array if every download failed (block will
  // still render via the frontend's packaged fallback set).
  const galleryPhotoIds = await seedGalleryPhotos(payload)

  // Resolve the 9 travel-destination card images so the heroHome block on
  // the Home page has its `intro.images` array populated. Editor sees all
  // 9 cards pre-loaded in admin and can reorder / add URLs / swap any.
  const travelDestinations = await seedTravelDestinations(payload)

  // Resolve all About-page assets (Hero bg + 4 Venture cards + 8 Memories
  // photos) so every image slot in the About blocks is pre-populated and
  // matches the legacy frontend's static images.
  const aboutAssets = await seedAboutAssets(payload)

  const pages: PageSeed[] = [
    {
      slug: 'home',
      title: 'Home',
      blocks: buildHomeBlocks(travelDestinations),
    },
    {
      slug: 'about',
      title: 'About Us',
      blocks: buildAboutBlocks(aboutAssets),
    },
    {
      slug: 'gallery',
      title: 'Gallery',
      blocks: buildGalleryBlocks(applicationFormId, galleryPhotoIds),
    },
    {
      slug: 'contact',
      title: 'Contact Us',
      blocks: buildContactBlocks(contactFormId),
    },
  ]

  for (const page of pages) {
    try {
      const r = await ensurePage(payload, page, publish)
      result.pages[page.slug] = r.id

      if (r.created) {
        result.created.push(page.slug)
      } else if (page.slug === 'gallery' && galleryPhotoIds.length > 0) {
        // Gallery exists already (likely from a previous seed run that ran
        // before we wired Media into PhotoGrid). If its PhotoGrid block is
        // still empty, patch in the photos so the editor sees them in admin
        // — without overwriting any other edits to the page.
        await patchGalleryPhotosIfEmpty(payload, r.id, page.blocks, result)
      } else if (page.slug === 'home' && travelDestinations.length > 0) {
        // Home exists already. If the travelDestinations block exists but
        // its images array is empty, patch them in so the editor sees the
        // 9 destinations pre-populated without losing any other edits to
        // the page.
        await patchHomeTravelImagesIfEmpty(payload, r.id, travelDestinations, result)
      } else if (page.slug === 'about') {
        // About page exists from a previous seed run. For each block we
        // care about (Hero, VentureGrid, MemoriesGrid), if the image
        // field is still empty, patch in the newly-resolved assets so
        // the editor sees pre-populated images matching the legacy
        // frontend. Editor edits are preserved — we only fill empty
        // slots, never overwrite.
        await patchAboutAssetsIfEmpty(payload, r.id, aboutAssets, result)
      } else {
        result.skipped.push(page.slug)
      }
    } catch (err) {
      result.errors.push(`${page.slug}: ${(err as Error).message}`)
    }
  }

  result.message = `Pages seed done. created=${result.created.length}, skipped=${result.skipped.length}, errors=${result.errors.length}.`
  if (result.errors.length) result.ok = false

  return result
}

/**
 * Idempotent gallery photo backfill — runs only when:
 *   - the gallery page already exists (we didn't just create it), AND
 *   - its PhotoGrid block has no images yet (no editor uploads to clobber).
 *
 * The PhotoGrid block is identified by `blockType === 'photoGrid'`. We
 * preserve the existing block's other fields (background, batch size, etc.)
 * and only replace its `images` array with the freshly-resolved photo IDs
 * from the seed's PhotoGrid template. Other sections on the page (Hero +
 * GalleryCta) are untouched.
 */
async function patchGalleryPhotosIfEmpty(
  payload: Payload,
  pageId: string | number,
  freshBlocks: Array<Record<string, unknown>>,
  result: SeedPagesResult,
): Promise<void> {
  const existing = await payload.findByID({
    collection: 'pages',
    id: pageId,
    depth: 0,
  })

  const sections =
    ((existing as { sections?: Array<Record<string, unknown>> } | null)?.sections) ?? []

  const photoGridIdx = sections.findIndex((b) => b?.blockType === 'photoGrid')
  if (photoGridIdx === -1) {
    result.skipped.push('gallery (no photoGrid block found)')
    return
  }

  const existingImages = sections[photoGridIdx]?.images as unknown[] | undefined
  if (Array.isArray(existingImages) && existingImages.length > 0) {
    // Editor already uploaded photos — don't touch.
    result.skipped.push('gallery (photoGrid already has images)')
    return
  }

  // Pull the fresh PhotoGrid block (with images) from the just-built template
  // and splice it into the existing sections at the same index.
  const freshPhotoGrid = freshBlocks.find((b) => b?.blockType === 'photoGrid')
  if (!freshPhotoGrid) {
    result.skipped.push('gallery (fresh template missing photoGrid)')
    return
  }

  const patchedSections = [...sections]
  patchedSections[photoGridIdx] = {
    ...sections[photoGridIdx],
    ...freshPhotoGrid,
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en', // see seed-pages create note about localized fields
    data: { sections: patchedSections } as never,
  })

  log(`  ↻ patched gallery PhotoGrid with ${(freshPhotoGrid.images as unknown[] | undefined)?.length ?? 0} photos`)
  result.created.push('gallery (PhotoGrid patched)')
}

/**
 * Idempotent travel-images backfill for the TravelDestinations block on
 * the home page. Runs only when:
 *   - the home page already exists (we didn't just create it), AND
 *   - a travelDestinations block exists on the page, AND
 *   - its images array is empty.
 *
 * If the editor already uploaded their own travel cards, this is a no-op
 * — we never overwrite editor-managed content.
 *
 * Migration note: the strip lived briefly inside HeroHome
 * (`heroHome.intro.images`) before being extracted to its own block.
 * Older home pages without a travelDestinations block are skipped here —
 * editor can add the block manually or delete + reseed the home page.
 */
async function patchHomeTravelImagesIfEmpty(
  payload: Payload,
  pageId: string | number,
  travelDestinations: Array<{ image: number; label: string }>,
  result: SeedPagesResult,
): Promise<void> {
  const existing = await payload.findByID({
    collection: 'pages',
    id: pageId,
    depth: 0,
  })

  const sections =
    ((existing as { sections?: Array<Record<string, unknown>> } | null)?.sections) ?? []

  const stripIdx = sections.findIndex((b) => b?.blockType === 'travelDestinations')
  if (stripIdx === -1) {
    result.skipped.push('home (no travelDestinations block — delete + reseed to add)')
    return
  }

  const stripBlock = sections[stripIdx] as Record<string, unknown>
  const existingImages = stripBlock.images as unknown[] | undefined
  if (Array.isArray(existingImages) && existingImages.length > 0) {
    // Editor already added travel cards — don't touch.
    result.skipped.push('home (travelDestinations.images already populated)')
    return
  }

  const patchedSections = [...sections]
  patchedSections[stripIdx] = {
    ...stripBlock,
    images: travelDestinations,
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en', // see seed-pages create note about localized fields
    data: { sections: patchedSections } as never,
  })

  log(`  ↻ patched home travelDestinations.images with ${travelDestinations.length} travel cards`)
  result.created.push('home (travelDestinations.images patched)')
}

/**
 * Idempotent About-page image backfill. Walks the existing sections and
 * for each of the three image-bearing blocks (Hero, VentureGrid,
 * MemoriesGrid) checks if the relevant image field is empty — if so,
 * fills it with the freshly resolved asset. Editor uploads are NEVER
 * overwritten; we only patch empty slots.
 *
 * This makes the About page survive the seed flow even when:
 *   - it was created by an older seed before this helper existed, OR
 *   - an editor cleared an image and expects the seed to refill it on
 *     the next run (matches our "delete to reseed" pattern for Hero
 *     details too).
 */
async function patchAboutAssetsIfEmpty(
  payload: Payload,
  pageId: string | number,
  assets: AboutAssets,
  result: SeedPagesResult,
): Promise<void> {
  const existing = await payload.findByID({
    collection: 'pages',
    id: pageId,
    depth: 0,
  })

  const sections =
    ((existing as { sections?: Array<Record<string, unknown>> } | null)?.sections) ?? []
  if (sections.length === 0) {
    result.skipped.push('about (page has no sections)')
    return
  }

  let mutated = false
  const patched = sections.map((block) => {
    if (!block || typeof block !== 'object') return block

    // Hero on About is the only Hero block on the page. Set its `media`
    // if empty AND we resolved an image.
    if (block.blockType === 'hero' && assets.heroImageId && !block.media) {
      mutated = true
      return { ...block, media: assets.heroImageId }
    }

    // VentureGrid almost always has `cards` populated by schema defaults
    // (4 cards with labels Internship/Counselor/Study & Travel/Work &
    // Travel) BUT no images. So instead of "patch only if empty", we
    // walk each card and fill in its `image` from the seeded asset
    // matching the card's label. Editor-uploaded images are preserved.
    if (block.blockType === 'ventureGrid' && assets.ventureCards.length > 0) {
      const existingCards = Array.isArray(block.cards)
        ? (block.cards as Array<Record<string, unknown>>)
        : []

      if (existingCards.length === 0) {
        mutated = true
        return { ...block, cards: assets.ventureCards }
      }

      let cardsChanged = false
      const patchedCards = existingCards.map((card) => {
        if (!card || typeof card !== 'object') return card
        if (card.image) return card // editor already uploaded one
        const match = assets.ventureCards.find((c) => c.label === card.label)
        if (!match) return card
        cardsChanged = true
        return { ...card, image: match.image }
      })

      if (cardsChanged) {
        mutated = true
        return { ...block, cards: patchedCards }
      }
      return block
    }

    // MemoriesGrid switched schema from `array of {image, alt}` to
    // `upload hasMany: true` (a flat array of Media IDs). Treat the
    // field as "needs seeding" if (a) it's missing/empty, or (b) it
    // still contains old-shape array entries (objects with .image) that
    // the new schema can't render. In either case overwrite with the
    // resolved Media IDs.
    if (block.blockType === 'memoriesGrid' && assets.memoriesImages.length > 0) {
      const existing = block.images as unknown
      const isLegacyShape =
        Array.isArray(existing) &&
        existing.length > 0 &&
        typeof existing[0] === 'object' &&
        existing[0] !== null &&
        'image' in (existing[0] as Record<string, unknown>)
      const isEmpty = !Array.isArray(existing) || existing.length === 0
      if (isEmpty || isLegacyShape) {
        mutated = true
        return { ...block, images: assets.memoriesImages }
      }
      return block
    }

    // FoundersCarousel — schema defaults populate name + title + bio
    // for the legacy Ahmad/Abdulrahman pair, but NO photo. Walk each
    // founder and fill in the `photo` from the seeded asset matching
    // by name. Also re-fill `description` if a previous seed wrote an
    // empty string (happens when the override payload omitted it).
    if (block.blockType === 'foundersCarousel' && assets.founders.length > 0) {
      const existing = Array.isArray(block.founders)
        ? (block.founders as Array<Record<string, unknown>>)
        : []

      if (existing.length === 0) {
        mutated = true
        return {
          ...block,
          founders: assets.founders.map((f) => ({
            name: f.name,
            title: f.title,
            description: f.description,
            photo: f.photo,
          })),
        }
      }

      let changed = false
      const patched = existing.map((row) => {
        if (!row || typeof row !== 'object') return row
        const match = assets.founders.find((f) => f.name === row.name)
        if (!match) return row
        let next = row
        if (!next.photo) {
          next = { ...next, photo: match.photo }
          changed = true
        }
        // Treat empty string / null / undefined as "needs description".
        const desc = next.description
        if (typeof desc !== 'string' || desc.trim() === '') {
          next = { ...next, description: match.description }
          changed = true
        }
        return next
      })
      if (changed) {
        mutated = true
        return { ...block, founders: patched }
      }
      return block
    }

    // PartnersCarousel — only the `storyImage` slot needs seeding here
    // (partner logos are SVG components on Home only and not part of
    // the About block's image array). Set it if empty.
    if (
      block.blockType === 'partnersCarousel' &&
      assets.storyImageId &&
      !block.storyImage
    ) {
      mutated = true
      return { ...block, storyImage: assets.storyImageId }
    }

    // DecoratedCTA — top + bottom image rows seeded independently. Fill
    // each one only if its current array is empty (editor-added rows
    // are preserved untouched).
    if (block.blockType === 'decoratedCTA') {
      let next = block as Record<string, unknown>
      let touched = false
      const topEmpty =
        !Array.isArray(next.topImages) || (next.topImages as unknown[]).length === 0
      const bottomEmpty =
        !Array.isArray(next.bottomImages) ||
        (next.bottomImages as unknown[]).length === 0
      if (topEmpty && assets.decoratedCtaTop.length > 0) {
        next = { ...next, topImages: assets.decoratedCtaTop }
        touched = true
      }
      if (bottomEmpty && assets.decoratedCtaBottom.length > 0) {
        next = { ...next, bottomImages: assets.decoratedCtaBottom }
        touched = true
      }
      if (touched) {
        mutated = true
        return next
      }
      return block
    }

    // MapEmbed — single `mapImage` slot. Fill only if empty.
    if (block.blockType === 'mapEmbed' && assets.mapImageId && !block.mapImage) {
      mutated = true
      return { ...block, mapImage: assets.mapImageId }
    }

    return block
  })

  if (!mutated) {
    result.skipped.push('about (all image slots already populated)')
    return
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en', // see seed-pages create note about localized fields
    data: { sections: patched } as never,
  })

  log('  ↻ patched about page image slots from seed assets')
  result.created.push('about (image slots patched)')
}
