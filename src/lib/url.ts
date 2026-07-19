import type { Locale, Media } from './types'

export const DEFAULT_SITE_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://www.levntura.com'
    : 'http://localhost:3000'

export function isLocalOrigin(origin: string): boolean {
  try {
    const host = new URL(origin).hostname
    return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
  } catch {
    return false
  }
}

/**
 * Parse a site origin from an env value. Accepts full URLs or bare domains
 * (https:// is assumed). Invalid values fall back to DEFAULT_SITE_ORIGIN.
 */
export function parseSiteOrigin(
  value?: string | null,
  fallback = DEFAULT_SITE_ORIGIN,
): string {
  const raw = (value ?? process.env.NEXT_PUBLIC_SITE_URL ?? fallback)
    .split(',')[0]
    ?.trim()

  if (!raw) return fallback

  const candidate = /^https?:\/\//i.test(raw)
    ? raw
    : `https://${raw.replace(/^\/+/, '')}`

  try {
    return new URL(candidate).origin
  } catch {
    return fallback
  }
}

export function parseSiteOrigins(
  value?: string | null,
  fallback = DEFAULT_SITE_ORIGIN,
): string[] {
  const raw = value ?? process.env.NEXT_PUBLIC_SITE_URL ?? fallback
  const origins = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      try {
        const candidate = /^https?:\/\//i.test(entry)
          ? entry
          : `https://${entry.replace(/^\/+/, '')}`
        return new URL(candidate).origin
      } catch {
        return null
      }
    })
    .filter((origin): origin is string => Boolean(origin))

  return origins.length > 0 ? [...new Set(origins)] : [parseSiteOrigin(fallback)]
}

/** Origins Vercel injects at build/runtime (preview + production). */
export function getVercelOrigins(): string[] {
  return [
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) =>
      parseSiteOrigin(value.startsWith('http') ? value : `https://${value}`),
    )
}

/**
 * Primary public site origin for SEO, metadata, Payload serverURL, and
 * canonical URLs.
 *
 * On Vercel, a leftover `NEXT_PUBLIC_SITE_URL=http://localhost:3000` makes
 * the Payload admin blank (CSRF/cookies fail). Prefer the deployment URL.
 */
export function getSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
    ? parseSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL)
    : null

  if (configured && !(process.env.VERCEL && isLocalOrigin(configured))) {
    return configured
  }

  const vercelOrigin = getVercelOrigins()[0]
  if (vercelOrigin) return vercelOrigin

  return configured || DEFAULT_SITE_ORIGIN
}

// Single-origin now (frontend + Payload merged into one app). Media URLs
// from Payload are already absolute (built from PAYLOAD_PUBLIC_SERVER_URL);
// this base only prefixes the rare relative path. No separate CMS URL.
const SERVER_URL = (
  process.env.PAYLOAD_PUBLIC_SERVER_URL
    ? parseSiteOrigin(process.env.PAYLOAD_PUBLIC_SERVER_URL)
    : getSiteOrigin()
).replace(/\/+$/, '')

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
