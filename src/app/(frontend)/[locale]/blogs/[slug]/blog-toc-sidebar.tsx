/**
 * Blog detail table-of-contents sidebar.
 *
 * Port of the legacy `BlogSidebar` from the static frontend, adapted for the
 * CMS-driven single-richtext layout:
 *   - Sections come from `extractHeadingsFromLexical(post.sections[0].content)`
 *     and are passed in as plain serialisable data.
 *   - Active section follows the viewport via IntersectionObserver, with a
 *     scrollspy fallback in case the observer misfires on rapid scroll.
 *   - Click smooth-scrolls to the section, accounting for the sticky header.
 */

"use client";

import { useEffect, useState } from "react";

import { cn } from "@/design-system/helpers";
import type { RichTextHeading } from "@/components/blocks/rich-text";

interface BlogTocSidebarProps {
  sections: RichTextHeading[];
}

export function BlogTocSidebar({ sections }: BlogTocSidebarProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        root: null,
        rootMargin: "-100px 0px -50% 0px",
        threshold: [0, 0.1, 0.5],
      },
    );

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    // Scrollspy fallback — handles fast scrolls the observer can miss.
    const onScroll = () => {
      const scroll = window.scrollY + 150;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scroll >= top && scroll < bottom) {
          setActiveId(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (sections.length === 0) return null;

  return (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => handleClick(section.id)}
          className={cn(
            "block text-left w-full px-3 py-2 text-sm transition-colors",
            section.level === 3 && "pl-6",
            activeId === section.id
              ? "text-lev-black font-semibold"
              : "text-lev-gray hover:text-lev-black",
          )}
        >
          {section.text}
        </button>
      ))}
    </nav>
  );
}
