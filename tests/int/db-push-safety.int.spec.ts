import { describe, expect, it } from 'vitest'

import { isLocalDatabaseUrl, shouldPushSchema } from '@/lib/db'

/**
 * Guards the rule that stopped production schema drift: `push` may only ever
 * be on for a local database. A regression here is silent and expensive — it
 * lets a laptop mutate a shared database's schema with no migration.
 */
describe('isLocalDatabaseUrl', () => {
  it('accepts local hosts', () => {
    expect(isLocalDatabaseUrl('postgresql://u:p@localhost:5432/db')).toBe(true)
    expect(isLocalDatabaseUrl('postgresql://u:p@127.0.0.1:5432/db')).toBe(true)
    expect(isLocalDatabaseUrl('postgresql://u:p@[::1]:5432/db')).toBe(true)
    expect(isLocalDatabaseUrl('postgresql://u:p@host.docker.internal/db')).toBe(true)
    expect(isLocalDatabaseUrl('postgresql://u:p@mymachine.local/db')).toBe(true)
  })

  it('rejects remote hosts, including the managed Postgres this broke on', () => {
    expect(
      isLocalDatabaseUrl('postgresql://u:p@ep-x.us-east-1.aws.neon.tech/neondb'),
    ).toBe(false)
    expect(isLocalDatabaseUrl('postgresql://u:p@db.example.com:5432/db')).toBe(false)
  })

  it('rejects empty and malformed values rather than assuming local', () => {
    expect(isLocalDatabaseUrl(undefined)).toBe(false)
    expect(isLocalDatabaseUrl(null)).toBe(false)
    expect(isLocalDatabaseUrl('')).toBe(false)
    expect(isLocalDatabaseUrl('not a url')).toBe(false)
  })
})

describe('shouldPushSchema', () => {
  const remote = 'postgresql://u:p@ep-x.us-east-1.aws.neon.tech/neondb'
  const local = 'postgresql://u:p@localhost:5432/db'

  it('pushes for a local database in development', () => {
    expect(shouldPushSchema({ DATABASE_URL: local })).toBe(true)
  })

  it('does NOT push to a remote database, even outside production', () => {
    // The exact hole in the old `NODE_ENV !== 'production'` rule: seed scripts
    // and local dev servers run with NODE_ENV unset.
    expect(shouldPushSchema({ DATABASE_URL: remote })).toBe(false)
    expect(shouldPushSchema({ DATABASE_URL: remote, NODE_ENV: 'development' })).toBe(false)
  })

  it('never pushes in production or on Vercel', () => {
    expect(shouldPushSchema({ DATABASE_URL: local, NODE_ENV: 'production' })).toBe(false)
    expect(shouldPushSchema({ DATABASE_URL: local, VERCEL: '1' })).toBe(false)
  })

  it('honours the explicit override in both directions', () => {
    expect(shouldPushSchema({ DATABASE_URL: remote, PAYLOAD_DB_PUSH: 'true' })).toBe(true)
    expect(shouldPushSchema({ DATABASE_URL: local, PAYLOAD_DB_PUSH: 'false' })).toBe(false)
    // An explicit opt-in still loses to production.
    expect(
      shouldPushSchema({ DATABASE_URL: local, NODE_ENV: 'production', PAYLOAD_DB_PUSH: 'false' }),
    ).toBe(false)
  })

  it('does not push when DATABASE_URL is missing', () => {
    expect(shouldPushSchema({})).toBe(false)
  })
})
