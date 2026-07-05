import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Auto-calculate reading time based on content.
 * Average reading speed: 200 words per minute.
 *
 * Counts words from:
 *   - excerpt
 *   - all richText blocks in sections
 */
export const calculateReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  const WORDS_PER_MINUTE = 200

  let wordCount = 0

  // Count excerpt
  if (typeof data.excerpt === 'string') {
    wordCount += data.excerpt.trim().split(/\s+/).length
  }

  // Walk through sections and count rich text content
  if (Array.isArray(data.sections)) {
    for (const section of data.sections) {
      if (section.blockType === 'richText' && section.content) {
        const text = extractTextFromLexical(section.content)
        wordCount += text.trim().split(/\s+/).filter(Boolean).length
      }
    }
  }

  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return {
    ...data,
    readingTime: minutes,
    wordCount,
  }
}

/**
 * Recursively extract plain text from a Lexical editor JSON tree.
 */
function extractTextFromLexical(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node

  if (typeof node === 'object' && node !== null) {
    const obj = node as Record<string, unknown>

    if (typeof obj.text === 'string') return obj.text

    const children = (obj.children || (obj.root as Record<string, unknown>)?.children) as
      | unknown[]
      | undefined

    if (Array.isArray(children)) {
      return children.map(extractTextFromLexical).join(' ')
    }
  }

  return ''
}
