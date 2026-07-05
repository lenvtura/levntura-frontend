/**
 * next-intl routing configuration — the single source of truth for which
 * locales exist, the default, and how the locale appears in the URL.
 *
 * `localePrefix: 'as-needed'` keeps English at the root (`/blogs`) and only
 * Arabic gets a prefix (`/ar/blogs`). This mirrors the behaviour the old
 * `proxy.ts` rewrite produced, so existing URLs and SEO paths stay stable.
 *
 * Consumed by:
 *  - `src/i18n/navigation.ts`  (locale-aware Link / router helpers)
 *  - `src/i18n/request.ts`     (per-request locale + messages)
 *  - the middleware            (locale negotiation, Phase 3d)
 */

import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  // English lives at the root; only `/ar/*` carries a prefix.
  localePrefix: 'as-needed',
  // Keep English at `/` for everyone. Without this, next-intl would sniff
  // the Accept-Language header and auto-redirect `/` → `/ar`, which is a
  // behaviour change from the old proxy (English-at-root, opt-in Arabic).
  localeDetection: false,
})
