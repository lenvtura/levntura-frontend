/**
 * Minimal types matching the CMS API response shape.
 * Expand as we wire up more endpoints. Full source-of-truth types are in
 * the backend at `src/payload-types.ts` — we mirror the relevant subset here.
 */

export type Locale = 'en' | 'ar'

// ─── Media ───────────────────────────────────────────────────────────────

export interface Media {
  id: string | number
  url?: string
  alt?: string
  filename?: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    feature?: { url: string; width: number; height: number }
    og?: { url: string; width: number; height: number }
  }
}

// ─── SEO ─────────────────────────────────────────────────────────────────

export interface SEOMeta {
  title?: string
  description?: string
  keywords?: string
  image?: Media
  canonicalURL?: string
  noIndex?: boolean
  noFollow?: boolean
}

// These three live as TOP-LEVEL groups on the doc (siblings of `meta`), not
// nested inside it — matching the Payload SEO field config.
export interface OpenGraphMeta {
  title?: string
  description?: string
  image?: Media
  type?: 'website' | 'article' | 'product' | 'profile'
}

export interface StructuredData {
  enabled?: boolean
  type?: 'auto' | 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage'
}

export interface CourseSchema {
  enabled?: boolean
  courseCode?: string
  educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
  courseMode?: 'online' | 'onsite' | 'blended'
  duration?: string
  provider?: string
  startDate?: string
  endDate?: string
}

// ─── Blocks (sections array) ─────────────────────────────────────────────

export interface BaseBlock {
  id?: string
  blockType: string
  blockName?: string
}

export interface HeroBlogPostBlock extends BaseBlock {
  blockType: 'heroBlogPost'
  variant: 'centered' | 'split-right' | 'split-left' | 'full-background'
  eyebrow?: string
  showAuthor?: boolean
  showDate?: boolean
  showReadingTime?: boolean
}

export interface RichTextBlock extends BaseBlock {
  blockType: 'richText'
  content: unknown // lexical JSON — render via Payload's react-renderer
  width?: 'narrow' | 'medium' | 'wide'
}

export interface GalleryBlock extends BaseBlock {
  blockType: 'gallery'
  heading?: string
  subheading?: string
  layout?: 'grid' | 'carousel' | 'masonry'
  images: Array<{ image: Media; caption?: string }>
}

export interface FAQBlock extends BaseBlock {
  blockType: 'faq'
  heading?: string
  subheading?: string
  items: Array<{ question: string; answer: unknown }>
}

export interface CTABlock extends BaseBlock {
  blockType: 'cta'
  heading: string
  description?: string
  actions?: Array<{ label: string; url: string; style?: string }>
  background?: 'light' | 'dark' | 'image'
}

export interface HeroAction {
  id?: string
  label: string
  url: string
  style?: 'primary' | 'secondary' | 'ghost'
}

export type HeroBackgroundColor =
  | 'none'
  | 'lev-yellow'
  | 'lev-yellow-light'
  | 'lev-blue'
  | 'lev-blue-light'
  | 'lev-blue-dark'
  | 'lev-green'
  | 'lev-green-light'
  | 'lev-green-dark'
  | 'lev-red'
  | 'lev-red-dark'
  | 'lev-orange'
  | 'lev-pink'
  | 'lev-black'
  | 'white'

export type HeroHighlightColor =
  | 'lev-orange'
  | 'lev-red'
  | 'lev-green'
  | 'lev-green-light'
  | 'lev-blue'
  | 'lev-blue-light'
  | 'lev-yellow'

export interface HeroBlock extends BaseBlock {
  blockType: 'hero'
  variant?: 'centered' | 'splitRight' | 'splitLeft' | 'fullBackground'
  eyebrow?: string
  heading: string
  highlightedWord?: string
  highlightColor?: HeroHighlightColor
  subheading?: string
  media?: Media
  actions?: HeroAction[]
  backgroundColor?: HeroBackgroundColor
  textColor?: 'dark' | 'light'
}

export type HeroHomeBackgroundColor =
  | 'lev-blue'
  | 'lev-blue-dark'
  | 'lev-green-dark'
  | 'lev-green'
  | 'lev-red'
  | 'lev-orange'
  | 'lev-yellow'
  | 'lev-black'

