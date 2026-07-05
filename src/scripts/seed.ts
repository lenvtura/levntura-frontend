import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { ensureFirstAdmin } from '../lib/seeds/ensureFirstAdmin'

const log = (msg: string) => {
  process.stdout.write(`[seed] ${msg}\n`)
}

const isConfigured = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === 'object') return Object.keys(value).length > 0
  return false
}

const seed = async (): Promise<void> => {
  log('booting payload...')
  const payload = await getPayload({ config })

  // Bootstrap the first admin if the Users table is empty. Idempotent.
  await ensureFirstAdmin(payload)

  log('checking site-settings...')
  const settings = (await payload.findGlobal({
    slug: 'site-settings',
  })) as unknown as Record<string, unknown> | null
  if (settings && isConfigured(settings.siteName)) {
    log('site-settings already configured — skipping')
  } else {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Levntura',
        titleTemplate: '%s | Levntura',
        defaultTitle: 'Levntura — Study Abroad & Work and Travel Programs',
        defaultDescription:
          'Levntura connects students with international study abroad, work and travel, internships, and cultural exchange programs.',
        maintenanceMode: false,
        email: { enabled: false, fromName: 'Levntura' },
      },
    })
    log('✓ site-settings seeded')
  }

  log('checking footer...')
  const footer = (await payload.findGlobal({
    slug: 'footer',
  })) as unknown as Record<string, unknown> | null
  if (footer && isConfigured(footer.copyright)) {
    log('footer already configured — skipping')
  } else {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        showLogo: true,
        tagline: 'Connecting students to global opportunities.',
        showWatermark: true,
        copyright: `© ${new Date().getFullYear()} Levntura. All rights reserved.`,
        bottomLinks: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
        ],
      },
    })
    log('✓ footer seeded')
  }

  log('checking header...')
  const header = (await payload.findGlobal({
    slug: 'header',
  })) as unknown as Record<string, unknown> | null
  if (header && isConfigured(header.navigation)) {
    log('header already configured — skipping')
  } else {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navigation: [
          { label: 'Home', type: 'external', externalURL: '/' },
          { label: 'About', type: 'external', externalURL: '/about' },
          { label: 'Programs', type: 'external', externalURL: '/programs' },
          { label: 'Blog', type: 'external', externalURL: '/blogs' },
          { label: 'Contact', type: 'external', externalURL: '/contact' },
        ],
        cta: {
          enabled: true,
          label: 'Apply Now',
          url: '/contact',
        },
      },
    })
    log('✓ header seeded (links use /external paths — switch to page refs once Pages exist)')
  }

  log('done.')
  process.exit(0)
}

seed().catch((err) => {
  process.stderr.write(`[seed] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
