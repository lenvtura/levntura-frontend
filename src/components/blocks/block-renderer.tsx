import type {
  AddressListBlock as AddressListBlockData,
  AlternatingContentBlock as AlternatingContentBlockData,
  Block,
  BlogPost,
  BlogPostsListBlock as BlogPostsListBlockData,
  ContactFormBlock as ContactFormBlockData,
  ContentBlock as ContentBlockData,
  DecoratedCTABlock as DecoratedCTABlockData,
  EducationStatsBlock as EducationStatsBlockData,
  FeatureCardsBlock as FeatureCardsBlockData,
  GalleryCtaBlock as GalleryCtaBlockData,
  GalleryHeroBlock as GalleryHeroBlockData,
  PhotoGridBlock as PhotoGridBlockData,
  FoundersCarouselBlock as FoundersCarouselBlockData,
  HeroBlock as HeroBlockData,
  HeroHomeBlock as HeroHomeBlockData,
  HeroWithImageGridBlock as HeroWithImageGridBlockData,
  ImageFeatureBlock as ImageFeatureBlockData,
  TravelDestinationsBlock as TravelDestinationsBlockData,
  Locale,
  MapEmbedBlock as MapEmbedBlockData,
  MediaShowcaseBlock as MediaShowcaseBlockData,
  MemoriesGridBlock as MemoriesGridBlockData,
  MissionStatsBlock as MissionStatsBlockData,
  PartnersCarouselBlock as PartnersCarouselBlockData,
  ProgramShowcaseBlock as ProgramShowcaseBlockData,
  PromptCTABlock as PromptCTABlockData,
  RelatedItemsBlock as RelatedItemsBlockData,
  SocialFeedBlock as SocialFeedBlockData,
  TextTestimonialsBlock as TextTestimonialsBlockData,
  ValuesListBlock as ValuesListBlockData,
  VentureGridBlock as VentureGridBlockData,
  VideoTestimonialsBlock as VideoTestimonialsBlockData,
} from "@/lib/types";
import { HeroBlock } from "./hero";
import { HeroHomeBlock } from "./hero-home";
import { TravelDestinationsBlock } from "./travel-destinations";
import { HeroBlogPostBlock } from "./hero-blog-post";
import { RichTextBlock } from "./rich-text";
import { ContentBlock } from "./content";
import { GalleryBlock } from "./gallery";
import { FAQBlock } from "./faq";
import { CTABlock } from "./cta";
import { ImageFeatureBlock } from "./image-feature";
import { MediaShowcaseBlock } from "./media-showcase";
import { DecoratedCTABlock } from "./decorated-cta";
import { PartnersCarouselBlock } from "./partners-carousel";
import { FeatureCardsBlock } from "./feature-cards";
import { AlternatingContentBlock } from "./alternating-content";
import { BlogPostsListBlock } from "./blog-posts-list";
import { VideoTestimonialsBlock } from "./video-testimonials";
import { SocialFeedBlock } from "./social-feed";
import { ProgramShowcaseBlock } from "./program-showcase";
import { FoundersCarouselBlock } from "./founders-carousel";
import { MissionStatsBlock } from "./mission-stats";
import { ValuesListBlock } from "./values-list";
import { TextTestimonialsBlock } from "./text-testimonials";
import { MapEmbedBlock } from "./map-embed";
import { ContactFormBlock } from "./contact-form";
import { AddressListBlock } from "./address-list";
import { HeroWithImageGridBlock } from "./hero-with-image-grid";
import { MemoriesGridBlock } from "./memories-grid";
import { EducationStatsBlock } from "./education-stats";
import { VentureGridBlock } from "./venture-grid";
import { PhotoGridBlock } from "./photo-grid";
import { GalleryHeroBlock } from "./gallery-hero";
import { GalleryCtaBlock } from "./gallery-cta";
import { PromptCTABlock } from "./prompt-cta";
import { RelatedItemsBlock } from "./related-items";

interface BlockRendererProps {
  blocks: Block[] | undefined;
  post?: BlogPost;
  locale?: Locale;
}

