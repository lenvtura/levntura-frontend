import type { Block } from 'payload'

/**
 * AlternatingContent — mirrors `venture-section.tsx`.
 *
 * Sticky eyebrow + section title + intro paragraph, followed by alternating
 * image/text rows (image left → text right, then text left → image right,
 * etc). Editor controls per-row image position.
 */
export const AlternatingContentBlock: Block = {
  slug: 'alternatingContent',
  labels: { singular: 'Alternating Content', plural: 'Alternating Content' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'venture',
      admin: { description: 'Small uppercase label above the title.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'EMBARK ON YOUR BOUNDLESS NEW ADVENTURE',
      admin: { description: 'Main section title. Rendered uppercase.' },
    },
    {
      name: 'introParagraph',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Explore dynamic programs that combine travel, learning, and cultural discovery—crafted to expand your horizons and challenge your potential.',
      admin: {
        description: 'Paragraph shown under the eyebrow (sticky on desktop).',
      },
    },
    {
      name: 'rows',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Row', plural: 'Rows' },
      admin: {
        description:
          'Each row alternates image and text. Use imagePosition to control the order on desktop.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          localized: true,
          admin: { description: 'Small pill label above the heading (e.g. "Explore").' },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'paragraph',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          type: 'radio',
          defaultValue: 'left',
          // Custom enum name — auto-generated
          // `enum_program_types_blocks_alternating_content_rows_image_position`
          // (65 chars) exceeds Postgres's 63-char identifier limit.
          enumName: 'enum_alt_image_position',
          admin: { layout: 'horizontal' },
          options: [
            { label: 'Image Left', value: 'left' },
            { label: 'Image Right', value: 'right' },
          ],
        },
      ],
    },
  ],
}
