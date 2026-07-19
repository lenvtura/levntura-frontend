/** DigitalOcean Spaces public URL helpers (S3-compatible). */

export function isSpacesConfigured(): boolean {
  return Boolean(
    process.env.DO_SPACES_BUCKET?.trim() &&
      process.env.DO_SPACES_ENDPOINT?.trim() &&
      process.env.DO_SPACES_REGION?.trim() &&
      process.env.DO_SPACES_ACCESS_KEY?.trim() &&
      process.env.DO_SPACES_SECRET_KEY?.trim(),
  )
}

/** e.g. `https://levntura.sfo3.digitaloceanspaces.com/photo.webp` */
export function spacesFileUrl(filename: string, prefix?: string | null): string {
  const bucket = process.env.DO_SPACES_BUCKET!.trim()
  const endpoint = process.env.DO_SPACES_ENDPOINT!.trim().replace(/^https?:\/\//i, '')
  const key = [prefix?.replace(/^\/+|\/+$/g, ''), filename.replace(/^\/+/, '')]
    .filter(Boolean)
    .join('/')
  return `https://${bucket}.${endpoint}/${key}`
}
