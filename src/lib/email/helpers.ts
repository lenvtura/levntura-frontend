import type { Payload } from 'payload'

const CMS_URL = (
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  ''
)
  .split(',')[0]
  .trim()
  .replace(/\/$/, '')
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || '')
  .split(',')[0]
  .trim()
  .replace(/\/$/, '')

export type SiteContext = {
  siteName: string
  logoURL: string | null
  dashboardURL: string
  websiteURL: string
  brand: {
    primary: string
    accent: string
    text: string
    bg: string
  }
}

type MediaRef = { url?: string } | string | null | undefined

const resolveMediaURL = (media: MediaRef): string | null => {
  if (!media || typeof media !== 'object') return null
  const url = typeof media.url === 'string' ? media.url : null
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${CMS_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

const resolveSiteName = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const v = value as Record<string, string | undefined>
    return v.en || v.ar || 'Levntura'
  }
  return 'Levntura'
}

export const getSiteContext = async (payload: Payload): Promise<SiteContext> => {
  let settings: Record<string, unknown> | null = null

  try {
    settings = (await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })) as unknown as Record<string, unknown>
  } catch {
    settings = null
  }

  const logoLight = (settings?.logoLight as MediaRef) ?? null
  const logo = (settings?.logo as MediaRef) ?? null
  const logoURL = resolveMediaURL(logoLight) || resolveMediaURL(logo)

  return {
    siteName: resolveSiteName(settings?.siteName),
    logoURL,
    dashboardURL: `${CMS_URL}/admin`,
    websiteURL: SITE_URL,
    brand: {
      primary: '#1a365d',
      accent: '#ed8936',
      text: '#1a202c',
      bg: '#f5f5f5',
    },
  }
}
