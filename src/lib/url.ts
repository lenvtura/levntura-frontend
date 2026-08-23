import type { Locale, Media } from './types'

export const DEFAULT_SITE_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://www.levntura.com'
    : 'http://localhost:3000'

/**
 * Percent-encoded non-ASCII slugs (e.g. Arabic) can reach the data layer from
 * the router still encoded — e.g. `/ar/blogs/تجربة` arrives as
 * `%D8%AA%D8%AC…`, which never matches the stored (decoded) slug and 404s.
 * Decode before any slug/fullPath DB lookup. No-op for plain ASCII slugs;
 * malformed input falls back to the raw value.
 */
export function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

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
 * Stable origin for Vercel Preview deploys.
 * Prefer VERCEL_BRANCH_URL (git-…vercel.app) — that is the URL people open.
 * VERCEL_URL is a per-deployment host; using it as serverURL while browsing
 * the branch alias makes clientUploads hit a different origin → CORS errors
 * on `/storage-s3-generate-signed-url`.
 */
export function getPreviewOrigin(): string | null {
  if (process.env.VERCEL_ENV !== 'preview') return null

  const host = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
  if (!host) return null

  return parseSiteOrigin(host.startsWith('http') ? host : `https://${host}`)
}

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

/**
 * Media from Spaces is already an absolute CDN URL — return as-is.
 * Relative `/api/media/...` paths stay relative (local-disk dev only).
 * Never pass `http://localhost:...` into Next Image in production.
 */
export function resolveCmsUrl(path: string | undefined | null): string | undefined {
  if (!path) return undefined
  if (path.startsWith('/')) return path

  if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path)
      if (isLocalOrigin(url.origin)) return `${url.pathname}${url.search}`
      return path
    } catch {
      return path
    }
  }

  return `/${path.replace(/^\/+/, '')}`
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

export function localeCanonical(
  siteUrl: string,
  locale: Locale,
  path: string,
): string {
  const base = siteUrl.replace(/\/+$/, '')
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === 'ar') {
    return clean === '/' ? `${base}/ar` : `${base}/ar${clean}`
  }
  return `${base}${clean}`
}
