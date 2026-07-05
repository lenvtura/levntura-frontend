import { BlogHero } from "@/app/(frontend)/[locale]/blogs/[slug]/blog-hero";
import type { Block, BlogPost, Locale } from "@/lib/types";
import { mediaUrl, mediaAlt } from "@/lib/url";

interface HeroBlogPostBlockProps {
  block: Block & {
    variant?: string;
    eyebrow?: string;
    showAuthor?: boolean;
    showDate?: boolean;
    showReadingTime?: boolean;
  };
  post?: BlogPost;
  locale?: Locale;
}

export function HeroBlogPostBlock({ block: _block, post }: HeroBlogPostBlockProps) {
  if (!post) return null;

  const imageURL = mediaUrl(post.featuredImage, "feature") ?? mediaUrl(post.featuredImage);
  if (!imageURL) return null;

  return (
    <BlogHero
      title={post.title}
      image={imageURL}
      imageAlt={mediaAlt(post.featuredImage, post.title)}
    />
  );
}
