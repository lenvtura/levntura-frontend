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
const withGroup =
  (group: string) =>
  (block: Block): Block => ({
    ...block,
    admin: { ...(block.admin ?? {}), group },
  })

/**
 * Short DB table names for the program blocks. Payload derives table names
 * from the slug, and under the versioned `_programs_v_blocks_*` prefix the
 * long program-block slugs push some constraint names past Postgres's
 * 63-char identifier limit (which breaks schema push). A short `dbName`
 * fixes that — it only changes the table name, not the `blockType`/API.
 */
const PROGRAM_BLOCK_DBNAMES: Record<string, string> = {
  programHero: 'pgm_hero',
  programIntro: 'pgm_intro',
  programWhatIs: 'pgm_wi',
  programPhotoBreak: 'pgm_pb',
  programPictureYourself: 'pgm_py',
  programWhyParticipate: 'pgm_wp',
  programJobs: 'pgm_jobs',
  programDestinations: 'pgm_dst',
  programBenefitsShowcase: 'pgm_bs',
  programRequirements: 'pgm_req',
  programWhyChoose: 'pgm_wc',
  programApply: 'pgm_apply',
  programShare: 'pgm_share',
}

const withShortDbName = (block: Block): Block => {
  const dbName = PROGRAM_BLOCK_DBNAMES[block.slug]
  return dbName ? { ...block, dbName } : block
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
]

/**
 * Program blocks — program-specific sections grouped under "Program
 * sections", plus the standard content blocks grouped under "General", so
 * the picker clearly separates the two. withBlockMeta is idempotent, so
 * re-wrapping the already-wrapped contentBlocks is a no-op.
 */
export const programBlocks = [
  ...programSectionBlocks.map(withGroup('Program sections')).map(withShortDbName),
  ...contentBlocks.map(withGroup('General')),
].map(withBlockMeta)

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
