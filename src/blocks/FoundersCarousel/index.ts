import type { Block } from 'payload'

/**
 * FoundersCarousel — mirrors `app/about/our-founders-carousel.tsx`.
 *
 * Full-bleed image carousel. Each slide: photo + title (e.g. "Co-Founder"),
 * name, bio paragraph, and a CTA button.
 */
export const FoundersCarouselBlock: Block = {
  slug: 'foundersCarousel',
  labels: { singular: 'Founders Carousel', plural: 'Founders Carousels' },
  fields: [
    {
      name: 'founders',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Founder', plural: 'Founders' },
      admin: {
        description:
          'List of founders / team leaders. Falls back to the original Ahmad + Abdulrahman pair when empty.',
      },
      defaultValue: [
        {
          title: 'Co-Founder',
          name: 'Ahmad Al-Mashaikh',
          description:
            "Driven by a passion for global education, Ahmad Al-Mashaikh co-founded Levntura to redefine international experiences for today's youth. With extensive experience in global mobility, he believes learning goes beyond classrooms—it's about people, purpose, and perspective. His mission is to empower young leaders to explore the world with confidence, connecting ambition with opportunity through transformative programs.",
        },
        {
          title: 'Co-Founder',
          name: 'Abdulrahman Soman',
          description:
            'Abdulrahman Soman is a visionary co-founder of Levntura, driving its growth through innovation and strategic leadership. He is passionate about transforming global student mobility by creating smarter, more connected pathways between students and institutions. Through his vision, Levntura continues to empower youth and redefine how international education bridges opportunity and impact worldwide.',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'Role title (e.g. "Co-Founder", "CEO").' },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA per slide',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Contact Us',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
  ],
}
