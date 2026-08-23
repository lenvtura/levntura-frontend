import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Wire next-intl into the build. The plugin reads `src/i18n/request.ts` per
// request to pick locale + messages — no [locale] folder needed since
// proxy.ts already handles /ar/* routing.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Cache Components is Next 16's experimental aggressive caching. We disable
  // it because it conflicts with reading headers() in the root layout (needed
  // for locale-aware <html dir/lang>).
  cacheComponents: false,

  images: {
    // Vercel's Image Optimization quota is exhausted on this account, so
    // /_next/image returns 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) for
    // any (url, width, quality) combo it hasn't already cached — which is why
    // some images render and others vanish. We bypass the optimizer entirely
    // and serve straight from DO Spaces; right-sizing is done by Payload/sharp
    // at upload time instead (see Media.upload.imageSizes + mediaUrl() in
    // src/lib/url.ts).
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
    ],
    remotePatterns: [
      new URL('https://images.unsplash.com/**'),
      // DO Spaces — path-style URLs (legacy / dev tooling).
      {
        protocol: 'https',
        hostname: 'sfo3.digitaloceanspaces.com',
        port: '',
        pathname: '/levntura/**',
      },
      // DO Spaces — virtual-hosted URLs (the format Payload's s3Storage
      // plugin returns when `forcePathStyle: false`).
      {
        protocol: 'https',
        hostname: 'levntura.sfo3.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
      // Production + apex (absolute media URLs saved with these hosts).
      {
        protocol: 'https',
        hostname: 'www.levntura.com',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'levntura.com',
        pathname: '/api/media/**',
      },
      // Vercel preview deployments
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/api/media/**',
      },
      // Flag icons for the locale toggle
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
})
