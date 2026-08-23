/**
 * Data layer for the Levntura site.
 *
 * After the frontend + backend were merged into one app, these functions
 * talk to Payload via the **Local API** (`getPayload`) instead of HTTP.
 * No network roundtrip, no `NEXT_PUBLIC_CMS_URL` — direct in-memory DB
 * access. All functions are server-only (used from server components).
 *
 * **Locale handling:** every fetcher accepts an optional `locale` arg.
 * Omit it and the helper resolves the active locale from next-intl's
 * `getLocale()` (driven by the `[locale]` URL segment). This keeps one
 * source of truth for locale and lets pages call `getX()` without threading
 * the value through every layer. Pass `locale` explicitly only when you need
 * to override the request locale (rare).
 *
 * `draft`/`preview` return unpublished content for the admin Live Preview
 * — the Local API bypasses access control by default, so no shared secret
 * / preview endpoint is needed.
 */

import { getPayload, type Where } from 'payload'
import { getLocale } from 'next-intl/server'
import config from '@payload-config'

import { decodeSlug } from './url'

import type {
  BlogCategory,
  BlogPost,
  FooterGlobal,
  HeaderGlobal,
  Job,
  Locale,
  Page,
  PaginatedResponse,
  Program,
  ProgramCountry,
  ProgramType,
  SiteSettingsGlobal,
} from './types'

async function payloadClient() {
  return getPayload({ config })
}

/**
 * Resolve the active locale from next-intl. Used by every fetcher when
 * `locale` is omitted by the caller.
 *
 * `getLocale()` reads the locale next-intl resolved for this request from
 * the `[locale]` URL segment. Falls back to `en` outside a request scope
 * (e.g. during `generateStaticParams`).
 */
async function resolveRequestLocale(): Promise<Locale> {
  try {
    return (await getLocale()) as Locale
  } catch {
    return 'en'
  }
}

export async function getBlogPosts(
  locale?: Locale,
  options: {
    limit?: number
    page?: number
    categorySlug?: string
    draft?: boolean
  } = {},
): Promise<PaginatedResponse<BlogPost>> {
  const { limit = 10, page = 1, categorySlug, draft } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = {}
  if (!draft) where._status = { equals: 'published' }
  if (categorySlug) where['category.slug'] = { equals: decodeSlug(categorySlug) }
  // Blog posts are single-language: only surface posts written in the locale
  // currently being viewed (an EN post never shows on the AR site, & vice versa).
  where.language = { equals: resolvedLocale }

  const res = await payload.find({
    collection: 'blog',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit,
    page,
    sort: '-publishedAt',
    draft: Boolean(draft),
  })

  return res as unknown as PaginatedResponse<BlogPost>
}

export async function getBlogPost(
  slug: string,
  locale?: Locale,
  options: { draft?: boolean; preview?: boolean } = {},
): Promise<BlogPost | null> {
  const wantDraft = Boolean(options.draft || options.preview)
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = { slug: { equals: decodeSlug(slug) } }
  if (!wantDraft) where._status = { equals: 'published' }
  // Single-language: a post only resolves on its own locale — requesting it on
  // the other locale returns nothing, so the page 404s (matches the SEO spec).
  where.language = { equals: resolvedLocale }

  const res = await payload.find({
    collection: 'blog',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 1,
    draft: wantDraft,
  })

  return (res.docs[0] as unknown as BlogPost) ?? null
}

export async function getBlogCategories(
  locale?: Locale,
  options: { draft?: boolean } = {},
): Promise<BlogCategory[]> {
  const { draft } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = {}
  if (!draft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'blog-categories',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 100,
    sort: 'order',
    draft: Boolean(draft),
  })

  return res.docs as unknown as BlogCategory[]
}

export async function getBlogCategory(
  slug: string,
  locale?: Locale,
  options: { draft?: boolean } = {},
): Promise<BlogCategory | null> {
  const { draft } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = { slug: { equals: decodeSlug(slug) } }
  if (!draft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'blog-categories',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 1,
    draft: Boolean(draft),
  })

  return (res.docs[0] as unknown as BlogCategory) ?? null
}

// Page lookup by fullPath — kept in sync by the backend's buildFullPath hook.
export async function getPageByPath(
  fullPath: string,
  locale?: Locale,
  options: { draft?: boolean; preview?: boolean } = {},
): Promise<Page | null> {
  const wantDraft = Boolean(options.draft || options.preview)
  const normalized = decodeSlug(fullPath.startsWith('/') ? fullPath : `/${fullPath}`)
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = { fullPath: { equals: normalized } }
  if (!wantDraft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'pages',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 1,
    draft: wantDraft,
  })

  return (res.docs[0] as unknown as Page) ?? null
}

export async function getPages(
  locale?: Locale,
  options: { draft?: boolean; limit?: number } = {},
): Promise<Page[]> {
  const { draft, limit = 100 } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = {}
  if (!draft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'pages',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit,
    sort: 'fullPath',
    draft: Boolean(draft),
  })

  return res.docs as unknown as Page[]
}

