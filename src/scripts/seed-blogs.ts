/**
 * One-time seed: imports the legacy hardcoded blog posts from the old
 * frontend into the CMS so we don't lose their slugs / SEO history.
 *
 * Reads each data file directly from `levntura-frontend/app/blogs/[slug]/data/`,
 * strips HTML to text + headings, and writes the content as a sequence of
 * RichText blocks (one per section).
 *
 * Run once with:
 *   pnpm seed:blogs
 *
 * Safe to re-run — posts with an existing slug are skipped.
 *
 * After verifying everything in the admin, this file + the original data
 * files in the frontend can be deleted.
 */

import 'dotenv/config'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { ensureFirstAdmin } from '../lib/seeds/ensureFirstAdmin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const log = (msg: string) => {
  process.stdout.write(`[seed-blogs] ${msg}\n`)
}

// ─── Legacy blog metadata (lifted from the frontend) ────────────────────

interface LegacyBlog {
  slug: string
  title: string
  excerpt: string
  /** path to the data file, relative to FE_DATA_DIR */
  dataFile: string
  /** named export inside the data file */
  exportName: string
  /**
   * Public URL of the original featured image on DO Spaces. The seed
   * downloads it and uploads it as a Media doc so each post gets its
   * own correct image instead of all sharing one placeholder.
   *
   * Falls back to the existing placeholder if the fetch fails (offline,
   * URL changed, etc.).
   */
  featuredImageUrl: string
  /** Filename to store the image under in Payload Media. Stable so re-runs
   * skip the re-upload. */
  featuredImageFilename: string
}

// Base URL for all 6 legacy DO Spaces images.
const DO_SPACES_BASE =
  'https://sfo3.digitaloceanspaces.com/levntura/uploads/media/images'

const LEGACY_BLOGS: LegacyBlog[] = [
  {
    slug: 'study-abroad-agencies-in-ksa',
    title: 'BEST STUDY ABROAD AGENCIES IN KSA | LEVNTURA',
    excerpt:
      'Looking for trusted study abroad agencies in KSA? Levntura guides Saudi students through universities, internships, visas, and global programs.',
    dataFile: 'study-abroad-agencies-in-ksa.json',
    exportName: 'studyAbroadAgenciesInKsa',
    featuredImageUrl: `${DO_SPACES_BASE}/blogs-study_abroad.webp`,
    featuredImageFilename: 'blogs-study_abroad.webp',
  },
  {
    slug: 'j1-agencies-in-ksa',
    title: 'J1 AGENCIES IN KSA | J1 VISA PROGRAMS FOR SAUDI STUDENTS',
    excerpt:
      'Looking for trusted j1 agencies in KSA? Discover J1 visa programs, eligibility, and agency support for Saudi students in the USA.',
    dataFile: 'j1-agencies-in-ksa.json',
    exportName: 'j1AgenciesInKsa',
    featuredImageUrl: `${DO_SPACES_BASE}/blogs-j1_agencies.webp`,
    featuredImageFilename: 'blogs-j1_agencies.webp',
  },
  {
    slug: 'scholarships-for-saudi-students-to-study-abroad',
    title: 'SCHOLARSHIPS FOR SAUDI STUDENTS TO STUDY ABROAD | LEVNTURA',
    excerpt:
      'Discover scholarships for Saudi students to study abroad. Levntura helps students explore funded programs, universities, and application guidance worldwide.',
    dataFile: 'scholarships-for-saudi-students-to-study-abroad.json',
    exportName: 'scholarshipsForSaudiStudentsToStudyAbroad',
    featuredImageUrl: `${DO_SPACES_BASE}/blogs-scholarships.png`,
    featuredImageFilename: 'blogs-scholarships.png',
  },
  {
    slug: 'work-and-travel-in-agency-ksa',
    title: 'WORK AND TRAVEL IN AGENCY KSA | GLOBAL PROGRAMS FOR SAUDI STUDENTS',
    excerpt:
      'Looking for Work and Travel in Agency KSA? Discover programs, top destinations, and agency support for Saudi students abroad.',
    dataFile: 'work-and-travel.json',
    exportName: 'workAndTravel',
    featuredImageUrl: `${DO_SPACES_BASE}/blogs-work_and_travel.webp`,
    featuredImageFilename: 'blogs-work_and_travel.webp',
  },
  {
    slug: 'scholarships-in-germany-for-saudi-students',
    title: 'SCHOLARSHIPS IN GERMANY FOR SAUDI STUDENTS | LEVNTURA',
    excerpt:
      'Looking for scholarships in Germany for Saudi students? Discover scholarships, eligibility, and agency support for Saudi students in Germany.',
    dataFile: 'scholarships-in-germany-for-saudi-students.json',
    exportName: 'scholarshipsInGermanyForSaudiStudents',
    featuredImageUrl: `${DO_SPACES_BASE}/scholarships-in-germany-blog-photo.png`,
    featuredImageFilename: 'scholarships-in-germany-blog-photo.png',
  },
  {
    slug: 'student-exchange-programs-in-ksa',
    title: 'STUDENT EXCHANGE PROGRAMS IN KSA | LEVNTURA',
    excerpt:
      'Looking for student exchange programs in KSA? Discover programs, eligibility, and agency support for Saudi students in KSA.',
    dataFile: 'student-exchange-programs-in-ksa.json',
    exportName: 'studentExchangeProgramsInKsa',
    featuredImageUrl: `${DO_SPACES_BASE}/student-exchange-programs-blog-photo.png`,
    featuredImageFilename: 'student-exchange-programs-blog-photo.png',
  },
]

