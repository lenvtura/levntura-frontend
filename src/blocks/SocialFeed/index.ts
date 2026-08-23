import type { Block } from 'payload'

/**
 * SocialFeed — mirrors `social-media-section.tsx`.
 *
 * Stats strip (number + category + paragraph) + community banner with a
 * full-bleed image, platform branding, heading, and a CTA.
 */

const BRAND_COLOR_OPTIONS = [
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Pink', value: 'lev-pink' },
] as const

export const SocialFeedBlock: Block = {
  slug: 'socialFeed',
  labels: { singular: 'Social Feed', plural: 'Social Feeds' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      admin: {
        description: 'Numbered highlights across the top. 3 items by default.',
      },
      defaultValue: [
        {
          number: '6.5K',
          numberColor: 'lev-blue-light',
          category: 'Students',
          paragraph:
            "Join a thriving community of passionate learners who've turned curiosity into opportunity—gaining skills, confidence, and global experience through Levntura's programs.",
        },
        {
          number: '1.5K',
          numberColor: 'lev-yellow',
          category: 'Universities',
          paragraph:
            'From world-renowned institutions to innovative learning centers, our academic collaborations create powerful bridges between education and real-world experience.',
        },
        {
          number: '20+',
          numberColor: 'lev-green-light',
          category: 'Countries',
          paragraph:
            "Explore the world through Levntura—from Europe's cultural capitals to the breathtaking coasts of North America and Asia's vibrant cities. Every destination offers a story waiting to be lived.",
        },
      ],
      fields: [
        { name: 'number', type: 'text', required: true },
        {
          name: 'numberColor',
          type: 'select',
          defaultValue: 'lev-blue-light',
          options: [...BRAND_COLOR_OPTIONS],
        },
        { name: 'category', type: 'text', required: true, localized: true },
        { name: 'paragraph', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'communityHeading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'JOIN OUR\nFACEBOOK COMMUNITY',
      admin: { description: 'Title on the banner. Use \\n for a line break.' },
    },
    {
      name: 'communityDescription',
      type: 'textarea',
      localized: true,
      defaultValue:
        "Connect with thousands of Levntura students and alumni from around the world. Share your experiences, ask questions, and get insider tips from those who've already lived the adventure.",
    },
    {
      name: 'platform',
      type: 'select',
      defaultValue: 'facebook',
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'YouTube', value: 'youtube' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Banner background image. Falls back to the original happy-friendship photo if empty.',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Banner CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'Join now!',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: 'https://www.facebook.com/levntura',
        },
      ],
    },
  ],
}