export interface HeroHomeBlock extends BaseBlock {
  blockType: 'heroHome'
  eyebrow?: string
  headline: string
  subheadline?: string
  backgroundType?: 'image' | 'color'
  backgroundImage?: Media
  backgroundColor?: HeroHomeBackgroundColor
  opportunities?: Array<{ id?: string; label: string }>
  cta?: {
    label?: string
    url?: string
  }
  showSocialIcons?: boolean
  // The intro section (heading + 2 paragraphs) that appears below the
  // hero. The destination image strip that overlays its bottom is a
  // separate block — `TravelDestinationsBlock` — placed right after
  // this hero in the page's `sections` array.
  intro?: {
    heading?: string
    paragraph1?: string
    paragraph2?: string
  }
}

export interface TravelDestinationsBlock extends BaseBlock {
  blockType: 'travelDestinations'
  images?: Array<{
    id?: string
    image?: Media
    label: string
    url?: string
  }>
}

export interface ContentColumn {
  id?: string
  size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
  content?: unknown // lexical
  enableLink?: boolean
  link?: {
    label: string
    url: string
  }
}

export interface ContentBlock extends BaseBlock {
  blockType: 'content'
  heading?: string
  subheading?: string
  columns?: ContentColumn[]
}

// ─── ImageFeature ─────────────────────────────────────────────────────────

export type ImageFeatureBackgroundColor =
  | 'lev-yellow'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'
  | 'lev-gray-light'
  | 'white'

export interface ImageFeatureBlock extends BaseBlock {
  blockType: 'imageFeature'
  eyebrow?: string
  heading: string
  paragraph?: string
  image?: Media
  backgroundColor?: ImageFeatureBackgroundColor
}

// ─── MediaShowcase ────────────────────────────────────────────────────────

export type MediaShowcaseAspectRatio =
  | 'portrait'
  | 'square'
  | 'landscape'
  | 'wide'
  | 'natural'

export interface MediaShowcaseBlock extends BaseBlock {
  blockType: 'mediaShowcase'
  heading: string
  description?: string
  aspectRatio?: MediaShowcaseAspectRatio
  items?: Array<{
    id?: string
    image: Media
    caption?: string
    url?: string
  }>
  autoplay?: boolean
  autoplayDelay?: number
}

// ─── DecoratedCTA ─────────────────────────────────────────────────────────

export type DecoratedCTABackgroundColor =
  | 'lev-yellow-light'
  | 'lev-yellow'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'
  | 'white'

export interface DecoratedCTABlock extends BaseBlock {
  blockType: 'decoratedCTA'
  heading: string
  description?: string
  cta?: {
    label?: string
    url?: string
  }
  topImages?: Array<{ id?: string; image: Media }>
  bottomImages?: Array<{ id?: string; image: Media }>
  backgroundColor?: DecoratedCTABackgroundColor
}

// ─── PartnersCarousel ─────────────────────────────────────────────────────

export type PartnersHighlightColor =
  | 'none'
  | 'lev-orange'
  | 'lev-red'
  | 'lev-red-dark'
  | 'lev-blue'
  | 'lev-blue-dark'
  | 'lev-green'
  | 'lev-green-dark'
  | 'lev-yellow'

export type PartnersHeadingColor =
  | 'lev-blue-dark'
  | 'lev-red-dark'
  | 'lev-green-dark'
  | 'lev-black'
  | 'white'

export type PartnersBgColor =
  | 'none'
  | 'white'
  | 'lev-yellow-light'
  | 'lev-yellow'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'

export interface PartnersCarouselBlock extends BaseBlock {
  blockType: 'partnersCarousel'
  eyebrow?: string
  heading: string
  highlightedWord?: string
  highlightColor?: PartnersHighlightColor
  headingColor?: PartnersHeadingColor
  paragraph1?: string
  paragraph2?: string
  partners?: Array<{ id?: string; logo: Media; name?: string }>
  storyImage?: Media
  cta?: { label?: string; url?: string }
  backgroundColor?: PartnersBgColor
}

// ─── FeatureCards ─────────────────────────────────────────────────────────

