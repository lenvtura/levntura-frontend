import { HeroBlock } from './Hero'
import { HeroHomeBlock } from './HeroHome'
import { TravelDestinationsBlock } from './TravelDestinations'
import { HeroBlogPostBlock } from './HeroBlogPost'
import { RichTextBlock } from './RichText'
import { ContentBlock } from './Content'
import { GalleryBlock } from './Gallery'
import { FAQBlock } from './FAQ'
import { CTABlock } from './CTA'
import { ProgramsListBlock } from './ProgramsList'
import { ImageFeatureBlock } from './ImageFeature'
import { MediaShowcaseBlock } from './MediaShowcase'
import { DecoratedCTABlock } from './DecoratedCTA'
import { PartnersCarouselBlock } from './PartnersCarousel'
import { FeatureCardsBlock } from './FeatureCards'
import { AlternatingContentBlock } from './AlternatingContent'
import { BlogPostsListBlock } from './BlogPostsList'
import { VideoTestimonialsBlock } from './VideoTestimonials'
import { SocialFeedBlock } from './SocialFeed'
import { ProgramShowcaseBlock } from './ProgramShowcase'
import { FoundersCarouselBlock } from './FoundersCarousel'
import { MissionStatsBlock } from './MissionStats'
import { ValuesListBlock } from './ValuesList'
import { TextTestimonialsBlock } from './TextTestimonials'
import { MapEmbedBlock } from './MapEmbed'
import { ContactFormBlock } from './ContactForm'
import { AddressListBlock } from './AddressList'
import { HeroWithImageGridBlock } from './HeroWithImageGrid'
import { PromptCTABlock } from './PromptCTA'
import { RelatedItemsBlock } from './RelatedItems'
import { MemoriesGridBlock } from './MemoriesGrid'
import { EducationStatsBlock } from './EducationStats'
import { VentureGridBlock } from './VentureGrid'
import { PhotoGridBlock } from './PhotoGrid'
import { GalleryHeroBlock } from './GalleryHero'
import { GalleryCtaBlock } from './GalleryCta'
import { FormBlock } from './FormBlock'

import type { Block } from 'payload'

import { ProgramHeroBlock } from './ProgramHero'
import { ProgramIntroBlock } from './ProgramIntro'
import { ProgramWhatIsBlock } from './ProgramWhatIs'
import { ProgramPhotoBreakBlock } from './ProgramPhotoBreak'
import { ProgramPictureYourselfBlock } from './ProgramPictureYourself'
import { ProgramWhyParticipateBlock } from './ProgramWhyParticipate'
import { ProgramJobsBlock } from './ProgramJobs'
import { ProgramDestinationsBlock } from './ProgramDestinations'
import { ProgramRequirementsBlock } from './ProgramRequirements'
import { ProgramBenefitsShowcaseBlock } from './ProgramBenefitsShowcase'
import { ProgramWhyChooseBlock } from './ProgramWhyChoose'
import { ProgramApplyBlock } from './ProgramApply'
import { ProgramShareBlock } from './ProgramShare'
import { DynamicSliderBlock } from './DynamicSlider'

import { withBlockMeta } from './withBlockMeta'

/**
 * Re-export all blocks individually so collections can pick exactly what they need.
 */
export {
  HeroBlock,
  HeroHomeBlock,
  TravelDestinationsBlock,
  HeroBlogPostBlock,
  RichTextBlock,
  ContentBlock,
  GalleryBlock,
  FAQBlock,
  CTABlock,
  ImageFeatureBlock,
  MediaShowcaseBlock,
  DecoratedCTABlock,
  PartnersCarouselBlock,
  FeatureCardsBlock,
  AlternatingContentBlock,
  BlogPostsListBlock,
  VideoTestimonialsBlock,
  SocialFeedBlock,
  ProgramShowcaseBlock,
  FoundersCarouselBlock,
  MissionStatsBlock,
  ValuesListBlock,
  TextTestimonialsBlock,
  MapEmbedBlock,
  ContactFormBlock,
  AddressListBlock,
  HeroWithImageGridBlock,
  PromptCTABlock,
  RelatedItemsBlock,
  MemoriesGridBlock,
  EducationStatsBlock,
  VentureGridBlock,
  PhotoGridBlock,
  GalleryHeroBlock,
  GalleryCtaBlock,
  FormBlock,
}

/**
 * Standard content blocks — the default set for most pages.
 *
 * Use this in any collection that supports a flexible page builder:
 *   blocks: contentBlocks
 *
 * If you need a different mix, build a custom array:
 *   blocks: [HeroBlock, FAQBlock]   // only these two
 *   blocks: [...contentBlocks, MyCustomBlock]   // standard + extra
 */
export const contentBlocks = [
  HeroBlock,
  HeroHomeBlock,
  // NOTE: TravelDestinationsBlock is intentionally scoped to Pages only —
  // it's added directly to the Pages collection's block list, not here.
  // Programs and ProgramTypes (which use contentBlocks) shouldn't show
  // it because the destinations strip is a homepage-style design, not a
  // generic content block.
  RichTextBlock,
  ContentBlock,
  GalleryBlock,
  FAQBlock,
  CTABlock,
  ImageFeatureBlock,
  MediaShowcaseBlock,
  DecoratedCTABlock,
  PartnersCarouselBlock,
  FeatureCardsBlock,
  AlternatingContentBlock,
  BlogPostsListBlock,
  VideoTestimonialsBlock,
  SocialFeedBlock,
  ProgramShowcaseBlock,
  FoundersCarouselBlock,
  MissionStatsBlock,
  ValuesListBlock,
  TextTestimonialsBlock,
  MapEmbedBlock,
  ContactFormBlock,
  AddressListBlock,
  HeroWithImageGridBlock,
  PromptCTABlock,
  RelatedItemsBlock,
  MemoriesGridBlock,
  EducationStatsBlock,
  VentureGridBlock,
  PhotoGridBlock,
  GalleryHeroBlock,
  GalleryCtaBlock,
  FormBlock,
  ProgramsListBlock,
  // Every block gets the shared section meta (hide toggle + sync key).
].map(withBlockMeta)

