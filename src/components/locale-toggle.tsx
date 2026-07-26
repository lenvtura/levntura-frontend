"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { cn } from "@/design-system/helpers";

type LocaleOption = {
  code: "en" | "ar";
  label: string;
  flagSrc: string;
  flagAlt: string;
};

const LOCALES: LocaleOption[] = [
  {
    code: "en",
    label: "English",
    flagSrc: "https://flagcdn.com/w40/gb.png",
    flagAlt: "English",
  },
  {
    code: "ar",
    label: "العربية",
    flagSrc: "https://flagcdn.com/w40/sa.png",
    flagAlt: "Arabic",
  },
];

// Approximate dropdown height — only used as a viewport-overflow heuristic.
// Slightly off is fine; the dropdown reflows its own size when painted.
const DROPDOWN_HEIGHT_GUESS = 100;
const DROPDOWN_WIDTH = 160;

/**
 * Dropdown language switcher.
 *
 * The dropdown panel is rendered via React portal to document.body so it
 * escapes any parent stacking context and stays above the fixed header.
 * Position is computed from the trigger button's viewport rect, and we flip
 * to "open upward" when the trigger is near the bottom of the viewport
 * (e.g. inside the footer).
 *
 * Uses plain anchors so locale changes trigger a full page reload — that
 * guarantees fresh translated CMS data and the correct <html dir>.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const current = LOCALES.find((l) => l.code === (isArabic ? "ar" : "en"))!;

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<CSSProperties | null>(null);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute fixed-position coordinates from the trigger's viewport rect.
  useLayoutEffect(() => {
    if (!open || !btnRef.current) {
      setPos(null);
      return;
    }
    const r = btnRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const offset = 4;
    const openUpward =
      r.bottom + DROPDOWN_HEIGHT_GUESS + offset > viewportHeight;

    setPos({
      position: "fixed",
      top: openUpward
        ? Math.max(8, r.top - DROPDOWN_HEIGHT_GUESS - offset)
        : r.bottom + offset,
      left: Math.max(8, r.right - DROPDOWN_WIDTH),
      width: DROPDOWN_WIDTH,
      zIndex: 1_000_000,
      isolation: "isolate",
      mixBlendMode: "normal",
    });
  }, [open]);

  // Close on outside click or any scroll (don't try to follow the trigger).
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !popRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    const handleScroll = () => setOpen(false);
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  // Build the target href for a given locale, preserving the current path.
  const basePath = isArabic
    ? pathname === "/ar"
      ? "/"
      : pathname.slice(3)
    : pathname;

  const buildHref = (code: "en" | "ar") => {
    if (code === "ar") return basePath === "/" ? "/ar" : `/ar${basePath}`;
    return basePath;
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 typography-S14 text-lev-black px-2 py-1 rounded hover:opacity-80 transition-opacity",
          className,
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Current language: ${current.label}. Click to change.`}
      >
        <Image
          src={current.flagSrc}
          alt={current.flagAlt}
          width={24}
          height={16}
          className="rounded-[2px] shrink-0 object-cover"
          style={{ width: "24px", height: "16px" }}
          unoptimized
          priority
        />
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {mounted && open && pos
        ? createPortal(
            <div
              ref={popRef}
              role="listbox"
              className="bg-white shadow-xl rounded-md border border-black/10 overflow-hidden"
              style={pos}
            >
              {LOCALES.map((loc) => {
                const active = loc.code === current.code;
                const href = buildHref(loc.code);
                return (
                  <a
                    key={loc.code}
                    href={href}
                    role="option"
                    aria-selected={active}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 typography-S14 text-lev-black hover:bg-lev-gray-light transition-colors",
                      active && "bg-lev-gray-light/60 font-semibold",
                    )}
                  >
                    <Image
                      src={loc.flagSrc}
                      alt={loc.flagAlt}
                      width={24}
                      height={16}
                      className="rounded-[2px] shrink-0 object-cover"
                      style={{ width: "24px", height: "16px" }}
                      unoptimized
                    />
                    <span>{loc.label}</span>
                    {active && <span className="ml-auto text-lev-green">✓</span>}
                  </a>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