// Legacy data is bundled inside the backend so the seed is self-contained
// and can run on production servers (Railway etc.) where the frontend
// project isn't checked out.
const LEGACY_DATA_DIR = path.resolve(
  __dirname,
  'legacy-blog-data',
)

// ─── Per-post featured image loader ──────────────────────────────────────

import { ensureMediaFromUrl as ensureMediaFromUrlShared } from '../lib/seeds/utils/ensureMediaFromUrl'

// Thin wrapper that forwards this script's log prefix into the shared
// helper. See `src/lib/seeds/utils/ensureMediaFromUrl.ts` for the
// dedup-by-basename logic that prevents webp-conversion duplicates.
const ensureMediaFromUrl = (
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  filename: string,
  alt: string,
) => ensureMediaFromUrlShared(payload, url, filename, alt, log)

// ─── Lexical types ───────────────────────────────────────────────────────

// Lexical's `format` bitfield for text nodes. We only need bold here, but
// the bits are documented so future formats are easy to add.
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2

interface LexicalTextNode {
  type: 'text'
  text: string
  format: number
  mode: 'normal'
  style: string
  detail: number
  version: 1
}

interface LexicalLinkNode {
  type: 'link'
  format: ''
  indent: 0
  version: 1
  direction: null
  children: LexicalTextNode[]
  fields: { linkType: 'custom'; newTab: boolean; url: string }
}

type LexicalInlineNode = LexicalTextNode | LexicalLinkNode

interface LexicalBlockNode {
  type: string
  format: ''
  indent: 0
  version: 1
  textFormat: 0
  textStyle: ''
  direction: null
  children: LexicalInlineNode[]
  tag?: string
}

interface LexicalListItem {
  type: 'listitem'
  format: ''
  indent: 0
  version: 1
  direction: null
  value: number
  children: LexicalInlineNode[]
}

interface LexicalList {
  type: 'list'
  format: ''
  indent: 0
  version: 1
  direction: null
  listType: 'bullet' | 'number'
  start: number
  tag: 'ul' | 'ol'
  children: LexicalListItem[]
}

type LexicalRootChild = LexicalBlockNode | LexicalList

interface LexicalRoot {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: null
    children: LexicalRootChild[]
  }
}

// ─── Lexical builders ────────────────────────────────────────────────────

function makeTextNode(text: string, format = 0): LexicalTextNode {
  return {
    type: 'text',
    text,
    format,
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1,
  }
}

function makeParagraph(children: LexicalInlineNode[]): LexicalBlockNode {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
    direction: null,
    children: children.length > 0 ? children : [makeTextNode('')],
  }
}

function makeHeading(
  children: LexicalInlineNode[],
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2',
): LexicalBlockNode {
  return {
    type: 'heading',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
    direction: null,
    tag,
    children: children.length > 0 ? children : [makeTextNode('')],
  }
}

function makeListItem(children: LexicalInlineNode[], value: number): LexicalListItem {
  return {
    type: 'listitem',
    format: '',
    indent: 0,
    version: 1,
    direction: null,
    value,
    children: children.length > 0 ? children : [makeTextNode('')],
  }
}

