'use client'

import React from 'react'
import Link from 'next/link'

interface SubmissionItem {
  field: string
  value: string
}

type CellProps = {
  cellData?: unknown
  rowData?: Record<string, unknown>
}

/**
 * Custom list-view cell for the Submissions collection's `submissionData`
 * array. Without this, Payload renders the raw JSON which is unreadable.
 *
 * Compact two-line layout — name on top (bold), email below (muted) —
 * picked because:
 *   - The list table is for SCANNING. Editor wants "who submitted?" at
 *     a glance; phone + message clutter the row.
 *   - Full details (phone, message, every other form field) are shown
 *     when the editor clicks the cell (the whole thing is now a link
 *     to the submission's detail view).
 *
 * The cell is wrapped in a Next.js `<Link>` to the submission's doc
 * page (`/admin/collections/form-submissions/{id}`). Custom Cell
 * components in Payload aren't auto-linked the way default text cells
 * are — without this wrapper editors had to click the tiny edit icon
 * column to navigate, and selecting + Edit triggers a confusing bulk
 * edit modal (we also disable bulk edit in the collection config).
 */
const SubmissionDataCell: React.FC<CellProps> = ({ cellData, rowData }) => {
  const items = (Array.isArray(cellData) ? cellData : []) as SubmissionItem[]
  const findField = (...names: string[]): string => {
    const lowered = names.map((n) => n.toLowerCase())
    const match = items.find(
      (it) =>
        typeof it?.field === 'string' &&
        lowered.includes(it.field.toLowerCase()),
    )
    return typeof match?.value === 'string' ? match.value : ''
  }

  const name = findField('name', 'fullname', 'firstname')
  const email = findField('email', 'emailaddress')

  const id = rowData?.id
  const href =
    id != null ? `/admin/collections/form-submissions/${String(id)}` : '#'

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        minWidth: '220px',
        lineHeight: 1.3,
        cursor: 'pointer',
      }}
    >
      <span style={{ fontWeight: 600, fontSize: '14px' }}>
        {name || <em style={{ opacity: 0.5, fontWeight: 400 }}>(no name)</em>}
      </span>
      {email && (
        <span style={{ opacity: 0.65, fontSize: '13px' }}>{email}</span>
      )}
    </div>
  )

  if (items.length === 0) {
    return <span style={{ opacity: 0.5 }}>—</span>
  }

  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      {content}
    </Link>
  )
}

export default SubmissionDataCell
