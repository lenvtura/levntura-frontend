import type { CollectionBeforeValidateHook } from 'payload'

const filenameToAlt = (filename: string): string => {
  const base = filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  if (!base) return filename
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export const defaultAltFromFilename: CollectionBeforeValidateHook = ({
  data,
  originalDoc,
}) => {
  if (!data) return data

  const alt = data.alt
  const hasAlt =
    typeof alt === 'string' ? alt.trim().length > 0 : alt != null && alt !== ''

  if (hasAlt) return data

  const filename =
    (typeof data.filename === 'string' && data.filename) ||
    (typeof originalDoc?.filename === 'string' && originalDoc.filename) ||
    null

  if (filename) {
    data.alt = filenameToAlt(filename)
  }

  return data
}
