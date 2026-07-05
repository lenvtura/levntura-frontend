import type { Payload } from 'payload'

const log = (msg: string) => {
  process.stdout.write(`[ensure-first-admin] ${msg}\n`)
}

const DEFAULT_EMAIL = 'admin@admin.com'
const DEFAULT_PASSWORD = '123456'
const DEFAULT_NAME = 'mahmoud moselhy'

export interface EnsureFirstAdminResult {
  created: boolean
  email: string
}

export async function ensureFirstAdmin(
  payload: Payload,
): Promise<EnsureFirstAdminResult> {
  const existing = await payload.find({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    limit: 1,
  })

  if (existing.docs[0]) {
    const email = String(existing.docs[0].email ?? '')
    log(`admin already exists (${email}) — skipping`)
    return { created: false, email }
  }

  const email = process.env.FIRST_ADMIN_EMAIL || DEFAULT_EMAIL
  const password = process.env.FIRST_ADMIN_PASSWORD || DEFAULT_PASSWORD
  const name = process.env.FIRST_ADMIN_NAME || DEFAULT_NAME

  const usingDefaults =
    !process.env.FIRST_ADMIN_EMAIL || !process.env.FIRST_ADMIN_PASSWORD
  if (usingDefaults) {
    log('FIRST_ADMIN_EMAIL / FIRST_ADMIN_PASSWORD not set — using defaults')
    log(`  email: ${email} / password: ${password}`)
    log('  CHANGE THIS PASSWORD AFTER FIRST LOGIN.')
  }

  try {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'admin',
      } as never,
    })
    log(`created first admin user: ${email}`)
    return { created: true, email }
  } catch (err) {
    log(`failed to create first admin: ${(err as Error).message}`)
    throw err
  }
}
