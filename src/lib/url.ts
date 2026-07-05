import type { Locale, Media } from './types'

// Single-origin now (frontend + Payload merged into one app). Media URLs
// from Payload are already absolute (built from PAYLOAD_PUBLIC_SERVER_URL);
// this base only prefixes the rare relative path. No separate CMS URL.
const SERVER_URL = (
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'
)
  .split(',')[0]
  .trim()
  .replace(/\/+$/, '')

// Normalises localhost → 127.0.0.1 to dodge Next 16 IPv6 image-fetch issues.
export function resolveCmsUrl(path: string | undefined | null): string | undefined {
  if (!path) return undefined
  const normalized = path.replace(/^http:\/\/localhost(:\d+)?/i, 'http://127.0.0.1$1')
  if (/^https?:\/\//i.test(normalized)) return normalized
  return `${SERVER_URL}${normalized.startsWith('/') ? '' : '/'}${normalized}`
}

export function mediaUrl(
  media: Media | undefined | null,
  size?: 'thumbnail' | 'card' | 'feature' | 'og',
): string | undefined {
  if (!media) return undefined
  const sized = size && media.sizes?.[size]?.url
  return resolveCmsUrl(sized || media.url)
}

export function mediaAlt(media: Media | undefined | null, fallback = ''): string {
  return media?.alt || fallback
}

/**
 * Build a locale-aware absolute canonical URL. Matches the 'as-needed'
 * routing: English stays at the root, Arabic gets the `/ar` prefix — so each
 * locale page is its own canonical instead of pointing at the English URL
 * (which would tell Google the Arabic page is a duplicate of the English one).
 */
export function localeCanonical(
  siteUrl: string,
  locale: Locale,
  path: string,
): string {
  const base = siteUrl.replace(/\/+$/, '')
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === 'ar') {
    // Arabic home is `/ar` (no trailing slash); otherwise `/ar` + path.
    return clean === '/' ? `${base}/ar` : `${base}/ar${clean}`
  }
  return `${base}${clean}`
}
