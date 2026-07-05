import Link from "next/link";
import Image from "next/image";
import type { BlogPost, Locale } from "@/lib/types";
import { mediaUrl, mediaAlt } from "@/lib/url";

interface RelatedPostsProps {
  posts: BlogPost[] | (string | number)[] | undefined;
  locale: Locale;
  heading?: string;
}

export function RelatedPosts({ posts, locale, heading }: RelatedPostsProps) {
  // Payload returns bare IDs when query depth is too shallow — keep only populated docs.
  const populated = (posts ?? []).filter(
    (p): p is BlogPost => typeof p === "object" && p !== null && "slug" in p,
  );

  if (populated.length === 0) return null;

  const pathPrefix = locale === "ar" ? "/ar" : "";
  const title = heading ?? (locale === "ar" ? "اقرأ المزيد" : "More to read");

  return (
    <section className="mt-16 lg:mt-24 pt-12 border-t border-black/10">
      <div className="container-md">
        <h2 className="typography-EB32 lg:typography-EB48 text-lev-green-dark mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {populated.slice(0, 3).map((post) => (
            <RelatedPostCard key={post.id} post={post} pathPrefix={pathPrefix} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedPostCard({
  post,
  pathPrefix,
}: {
  post: BlogPost;
  pathPrefix: string;
}) {
  const imageURL = mediaUrl(post.featuredImage, "card") ?? mediaUrl(post.featuredImage);

  return (
    <Link
      href={`${pathPrefix}/blogs/${post.slug}`}
      className="group flex flex-col gap-4 hover:opacity-90 transition-opacity"
    >
      {imageURL && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={imageURL}
            alt={mediaAlt(post.featuredImage, post.title)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div>
        {post.category?.name && (
          <span className="typography-S12 uppercase text-lev-green block mb-2">
            {post.category.name}
          </span>
        )}
        <h3 className="typography-S20 lg:typography-S24 uppercase text-lev-black mb-2 line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="typography-R14 text-lev-black/70 line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