export function BlockRenderer({ blocks, post, locale = "en" }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`;

        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={key} block={block as HeroBlockData} />;

          case "heroHome":
            return (
              <HeroHomeBlock key={key} block={block as HeroHomeBlockData} />
            );

          case "travelDestinations":
            return (
              <TravelDestinationsBlock
                key={key}
                block={block as TravelDestinationsBlockData}
              />
            );

          case "content":
            return <ContentBlock key={key} block={block as ContentBlockData} />;

          case "imageFeature":
            return (
              <ImageFeatureBlock
                key={key}
                block={block as ImageFeatureBlockData}
              />
            );

          case "mediaShowcase":
            return (
              <MediaShowcaseBlock
                key={key}
                block={block as MediaShowcaseBlockData}
              />
            );

          case "decoratedCTA":
            return (
              <DecoratedCTABlock
                key={key}
                block={block as DecoratedCTABlockData}
              />
            );

          case "partnersCarousel":
            return (
              <PartnersCarouselBlock
                key={key}
                block={block as PartnersCarouselBlockData}
              />
            );

          case "featureCards":
            return (
              <FeatureCardsBlock
                key={key}
                block={block as FeatureCardsBlockData}
              />
            );

          case "alternatingContent":
            return (
              <AlternatingContentBlock
                key={key}
                block={block as AlternatingContentBlockData}
              />
            );

          case "blogPostsList":
            return (
              <BlogPostsListBlock
                key={key}
                block={block as BlogPostsListBlockData}
              />
            );

          case "videoTestimonials":
            return (
              <VideoTestimonialsBlock
                key={key}
                block={block as VideoTestimonialsBlockData}
              />
            );

          case "socialFeed":
            return (
              <SocialFeedBlock
                key={key}
                block={block as SocialFeedBlockData}
              />
            );

          case "programShowcase":
            return (
              <ProgramShowcaseBlock
                key={key}
                block={block as ProgramShowcaseBlockData}
              />
            );

          case "foundersCarousel":
            return (
              <FoundersCarouselBlock
                key={key}
                block={block as FoundersCarouselBlockData}
              />
            );

          case "missionStats":
            return (
              <MissionStatsBlock
                key={key}
                block={block as MissionStatsBlockData}
              />
            );

          case "valuesList":
            return (
              <ValuesListBlock
                key={key}
                block={block as ValuesListBlockData}
              />
            );

          case "textTestimonials":
            return (
              <TextTestimonialsBlock
                key={key}
                block={block as TextTestimonialsBlockData}
              />
            );

          case "mapEmbed":
            return (
              <MapEmbedBlock
                key={key}
                block={block as MapEmbedBlockData}
              />
            );

          case "contactForm":
            return (
              <ContactFormBlock
                key={key}
                block={block as ContactFormBlockData}
              />
            );

          case "addressList":
            return (
              <AddressListBlock
                key={key}
                block={block as AddressListBlockData}
              />
            );

          case "heroWithImageGrid":
            return (
              <HeroWithImageGridBlock
                key={key}
                block={block as HeroWithImageGridBlockData}
              />
            );

          case "memoriesGrid":
            return (
              <MemoriesGridBlock
                key={key}
                block={block as MemoriesGridBlockData}
              />
            );

          case "educationStats":
            return (
              <EducationStatsBlock
                key={key}
                block={block as EducationStatsBlockData}
              />
            );

          case "ventureGrid":
            return (
              <VentureGridBlock
                key={key}
                block={block as VentureGridBlockData}
              />
            );

          case "galleryHero":
            return (
              <GalleryHeroBlock
                key={key}
                block={block as GalleryHeroBlockData}
              />
            );
          case "photoGrid":
            return (
              <PhotoGridBlock
                key={key}
                block={block as PhotoGridBlockData}
              />
            );

          case "galleryCta":
            return (
              <GalleryCtaBlock
                key={key}
                block={block as GalleryCtaBlockData}
              />
            );

          case "promptCTA":
            return (
              <PromptCTABlock
                key={key}
                block={block as PromptCTABlockData}
              />
            );

          case "relatedItems":
            return (
              <RelatedItemsBlock
                key={key}
                block={block as RelatedItemsBlockData}
              />
            );

          case "heroBlogPost":
            return (
              <HeroBlogPostBlock
                key={key}
                block={block as Block & { variant: string; eyebrow?: string }}
                post={post}
                locale={locale}
              />
            );

          case "richText":
            return <RichTextBlock key={key} block={block as Block & { content: unknown }} />;

          case "gallery":
            return (
              <GalleryBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    layout?: "grid" | "carousel" | "masonry";
                    images?: Array<{ image?: import("@/lib/types").Media; caption?: string }>;
                  }
                }
              />
            );

          case "faq":
            return (
              <FAQBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    subheading?: string;
                    items?: Array<{ question: string; answer: unknown }>;
                  }
                }
              />
            );

          case "cta":
            return (
              <CTABlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    description?: string;
                    actions?: Array<{ label: string; url: string; style?: "primary" | "secondary" }>;
                    background?: "default" | "brand" | "dark" | "image";
                    backgroundImage?: import("@/lib/types").Media;
                  }
                }
              />
            );

          default:
            if (process.env.NODE_ENV !== "production") {
              console.warn(`[BlockRenderer] Unknown block type: ${block.blockType}`);
            }
            return null;
        }
      })}
    </>
  );
}
