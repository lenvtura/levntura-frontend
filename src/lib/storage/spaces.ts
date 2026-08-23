/** DigitalOcean Spaces public URL helpers (S3-compatible). */

const SPACES_ENV_KEYS = [
  'DO_SPACES_BUCKET',
  'DO_SPACES_ENDPOINT',
  'DO_SPACES_REGION',
  'DO_SPACES_ACCESS_KEY',
  'DO_SPACES_SECRET_KEY',
] as const

/** Read env and strip accidental quotes from dashboard pastes. */
export function spacesEnv(name: string): string {
  return (process.env[name] ?? '')
    .trim()
    .replace(/^['"]+|['"]+$/g, '')
}

export function isSpacesConfigured(): boolean {
  return SPACES_ENV_KEYS.every((key) => Boolean(spacesEnv(key)))
}

/** e.g. `https://levntura.sfo3.digitaloceanspaces.com/photo.webp` */
export function spacesFileUrl(filename: string, prefix?: string | null): string {
  const bucket = spacesEnv('DO_SPACES_BUCKET')
  const endpoint = spacesEnv('DO_SPACES_ENDPOINT').replace(/^https?:\/\//i, '')
  const key = [prefix?.replace(/^\/+|\/+$/g, ''), filename.replace(/^\/+/, '')]
    .filter(Boolean)
    .join('/')
  return `https://${bucket}.${endpoint}/${key}`
}

export function spacesObjectKey(
  filename: string,
  prefix?: string | null,
): string {
  return [prefix?.replace(/^\/+|\/+$/g, ''), filename.replace(/^\/+/, '')]
    .filter(Boolean)
    .join('/')
}
