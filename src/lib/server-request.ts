import { getLocale } from 'next-intl/server'

import type { Locale } from './types'

// Single source of truth for the active locale in Server Components: the
// `[locale]` URL segment, resolved by next-intl from the route (see
// `src/i18n/routing.ts`). Kept as a thin wrapper so callers don't import
// next-intl directly and the resolution strategy stays swappable.
export async function resolveLocale(): Promise<Locale> {
  return (await getLocale()) as Locale
}

export interface PreviewParams {
  draft: boolean
  preview: boolean
  /** True if either draft or preview flag is set — use for editor gating. */
  isPreview: boolean
}

export async function resolvePreview(
  searchParams: Promise<{ draft?: string; preview?: string }>,
): Promise<PreviewParams> {
  const { draft, preview } = await searchParams
  const isDraft = draft === 'true'
  const isPreview = preview === 'true'
  return { draft: isDraft, preview: isPreview, isPreview: isDraft || isPreview }
}
