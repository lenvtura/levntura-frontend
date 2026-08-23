/**
 * One-shot seed endpoint for legacy blog content.
 *
 * Lets you trigger `pnpm seed:blogs` from a browser when shell access isn't
 * available (Railway free tier, Vercel functions, etc.).
 *
 * Usage:
 *   GET /api/admin/seed-blogs?secret=<PAYLOAD_PREVIEW_SECRET>
 *
 * Safe to call repeatedly — posts existing by slug are updated, not
 * duplicated. Delete this route once the legacy data has been migrated.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { readFileSync } from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

interface LegacyBlog {
  slug: string
  title: string
  excerpt: string
  dataFile: string
  exportName: string
}

const LEGACY_BLOGS: LegacyBlog[] = [
  {
    slug: 'study-abroad-agencies-in-ksa',
    title: 'BEST STUDY ABROAD AGENCIES IN KSA | LEVNTURA',
    excerpt:
      'Looking for trusted study abroad agencies in KSA? Levntura guides Saudi students through universities, internships, visas, and global programs.',
    dataFile: 'study-abroad-agencies-in-ksa.json',
    exportName: 'studyAbroadAgenciesInKsa',
  },
  {
    slug: 'j1-agencies-in-ksa',
    title: 'J1 AGENCIES IN KSA | J1 VISA PROGRAMS FOR SAUDI STUDENTS',
    excerpt:
      'Looking for trusted j1 agencies in KSA? Discover J1 visa programs, eligibility, and agency support for Saudi students in the USA.',
    dataFile: 'j1-agencies-in-ksa.json',
    exportName: 'j1AgenciesInKsa',
  },
  {
    slug: 'scholarships-for-saudi-students-to-study-abroad',
    title: 'SCHOLARSHIPS FOR SAUDI STUDENTS TO STUDY ABROAD | LEVNTURA',
    excerpt:
      'Discover scholarships for Saudi students to study abroad. Levntura helps students explore funded programs, universities, and application guidance worldwide.',
    dataFile: 'scholarships-for-saudi-students-to-study-abroad.json',
    exportName: 'scholarshipsForSaudiStudentsToStudyAbroad',
  },
  {
    slug: 'work-and-travel-in-agency-ksa',
    title: 'WORK AND TRAVEL IN AGENCY KSA | GLOBAL PROGRAMS FOR SAUDI STUDENTS',
    excerpt:
      'Looking for Work and Travel in Agency KSA? Discover programs, top destinations, and agency support for Saudi students abroad.',
    dataFile: 'work-and-travel.json',
    exportName: 'workAndTravel',
  },
  {
    slug: 'scholarships-in-germany-for-saudi-students',
    title: 'SCHOLARSHIPS IN GERMANY FOR SAUDI STUDENTS | LEVNTURA',
    excerpt:
      'Looking for scholarships in Germany for Saudi students? Discover scholarships, eligibility, and agency support for Saudi students in Germany.',
    dataFile: 'scholarships-in-germany-for-saudi-students.json',
    exportName: 'scholarshipsInGermanyForSaudiStudents',
  },
  {
    slug: 'student-exchange-programs-in-ksa',
    title: 'STUDENT EXCHANGE PROGRAMS IN KSA | LEVNTURA',
    excerpt:
      'Looking for student exchange programs in KSA? Discover programs, eligibility, and agency support for Saudi students in KSA.',
    dataFile: 'student-exchange-programs-in-ksa.json',
    exportName: 'studentExchangeProgramsInKsa',
  },
]

const LEGACY_DATA_DIR = path.resolve(
  process.cwd(),
  'src',
  'scripts',
  'legacy-blog-data',
)

// ─── HTML → plain text helpers (same as seed-blogs.ts) ───────────────────

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function makeTextNode(text: string) {
  return {
    type: 'text',
    text,
    format: 0,
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1,
  }
}

function makeParagraph(text: string) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
    direction: null,
    children: [makeTextNode(text)],
  }
}

function makeHeading(text: string, tag: 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
    direction: null,
    tag,
    children: [makeTextNode(text)],
  }
}

function sectionToLexical(sectionTitle: string, sectionContentHtml: string) {
  const text = stripHtml(sectionContentHtml)
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  const children: unknown[] = [makeHeading(sectionTitle, 'h2')]
  for (const p of paragraphs) {
    children.push(makeParagraph(p))
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

async function loadLegacyBlog(blog: LegacyBlog): Promise<FrontendBlogDetail | null> {
  const fullPath = path.join(LEGACY_DATA_DIR, blog.dataFile)
  try {
    // Read as JSON synchronously — works in every runtime including Vercel
    // and Railway production. (Dynamic .ts imports don't work at runtime
    // without tsx in the loader chain.)
    const raw = readFileSync(fullPath, 'utf-8')
    const parsed = JSON.parse(raw) as FrontendBlogDetail
    return parsed
  } catch {
    return null
  }
}

// ─── Endpoint ────────────────────────────────────────────────────────────

interface SeedReport {
  ok: boolean
  message: string
  created?: string[]
  updated?: string[]
  errors?: string[]
}

export async function GET(req: NextRequest) {
  const expectedSecret = process.env.PAYLOAD_PREVIEW_SECRET
  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, message: 'Server: PAYLOAD_PREVIEW_SECRET not set.' },
      { status: 503 },
    )
  }

  const provided = req.nextUrl.searchParams.get('secret')
  if (provided !== expectedSecret) {
    return NextResponse.json(
      { ok: false, message: 'Invalid secret.' },
      { status: 401 },
    )
  }

  const report: SeedReport = { ok: true, message: '', created: [], updated: [], errors: [] }

  try {
    const payload = await getPayload({ config: configPromise })

    // 1. Ensure category
    let categoryId: string | number
    const existingCategory = await payload.find({
      collection: 'blog-categories',
      where: { slug: { equals: 'articles' } },
      limit: 1,
    })
    if (existingCategory.docs[0]) {
      categoryId = existingCategory.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'blog-categories',
        data: { name: 'Articles', slug: 'articles', translationComplete: true },
        draft: false,
      })
      categoryId = created.id
    }

    // 2. Find placeholder media
    const anyMedia = await payload.find({
      collection: 'media',
      limit: 1,
      sort: '-createdAt',
    })
    if (!anyMedia.docs[0]) {
      report.ok = false
      report.message = 'No media docs found. Upload at least one image in admin first, then retry.'
      return NextResponse.json(report, { status: 400 })
    }
    const placeholderImageId = anyMedia.docs[0].id

    // 3. Find admin user
    const adminUser = await payload.find({
      collection: 'users',
      where: { role: { equals: 'admin' } },
      limit: 1,
    })
    if (!adminUser.docs[0]) {
      report.ok = false
      report.message = 'No admin user found. Create one in the admin first, then retry.'
      return NextResponse.json(report, { status: 400 })
    }
    const authorId = adminUser.docs[0].id

    // 4. Seed each post
    for (const blog of LEGACY_BLOGS) {
      try {
        const frontendData = await loadLegacyBlog(blog)
        const sections =
          frontendData?.sections.map((sec) => ({
            blockType: 'richText' as const,
            content: sectionToLexical(sec.title, sec.content) as never,
            width: 'normal' as const,
          })) ?? []

        if (sections.length === 0) {
          sections.push({
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                direction: null,
                children: [
                  makeParagraph(
                    'Content could not be imported automatically. Please paste manually.',
                  ),
                ],
              },
            } as never,
            width: 'normal',
          })
        }

        const existing = await payload.find({
          collection: 'blog',
          where: { slug: { equals: blog.slug } },
          limit: 1,
        })

        if (existing.docs[0]) {
          await payload.update({
            collection: 'blog',
            id: existing.docs[0].id,
            data: { sections },
            draft: true,
          })
          report.updated!.push(blog.slug)
        } else {
          await payload.create({
            collection: 'blog',
            data: {
              title: blog.title,
              slug: blog.slug,
              excerpt: blog.excerpt,
              featuredImage: placeholderImageId,
              category: categoryId,
              author: authorId,
              sections,
              _status: 'draft',
              translationComplete: false,
            },
            draft: true,
          })
          report.created!.push(blog.slug)
        }
      } catch (err) {
        report.errors!.push(`${blog.slug}: ${(err as Error).message}`)
      }
    }

    const counts = {
      created: report.created!.length,
      updated: report.updated!.length,
      errors: report.errors!.length,
    }
    report.message = `Seed done. created=${counts.created}, updated=${counts.updated}, errors=${counts.errors}.`
    return NextResponse.json(report, { status: 200 })
  } catch (err) {
    report.ok = false
    report.message = `Unexpected error: ${(err as Error).message}`
    return NextResponse.json(report, { status: 500 })
  }
}
