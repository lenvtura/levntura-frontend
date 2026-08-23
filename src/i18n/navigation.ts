/**
 * Locale-aware navigation helpers, generated from `routing.ts`.
 *
 * These are drop-in replacements for the matching `next/link` /
 * `next/navigation` exports. The difference: they automatically add the
 * active locale prefix (`/ar`) to internal hrefs and strip it back out of
 * `usePathname()`, so callers never thread the locale by hand.
 *
 * Use these everywhere INTERNAL navigation happens instead of importing
 * straight from `next/link` / `next/navigation`. External URLs, mailto/tel
 * and hash links are passed through untouched.
 */

import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
