'use client'

import React from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

interface SubmissionItem {
  field: string
  value: string
}

interface FieldProps {
  path: string
}

/**
 * Replaces Payload's default array-row editor for `submissionData` with a
 * read-only "receipt" view. Editors get a clean per-field list (label +
 * value) instead of the editable array UI — appropriate because the data
 * was supplied by the visitor and shouldn't be mutated server-side.
 *
 * Data-reading note: Payload v3's `useField` on an ARRAY root returns
 * the row count (number), not the items. To get the actual rows we
 * subscribe to `useFormFields` and reconstruct the array from
 * individual paths like `submissionData.{i}.field` /
 * `submissionData.{i}.value`. This mirrors how the framework stores
 * sub-fields under flattened paths in form state.
 */
const SubmissionDataField: React.FC<FieldProps> = ({ path }) => {
  const items = useFormFields<SubmissionItem[]>(([fields]) => {
    const rows: SubmissionItem[] = []
    if (!fields) return rows
    const prefix = `${path}.`
    // Find every `<path>.<index>.field` entry; pull its matching
    // `.value` from the same index. We iterate by key so we don't
    // depend on the array's `rowCount` field being present yet.
    Object.keys(fields).forEach((key) => {
      if (!key.startsWith(prefix) || !key.endsWith('.field')) return
      const idxStr = key.slice(prefix.length, -'.field'.length)
      const idx = Number(idxStr)
      if (!Number.isInteger(idx) || idx < 0) return
      const fieldName = (fields[key] as { value?: unknown } | undefined)?.value
      const fieldValue = (
        fields[`${prefix}${idx}.value`] as { value?: unknown } | undefined
      )?.value
      if (typeof fieldName !== 'string') return
      rows[idx] = {
        field: fieldName,
        value: typeof fieldValue === 'string' ? fieldValue : '',
      }
    })
    return rows.filter(Boolean)
  })

  // `useDocumentInfo` exposes the current doc's id so we can show
  // "Submission #ID" in the card header (mirrors a common admin/CRM
  // convention — gives the editor an at-a-glance reference number).
  const { id } = useDocumentInfo()
  const headerLabel = id != null ? `Submission #${String(id)}` : 'Submission Data'

  if (items.length === 0) {
    return (
      <div style={{ padding: '12px 0' }}>
        <Card title={headerLabel} fieldCount={0}>
          <p
            style={{
              opacity: 0.6,
              fontStyle: 'italic',
              padding: '14px',
              margin: 0,
            }}
          >
            No data was submitted.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div style={{ padding: '12px 0' }}>
      <Card title={headerLabel} fieldCount={items.length}>
        {items.map((item, i) => (
          <div
            key={`${item.field}-${i}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: '12px',
              padding: '12px 16px',
              // Zebra striping so long submissions stay scannable.
              background:
                i % 2 === 0
                  ? 'transparent'
                  : 'var(--theme-elevation-50, rgba(0,0,0,0.02))',
              borderBottom:
                i === items.length - 1
                  ? 'none'
                  : '1px solid var(--theme-elevation-150, #e0e0e0)',
              alignItems: 'baseline',
            }}
          >
            <strong
              style={{
                fontSize: '13px',
                opacity: 0.7,
                textTransform: 'capitalize',
                wordBreak: 'break-word',
              }}
            >
              {humanize(item.field)}
            </strong>
            <span
              style={{
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {item.value || (
                <em style={{ opacity: 0.5 }}>(empty)</em>
              )}
            </span>
          </div>
        ))}
      </Card>
    </div>
  )
}

/**
 * Card wrapper with header ("Submission #ID" + field count badge) and a
 * bordered body. Reused for both the populated and empty states so the
 * visual frame stays consistent whether the visitor filled in data
 * or not.
 */
function Card({
  title,
  fieldCount,
  children,
}: {
  title: string
  fieldCount: number
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: 'var(--theme-elevation-50, #fff)',
        border: '1px solid var(--theme-elevation-150, #e0e0e0)',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          padding: '12px 16px',
          background: 'var(--theme-elevation-100, #f5f5f5)',
          borderBottom: '1px solid var(--theme-elevation-150, #e0e0e0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '14px' }}>{title}</span>
        {fieldCount > 0 && (
          <span style={{ fontSize: '12px', opacity: 0.65 }}>
            {fieldCount} field{fieldCount === 1 ? '' : 's'}
          </span>
        )}
      </header>
      <div>{children}</div>
    </div>
  )
}

/**
 * Turns "fullName", "phoneNumber" → "Full Name", "Phone Number".
 */
function humanize(key: string): string {
  if (!key) return ''
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default SubmissionDataField
