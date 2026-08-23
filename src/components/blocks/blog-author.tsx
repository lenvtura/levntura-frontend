import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { mediaUrl } from "@/lib/url";
import type { BlogPost, Locale } from "@/lib/types";

interface BlogAuthorProps {
  post: BlogPost;
  locale: Locale;
}

const UI_STRINGS = {
  en: {
    minRead: "min read",
    by: "By",
  },
  ar: {
    minRead: "دقيقة قراءة",
    by: "بقلم",
  },
} as const;

export function BlogAuthor({ post, locale }: BlogAuthorProps) {
  const t = UI_STRINGS[locale];

  const authorName =
    post.authorOverride ?? post.author?.name ?? "Levntura Team";
  const avatarURL = mediaUrl(post.author?.avatar, "thumbnail") ?? mediaUrl(post.author?.avatar);

  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        locale === "ar" ? "ar-EG" : "en-US",
        { month: "long", day: "numeric", year: "numeric" },
      )
    : null;

  const readingTime = post.readingTime ?? null;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 typography-R14 text-lev-black/70">
      <div className="flex items-center gap-2">
        {avatarURL ? (
          <Image
            src={avatarURL}
            alt={authorName}
            width={32}
            height={32}
            className="rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-lev-green-dark text-white flex items-center justify-center text-xs font-semibold">
            {authorName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-lev-black font-medium">
          {t.by} {authorName}
        </span>
      </div>

      {dateLabel && (
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{dateLabel}</span>
        </div>
      )}

      {readingTime && (
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>
            {readingTime} {t.minRead}
          </span>
        </div>
      )}
    </div>
  );
}
