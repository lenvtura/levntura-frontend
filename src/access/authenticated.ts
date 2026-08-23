import type { AccessArgs } from 'payload'


export const authenticated = ({ req: { user } }: AccessArgs) => Boolean(user)