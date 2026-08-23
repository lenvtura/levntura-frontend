import type { Block } from 'payload'

const BG_COLORS = [
  { label: 'Transparent / None', value: 'none' },
  { label: 'White', value: 'white' },
  { label: 'Brand Yellow Light', value: 'lev-yellow-light' },
  { label: 'Brand Blue Light', value: 'lev-blue-light' },
  { label: 'Brand Green Light', value: 'lev-green-light' },
  { label: 'Brand Pink', value: 'lev-pink' },
] as const

const HEADING_COLORS = [
  { label: 'Brand Red Dark', value: 'lev-red-dark' },
  { label: 'Brand Blue Dark', value: 'lev-blue-dark' },
  { label: 'Brand Green Dark', value: 'lev-green-dark' },
  { label: 'Brand Black', value: 'lev-black' },
] as const

const STAT_VALUE_COLORS = [
  { label: 'Brand Orange', value: 'lev-orange' },
  { label: 'Brand Red', value: 'lev-red' },
  { label: 'Brand Blue', value: 'lev-blue' },
  { label: 'Brand Green', value: 'lev-green' },
  { label: 'Brand Yellow', value: 'lev-yellow' },
] as const

/**
 * EducationStats — mirrors `app/about/eduction-and-purposes.tsx`.
 *
 * Split section:
 *   Left  — heading + intro paragraph + outlined CTA button.
 *   Right — 2x2 grid (up to 4 cells), each: value + label + description.
 *
 * Used on About as the "HIGHER EDUCATION GREATER IMPACT" section right after
 * the hero. Different from MissionStats because:
 *   - MissionStats has a horizontal stats row + colored bg (mission theme)
 *   - This has a 2x2 stats grid where each stat has its own paragraph
 *     describing what the number means.
 */
export const EducationStatsBlock: Block = {
  slug: 'educationStats',
  labels: { singular: 'Education Stats', plural: 'Education Stats Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'HIGHER EDUCATION\nGREATER IMPACT',
      admin: { description: 'Use \\n for line breaks.' },
    },
    {
      name: 'paragraph',
      type: 'textarea',
      localized: true,
      defaultValue:
        "At Levntura, we cultivate the next generation of global achievers through immersive, life-changing educational journeys. Our tailor-made programs go beyond studying abroad—they shape leaders who think globally, act compassionately, and create change wherever they go. With Levntura, every student gains access to the world's classrooms, industries, and cultures—unlocking a future without limits.",
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: 'PROGRAMS',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/programs',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 0,
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      admin: {
        description:
          'Up to 4 stats. Renders as 2 columns × 2 rows. Each stat: number + label + description.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'e.g. "1.5K", "20+", "6.5K"' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'Short label next to the value, e.g. "UNIVERSITIES"' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: { description: 'Paragraph below explaining the number.' },
        },
      ],
      defaultValue: [
        {
          value: '1.5K',
          label: 'UNIVERSITIES',
          description:
            'Our global partnerships connect students to 1.5K prestigious universities and institutions, opening doors to academic excellence and professional growth.',
        },
        {
          value: '6.5K',
          label: 'STUDENTS',
          description:
            'A thriving community of more than 6.5K ambitious youth who turned opportunities into success stories and lifelong global networks.',
        },
        {
          value: '20+',
          label: 'COUNTRIES',
          description:
            'From the historic charm of Europe to the innovation hubs of North America and the cultural richness of Asia—our reach spans across continents.',
        },
        {
          value: '8+',
          label: 'YEARS OF IMPACT',
          description:
            'With over a decade of experience, Levntura continues to empower Middle Eastern youth through trusted, transformative exchange programs worldwide.',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'none',
      enumName: 'enum_edu_stats_bg',
      options: [...BG_COLORS],
    },
    {
      name: 'headingColor',
      type: 'select',
      defaultValue: 'lev-red-dark',
      enumName: 'enum_edu_stats_heading',
      options: [...HEADING_COLORS],
    },
    {
      name: 'statValueColor',
      type: 'select',
      defaultValue: 'lev-orange',
      enumName: 'enum_edu_stats_value',
      options: [...STAT_VALUE_COLORS],
    },
  ],
}