export type BrandColor =
  | 'lev-blue-light'
  | 'lev-blue'
  | 'lev-blue-dark'
  | 'lev-orange'
  | 'lev-yellow'
  | 'lev-yellow-light'
  | 'lev-green'
  | 'lev-green-light'
  | 'lev-green-dark'
  | 'lev-red'
  | 'lev-pink'
  | 'white'

export interface FeatureCardsBlock extends BaseBlock {
  blockType: 'featureCards'
  heading: string
  description?: string
  sectionCta?: { label?: string; url?: string }
  cards?: Array<{
    id?: string
    label: string
    image?: Media
    panelColor?: BrandColor
    overlayTextColor?: BrandColor
    ctaUrl?: string
  }>
  backgroundColor?: BrandColor
}

// ─── AlternatingContent ───────────────────────────────────────────────────

export interface AlternatingContentBlock extends BaseBlock {
  blockType: 'alternatingContent'
  eyebrow?: string
  heading: string
  introParagraph?: string
  rows?: Array<{
    id?: string
    tag?: string
    heading: string
    paragraph?: string
    image?: Media
    imagePosition?: 'left' | 'right'
  }>
}

// ─── BlogPostsList ────────────────────────────────────────────────────────

export interface BlogPostsListBlock extends BaseBlock {
  blockType: 'blogPostsList'
  eyebrow?: string
  heading: string
  description?: string
  displayMode?: 'auto' | 'manual'
  limit?: number
  selectedPosts?: BlogPost[] | string[] | number[]
  cta?: { label?: string; url?: string }
  backgroundColor?:
    | 'lev-yellow-light'
    | 'lev-yellow'
    | 'lev-blue-light'
    | 'lev-green-light'
    | 'lev-pink'
    | 'white'
}

// ─── VideoTestimonials ────────────────────────────────────────────────────

export interface VideoTestimonialsBlock extends BaseBlock {
  blockType: 'videoTestimonials'
  heading: string
  subheading?: string
  description?: string
  videos?: Array<{ id?: string; video: Media; caption?: string }>
  cta?: { label?: string; url?: string }
}

// ─── SocialFeed ───────────────────────────────────────────────────────────

export type SocialPlatformIcon =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'youtube'

export interface SocialFeedBlock extends BaseBlock {
  blockType: 'socialFeed'
  stats?: Array<{
    id?: string
    number: string
    numberColor?: BrandColor
    category: string
    paragraph?: string
  }>
  communityHeading: string
  communityDescription?: string
  platform?: SocialPlatformIcon
  backgroundImage?: Media
  cta?: { label?: string; url?: string }
}

// ─── ProgramShowcase ──────────────────────────────────────────────────────

export type ProgramShowcaseBgColor =
  | 'tealLight'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'
  | 'white'

export interface ProgramShowcaseBlock extends BaseBlock {
  blockType: 'programShowcase'
  heading: string
  programTypes?: Array<{ id?: string; label: string }>
  cta?: { label?: string; url?: string }
  programs?: Array<{ id?: string; label: string; image?: Media }>
  backgroundColor?: ProgramShowcaseBgColor
}

// ─── FoundersCarousel ─────────────────────────────────────────────────────

export interface FoundersCarouselBlock extends BaseBlock {
  blockType: 'foundersCarousel'
  founders?: Array<{
    id?: string
    title: string
    name: string
    description?: string
    photo?: Media
  }>
  cta?: { label?: string; url?: string }
}

// ─── MissionStats ─────────────────────────────────────────────────────────

export type MissionStatsBgColor =
  | 'lev-orange'
  | 'lev-red'
  | 'lev-blue'
  | 'lev-blue-dark'
  | 'lev-green-dark'
  | 'lev-black'

export type MissionStatsValueColor =
  | 'lev-yellow'
  | 'lev-orange'
  | 'lev-green-light'
  | 'lev-blue-light'
  | 'white'

export interface MissionStatsBlock extends BaseBlock {
  blockType: 'missionStats'
  heading: string
  paragraphs?: Array<{ id?: string; text: string }>
  stats?: Array<{ id?: string; value: string; label: string }>
  backgroundColor?: MissionStatsBgColor
  statValueColor?: MissionStatsValueColor
}

