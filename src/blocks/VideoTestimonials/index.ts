import type { Block } from 'payload'

/**
 * VideoTestimonials — mirrors `our-students-sharing.tsx`.
 *
 * Section title + grid of student videos (3 on desktop, carousel on mobile)
 * + supporting paragraph + CTA. Each video item has a caption.
 */
export const VideoTestimonialsBlock: Block = {
  slug: 'videoTestimonials',
  labels: { singular: 'Video Testimonials', plural: 'Video Testimonials' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'our students are already sharing',
      admin: {
        description: 'Section title. Rendered uppercase.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      defaultValue: 'Never before\nFreedom to choose',
      admin: {
        description: 'Smaller heading next to the videos. Use \\n for a line break.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Real stories. Real journeys. Real change. From classrooms to airports, our students are living the Levntura experience—studying abroad, working in new cultures, and growing beyond borders. Each story is a glimpse into what it means to take the leap, explore the world, and come back transformed.',
    },
    {
      name: 'videos',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Video', plural: 'Videos' },
      fields: [
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Upload an .mp4 file. Falls back to the original 2 home videos if the list is empty.',
          },
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'See More',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/blogs',
        },
      ],
    },
  ],
}
