import type { Block } from 'payload'

export const HeroHomeBlock: Block = {
  slug: 'heroHome',
  labels: {
    singular: 'Hero — Home page',
    plural: 'Hero — Home pages',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional small text above the headline.',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Explore with Levntura!',
      admin: {
        description: 'Main headline. Will be rendered with a stroked outline style.',
      },
    },
    {
      name: 'subheadline',
      type: 'text',
      localized: true,
      defaultValue: 'Where Learning Meets Adventure',
    },
    {
      name: 'backgroundType',
      type: 'radio',
      defaultValue: 'image',
      admin: {
        description: 'Use an uploaded image or a solid brand color as the hero background.',
        layout: 'horizontal',
      },
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Solid color', value: 'color' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Full-screen hero background. 1920x1080+ recommended.',
        condition: (_, sib) => sib?.backgroundType !== 'color',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'lev-blue',
      admin: {
        description: 'Pick a brand color for the hero background.',
        condition: (_, sib) => sib?.backgroundType === 'color',
      },
      options: [
        { label: 'Brand Blue', value: 'lev-blue' },
        { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
        { label: 'Brand Green Dark', value: 'lev-green-dark' },
        { label: 'Brand Green', value: 'lev-green' },
        { label: 'Brand Red', value: 'lev-red' },
        { label: 'Brand Orange', value: 'lev-orange' },
        { label: 'Brand Yellow', value: 'lev-yellow' },
        { label: 'Brand Black', value: 'lev-black' },
      ],
    },
    {
      name: 'opportunities',
      type: 'array',
      labels: { singular: 'Opportunity', plural: 'Opportunities' },
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        { label: 'Study & Travel' },
        { label: 'Work & Travel' },
        { label: 'Internship' },
        { label: 'Counselor' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Start Your Global Experience',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'showSocialIcons',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Render social share icons. Pulled from Site Settings → Social Links.',
      },
    },

    // Intro section — the heading + two paragraphs that appear below the
    // hero. Visually they sit on a white background that overlaps the
    // bottom 200px of the hero image (the "peek" pattern). Mirrors the
    // text-only portion of the legacy `app/(home)/travel-img-section.tsx`.
    //
    // The destination image strip that overlays this section visually
    // is its own block (`travelDestinations`) — kept separate so editors
    // can show/hide it independently of the intro text.
    {
      name: 'intro',
      type: 'group',
      label: 'Intro Section (below hero)',
      admin: {
        description:
          'Optional text section that appears below the hero — heading + 2 paragraph columns. Leave all fields empty to skip it entirely.',
      },
      fields: [
        {
          // Textarea (not text) so editors can press Enter for explicit
          // line breaks — rendered via `whitespace-pre-line` on the
          // frontend. Matches the legacy static heading which used
          // `<br />` between "Lead,", "Explore", and "the World".
          name: 'heading',
          type: 'textarea',
          localized: true,
          defaultValue: 'Empowering Youth to Lead,\nLearn, and Explore\nthe World',
          admin: {
            description:
              'Section heading on the left column. Rendered uppercase in the brand SectionTitle style. Press Enter to control line breaks.',
            rows: 3,
          },
        },
        {
          name: 'paragraph1',
          type: 'textarea',
          localized: true,
          defaultValue:
            "Levntura isn't just about travel or study—it's about transformation. We help young minds step beyond their comfort zones, discover their potential, and develop leadership skills that last a lifetime. Through immersive cultural exchange and global learning programs, we shape the next generation of confident, capable, and connected leaders.",
          admin: {
            description: 'Left column paragraph (under the heading).',
          },
        },
        {
          name: 'paragraph2',
          type: 'textarea',
          localized: true,
          defaultValue:
            "From our headquarters in Amman, Jordan, to our regional office in Cairo, Egypt, Levntura bridges Middle Eastern youth with international opportunities across North America, Europe, and Australia. Our mission goes beyond education—it's about sparking ambition, encouraging curiosity, and nurturing growth. We believe every student deserves a chance to experience the world, build resilience, and return home ready to make a difference.",
          admin: {
            description: 'Right column paragraph. Leave empty for a single-column layout.',
          },
        },
      ],
    },
  ],
}
