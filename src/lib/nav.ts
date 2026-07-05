/**
 * Shared nav-item resolution. Used by Header (desktop + mobile) and Footer.
 *
 * Translates a CMS HeaderNavItem (page relationship or external URL) into a
 * plain { label, href } pair the UI can render directly. Falls back to a
 * hardcoded set of links when the CMS Header global is empty (e.g. fresh
 * deploy before the seed has run).
 */

import { Routes } from "@/constants/routes";
import type {
  HeaderGlobal,
  HeaderNavItem,
  Locale,
  PageRef,
} from "@/lib/types";

export interface ResolvedNavItem {
  key: string;
  label: string;
  href: string;
  openInNewTab: boolean;
}

const FALLBACK_NAV: Array<{ en: string; ar: string; href: string }> = [
  { en: "Home", ar: "الرئيسية", href: Routes.home },
  { en: "Blogs", ar: "المدونة", href: Routes.blogs },
  { en: "About us", ar: "من نحن", href: Routes.about },
  { en: "Gallery", ar: "المعرض", href: Routes.gallery },
  { en: "Programs", ar: "البرامج", href: Routes.programs },
  { en: "Contact", ar: "تواصل", href: Routes.contact },
];

export function navItemHref(item: HeaderNavItem): string {
  if (item.type === "external") {
    return item.externalURL ?? "#";
  }
  const page = item.page;
  if (page && typeof page === "object") {
    const p = page as PageRef;
    if (p.fullPath) return p.fullPath.startsWith("/") ? p.fullPath : `/${p.fullPath}`;
    if (p.slug) return `/${p.slug}`;
  }
  return "#";
}

export function resolveNav(
  header: HeaderGlobal | null,
  locale: Locale,
): ResolvedNavItem[] {
  if (header?.navigation?.length) {
    return header.navigation.map((item, i) => ({
      key: item.id ?? `nav-${i}`,
      label: item.label,
      // Locale-agnostic href — the locale-aware <Link> (@/i18n/navigation)
      // adds the `/ar` prefix at render time.
      href: navItemHref(item),
      openInNewTab: Boolean(item.openInNewTab),
    }));
  }
  return FALLBACK_NAV.map((item, i) => ({
    key: `fallback-${i}`,
    label: locale === "ar" ? item.ar : item.en,
    href: item.href,
    openInNewTab: false,
  }));
}
