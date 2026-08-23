import { revalidatePath } from '../../../hooks/revalidatePath'

export const revalidatePage = revalidatePath('pages', (doc) => {
  const fullPath = typeof doc.fullPath === 'string' ? doc.fullPath : null
  if (fullPath) return fullPath
  const slug = typeof doc.slug === 'string' ? doc.slug : ''
  return slug === 'home' || !slug ? '/' : `/${slug}`
})
