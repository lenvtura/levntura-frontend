import type { Access } from 'payload'

type MaybeUser = { role?: string } | null | undefined

// Predicates — call directly from route handlers (after payload.auth()).
export const userIsAdmin = (user: MaybeUser): boolean =>
  user?.role === 'admin'

export const userIsEditor = (user: MaybeUser): boolean =>
  user?.role === 'admin' || user?.role === 'editor'

export const userIsContentEditor = (user: MaybeUser): boolean =>
  user?.role === 'admin' ||
  user?.role === 'editor' ||
  user?.role === 'seo'

// Payload Access wrappers — use in collection/global access config.
export const isAdmin: Access = ({ req: { user } }) => userIsAdmin(user)
export const isEditor: Access = ({ req: { user } }) => userIsEditor(user)
export const isContentEditor: Access = ({ req: { user } }) =>
  userIsContentEditor(user)