import { MetadataRoute } from 'next'
import { BLOGS_DATA } from './blogs/blogs-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://levntura.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date('2025-02-24'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog pages
  const blogPages = BLOGS_DATA.map((blog) => ({
    url: `${baseUrl}${blog.href}`,
    lastModified: new Date('2025-02-24'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
