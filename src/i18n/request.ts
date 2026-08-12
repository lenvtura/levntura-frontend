/**
 * next-intl request config — runs once per request to pick the active
 * locale and load its message namespaces.
 *
 * Locale source: the `[locale]` URL segment, surfaced by next-intl's
 * middleware (see `src/proxy.ts`) as `requestLocale`. This is the standard
 * next-intl routing flow adopted in Phase 3; the old `x-locale` header set
 * by the proxy rewrite is gone.
 *
 * Messages are loaded as namespaces (one JSON file per feature area) so
 * each `useTranslations('blogs')` call only pulls what it needs and
 * editors can hand off translation files independently.
 */

import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'

import type { Locale } from '@/lib/types'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` resolves to the `[locale]` segment of the matched route.
  // Fall back to the default locale for un-prefixed / unknown paths.
  const requested = await requestLocale
  const locale: Locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  // Load every namespace for this locale upfront. Each namespace is a
  // ~1 KB JSON, so eager loading is cheaper than dynamic imports per
  // useTranslations() call.
  const messages = {
    common: (await import(`../messages/${locale}/common.json`)).default,
    blogs: (await import(`../messages/${locale}/blogs.json`)).default,
    programs: (await import(`../messages/${locale}/programs.json`)).default,
    internship: (await import(`../messages/${locale}/internship.json`)).default,
  }

  return {
    locale,
    messages,
  }
})
