import type { Block } from 'payload'

/**
 * MediaShowcase — heading + description + auto-scrolling image carousel.
 *
 * Mirrors the `PublicationAndMedia` static design. The carousel autoplays
 * by default; the editor can disable it or adjust the delay.
 */
export const MediaShowcaseBlock: Block = {
  slug: 'mediaShowcase',
  labels: { singular: 'Media Showcase', plural: 'Media Showcases' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Publication & Media',
      admin: {
        description: 'Section heading. Rendered uppercase in SectionTitle style.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Step into the stories that shaped Levntura's journey. From global adventures to cultural milestones, each moment reflects our spirit of exploration, leadership, and connection. Every image tells a story of growth—students discovering their strength, building friendships across borders, and creating memories that last a lifetime.",
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'portrait',
      admin: {
        description:
          'Normalizes all images to the same shape regardless of upload size. Use "Natural" to keep each image at its original ratio.',
      },
      options: [
        { label: 'Portrait (4:5)', value: 'portrait' },
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Wide (16:9)', value: 'wide' },
        { label: 'Natural (no crop)', value: 'natural' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Media Item', plural: 'Media Items' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          admin: {
            description:
              'Optional text overlay shown at the bottom-left of the image (e.g. "Australia", "USA").',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description:
              'Optional link. When set, the whole image is clickable. Use a relative path like /programs/work-and-travel or an external https:// URL.',
          },
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Auto-advance through the carousel.',
      },
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      defaultValue: 2000,
      admin: {
        description: 'Milliseconds between slides (when autoplay is on).',
        condition: (_, sib) => Boolean(sib?.autoplay),
      },
    },
  ],
}
