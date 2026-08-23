import type { AccessArgs } from 'payload'


export const anyone = ({ req: { user } }: AccessArgs) => true