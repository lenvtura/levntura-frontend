import { cn } from "@/design-system/helpers";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import { Link } from "@/i18n/navigation";
import type { ContentBlock as ContentBlockData } from "@/lib/types";

import { RichTextContent } from "./rich-text";

interface ContentBlockProps {
  block: ContentBlockData;
}

const SIZE_TO_GRID_SPAN: Record<NonNullable<ContentBlockData["columns"]>[number]["size"] & string, string> = {
  oneThird: "lg:col-span-4",
  half: "lg:col-span-6",
  twoThirds: "lg:col-span-8",
  full: "lg:col-span-12",
};

export function ContentBlock({ block }: ContentBlockProps) {
  const columns = block.columns ?? [];
  const hasHeader = Boolean(block.heading || block.subheading);

  if (columns.length === 0 && !hasHeader) return null;

  return (
    <section className="py-12 lg:py-24">
      <div className="container overflow-hidden">
        {block.heading && (
          <FadeUpAnimator transition={{ delay: 0.1 }}>
            <h3 className="typography-EB74 text-lev-blue-dark uppercase max-sm:typography-EB48 mb-6">
              {block.heading}
            </h3>
          </FadeUpAnimator>
        )}

        {block.subheading && (
          <FadeUpAnimator transition={{ delay: 0.15 }}>
            <p className="typography-R18 text-lev-black/80 max-w-3xl mb-10 lg:mb-14">
              {block.subheading}
            </p>
          </FadeUpAnimator>
        )}

        {columns.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {columns.map((col, idx) => {
              const size = col.size ?? "full";
              return (
                <FadeUpAnimator
                  key={col.id ?? `col-${idx}`}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className={cn("col-span-1", SIZE_TO_GRID_SPAN[size])}
                >
                  <RichTextContent content={col.content} />

                  {col.enableLink && col.link?.label && col.link?.url && (
                    <ContentLink label={col.link.label} url={col.link.url} />
                  )}
                </FadeUpAnimator>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function ContentLink({ label, url }: { label: string; url: string }) {
  const isExternal = /^https?:\/\//.test(url);
  const className =
    "inline-block mt-2 typography-S14 text-lev-red hover:text-lev-red/80 underline underline-offset-4";

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label} →
      </a>
    );
  }
  return (
    <Link href={url} className={className}>
      {label} →
    </Link>
  );
}
