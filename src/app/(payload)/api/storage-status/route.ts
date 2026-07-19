import { missingSpacesEnvKeys, isSpacesConfigured } from '@/lib/storage/spaces'

/**
 * Debug: open this on the deployment to see if Spaces/clientUploads can load.
 * Does not expose secret values — only which env names are missing.
 *
 *   GET /api/storage-status
 */
export async function GET(): Promise<Response> {
  const missing = missingSpacesEnvKeys()
  const spacesConfigured = isSpacesConfigured()

  return Response.json({
    spacesConfigured,
    clientUploadsEnabled: spacesConfigured,
    missing,
    vercel: Boolean(process.env.VERCEL),
    vercelEnv: process.env.VERCEL_ENV ?? null,
    hint: spacesConfigured
      ? 'Spaces is ON — admin should call /api/storage-s3-generate-signed-url on upload.'
      : 'Spaces is OFF — admin will PATCH /api/media (old flow). Set missing keys for this Vercel environment (Preview vs Production) and redeploy.',
  })
}
