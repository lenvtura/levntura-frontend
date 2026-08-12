"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Search } from "lucide-react";

import type { Block } from "@/lib/types";
import { cn } from "@/design-system/helpers";
import { RichTextBlock, lexicalToText } from "./rich-text";

interface FAQItem {
  question: string;
  answer: unknown;
  id?: string;
}

interface FAQBlockProps {
  block: Block & {
    heading?: string;
    subheading?: string;
    items?: FAQItem[];
    enableSearch?: boolean;
    pageSize?: number;
  };
}

export function FAQBlock({ block }: FAQBlockProps) {
  const t = useTranslations("common");
  const items = block.items ?? [];
  const enableSearch = block.enableSearch !== false;
  const pageSize = block.pageSize && block.pageSize > 0 ? block.pageSize : 8;

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | number | null>(null);

  // Search matches the question AND the answer text, in whatever language the
  // page is in (the block data is already localized).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.question?.toLowerCase().includes(q) ||
        lexicalToText(it.answer).toLowerCase().includes(q),
    );
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  if (items.length === 0) return null;

  const goToPage = (p: number) => {
    setPage(p);
    setOpenId(null);
  };

  return (
    <section className="my-16 lg:my-24">
      <div className="container-md">
        {/* Header: search (left) + title (right) */}
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-2 lg:items-start">
          <div>
            {block.subheading && (
              <p className="typography-R16 mb-6 text-lev-blue-dark">
                {block.subheading}
              </p>
            )}
            {enableSearch && (
              <div className="relative max-w-sm">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder={t("search")}
                  className="w-full border border-lev-blue-dark bg-transparent px-4 py-3 pe-10 text-lev-blue-dark outline-none placeholder:text-lev-blue-dark/50 focus:ring-1 focus:ring-lev-blue-dark"
                />
                <Search className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-lev-blue-dark" />
              </div>
            )}
          </div>

          {block.heading && (
            <h2 className="typography-EB48 lg:typography-EB74 uppercase leading-[1.05] text-lev-blue-dark lg:text-right">
              {block.heading}
            </h2>
          )}
        </div>

        {/* Accordion list */}
        <div className="border-t border-lev-blue-dark/15">
          {pageItems.length === 0 ? (
            <p className="typography-R16 py-8 text-lev-gray">
              {t("noResults")}
            </p>
          ) : (
            pageItems.map((item, i) => {
              const id = item.id ?? `${start + i}`;
              const open = openId === id;
              return (
                <div key={id} className="border-b border-lev-blue-dark/15">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : id)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-start"
                    aria-expanded={open}
                  >
                    <span className="typography-M24 text-lev-blue-dark">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-6 w-6 shrink-0 text-lev-blue-dark transition-transform duration-200",
                        open ? "rotate-0" : "-rotate-90",
                      )}
                    />
                  </button>

                  {open && (
                    <div className="-mt-2 max-w-3xl pb-6 text-lev-gray">
                      <RichTextBlock
                        block={{ blockType: "richText", content: item.answer }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center gap-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => goToPage(p)}
                className={cn(
                  "typography-M18 transition-colors",
                  p === currentPage
                    ? "text-lev-blue"
                    : "text-lev-blue-dark hover:text-lev-blue",
                )}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                className="typography-M18 text-lev-blue"
                aria-label="Next page"
              >
                →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
