/**
 * Inline text-state config for the Lexical editor — lets an editor select text
 * and change its COLOR or SIZE from the toolbar (Payload's experimental
 * TextStateFeature). Shared by the editor config (payload.config) and the
 * frontend renderer (rich-text.tsx) so the two never drift.
 *
 * Plain data on purpose (no lexical imports) so it's safe to import in the
 * frontend. Adjust the hex values to your exact brand palette any time.
 */
export const richTextState = {
  color: {
    black: { label: 'Black', css: { color: '#111827' } },
    gray: { label: 'Gray', css: { color: '#6b7280' } },
    green: { label: 'Green', css: { color: '#0e7a5f' } },
    'green-dark': { label: 'Green Dark', css: { color: '#0b3d2e' } },
    blue: { label: 'Blue', css: { color: '#4f46e5' } },
    'blue-dark': { label: 'Blue Dark', css: { color: '#1e1b4b' } },
    red: { label: 'Red', css: { color: '#dc2626' } },
    'red-dark': { label: 'Red Dark', css: { color: '#7f1d1d' } },
    orange: { label: 'Orange', css: { color: '#f97316' } },
    white: { label: 'White', css: { color: '#ffffff' } },
  },
  size: {
    '14': { label: '14px', css: { 'font-size': '14px' } },
    '16': { label: '16px', css: { 'font-size': '16px' } },
    '18': { label: '18px', css: { 'font-size': '18px' } },
    '20': { label: '20px', css: { 'font-size': '20px' } },
    '24': { label: '24px', css: { 'font-size': '24px' } },
    '28': { label: '28px', css: { 'font-size': '28px' } },
    '32': { label: '32px', css: { 'font-size': '32px' } },
    '40': { label: '40px', css: { 'font-size': '40px' } },
    '48': { label: '48px', css: { 'font-size': '48px' } },
  },
} as const

// Flat lookup: stateKey -> value -> css object. Used by the frontend renderer.
// Note we unwrap each entry's `.css` — the raw `richTextState` values are
// `{ label, css }` (the shape TextStateFeature wants), so returning them
// verbatim would put `label`/`css` keys into the inline style and drop the
// actual color/size. This extraction is what makes colours render on the front.
export const RICH_TEXT_STATE_CSS: Record<string, Record<string, Record<string, string>>> =
  Object.fromEntries(
    Object.entries(richTextState).map(([stateKey, values]) => [
      stateKey,
      Object.fromEntries(
        Object.entries(values).map(([value, entry]) => [value, entry.css]),
      ),
    ]),
  )
