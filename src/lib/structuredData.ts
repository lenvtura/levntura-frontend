/**
 * Builders for Schema.org JSON-LD, driven by the SEO fields on each doc.
 *
 * - `buildArticleSchema` → BlogPosting / NewsArticle / Article (Blog posts)
 * - `buildCourseSchema`  → Course (Programs)
 *
 * Each returns `null` when the doc's structured-data group is disabled, so the
 * <JsonLd> component renders nothing. Output is rendered by `components/json-ld`.
 */

import type { BlogPost, Page, Program } from './types'
import { mediaUrl } from './url'

// Flatten a Lexical rich-text value to plain text (for FAQ answers).
function lexicalToText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: string; children?: unknown[]; root?: { children?: unknown[] } }
  if (typeof n.text === 'string') return n.text
  const kids = n.root?.children ?? n.children ?? []
  return Array.isArray(kids)
    ? kids.map(lexicalToText).join(' ').replace(/\s+/g, ' ').trim()
    : ''
}

const SITE_NAME = 'Levntura'

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.levntura.com')
    .split(',')[0]
    .trim()
    .replace(/\/+$/, '')
}

function organization() {
  return { '@type': 'Organization', name: SITE_NAME, url: siteBase() }
}

export function buildArticleSchema(
  post: BlogPost,
  canonical: string,
): Record<string, unknown> | null {
  // A blog post is always a BlogPosting — built automatically from its own
  // fields (no manual schema fields needed). Skipped only when the post is
  // explicitly set to noindex.
  if (post.meta?.noIndex) return null

  const image = mediaUrl(post.featuredImage, 'og') ?? mediaUrl(post.featuredImage)
  const authorName =
    post.authorOverride ||
    (post.author && typeof post.author === 'object' ? post.author.name : undefined)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt,
    ...(image ? { image: [image] } : {}),
    datePublished: post.publishedAt,
    dateModified: post.dateModified || post.publishedAt,
    ...(authorName ? { author: { '@type': 'Person', name: authorName } } : {}),
    publisher: organization(),
    mainEntityOfPage: canonical,
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
  }
}

export function buildCourseSchema(
  program: Program,
  canonical: string,
): Record<string, unknown> | null {
  // Every program is a Course — built automatically from its own fields. The
  // optional `course` group just enriches it (mode / level / dates). Skipped
  // only when the program is set to noindex.
  if (program.meta?.noIndex) return null
  const c = program.course

  const image =
    mediaUrl(program.featuredImage, 'og') ?? mediaUrl(program.featuredImage)
  const courseMode =
    c?.courseMode === 'online'
      ? 'Online'
      : c?.courseMode === 'onsite'
        ? 'Onsite'
        : c?.courseMode === 'blended'
          ? 'Blended'
          : undefined
  const workload = c?.duration || program.duration

  const instanceFields = {
    ...(courseMode ? { courseMode } : {}),
    ...(c?.startDate ? { startDate: c.startDate } : {}),
    ...(c?.endDate ? { endDate: c.endDate } : {}),
    ...(workload ? { courseWorkload: workload } : {}),
  }
  const hasInstance =
    Object.keys(instanceFields).length > 0
      ? { hasCourseInstance: { '@type': 'CourseInstance', ...instanceFields } }
      : {}

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.meta?.title || program.title,
    description: program.meta?.description || program.shortDescription,
    ...(image ? { image: [image] } : {}),
    provider: {
      '@type': 'Organization',
      name: c?.provider || SITE_NAME,
      url: siteBase(),
    },
    ...(c?.courseCode ? { courseCode: c.courseCode } : {}),
    ...(c?.educationalLevel ? { educationalLevel: c.educationalLevel } : {}),
    url: canonical,
    ...hasInstance,
  }
}

function buildFaqSchema(page: Page): Record<string, unknown> | null {
  const blocks = (page.sections ?? []).filter(
    (b) => b.blockType === 'faq',
  ) as Array<{
    enableSchema?: boolean
    items?: Array<{ question?: string; answer?: unknown }>
  }>
  const items = blocks
    .filter((b) => b.enableSchema !== false)
    .flatMap((b) => b.items ?? [])
    .filter((it) => it.question)
  if (items.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: lexicalToText(it.answer) },
    })),
  }
}

export function buildPageSchema(
  page: Page,
  canonical: string,
): Record<string, unknown> | null {
  const sd = page.structuredData
  if (!sd?.enabled || page.meta?.noIndex) return null

  const type = sd.type || 'auto'
  const faq = buildFaqSchema(page)

  // FAQPage: an explicit choice, or auto-detected from an FAQ block.
  if (type === 'FAQPage') return faq
  if (type === 'auto' && faq) return faq

  // Otherwise a generic page type (auto falls back to WebPage).
  const pageType = type === 'auto' ? 'WebPage' : type
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: page.meta?.title || page.title,
    description: page.meta?.description,
    url: canonical,
  }
}