/**
 * Tag a block with an admin group so the "Add Section" drawer splits blocks
 * into labelled categories (Payload `admin.group`).
 */
export const withGroup =
  (group: string) =>
  (block: Block): Block => ({
    ...block,
    admin: { ...(block.admin ?? {}), group },
  })

/**
 * The program section blocks use a fixed short `dbName` — their long slugs
 * would blow past Postgres's 63-char identifier limit under the versioned
 * `_<collection>_v_blocks_*` prefix. But `dbName` is a FIXED physical table
 * name, so the SAME block reused in two collections would share ONE table —
 * causing FK conflicts + cross-collection leakage (a doc whose id matches
 * another collection's id would render the wrong section). The fix: give each
 * collection its own table prefix. This map holds the shared suffix; the
 * prefix is per-collection (pgm=Programs, ppg=Pages, jbg=Jobs).
 */
const PROGRAM_BLOCK_DB_SUFFIX: Record<string, string> = {
  programHero: 'hero',
  programIntro: 'intro',
  programWhatIs: 'wi',
  programPhotoBreak: 'pb',
  programPictureYourself: 'py',
  programWhyParticipate: 'wp',
  programJobs: 'jobs',
  programDestinations: 'dst',
  programBenefitsShowcase: 'bs',
  programRequirements: 'req',
  programWhyChoose: 'wc',
  programApply: 'apply',
  programShare: 'share',
  dynamicSlider: 'dyn',
}

const withDbPrefix =
  (prefix: string) =>
  (block: Block): Block => {
    const suffix = PROGRAM_BLOCK_DB_SUFFIX[block.slug]
    return suffix ? { ...block, dbName: `${prefix}_${suffix}` } : block
  }

/**
 * Program-page-specific section blocks (migrated from the fixed
 * program-detail layout). Grows as each section is converted.
 */
const programSectionBlocks: Block[] = [
  ProgramHeroBlock,
  ProgramIntroBlock,
  ProgramWhatIsBlock,
  ProgramPhotoBreakBlock,
  ProgramPictureYourselfBlock,
  ProgramWhyParticipateBlock,
  ProgramJobsBlock,
  ProgramDestinationsBlock,
  ProgramRequirementsBlock,
  ProgramBenefitsShowcaseBlock,
  ProgramWhyChooseBlock,
  ProgramApplyBlock,
  ProgramShareBlock,
  DynamicSliderBlock,
]

/**
 * Build the full page-builder block set for a collection: the program section
 * blocks (grouped "Program sections", tables prefixed per collection) + the
 * standard content blocks (grouped "Global"). One helper so Programs, Pages
 * and Jobs share the exact same picker layout WITHOUT sharing tables.
 *
 *  - dbPrefix     distinct table prefix (pgm / ppg / jbg). NEVER reuse a
 *                 prefix across collections, or they share physical tables.
 *  - includeApply Apply means "apply to THIS program" and renders nothing
 *                 without a program context, so only Programs includes it.
 */
const buildProgramAwareBlocks = ({
  dbPrefix,
  includeApply,
}: {
  dbPrefix: string
  includeApply: boolean
}): Block[] =>
  [
    ...programSectionBlocks
      .filter((b) => includeApply || b.slug !== 'programApply')
      .map(withGroup('Program sections'))
      .map(withDbPrefix(dbPrefix)),
    ...contentBlocks.map(withGroup('Global')),
  ].map(withBlockMeta)

/** Programs collection picker — program sections (pgm_*) + Global blocks. */
export const programBlocks = buildProgramAwareBlocks({
  dbPrefix: 'pgm',
  includeApply: true,
})

/** Jobs collection picker — same layout, jbg_* tables, no Apply. */
export const jobBlocks = buildProgramAwareBlocks({
  dbPrefix: 'jbg',
  includeApply: false,
})

/**
 * Just the program section blocks (ppg_* tables, no Apply) to concat into the
 * Pages collection's own curated block list.
 *
 * ⚠️ Adding these to a collection creates new block tables in that
 * collection's schema, so the schema must be pushed/migrated wherever added.
 */
export const programSectionBlocksForPages: Block[] = programSectionBlocks
  .filter((block) => block.slug !== 'programApply')
  .map(withGroup('Program sections'))
  .map(withDbPrefix('ppg'))
  .map(withBlockMeta)

/** The standard content blocks grouped under "Global" — for pickers that mix
 * their own curated list with a labelled Global group (e.g. Pages). */
export const globalContentBlocks: Block[] = contentBlocks.map(withGroup('Global'))

/**
 * Article blocks — for Blog posts.
 * HeroBlogPostBlock is optional: add it at the top of a post to control the
 * hero layout. If omitted, the frontend renders a default centered header.
 */
export const articleBlocks = [
  HeroBlogPostBlock,
  RichTextBlock,
  ContentBlock,
  GalleryBlock,
  FAQBlock,
  CTABlock,
  ProgramShareBlock, // "Share" — share the current post on socials
]
