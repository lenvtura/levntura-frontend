/**
 * CLI runner for the combined site seed (forms + pages).
 *
 *   pnpm seed:site
 *
 * Boots Payload, runs seedSite(), prints the report, exits 0/1.
 */

import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { ensureFirstAdmin } from '../lib/seeds/ensureFirstAdmin'
import { flushSeedTranslations } from '../hooks/seedTranslation'
import { seedSite } from '../lib/seeds/seedSite'

const run = async (): Promise<void> => {
  process.stdout.write('[seed-site] booting payload...\n')
  const payload = await getPayload({ config })

  await ensureFirstAdmin(payload)

  process.stdout.write('[seed-site] seeding forms + pages...\n')
  const report = await seedSite(payload)

  process.stdout.write(JSON.stringify(report, null, 2) + '\n')
  // Let the deferred EN→AR translation copies finish before exiting —
  // process.exit would kill the ones still in flight.
  await flushSeedTranslations()
  process.exit(report.ok ? 0 : 1)
}

run().catch((err) => {
  process.stderr.write(`[seed-site] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
