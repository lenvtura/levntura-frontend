// Submissions → Excel. One sheet per form. Admin-only.
// GET /api/admin/submissions/export
// GET /api/admin/submissions/export?form=<formId>

import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ExcelJS from 'exceljs'

import { userIsAdmin } from '@/access/roles'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

interface FormField {
  name?: string
  label?: string
  blockType?: string
}

interface SubmissionItem {
  field?: string
  value?: string | number | boolean | null
}

// Excel sheet names are limited to 31 chars and can't contain \/?*[]:
function safeSheetName(name: string): string {
  return name.slice(0, 31).replace(/[\\/?*[\]:]/g, '_')
}

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers: req.headers })
  if (!userIsAdmin(user)) {
    return NextResponse.json(
      { ok: false, message: 'Admin access required.' },
      { status: 401 },
    )
  }

  const formFilter = req.nextUrl.searchParams.get('form')

  // Normalises a form reference (number | string | {id}) to a comparable key.
  const formKey = (ref: unknown): string | null => {
    if (ref == null) return null
    if (typeof ref === 'object') {
      const obj = ref as { id?: string | number }
      return obj.id != null ? String(obj.id) : null
    }
    return String(ref)
  }

  try {
    // Fetch forms — pick which ones to include.
    const formsRes = await payload.find({
      collection: 'forms',
      ...(formFilter
        ? { where: { id: { equals: formFilter } } }
        : { limit: 100 }),
      depth: 0,
      overrideAccess: true,
    })

    if (formsRes.docs.length === 0) {
      return NextResponse.json(
        { ok: false, message: 'No forms found.' },
        { status: 404 },
      )
    }

    // Fetch ALL submissions in one shot, then group by form ID in JS.
    // Avoids N+1 queries and dodges any string/number ID type-coercion
    // mismatch on the `where: { form: { equals } }` clause.
    const subsRes = await payload.find({
      collection: 'form-submissions',
      limit: 10000,
      depth: 0,
      sort: '-createdAt',
      overrideAccess: true,
    })

    const submissionsByForm = new Map<string, typeof subsRes.docs>()
    for (const sub of subsRes.docs) {
      const key = formKey((sub as { form?: unknown }).form)
      if (!key) continue
      const bucket = submissionsByForm.get(key) ?? []
      bucket.push(sub)
      submissionsByForm.set(key, bucket)
    }

    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Levntura Admin Export'
    workbook.created = new Date()

    let totalRows = 0

    for (const form of formsRes.docs) {
      const formId = form.id
      const formTitle =
        typeof form.title === 'string' ? form.title : `Form ${formId}`
      const fields = ((form as { fields?: FormField[] }).fields ?? []).filter(
        (f) => typeof f.name === 'string',
      )

      const formSubmissions = submissionsByForm.get(String(formId)) ?? []

      const sheet = workbook.addWorksheet(safeSheetName(formTitle))

      // Build columns: metadata + form fields + internal notes.
      sheet.columns = [
        { header: 'Submission ID', key: 'id', width: 12 },
        { header: 'Created At', key: 'createdAt', width: 22 },
        { header: 'Status', key: 'status', width: 12 },
        ...fields.map((f) => ({
          header: f.label || f.name || '(unnamed)',
          key: `field_${f.name}`,
          width: 28,
        })),
        { header: 'Internal Notes', key: 'internalNotes', width: 30 },
      ]

      // Style header row.
      const headerRow = sheet.getRow(1)
      headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF002D2D' }, // lev-green-dark
      }
      headerRow.height = 24
      headerRow.alignment = { vertical: 'middle' }

      for (const sub of formSubmissions) {
        const row: Record<string, unknown> = {
          id: sub.id,
          createdAt: sub.createdAt
            ? new Date(sub.createdAt as string | Date)
            : null,
          status: (sub as { status?: string }).status ?? 'pending',
          internalNotes:
            (sub as { internalNotes?: string }).internalNotes ?? '',
        }

        const items = ((sub as { submissionData?: SubmissionItem[] })
          .submissionData ?? []) as SubmissionItem[]
        for (const item of items) {
          if (item.field) {
            row[`field_${item.field}`] = item.value ?? ''
          }
        }

        sheet.addRow(row)
        totalRows += 1
      }

      // Format the Created At column as a date.
      sheet.getColumn('createdAt').numFmt = 'yyyy-mm-dd hh:mm:ss'

      // Freeze the header row.
      sheet.views = [{ state: 'frozen', ySplit: 1 }]
    }

    const buffer = await workbook.xlsx.writeBuffer()
    const filename = `submissions-${new Date().toISOString().slice(0, 10)}.xlsx`

    return new NextResponse(buffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Total-Rows': String(totalRows),
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: `Export failed: ${(err as Error).message}`,
      },
      { status: 500 },
    )
  }
}