function makeList(
  items: LexicalListItem[],
  tag: 'ul' | 'ol',
): LexicalList {
  return {
    type: 'list',
    format: '',
    indent: 0,
    version: 1,
    direction: null,
    listType: tag === 'ol' ? 'number' : 'bullet',
    start: 1,
    tag,
    children: items,
  }
}

// ─── HTML → Lexical converter ────────────────────────────────────────────

/**
 * Decode the small set of HTML entities the legacy content uses. (We don't
 * pull in a parser library — the content is well-formed and predictable.)
 */
function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

/**
 * Strip the legacy "font-size: 14pt" spans that wrap nearly every piece of
 * text in the seed data. They're inline styling that we'd rather leave to
 * the frontend's typography classes.
 *
 * Keeps `<strong>` / `<em>` / `<a>` / `<br>` intact for inline parsing.
 */
function stripFontSizeSpans(html: string): string {
  // Drop the spans but keep their inner content.
  return html
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
}

/**
 * Parse inline HTML (no block-level tags) into Lexical inline nodes.
 *
 * Walks the string left-to-right, recognizing `<strong>`, `<em>`, `<b>`,
 * `<i>`, `<a href>`, `<br>`, and treating everything else as text.
 */
function parseInline(html: string): LexicalInlineNode[] {
  const cleaned = decodeEntities(stripFontSizeSpans(html))
  const nodes: LexicalInlineNode[] = []
  let i = 0

  const pushText = (text: string, format: number) => {
    if (text.length === 0) return
    nodes.push(makeTextNode(text, format))
  }

  const eatUntilClosing = (closeTag: string): string => {
    const closeRe = new RegExp(`</${closeTag}\\s*>`, 'i')
    const rest = cleaned.slice(i)
    const m = rest.match(closeRe)
    if (!m || m.index === undefined) return ''
    const inner = rest.slice(0, m.index)
    i += m.index + m[0].length
    return inner
  }

  let currentFormat = 0
  let buffer = ''

  while (i < cleaned.length) {
    const ch = cleaned[i]
    if (ch !== '<') {
      buffer += ch
      i++
      continue
    }

    // Flush whatever plain text we have before handling the tag
    pushText(buffer, currentFormat)
    buffer = ''

    const rest = cleaned.slice(i)

    // <br/>
    const brMatch = rest.match(/^<br\s*\/?>/i)
    if (brMatch) {
      // Treat <br> as a literal newline inside the paragraph.
      pushText('\n', currentFormat)
      i += brMatch[0].length
      continue
    }

    // <strong> / <b>  — bold run
    const boldMatch = rest.match(/^<(strong|b)\b[^>]*>/i)
    if (boldMatch) {
      i += boldMatch[0].length
      const inner = eatUntilClosing(boldMatch[1])
      // Recurse so nested italics / links inside bold still work.
      const innerNodes = parseInline(inner)
      for (const node of innerNodes) {
        if (node.type === 'text') {
          node.format |= FORMAT_BOLD
        }
      }
      nodes.push(...innerNodes)
      continue
    }

    // <em> / <i>  — italic run
    const italicMatch = rest.match(/^<(em|i)\b[^>]*>/i)
    if (italicMatch) {
      i += italicMatch[0].length
      const inner = eatUntilClosing(italicMatch[1])
      const innerNodes = parseInline(inner)
      for (const node of innerNodes) {
        if (node.type === 'text') {
          node.format |= FORMAT_ITALIC
        }
      }
      nodes.push(...innerNodes)
      continue
    }

    // <a href="..."> — link
    const linkMatch = rest.match(/^<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/i)
    if (linkMatch) {
      i += linkMatch[0].length
      const inner = eatUntilClosing('a')
      const innerNodes = parseInline(inner)
      const textChildren = innerNodes.filter(
        (n): n is LexicalTextNode => n.type === 'text',
      )
      nodes.push({
        type: 'link',
        format: '',
        indent: 0,
        version: 1,
        direction: null,
        children:
          textChildren.length > 0 ? textChildren : [makeTextNode(linkMatch[1])],
        fields: {
          linkType: 'custom',
          newTab: /^https?:/i.test(linkMatch[1]),
          url: linkMatch[1],
        },
      })
      continue
    }

    // Unknown tag — eat the opening tag and continue
    const unknownMatch = rest.match(/^<\/?[a-z][^>]*>/i)
    if (unknownMatch) {
      i += unknownMatch[0].length
      continue
    }

    // Lone `<` — treat as plain text
    buffer += ch
    i++
  }

  pushText(buffer, currentFormat)
  return nodes
}

