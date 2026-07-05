import Image, { type StaticImageData } from "next/image";

import { Link } from "@/i18n/navigation";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/design-system/button";
import { cn } from "@/design-system/helpers";
import { getBlogPosts } from "@/lib/api";
import { resolveLocale } from "@/lib/server-request";
import { mediaUrl, mediaAlt } from "@/lib/url";
import type {
  BlogPost,
  BlogPostsListBlock as BlogPostsListBlockData,
} from "@/lib/types";

import k1 from "@/assets/photos/home/k-1.png";
import k2 from "@/assets/photos/home/k2.png";
import k3 from "@/assets/photos/home/k3.png";

const FALLBACK_POSTS: Array<{ src: StaticImageData; title: string; slug: string }> = [
  { src: k1, title: "The Power of Cultural Immersion", slug: "" },
  { src: k2, title: "Transformative Travel Experiences", slug: "" },
  { src: k3, title: "Unveiling Cultural Exchange", slug: "" },
];

const BG_CLASS: Record<
  NonNullable<BlogPostsListBlockData["backgroundColor"]>,
  string
> = {
  "lev-yellow-light": "bg-lev-yellow-light",
  "lev-yellow": "bg-lev-yellow",
  "lev-blue-light": "bg-lev-blue-light",
  "lev-green-light": "bg-lev-green-light",
  "lev-pink": "bg-lev-pink",
  white: "bg-white",
};

interface BlogPostsListBlockProps {
  block: BlogPostsListBlockData;
}

interface RenderPost {
  key: string;
  src: string | StaticImageData;
  alt: string;
  title: string;
  href: string;
}

export async function BlogPostsListBlock({ block }: BlogPostsListBlockProps) {
  if (!block.heading) return null;

  const bgClass = BG_CLASS[block.backgroundColor ?? "lev-yellow-light"];
  const cta = block.cta;

  const locale = await resolveLocale();

  let posts: RenderPost[] = [];
  try {
    if (block.displayMode === "manual" && block.selectedPosts) {
      const selected = block.selectedPosts as BlogPost[];
      posts = selected
        .filter((p) => typeof p === "object" && p !== null && p.slug)
        .map((p) => ({
          key: String(p.id),
          src:
            mediaUrl(p.featuredImage, "card") ??
            mediaUrl(p.featuredImage) ??
            "",
          alt: mediaAlt(p.featuredImage, p.title),
          title: p.title,
          href: `/blogs/${p.slug}`,
        }))
        .filter((p) => p.src);
    } else {
      const limit = block.limit ?? 3;
      const { docs } = await getBlogPosts(locale, { limit });
      posts = docs
        .map((p) => ({
          key: String(p.id),
          src:
            mediaUrl(p.featuredImage, "card") ??
            mediaUrl(p.featuredImage) ??
            "",
          alt: mediaAlt(p.featuredImage, p.title),
          title: p.title,
          href: `/blogs/${p.slug}`,
        }))
        .filter((p) => p.src);
    }
  } catch {
    posts = [];
  }

  const finalPosts: RenderPost[] =
    posts.length > 0
      ? posts
      : FALLBACK_POSTS.map((p, i) => ({
          key: `fb-${i}`,
          src: p.src,
          alt: p.title,
          title: p.title,
          href: `/blogs`,
        }));

  return (
    <SectionWrapper
      sectionColor={bgClass}
      className="flex flex-col gap-12"
    >
      <article className="grid lg:grid-cols-[2fr_1fr]">
        <FadeUpAnimator transition={{ delay: 0.1 }}>
          <h2 className="hidden lg:block typography-EB74 leading-16 text-lev-blue-dark">
            {block.heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </FadeUpAnimator>
        <div className="flex flex-col gap-8">
          {block.eyebrow && (
            <FadeUpAnimator transition={{ delay: 0.1 }}>
              <h4 className="text-lev-orange typography-S20">{block.eyebrow}</h4>
            </FadeUpAnimator>
          )}

          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h2 className="lg:hidden typography-EB48 md:typography-EB74">
              {block.heading.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeUpAnimator>

          {block.description && (
            <FadeUpAnimator transition={{ delay: 0.2 }}>
              <p className="typography-R16 leading-6 sm:w-3/4">
                {block.description}
              </p>
            </FadeUpAnimator>
          )}
        </div>
      </article>

      <article className="grid sm:grid-cols-3 sm:mt-32 gap-8">
        {finalPosts.map((p, i) => (
          <FadeUpAnimator
            key={p.key}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={cn(
              "space-y-6",
              (i === 0 || i === 2) && "sm:-translate-y-[100px]",
            )}
          >
            <Link href={p.href} className="block group">
              {typeof p.src === "string" ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={400}
                  height={500}
                  className="hover:scale-105 w-full transition-transform duration-300"
                />
              ) : (
                <Image
                  src={p.src}
                  alt={p.alt}
                  className="hover:scale-105 w-full transition-transform duration-300"
                />
              )}
              <h2 className="typography-M24 lg:typography-M34 mt-6">
                {p.title}
              </h2>
            </Link>
          </FadeUpAnimator>
        ))}
      </article>

      {cta?.label && cta?.url && (
        <Button asChild className="self-center">
          <Link href={cta.url}>{cta.label}</Link>
        </Button>
      )}
    </SectionWrapper>
  );
}
