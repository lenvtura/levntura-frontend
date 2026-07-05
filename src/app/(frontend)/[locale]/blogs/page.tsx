import { Suspense } from "react";
import { getBlogCategories, getBlogPosts } from "@/lib/api";
import type { BlogPost as CmsBlogPost } from "@/lib/types";
import { mediaUrl } from "@/lib/url";
import { resolveLocale } from "@/lib/server-request";
import { BlogsClient } from "./blogs-client";
import type { BlogPost as UiBlogPost } from "./blog-utils";

/**
 * Map a CMS BlogPost to the existing UI BlogPost shape so the hardcoded
 * cards keep working with no changes to their props.
 */
function toUiBlog(cms: CmsBlogPost): UiBlogPost {
  const readingMinutes = cms.readingTime ?? 5;
  const dateLabel = cms.publishedAt
    ? new Date(cms.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).toUpperCase()
    : "";

  return {
    id: String(cms.id),
    title: cms.title,
    category: cms.category?.name?.toUpperCase() ?? "ARTICLE",
    readTime: `${readingMinutes}MIN READ`,
    description: cms.excerpt,
    date: dateLabel,
    image: mediaUrl(cms.featuredImage, "card") ?? mediaUrl(cms.featuredImage) ?? "",
    categories: ["All", ...(cms.category?.name ? [cms.category.name] : [])],
    href: `/blogs/${cms.slug}`,
    featured: cms.isFeatured ?? false,
  };
}

interface BlogsPageProps {
  searchParams: Promise<{ draft?: string; preview?: string }>;
}

export default function BlogsPage({ searchParams }: BlogsPageProps) {
  // Wrap the async data-fetching in <Suspense> so Next 16 can stream it
  // without blocking the route shell.
  return (
    <Suspense fallback={null}>
      <BlogsPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function BlogsPageContent({ searchParams }: BlogsPageProps) {
  const { draft: draftParam, preview: previewParam } = await searchParams;
  // Preview mode implies draft so editors see unpublished content in the iframe.
  const draft = draftParam === "true" || previewParam === "true";
  const locale = await resolveLocale();

  let posts: UiBlogPost[] = [];
  let filterOptions: string[] = [];

  try {
    const [postsRes, categories] = await Promise.all([
      getBlogPosts(locale, { limit: 50, draft }),
      getBlogCategories(locale, { draft }).catch(() => []),
    ]);

    posts = postsRes.docs.map(toUiBlog);
    filterOptions = ["All", ...categories.map((c) => c.name)];
  } catch (err) {
    console.error("[blogs] failed to fetch from CMS:", err);
  }

  // Ensure exactly one featured post (CMS may flag many or none).
  const hasFeatured = posts.some((p) => p.featured);
  if (!hasFeatured && posts.length > 0) {
    posts = posts.map((p, i) => ({ ...p, featured: i === 0 }));
  }

  return <BlogsClient posts={posts} filterOptions={filterOptions} locale={locale} />;
}
