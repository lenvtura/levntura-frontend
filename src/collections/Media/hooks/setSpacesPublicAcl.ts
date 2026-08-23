import type { CollectionAfterChangeHook } from 'payload'
import { PutObjectAclCommand, S3Client } from '@aws-sdk/client-s3'

import { isSpacesConfigured, spacesEnv, spacesObjectKey } from '../../../lib/storage/spaces'

const ATTEMPTS = 3
const RETRY_BASE_MS = 250

let client: S3Client | null = null

function getS3Client(): S3Client {
  if (!client) {
    client = new S3Client({
      endpoint: spacesEnv('DO_SPACES_ENDPOINT'),
      region: spacesEnv('DO_SPACES_REGION'),
      credentials: {
        accessKeyId: spacesEnv('DO_SPACES_ACCESS_KEY'),
        secretAccessKey: spacesEnv('DO_SPACES_SECRET_KEY'),
      },
      forcePathStyle: false,
    })
  }
  return client
}

/**
 * Ensure every uploaded media object is publicly readable on Spaces.
 *
 * Two reasons an object can land private: clientUploads omits `x-amz-acl` from
 * the browser PUT, and the s3Storage plugin is deliberately configured without
 * `acl` (setting it breaks the signed client upload — see payload.config.ts).
 *
 * This covers the original AND every `imageSizes` variant. Variants are
 * separate S3 objects written by sharp at upload time, so ACLing only
 * `doc.filename` would leave `thumbnail`/`card`/`feature`/`og` unreadable and
 * the front end would 403 on exactly the right-sized images it now prefers.
 */
export const setSpacesPublicAcl: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!isSpacesConfigured()) return doc

  const prefix = typeof doc.prefix === 'string' ? doc.prefix : null

  const filenames: string[] = []
  if (typeof doc.filename === 'string') filenames.push(doc.filename)

  const sizes = doc.sizes as Record<string, { filename?: string | null }> | undefined
  if (sizes) {
    for (const size of Object.values(sizes)) {
      // A size is absent when the original was smaller than the target
      // (withoutEnlargement) or the file is not a raster image.
      if (size?.filename) filenames.push(size.filename)
    }
  }

  const client = getS3Client()
  const bucket = spacesEnv('DO_SPACES_BUCKET')

  await Promise.all(
    filenames.map(async (filename) => {
      const key = spacesObjectKey(filename, prefix)

      // Spaces can 500 on an object the storage adapter has only just written
      // — the ACL call races the upload it belongs to. Observed reliably on
      // size variants, and a plain retry a moment later always succeeds, so
      // back off briefly rather than logging a scary warning for a
      // self-correcting condition.
      for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
        try {
          await client.send(
            new PutObjectAclCommand({ Bucket: bucket, Key: key, ACL: 'public-read' }),
          )
          return
        } catch (err) {
          if (attempt === ATTEMPTS) {
            req.payload.logger.warn(
              `[media] could not set public-read ACL for ${key} after ${ATTEMPTS} attempts: ${
                err instanceof Error ? err.message : 'unknown error'
              }`,
            )
            return
          }
          await new Promise((resolve) => setTimeout(resolve, attempt * RETRY_BASE_MS))
        }
      }
    }),
  )

  return doc
}
