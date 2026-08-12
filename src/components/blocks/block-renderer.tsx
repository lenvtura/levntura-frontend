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
import {
  DynamicSliderBlock,
  type DynamicSliderBlockData,
} from "./dynamic-slider";
import { VideoTestimonialsBlock } from "./video-testimonials";
import { SocialFeedBlock } from "./social-feed";
import { ProgramShowcaseBlock } from "./program-showcase";
import { FoundersCarouselBlock } from "./founders-carousel";
import { MissionStatsBlock } from "./mission-stats";
import { ValuesListBlock } from "./values-list";
import { TextTestimonialsBlock } from "./text-testimonials";
import { MapEmbedBlock } from "./map-embed";
import { ContactFormBlock } from "./contact-form";
import { FormBlock, type FormBlockData } from "./form-block";
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
import { ProgramHeroBlock } from "./program-hero";
import { ProgramIntroBlock } from "./program-intro";
import { ProgramWhatIsBlock } from "./program-what-is";
import { ProgramPhotoBreakBlock } from "./program-photo-break";
import { ProgramPictureYourselfBlock } from "./program-picture-yourself";
import { ProgramWhyParticipateBlock } from "./program-why-participate";
import { ProgramJobsBlock } from "./program-jobs";
import { ProgramDestinationsBlock } from "./program-destinations";
import { ProgramRequirementsBlock } from "./program-requirements";
import { ProgramBenefitsShowcaseBlock } from "./program-benefits-showcase";
import { ProgramWhyChooseBlock } from "./program-why-choose";
import { ProgramApplyBlock } from "./program-apply";
import { ProgramShareBlock } from "./program-share";
import type { ReactNode } from "react";

interface BlockRendererProps {
  blocks: Block[] | undefined;
  post?: BlogPost;
  locale?: Locale;
  // Program-specific application form (Calendly / dynamic form), built on the
  // server in the program page and consumed by the `programApply` block.
  applyForm?: ReactNode;
  // Canonical URL of the current page — consumed by the `programShare` block.
  shareUrl?: string;
}

export function BlockRenderer({
  blocks,
  post,
  locale = "en",
  applyForm,
  shareUrl,
}: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`;

        // Editor-controlled visibility — skip any section the editor ticked
        // "Hide this section" on (see withBlockMeta). Kept out of the live
        // page but preserved in the admin so it can be shown again later.
        if ((block as { hidden?: boolean | null }).hidden) return null;

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

          case "programHero":
            return (
              <ProgramHeroBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    tag?: string;
                    subtitle?: string;
                    note?: string;
                    image?: import("@/lib/types").Media;
                  }
                }
              />
            );

          case "programIntro":
            return (
              <ProgramIntroBlock
                key={key}
                block={block as Block & { eyebrow?: string; body?: string }}
              />
            );

          case "programWhatIs":
            return (
              <ProgramWhatIsBlock
                key={key}
                block={
                  block as Block & {
                    title?: string;
                    highlightedWords?: string;
                    body?: string;
                  }
                }
              />
            );

          case "programPhotoBreak":
            return (
              <ProgramPhotoBreakBlock
                key={key}
                block={block as Block & { image?: import("@/lib/types").Media }}
              />
            );

          case "programPictureYourself":
            return (
              <ProgramPictureYourselfBlock
                key={key}
                block={
                  block as Block & {
                    eyebrow?: string;
                    body?: string;
                    circleHeading?: string;
                    circleBody?: string;
                    photo?: import("@/lib/types").Media;
                  }
                }
              />
            );

          case "programWhyParticipate":
            return (
              <ProgramWhyParticipateBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    highlightedWords?: string;
                    body?: string;
                    benefits?: Array<{
                      image?: import("@/lib/types").Media;
                      title: string;
                      description?: string;
                    }>;
                  }
                }
              />
            );

          case "programJobs":
            return (
              <ProgramJobsBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    highlightedWords?: string;
                    body?: string;
                    items?: Array<{
                      image?: import("@/lib/types").Media;
                      title: string;
                    }>;
                  }
                }
              />
            );

          case "programDestinations":
            return (
              <ProgramDestinationsBlock
                key={key}
                block={
                  block as Block & {
                    leadText?: string;
                    heading?: string;
                    highlightedWords?: string;
                    items?: Array<{
                      image?: import("@/lib/types").Media;
                      area: string;
                      country?: string;
                    }>;
                  }
                }
              />
            );

          case "programRequirements":
            return (
              <ProgramRequirementsBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    highlightedWords?: string;
                    items?: Array<{
                      iconKey:
                        | "passport"
                        | "college"
                        | "language"
                        | "age"
                        | "diploma";
                      title: string;
                      description?: string;
                    }>;
                  }
                }
              />
            );

          case "programBenefitsShowcase":
            return (
              <ProgramBenefitsShowcaseBlock
                key={key}
                block={
                  block as Block & {
                    title?: string;
                    highlightedWords?: string;
                    items?: Array<{ id?: string; text: string }>;
                  }
                }
              />
            );

          case "programWhyChoose":
            return (
              <ProgramWhyChooseBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    highlightedWords?: string;
                    features?: Array<{
                      id?: string;
                      iconKey: "star" | "bag" | "hand" | "people" | "face" | "check";
                      title: string;
                      description?: string;
                      image?: import("@/lib/types").Media;
                    }>;
                  }
                }
              />
            );

          case "programApply":
            return (
              <ProgramApplyBlock
                key={key}
                block={
                  block as Block & {
                    heading?: string;
                    highlightedWords?: string;
                    photoTopLeft?: import("@/lib/types").Media;
                    photoTopRight?: import("@/lib/types").Media;
                    photoBottomLeft?: import("@/lib/types").Media;
                    photoBottomRight?: import("@/lib/types").Media;
                  }
                }
                applyForm={applyForm}
              />
            );

          case "programShare":
            return (
              <ProgramShareBlock
                key={key}
                block={block as Block & { heading?: string }}
                shareUrl={shareUrl}
              />
            );

          case "dynamicSlider":
            return (
              <DynamicSliderBlock
                key={key}
                block={block as DynamicSliderBlockData}
              />
            );

          case "formBlock":
            return (
              <FormBlock key={key} block={block as FormBlockData} />
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