/**
 * Parse `<li>...</li>` items inside a `<ul>` or `<ol>` block.
 * Strips an optional inner `<p>` wrapper (the legacy content sometimes
 * nests paragraphs inside list items).
 */
function parseListItems(listInnerHtml: string): LexicalListItem[] {
  const items: LexicalListItem[] = []
  const re = /<li\b[^>]*>([\s\S]*?)<\/li>/gi
  let m: RegExpExecArray | null
  let idx = 1
  while ((m = re.exec(listInnerHtml)) !== null) {
    let inner = m[1].trim()
    // Drop wrapping <p>...</p> if it's the only child.
    const pWrap = inner.match(/^<p\b[^>]*>([\s\S]*?)<\/p>$/i)
    if (pWrap) inner = pWrap[1]
    items.push(makeListItem(parseInline(inner), idx++))
  }
  return items
}

/**
 * Top-level HTML → Lexical block parser. Recognizes:
 *   <p>, <h1>–<h6>, <ul>, <ol>
 * Anything else inside the content is treated as a fallback paragraph.
 */
function parseHtmlToLexicalBlocks(html: string): LexicalRootChild[] {
  const cleaned = stripFontSizeSpans(html).trim()
  const blocks: LexicalRootChild[] = []

  // Block-level regex — non-greedy match for the matching close tag.
  const blockRe = /<(p|h[1-6]|ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi
  let m: RegExpExecArray | null
  let cursor = 0

  while ((m = blockRe.exec(cleaned)) !== null) {
    // Any free-floating text between blocks → wrap in a paragraph.
    const stray = cleaned.slice(cursor, m.index).trim()
    if (stray.length > 0) {
      const inline = parseInline(stray)
      if (inline.length > 0) blocks.push(makeParagraph(inline))
    }
    cursor = m.index + m[0].length

    const tag = m[1].toLowerCase()
    const inner = m[2]

    if (tag === 'p') {
      const inline = parseInline(inner)
      // Skip empty paragraphs (the legacy content has stray <p></p>).
      const text = inline
        .map((n) => (n.type === 'text' ? n.text : ''))
        .join('')
        .trim()
      if (text.length > 0 || inline.some((n) => n.type === 'link')) {
        blocks.push(makeParagraph(inline))
      }
    } else if (/^h[1-6]$/.test(tag)) {
      blocks.push(
        makeHeading(parseInline(inner), tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'),
      )
    } else if (tag === 'ul' || tag === 'ol') {
      const items = parseListItems(inner)
      if (items.length > 0) blocks.push(makeList(items, tag))
    }
  }

  // Trailing text after the last block.
  const tail = cleaned.slice(cursor).trim()
  if (tail.length > 0) {
    const inline = parseInline(tail)
    if (inline.length > 0) blocks.push(makeParagraph(inline))
  }

  return blocks
}

/**
 * Build ONE Lexical document from all of a blog post's sections.
 * Each section's title becomes an H2; its HTML content is parsed
 * into headings / paragraphs / lists with formatting preserved.
 *
 * Returns a Lexical root ready to drop into a `richText` block.
 */
function buildPostLexical(sections: FrontendSection[]): LexicalRoot {
  const children: LexicalRootChild[] = []

  for (const sec of sections) {
    const sectionTitle = sec.title?.trim() ?? ''
    if (sectionTitle.length > 0) {
      children.push(makeHeading([makeTextNode(sectionTitle)], 'h2'))
    }
    children.push(...parseHtmlToLexicalBlocks(sec.content ?? ''))
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children,
    },
  }
}

// ─── Data file loader ────────────────────────────────────────────────────

interface FrontendSection {
  id: string
  title: string
  content: string
}

interface FrontendBlogDetail {
  slug: string
  title: string
  sections: FrontendSection[]
}

async function loadFrontendBlog(
  blog: LegacyBlog,
): Promise<FrontendBlogDetail | null> {
  const fullPath = path.join(LEGACY_DATA_DIR, blog.dataFile)
  try {
    const raw = readFileSync(fullPath, 'utf-8')
    return JSON.parse(raw) as FrontendBlogDetail
  } catch (err) {
    log(`  ⚠ failed to read ${blog.dataFile}: ${(err as Error).message}`)
    return null
  }
}

// ─── Seed runner ─────────────────────────────────────────────────────────

const seed = async (): Promise<void> => {
  log('booting payload...')
  const payload = await getPayload({ config })

  await ensureFirstAdmin(payload)

  log('ensuring "Articles" category...')
  const existingCategory = await payload.find({
    collection: 'blog-categories',
    where: { slug: { equals: 'articles' } },
    limit: 1,
  })

  let categoryId: string | number
  if (existingCategory.docs[0]) {
    categoryId = existingCategory.docs[0].id
    log(`  ↳ found existing category id=${categoryId}`)
  } else {
    const created = await payload.create({
      collection: 'blog-categories',
      data: {
        name: 'Articles',
        slug: 'articles',
        translationComplete: true,
      },
      draft: false,
    })
    categoryId = created.id
    log(`  ↳ created new category id=${categoryId}`)
  }

  log('looking for a placeholder fallback image...')
  const anyMedia = await payload.find({
    collection: 'media',
    limit: 1,
    sort: '-createdAt',
  })

  // Optional now: each blog will pull its own featured image from the
  // legacy DO Spaces URLs (see featuredImageUrl on LegacyBlog). The
  // placeholder is only used if a per-post fetch fails.
  const placeholderImageId =
    (anyMedia.docs[0]?.id as number | undefined) ?? null
  if (placeholderImageId) {
    log(`  ↳ fallback media id=${placeholderImageId}`)
  } else {
    log('  ↳ no media found yet — per-post fetch will be the only source')
  }

  log('looking for an author...')
  const adminUser = await payload.find({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    limit: 1,
  })

  // ensureFirstAdmin at the top of this script guarantees an admin exists.
  // If somehow none is found here, surface a clear error instead of dying.
  if (!adminUser.docs[0]) {
    log('✗ no admin user found even after ensureFirstAdmin — aborting.')
    process.exit(1)
  }
  const authorId = adminUser.docs[0].id
  log(`  ↳ using author id=${authorId}`)

  let created = 0
  let skipped = 0
  let updated = 0

  for (const blog of LEGACY_BLOGS) {
    log(`processing ${blog.slug}...`)

    // Resolve per-post featured image (download + upload if not yet stored).
    const fetchedImageId = await ensureMediaFromUrl(
      payload,
      blog.featuredImageUrl,
      blog.featuredImageFilename,
      blog.title,
    )
    const featuredImageId = fetchedImageId ?? placeholderImageId

    if (!featuredImageId) {
      log(`  ✗ skipping ${blog.slug} — no image available (neither fetched nor placeholder)`)
      skipped++
      continue
    }

    const frontendData = await loadFrontendBlog(blog)
    // ONE RichText block containing all sections — instead of one block per
    // section. Lexical heading nodes (H2/H3) inside the block carry the
    // structure; the frontend renderer styles them via typography CSS.
    const lexicalDoc =
      frontendData && frontendData.sections.length > 0
        ? buildPostLexical(frontendData.sections)
        : {
            root: {
              type: 'root' as const,
              format: '' as const,
              indent: 0 as const,
              version: 1 as const,
              direction: null,
              children: [
                makeParagraph([
                  makeTextNode(
                    'Content could not be imported automatically. Please paste the article content here.',
                  ),
                ]),
              ],
            },
          }

    const sections = [
      {
        blockType: 'richText' as const,
        content: lexicalDoc as never,
        width: 'normal' as const,
      },
    ]

    const existing = await payload.find({
      collection: 'blog',
      where: { slug: { equals: blog.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      // Update existing post's sections + featuredImage so re-running the
      // seed refreshes both imported content and per-post images.
      await payload.update({
        collection: 'blog',
        id: existing.docs[0].id,
        data: { sections, featuredImage: featuredImageId },
        draft: true,
      })
      log(`  ↻ updated ${blog.slug} (${sections.length} section blocks, image id=${featuredImageId})`)
      updated++
      continue
    }

    await payload.create({
      collection: 'blog',
      data: {
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        featuredImage: featuredImageId,
        category: categoryId,
        author: authorId,
        sections,
        _status: 'draft',
        translationComplete: false,
      },
      draft: true,
    })

    log(`  ✓ created ${blog.slug} (${sections.length} section blocks)`)
    created++
  }

  log(`done. created=${created}, updated=${updated}, skipped=${skipped}, total=${LEGACY_BLOGS.length}`)
  process.exit(0)
}

seed().catch((err) => {
  process.stderr.write(`[seed-blogs] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
