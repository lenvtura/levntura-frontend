import type { Block } from 'payload'

/**
 * ProgramShare — a "Share this program" section: share buttons that post the
 * current page URL to WhatsApp / Facebook / LinkedIn / X / Telegram. The URL
 * is injected by the page (BlockRenderer `shareUrl`). Rendered by
 * `program-share.tsx`.
 */
export const ProgramShareBlock: Block = {
  slug: 'programShare',
  labels: { singular: 'Share', plural: 'Share' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Share this program',
      admin: { description: 'Heading above the share buttons.' },
    },
  ],
}
