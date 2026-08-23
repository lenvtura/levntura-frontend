/**
 * Schema-push safety for the Postgres adapter.
 *
 * `push: true` makes Payload auto-sync the schema on boot. That is genuinely
 * useful against a throwaway local database and actively dangerous anywhere
 * else — it can add or drop columns with no migration and no review.
 *
 * The previous rule was `push: process.env.NODE_ENV !== 'production'`, which
 * looks safe but is not: NODE_ENV is not 'production' when you run a seed
 * script, a migration helper, or a local dev server from your laptop, and any
 * of those pointed at a shared DATABASE_URL will silently push. That is how
 * this project's production database ended up carrying schema that none of its
 * committed migrations described — leaving `payload migrate` unable to run and
 * needing a hand-written migration to reconcile.
 *
 * So the target matters more than the mode: push only when the database is
 * demonstrably local. Pointing a local process at a remote database is now
 * inert by default rather than mutating.
 *
 * Escape hatch: set PAYLOAD_DB_PUSH=true to force it on (a remote scratch
 * database you own), or PAYLOAD_DB_PUSH=false to force it off entirely.
 */

const LOCAL_DB_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '::1',
  '0.0.0.0',
  'host.docker.internal',
])

/** True only for a connection string pointing at this machine. */
export function isLocalDatabaseUrl(url: string | undefined | null): boolean {
  if (!url) return false
  try {
    // Strip brackets so IPv6 literals (`[::1]`) compare cleanly.
    const host = new URL(url).hostname.replace(/^\[|\]$/g, '')
    return LOCAL_DB_HOSTS.has(host) || host.endsWith('.local')
  } catch {
    return false
  }
}

/** Just the variables this decision depends on. */
export type PushEnv = {
  DATABASE_URL?: string | undefined
  NODE_ENV?: string | undefined
  PAYLOAD_DB_PUSH?: string | undefined
  VERCEL?: string | undefined
}

/**
 * Whether the adapter may auto-sync the schema. Takes env as an argument so
 * this is testable without mutating the real process environment.
 */
export function shouldPushSchema(env: PushEnv = process.env): boolean {
  if (env.PAYLOAD_DB_PUSH === 'true') return true
  if (env.PAYLOAD_DB_PUSH === 'false') return false

  // Deployed environments always migrate, never push.
  if (env.NODE_ENV === 'production' || env.VERCEL) return false

  return isLocalDatabaseUrl(env.DATABASE_URL)
}
