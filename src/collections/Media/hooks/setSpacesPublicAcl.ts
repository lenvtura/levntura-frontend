import type { CollectionAfterChangeHook } from 'payload'
import { PutObjectAclCommand, S3Client } from '@aws-sdk/client-s3'

import { isSpacesConfigured, spacesEnv, spacesObjectKey } from '../../../lib/storage/spaces'

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
 * Ensure each uploaded media object is publicly readable on Spaces.
 * clientUploads sometimes leave objects private if the browser omits x-amz-acl.
 */
export const setSpacesPublicAcl: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!isSpacesConfigured()) return doc

  const filename = typeof doc.filename === 'string' ? doc.filename : null
  if (!filename) return doc

  const prefix = typeof doc.prefix === 'string' ? doc.prefix : null
  const key = spacesObjectKey(filename, prefix)

  try {
    await getS3Client().send(
      new PutObjectAclCommand({
        Bucket: spacesEnv('DO_SPACES_BUCKET'),
        Key: key,
        ACL: 'public-read',
      }),
    )
  } catch (err) {
    req.payload.logger.warn(
      `[media] could not set public-read ACL for ${key}: ${
        err instanceof Error ? err.message : 'unknown error'
      }`,
    )
  }

  return doc
}
