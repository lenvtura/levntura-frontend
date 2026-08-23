/**
 * HTTP wrapper: seeds default forms + pages in one call.
 *
 * GET /api/admin/seed-site?secret=<PAYLOAD_PREVIEW_SECRET>
 *
 * For local terminal use prefer `pnpm seed:site`.
 *
 * Idempotent — re-running is safe (existing forms / pages are skipped).
 */

import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { seedSite } from '@/lib/seeds/seedSite'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

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

  try {
    const payload = await getPayload({ config: configPromise })
    const report = await seedSite(payload)
    return NextResponse.json(report, { status: report.ok ? 200 : 500 })
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: `Unexpected error: ${(err as Error).message}` },
      { status: 500 },
    )
  }
}
