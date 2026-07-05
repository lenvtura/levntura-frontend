import type { Block } from 'payload'

/**
 * TextTestimonials — mirrors `app/about/testimonial.tsx`.
 *
 * Dark section with a split heading ("STUDENTS\nFEEDBACK" with the first
 * word at 20% opacity) and two animated columns of testimonial cards
 * (one scrolling up, one scrolling down).
 */
export const TextTestimonialsBlock: Block = {
  slug: 'textTestimonials',
  labels: { singular: 'Text Testimonials', plural: 'Text Testimonials' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'testimonial',
      admin: { description: 'Small uppercase label above the heading.' },
    },
    {
      name: 'headingFaded',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'STUDENTS',
      admin: {
        description:
          'First part of the title — rendered at 20% opacity ("ghost" word).',
      },
    },
    {
      name: 'headingSolid',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'FEEDBACK',
      admin: {
        description:
          'Second part of the title — rendered fully opaque on a separate line.',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Testimonial', plural: 'Testimonials' },
      defaultValue: [
        {
          name: 'Yazan Al-Halawani',
          description: 'Highly recommend, experienced people and great service.',
          role: 'Student',
        },
        {
          name: 'Afaf Kamal',
          description: 'My experience with Levntura was amazing.',
          role: 'Student',
        },
        {
          name: 'Huthaifa Alkhateeb',
          description: 'Fantastic program and service!',
          role: 'Student',
        },
      ],
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        {
          name: 'role',
          type: 'text',
          localized: true,
          defaultValue: 'Student',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