// ─── ValuesList ───────────────────────────────────────────────────────────

export type ValuesListBgColor =
  | 'lev-yellow-light'
  | 'lev-yellow'
  | 'lev-pink'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'white'

export interface ValuesListBlock extends BaseBlock {
  blockType: 'valuesList'
  heading: string
  values?: Array<{
    id?: string
    number: string
    title: string
    description?: string
  }>
  backgroundColor?: ValuesListBgColor
}

// ─── TextTestimonials ─────────────────────────────────────────────────────

export interface TextTestimonialsBlock extends BaseBlock {
  blockType: 'textTestimonials'
  eyebrow?: string
  headingFaded: string
  headingSolid: string
  testimonials?: Array<{
    id?: string
    name: string
    description: string
    role?: string
    photo?: Media
  }>
}

// ─── MapEmbed ─────────────────────────────────────────────────────────────

export type MapEmbedBgColor =
  | 'lev-yellow-light'
  | 'lev-yellow'
  | 'lev-pink'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'white'

export interface MapEmbedBlock extends BaseBlock {
  blockType: 'mapEmbed'
  eyebrow?: string
  heading: string
  supportingParagraphs?: Array<{ id?: string; text: string }>
  mapImage?: Media
  mapLink?: string
  stat?: {
    value?: string
    label?: string
    description?: string
  }
  backgroundColor?: MapEmbedBgColor
}

// ─── ContactForm ──────────────────────────────────────────────────────────

export interface CmsFormField {
  blockType: string
  name: string
  label?: string
  required?: boolean
  defaultValue?: string | number | boolean
  width?: number
  options?: Array<{ label: string; value: string }>
}

export interface CmsForm {
  id: string | number
  title?: string
  fields?: CmsFormField[]
  submitButtonLabel?: string
  confirmationType?: 'message' | 'redirect'
  confirmationMessage?: unknown
  redirect?: { url: string }
}

export type ContactFormBgColor =
  | 'lev-blue-dark'
  | 'lev-black'
  | 'lev-green-dark'
  | 'lev-red-dark'

export interface ContactFormBlock extends BaseBlock {
  blockType: 'contactForm'
  heading: string
  highlightedWord?: string
  socialsLabel?: string
  showSocials?: boolean
  form?: CmsForm | string | number | null
  backgroundColor?: ContactFormBgColor
}

// ─── AddressList ──────────────────────────────────────────────────────────

export type AddressListBgColor =
  | 'gray-light'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'white'

export interface AddressListBlock extends BaseBlock {
  blockType: 'addressList'
  intro?: string
  offices?: Array<{
    id?: string
    code: string
    address: string
    phones?: Array<{ id?: string; number: string }>
    directionsLabel?: string
    directionsURL?: string
  }>
  backgroundColor?: AddressListBgColor
}

// ─── HeroWithImageGrid ────────────────────────────────────────────────────

export type HeroImageGridBgColor =
  | 'lev-green-dark'
  | 'lev-blue-dark'
  | 'lev-black'
  | 'lev-red-dark'
  | 'lev-orange'

export type HeroImageGridHighlight =
  | 'lev-green-light'
  | 'lev-yellow'
  | 'lev-orange'
  | 'lev-red'
  | 'lev-blue-light'

export interface HeroWithImageGridBlock extends BaseBlock {
  blockType: 'heroWithImageGrid'
  eyebrow?: string
  heading: string
  highlightedWord?: string
  highlightColor?: HeroImageGridHighlight
  description?: string
  images?: Array<{ id?: string; image: Media; alt?: string }>
  backgroundColor?: HeroImageGridBgColor
}

// ─── MemoriesGrid ─────────────────────────────────────────────────────────

export type MemoriesGridBgColor =
  | 'none'
  | 'lev-yellow-light'
  | 'lev-yellow'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'
  | 'white'

export interface MemoriesGridBlock extends BaseBlock {
  blockType: 'memoriesGrid'
  title: string
  // hasMany Media upload — array of Media docs at depth=2 (or numeric
  // IDs if depth=0). Each image's alt text flows from its Media doc.
  images?: Media[] | number[]
  primaryCta?: { label?: string; url?: string }
  secondaryLink?: { label?: string; url?: string }
  backgroundColor?: MemoriesGridBgColor
}

