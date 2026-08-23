import type { CollectionBeforeChangeHook } from 'payload'

const resolvePathForSlug = (slug: string): string =>
  !slug || slug === 'home' ? '/' : `/${slug}`

export const buildFullPath: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
}) => {
  const slug = typeof data.slug === 'string' ? data.slug : ''
  const ownPath = resolvePathForSlug(slug)

  if (!data.parent) {
    data.fullPath = ownPath
    return data
  }

  const parentId =
    typeof data.parent === 'object' && data.parent !== null
      ? (data.parent as { id?: string | number }).id
      : data.parent

  if (!parentId) {
    data.fullPath = ownPath
    return data
  }

  try {
    const parent = (await payload.findByID({
      collection: 'pages',
      id: parentId as string | number,
      depth: 0,
      overrideAccess: true,
    })) as { fullPath?: string; slug?: string } | null

    const parentPath =
      parent?.fullPath || resolvePathForSlug(parent?.slug || '')

    data.fullPath =
      parentPath === '/'
        ? ownPath
        : `${parentPath}${ownPath === '/' ? '' : ownPath}`
  } catch (err) {
    payload.logger.warn(
      `[buildFullPath] could not resolve parent ${parentId}: ${(err as Error).message}`,
    )
    data.fullPath = ownPath
  }

  return data
}
