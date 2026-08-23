const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''
const DEFAULT_LOCALE = 'en'

/**
 * Shared Live Preview breakpoint presets — used by every collection
 * that renders a live preview (Pages, Blog, Programs).
 *
 * Why we override Payload's defaults:
 *   - The framework's built-in "Responsive" mode lands at ~747×685 which
 *     looks cramped, especially when the editor is on a laptop where the
 *     admin already takes ~half the screen.
 *   - Listing real device widths gives the editor a one-click way to
 *     simulate mobile/tablet/laptop layouts without typing dimensions.
 *
 * The FIRST entry in the array is what Payload selects on first load,
 * so we order from "biggest" to "smallest" — editor lands on Laptop
 * by default, switches down only when they need to check responsive.
 */
export const LIVE_PREVIEW_BREAKPOINTS = [
  { name: 'laptop', label: 'Laptop', width: 1366, height: 768 },
  { name: 'desktop', label: 'Desktop', width: 1920, height: 1080 },
  { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
  { name: 'mobile', label: 'Mobile', width: 375, height: 667 },
] as const

type LivePreviewArgs = {
  data: Record<string, unknown>
  locale?: { code?: string } | null
}

type Options = {
  prefix?: string
  resolveSlug?: (slug: string) => string
}

export const livePreviewURL = ({ prefix = '', resolveSlug }: Options = {}) => {
  return ({ data, locale }: LivePreviewArgs) => {
    // The frontend serves every locale on the same routes — pass the locale
    // as a query param so the page fetches the right translation from the CMS.
    const localeQuery =
      locale?.code && locale.code !== DEFAULT_LOCALE ? `&locale=${locale.code}` : ''

    // Append preview=true so the frontend page reads drafts. Since the app
    // is now a single stack, the page fetches the draft directly via the
    // Payload Local API — no separate preview endpoint or shared secret.
    const queryString = `?preview=true${localeQuery}`

    const fullPath = typeof data?.fullPath === 'string' ? data.fullPath : ''
    if (fullPath) {
      const path = fullPath === '/' ? '' : fullPath
      return `${SITE_URL}${path}${queryString}`
    }

    const rawSlug = typeof data?.slug === 'string' ? data.slug : ''
    const path = resolveSlug ? resolveSlug(rawSlug) : rawSlug ? `/${rawSlug}` : ''
    return `${SITE_URL}${prefix}${path}${queryString}`
  }
}
