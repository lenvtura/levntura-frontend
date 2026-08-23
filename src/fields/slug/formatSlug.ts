import type { FieldHook } from 'payload'

/**
 * Convert any string into a URL-safe slug.
 * Supports Arabic + English characters.
 */
const format = (val: string): string =>
  val
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]+/g, '') // keep word chars + Arabic + hyphens
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

/**
 * Auto-generate slug from a fallback field (usually 'title') when slug is empty.
 * Always normalizes whatever the user types.
 */
export const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length) {
      return format(value)
    }

    if ((operation === 'create' || !value) && data?.[fallbackField]) {
      const fallback = data[fallbackField]
      if (typeof fallback === 'string') {
        return format(fallback)
      }
    }

    return value
  }