// ─── EducationStats ───────────────────────────────────────────────────────

export type EducationStatsBgColor =
  | 'none'
  | 'white'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'

export type EducationStatsHeadingColor =
  | 'lev-red-dark'
  | 'lev-blue-dark'
  | 'lev-green-dark'
  | 'lev-black'

export type EducationStatsValueColor =
  | 'lev-orange'
  | 'lev-red'
  | 'lev-blue'
  | 'lev-green'
  | 'lev-yellow'

export interface EducationStatsBlock extends BaseBlock {
  blockType: 'educationStats'
  heading: string
  paragraph?: string
  cta?: { label?: string; url?: string }
  stats?: Array<{
    id?: string
    value: string
    label: string
    description?: string
  }>
  backgroundColor?: EducationStatsBgColor
  headingColor?: EducationStatsHeadingColor
  statValueColor?: EducationStatsValueColor
}

// ─── VentureGrid ──────────────────────────────────────────────────────────

export type VentureGridBgColor =
  | 'none'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'
  | 'white'

export type VentureGridHeadingColor =
  | 'lev-blue-dark'
  | 'lev-red-dark'
  | 'lev-green-dark'
  | 'lev-black'

export interface VentureGridBlock extends BaseBlock {
  blockType: 'ventureGrid'
  heading: string
  subtitle?: string
  cards?: Array<{ id?: string; label: string; image?: Media }>
  paragraph1?: string
  paragraph2?: string
  backgroundColor?: VentureGridBgColor
  headingColor?: VentureGridHeadingColor
}

// ─── PhotoGrid (Gallery) ──────────────────────────────────────────────────

export type PhotoGridBgColor =
  | 'white'
  | 'none'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'

export type GalleryHeroBgColor =
  | 'none'
  | 'white'
  | 'lev-yellow-light'
  | 'lev-blue-light'
  | 'lev-green-light'
  | 'lev-pink'

export interface GalleryHeroBlock extends BaseBlock {
  blockType: 'galleryHero'
  body?: string
  backgroundColor?: GalleryHeroBgColor
}

export interface PhotoGridBlock extends BaseBlock {
  blockType: 'photoGrid'
  /** `hasMany` upload relationship — Media objects when populated (depth>=1),
   *  numeric IDs when depth=0. Alt text comes from each Media doc directly. */
  images?: Array<Media | number | string>
  initialCount?: number
  batchSize?: number
  showMoreLabel?: string
  backgroundColor?: PhotoGridBgColor
}

// ─── GalleryCta ───────────────────────────────────────────────────────────

export type GalleryCtaHighlightColor =
  | 'none'
  | 'lev-red'
  | 'lev-red-dark'
  | 'lev-orange'
  | 'lev-blue'
  | 'lev-green'
  | 'lev-yellow'

export type GalleryCtaHeadingColor =
  | 'lev-red-dark'
  | 'lev-blue-dark'
  | 'lev-green-dark'
  | 'lev-black'

export interface GalleryCtaBlock extends BaseBlock {
  blockType: 'galleryCta'
  heading: string
  highlightedWord?: string
  highlightColor?: GalleryCtaHighlightColor
  headingColor?: GalleryCtaHeadingColor
  formTitle?: string
  form?: CmsForm | string | number | null
  contactLink?: { label?: string; url?: string }
  showDotPattern?: boolean
}

// ─── PromptCTA ────────────────────────────────────────────────────────────

export interface PromptCTABlock extends BaseBlock {
  blockType: 'promptCTA'
  heading: string
  image?: Media
  cta?: { label: string; url: string }
}

// ─── RelatedItems ─────────────────────────────────────────────────────────

export type RelatedItemsBgColor =
  | 'lev-green-dark'
  | 'lev-blue-dark'
  | 'lev-black'
  | 'lev-yellow-light'
  | 'white'

export interface RelatedItemsBlock extends BaseBlock {
  blockType: 'relatedItems'
  heading: string
  sectionLabel?: string
  viewAll?: { label?: string; url?: string }
  items?: Array<{
    id?: string
    title: string
    image: Media
    url: string
  }>
  columns?: '2' | '3' | '4'
  backgroundColor?: RelatedItemsBgColor
}

