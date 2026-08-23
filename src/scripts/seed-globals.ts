/**
 * CLI runner for the globals seed.
 *
 *   pnpm seed:globals
 *
 * Boots Payload directly (no HTTP server needed), runs seedGlobals(),
 * prints the report, and exits with 0/1.
 */

import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { ensureFirstAdmin } from '../lib/seeds/ensureFirstAdmin'
import { seedGlobals } from '../lib/seeds/seedGlobals'

const run = async (): Promise<void> => {
  process.stdout.write('[seed-globals] booting payload...\n')
  const payload = await getPayload({ config })

  await ensureFirstAdmin(payload)

  process.stdout.write('[seed-globals] seeding header + footer + site-settings (en+ar)...\n')
  const report = await seedGlobals(payload)

  process.stdout.write(JSON.stringify(report, null, 2) + '\n')
  process.exit(report.ok ? 0 : 1)
}

run().catch((err) => {
  process.stderr.write(`[seed-globals] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