export async function getPrograms(
  locale?: Locale,
  options: {
    limit?: number
    page?: number
    typeSlug?: string
    country?: ProgramCountry
    onlyOpen?: boolean
    sortBy?: 'newest' | 'oldest' | 'titleAZ'
    draft?: boolean
  } = {},
): Promise<PaginatedResponse<Program>> {
  const { limit = 10, page = 1, typeSlug, country, onlyOpen, sortBy, draft } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  let sort = '-publishedAt'
  if (sortBy === 'oldest') sort = 'publishedAt'
  else if (sortBy === 'titleAZ') sort = 'title'

  const where: Where = {}
  if (!draft) where._status = { equals: 'published' }
  if (typeSlug) where['type.slug'] = { equals: decodeSlug(typeSlug) }
  if (country) where.country = { equals: country }
  if (onlyOpen) where.isOpen = { equals: true }

  const res = await payload.find({
    collection: 'programs',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit,
    page,
    sort,
    draft: Boolean(draft),
  })

  return res as unknown as PaginatedResponse<Program>
}

export async function getProgram(
  slug: string,
  locale?: Locale,
  options: { draft?: boolean; preview?: boolean } = {},
): Promise<Program | null> {
  const wantDraft = Boolean(options.draft || options.preview)
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = { slug: { equals: decodeSlug(slug) } }
  if (!wantDraft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'programs',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 1,
    draft: wantDraft,
  })

  return (res.docs[0] as unknown as Program) ?? null
}

export async function getJobs(
  locale?: Locale,
  options: {
    limit?: number
    countries?: string[]
    jobTypeIds?: Array<string | number>
    draft?: boolean
  } = {},
): Promise<Job[]> {
  const { limit = 12, countries, jobTypeIds, draft } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = {}
  if (!draft) where._status = { equals: 'published' }
  if (countries && countries.length) where.country = { in: countries }
  if (jobTypeIds && jobTypeIds.length) where.jobType = { in: jobTypeIds }

  const res = await payload.find({
    collection: 'jobs',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit,
    sort: ['order', '-publishedAt'],
    draft: Boolean(draft),
  })

  return res.docs as unknown as Job[]
}

export async function getJob(
  slug: string,
  locale?: Locale,
  options: { draft?: boolean; preview?: boolean } = {},
): Promise<Job | null> {
  const wantDraft = Boolean(options.draft || options.preview)
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = { slug: { equals: decodeSlug(slug) } }
  if (!wantDraft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'jobs',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 1,
    draft: wantDraft,
  })

  return (res.docs[0] as unknown as Job) ?? null
}

export async function getProgramTypes(
  locale?: Locale,
  options: { draft?: boolean } = {},
): Promise<ProgramType[]> {
  const { draft } = options
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = {}
  if (!draft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'program-types',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 100,
    sort: 'order',
    draft: Boolean(draft),
  })

  return res.docs as unknown as ProgramType[]
}

export async function getProgramType(
  slug: string,
  locale?: Locale,
  options: { draft?: boolean; preview?: boolean } = {},
): Promise<ProgramType | null> {
  const wantDraft = Boolean(options.draft || options.preview)
  const [payload, resolvedLocale] = await Promise.all([
    payloadClient(),
    locale ? Promise.resolve(locale) : resolveRequestLocale(),
  ])

  const where: Where = { slug: { equals: decodeSlug(slug) } }
  if (!wantDraft) where._status = { equals: 'published' }

  const res = await payload.find({
    collection: 'program-types',
    where,
    locale: resolvedLocale,
    depth: 2,
    limit: 1,
    draft: wantDraft,
  })

  return (res.docs[0] as unknown as ProgramType) ?? null
}

// Globals return null when empty (e.g. fresh deploy pre-seed) so callers
// can fall back to defaults rather than crash.
export async function getHeader(locale?: Locale): Promise<HeaderGlobal | null> {
  try {
    const [payload, resolvedLocale] = await Promise.all([
      payloadClient(),
      locale ? Promise.resolve(locale) : resolveRequestLocale(),
    ])
    const res = await payload.findGlobal({ slug: 'header', locale: resolvedLocale, depth: 2 })
    return res as unknown as HeaderGlobal
  } catch {
    return null
  }
}

export async function getFooter(locale?: Locale): Promise<FooterGlobal | null> {
  try {
    const [payload, resolvedLocale] = await Promise.all([
      payloadClient(),
      locale ? Promise.resolve(locale) : resolveRequestLocale(),
    ])
    const res = await payload.findGlobal({ slug: 'footer', locale: resolvedLocale, depth: 2 })
    return res as unknown as FooterGlobal
  } catch {
    return null
  }
}

export async function getSiteSettings(
  locale?: Locale,
): Promise<SiteSettingsGlobal | null> {
  try {
    const [payload, resolvedLocale] = await Promise.all([
      payloadClient(),
      locale ? Promise.resolve(locale) : resolveRequestLocale(),
    ])
    const res = await payload.findGlobal({ slug: 'site-settings', locale: resolvedLocale, depth: 2 })
    return res as unknown as SiteSettingsGlobal
  } catch {
    return null
  }
}