export type Block =
  | HeroBlock
  | HeroHomeBlock
  | TravelDestinationsBlock
  | HeroBlogPostBlock
  | RichTextBlock
  | GalleryBlock
  | FAQBlock
  | CTABlock
  | ContentBlock
  | ImageFeatureBlock
  | MediaShowcaseBlock
  | DecoratedCTABlock
  | PartnersCarouselBlock
  | FeatureCardsBlock
  | AlternatingContentBlock
  | BlogPostsListBlock
  | VideoTestimonialsBlock
  | SocialFeedBlock
  | ProgramShowcaseBlock
  | FoundersCarouselBlock
  | MissionStatsBlock
  | ValuesListBlock
  | TextTestimonialsBlock
  | MapEmbedBlock
  | ContactFormBlock
  | AddressListBlock
  | HeroWithImageGridBlock
  | MemoriesGridBlock
  | EducationStatsBlock
  | VentureGridBlock
  | PhotoGridBlock
  | GalleryHeroBlock
  | GalleryCtaBlock
  | PromptCTABlock
  | RelatedItemsBlock
  | (BaseBlock & Record<string, unknown>) // fallback for unknown blocks

// ─── Collections ─────────────────────────────────────────────────────────

export interface BlogCategory {
  id: string | number
  name: string
  slug: string
  description?: string
  image?: Media
  color?: string
}

export interface User {
  id: string | number
  name?: string
  email?: string
  avatar?: Media
}

export interface Page {
  id: string | number
  title: string
  slug: string
  fullPath?: string
  parent?: Page | string | number | null
  sections?: Block[]
  showHeader?: boolean
  showFooter?: boolean
  translationComplete?: boolean
  publishedAt?: string
  dateModified?: string
  meta?: SEOMeta
  openGraph?: OpenGraphMeta
  structuredData?: StructuredData
  _status?: 'draft' | 'published'
}

// ─── Programs ────────────────────────────────────────────────────────────

export type ProgramCountry =
  | 'US' | 'UK' | 'CA' | 'DE' | 'FR' | 'ES' | 'IT' | 'AU'
  | 'IE' | 'ZA' | 'EG' | 'JO' | 'SA' | 'AE' | 'multi'

export interface ProgramType {
  id: string | number
  name: string
  slug: string
  shortDescription?: string
  applicationForm?: CmsForm | string | number | null
  icon?: Media
  featuredImage?: Media
  sections?: Block[]
  order?: number
  meta?: SEOMeta
  _status?: 'draft' | 'published'
}

// Icon keys used by Requirements + Features arrays. Frontend maps each
// key to a packaged SVG component (see app/programs/[programSlug]/icons).
export type ProgramRequirementIcon =
  | 'passport'
  | 'college'
  | 'language'
  | 'age'
  | 'diploma'

export type ProgramFeatureIcon =
  | 'star'
  | 'bag'
  | 'hand'
  | 'people'
  | 'face'
  | 'check'

export interface ProgramDetailBenefit {
  id?: string
  image?: Media
  title: string
  description?: string
}

export interface ProgramDetailJob {
  id?: string
  image?: Media
  title: string
}

export interface ProgramDetailDestination {
  id?: string
  image?: Media
  area: string
  country?: string
}

export interface ProgramDetailShowcaseItem {
  id?: string
  text: string
}

export interface ProgramDetailRequirement {
  id?: string
  iconKey: ProgramRequirementIcon
  title: string
  description?: string
}

export interface ProgramDetailFeature {
  id?: string
  iconKey: ProgramFeatureIcon
  title: string
  description?: string
}

export interface Program {
  id: string | number
  title: string
  slug: string
  type?: ProgramType[] | string[] | number[]
  country: ProgramCountry
  duration: string
  shortDescription: string
  applicationForm?: CmsForm | string | number | null
  featuredImage?: Media
  isOpen?: boolean
  calendlyURL?: string
  /** Optional ad-hoc CMS blocks rendered AFTER the structured detail page. */
  sections?: Block[]

