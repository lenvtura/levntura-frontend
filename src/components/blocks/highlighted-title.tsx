import type { ReactNode } from "react";

/** Render text keeping "\n" as <br>. */
function Breaks({ text, k }: { text: string; k: string }): ReactNode {
  return text.split("\n").map((line, i, arr) => (
    <span key={`${k}-${i}`}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

interface HighlightedTitleProps {
  title: string;
  /**
   * Exact consecutive words from the title to render in the accent color
   * (case-insensitive; a line break in the title counts as a space, so
   * "AMAZING EXPERIENCE" matches "AMAZING\nEXPERIENCE"). Empty → plain title.
   */
  highlight?: string;
  className?: string;
}

/**
 * Section title that keeps "\n" line breaks (like TitleWithBreaks) but colors
 * one run of words in the brand accent — the highlighted-words treatment the
 * program titles are meant to have. Shared across the program section blocks.
 */
export function HighlightedTitle({ title, highlight, className }: HighlightedTitleProps) {
  const h = highlight?.trim();

  // Normalise line breaks to spaces for matching (positions still line up 1:1
  // with the original, since "\n" → " " keeps the same length).
  const idx =
    h && h.length > 0
      ? title.replace(/\n/g, " ").toLowerCase().indexOf(h.replace(/\n/g, " ").toLowerCase())
      : -1;

  if (idx === -1 || !h) {
    return (
      <p className={className}>
        <Breaks text={title} k="t" />
      </p>
    );
  }

  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + h.length);
  const after = title.slice(idx + h.length);

  return (
    <p className={className}>
      <Breaks text={before} k="b" />
      <span className="text-lev-blue">
        <Breaks text={match} k="m" />
      </span>
      <Breaks text={after} k="a" />
    </p>
  );
}
