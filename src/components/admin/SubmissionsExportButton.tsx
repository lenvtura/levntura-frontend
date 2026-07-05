'use client'

import React, { useState } from 'react'

export const SubmissionsExportButton: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/submissions/export', {
        credentials: 'include',
      })
      if (!res.ok) {
        const msg = await res
          .json()
          .then((j) => j?.message)
          .catch(() => null)
        throw new Error(msg || `Export failed (${res.status})`)
      }
      const blob = await res.blob()
      const disposition = res.headers.get('Content-Disposition') || ''
      const match = disposition.match(/filename="([^"]+)"/)
      const filename = match?.[1] || `submissions-${new Date().toISOString().slice(0, 10)}.xlsx`

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
      }}
    >
      <button
        type="button"
        onClick={handleExport}
        disabled={busy}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: '1px solid var(--theme-elevation-150, #ccc)',
          background: busy ? 'var(--theme-elevation-100, #eee)' : 'var(--theme-success-500, #10b981)',
          color: busy ? 'var(--theme-elevation-500, #555)' : '#fff',
          cursor: busy ? 'wait' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {busy ? 'Exporting…' : 'Export to Excel'}
      </button>
      {error && (
        <span style={{ color: 'var(--theme-error-500, #ef4444)', fontSize: '0.875rem' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default SubmissionsExportButton