  // ─── Detail-page structured fields ──────────────────────────────────────
  detailHero?: {
    tag?: string
    subtitle?: string
    note?: string
    image?: Media
  }
  detailIntro?: {
    eyebrow?: string
    body?: string
  }
  detailWhatIs?: {
    title?: string
    body?: string
  }
  detailPhotoMiddle?: Media
  detailPictureYourself?: {
    eyebrow?: string
    body?: string
    circleHeading?: string
    circleBody?: string
    photo?: Media
  }
  detailWhyParticipate?: {
    body?: string
    benefits?: ProgramDetailBenefit[]
  }
  detailJobs?: {
    body?: string
    items?: ProgramDetailJob[]
  }
  detailDestinations?: {
    leadText?: string
    items?: ProgramDetailDestination[]
  }
  detailBenefitsShowcase?: {
    title?: string
    items?: ProgramDetailShowcaseItem[]
  }
  detailRequirements?: ProgramDetailRequirement[]
  detailMemories?: {
    title?: string
    images?: Array<{ id?: string; image?: Media; alt?: string }>
    primaryCta?: { label?: string; url?: string }
    secondaryLink?: { label?: string; url?: string }
  }
  detailFeatures?: ProgramDetailFeature[]

  publishedAt?: string
  dateModified?: string
  translationComplete?: boolean
  meta?: SEOMeta
  openGraph?: OpenGraphMeta
  course?: CourseSchema
  _status?: 'draft' | 'published'
}

export interface BlogPost {
  id: string | number
  title: string
  slug: string
  excerpt: string
  featuredImage: Media
  category?: BlogCategory
  tags?: string[]
  relatedPosts?: BlogPost[]
  author?: User
  authorOverride?: string
  publishedAt?: string
  dateModified?: string
  readingTime?: number
  wordCount?: number
  isFeatured?: boolean
  translationComplete?: boolean
  sections?: Block[]
  meta?: SEOMeta
  openGraph?: OpenGraphMeta
  _status?: 'draft' | 'published'
}

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

// ─── Globals ─────────────────────────────────────────────────────────────

export type SocialPlatform =
  | 'whatsapp'
  | 'instagram'
  | 'linkedin'
  | 'facebook'
  | 'youtube'
  | 'twitter'
  | 'tiktok'
  | 'telegram'

export interface PageRef {
  id: string | number
  slug?: string
  fullPath?: string
  title?: string
}

export interface HeaderNavItem {
  id?: string
  label: string
  type?: 'page' | 'external'
  page?: PageRef | string | number | null
  externalURL?: string | null
  openInNewTab?: boolean
  submenu?: Array<{
    id?: string
    label: string
    page?: PageRef | string | number | null
  }>
}

export interface HeaderGlobal {
  id?: string | number
  navigation?: HeaderNavItem[]
  cta?: {
    enabled?: boolean
    label?: string
    url?: string
  }
}

export interface FooterColumn {
  id?: string
  title?: string
  links?: Array<{
    id?: string
    label: string
    url: string
    openInNewTab?: boolean
  }>
}

export interface FooterAddress {
  id?: string
  label?: string
  address: string
}

export interface FooterPhone {
  id?: string
  number: string
  label?: string
}

export interface FooterSocialLink {
  id?: string
  platform: SocialPlatform
  url: string
}

export interface FooterGlobal {
  id?: string | number
  columns?: FooterColumn[]
  addresses?: FooterAddress[]
  phones?: FooterPhone[]
  email?: string
  showLogo?: boolean
  tagline?: string
  socialLinks?: FooterSocialLink[]
  showWatermark?: boolean
  copyright?: string
  bottomLinks?: Array<{
    id?: string
    label: string
    url: string
  }>
}

export interface SiteSettingsGlobal {
  id?: string | number
  siteName?: string
  logo?: Media | null
  logoLight?: Media | null
  favicon?: Media | null
  defaultTitle?: string
  titleTemplate?: string
  defaultDescription?: string
  defaultOGImage?: Media | null
  socials?: Array<{ platform: SocialPlatform; url: string }>
  headCode?: string
  bodyCode?: string
  robotsTxt?: string
  maintenanceMode?: boolean
}
