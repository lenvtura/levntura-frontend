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
]

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
]
