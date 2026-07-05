/**
 * Local type for the legacy blog data files. Mirrors the original
 * BlogDetail shape from the frontend (without `StaticImageData` since
 * we only deal with string URLs in the seed).
 */
export interface BlogSection {
  id: string
  title: string
  content: string
  image?: string
  imagePosition?: 'left' | 'right' | 'full'
}

export interface BlogDetail {
  slug: string
  heroImage: string
  heroImageAlt?: string
  breadcrumbs: string[]
  title: string
  sections: BlogSection[]
  seo?: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
  }
  pastStudent?: {
    image: string
    name: string
    bio: string
  }
  moreToRead?: {
    title: string
    subtitle: string
    description: string
    images: string[]
  }
}
