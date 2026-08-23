import { randomUUID } from 'crypto'
import type { Block, CheckboxField, TextField } from 'payload'

/**
 * "Hide this section" toggle injected into every page-builder block.
 *
 * When checked, the block is skipped by the frontend `BlockRenderer` — so an
 * editor can hide a section on any page without deleting it, and un-hide it
 * later. Defaults to `false` (visible), so existing sections stay on the page.
 */
export const visibilityField: CheckboxField = {
  name: 'hidden',
  type: 'checkbox',
  label: 'Hide this section',
  defaultValue: false,
  admin: {
    description:
      'Hide this section on the live site without deleting it. Untick to show it again.',
  },
}

/**
 * Stable per-block identity used to keep the Arabic copy of a localized
 * `sections` array in sync with English across reorders and mid-array
 * inserts (see seedTranslation). Auto-generated, hidden from editors, and
 * never changes once set — the SAME value is written to both locales, so a
 * block can be matched to its translation by key regardless of position.
 *
 * A block's Payload row `id` can't be shared across locales (separate rows,
 * unique PK), so this dedicated key is what links a section to its
 * translation.
 */
export const syncKeyField: TextField = {
  name: 'syncKey',
  type: 'text',
  admin: { hidden: true },
  hooks: {
    beforeValidate: [
      ({ value }) =>
        typeof value === 'string' && value.length > 0 ? value : randomUUID(),
    ],
  },
}

/**
 * Prepend the shared "section meta" fields (visibility toggle + stable sync
 * key) to a block's fields.
 *
 * Idempotent — safe to apply more than once (skips a field the block already
 * has). Returns a NEW block object; the original import is left untouched so
 * the same block can be reused elsewhere without side effects.
 */
export function withBlockMeta(block: Block): Block {
  const has = (name: string) =>
    block.fields?.some((f) => 'name' in f && f.name === name)

  const extra: Block['fields'] = []
  if (!has('hidden')) extra.push(visibilityField)
  if (!has('syncKey')) extra.push(syncKeyField)
  if (extra.length === 0) return block

  return { ...block, fields: [...extra, ...block.fields] }
}
