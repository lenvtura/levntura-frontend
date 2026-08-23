# i18n Migration — Status

Where the localization review stands, plus the SEO/structured-data work that
followed. Hand-off notes for the next person.

Last updated: 2026-06-25

## The four recommendations

| # | Recommendation | Status |
|---|---|---|
| 1 | Use a standard i18n library (next-intl) | Done |
| 2 | Locale-based routing via URL segments | Done |
| 3 | Centralize locale handling | Done |
| 4 | Organize translation files by namespace | Done |

A note on #2: the routing uses `localePrefix: 'as-needed'`, so English stays at
the root (`/about`) and only Arabic carries a prefix (`/ar/about`) — not the
literal `/en/about` from the write-up. That keeps the existing English URLs and
SEO paths intact. Worth a quick confirm with whoever wrote the review, but it's
the safer choice for a site that's already live.

## What was done

### Foundations (recs #3 and #4)

Every `getX()` fetcher in `src/lib/api.ts` now takes an optional `locale`. Leave
it out and `resolveRequestLocale()` resolves the active locale, so there's no
more threading it through every layer by hand. Translation files were split by
locale and namespace under `src/messages/` (`en/` and `ar/`, each with
`common.json`, `blogs.json`, `programs.json`).

### next-intl (rec #1)

Added `next-intl@^4.13`, wired `createNextIntlPlugin('./src/i18n/request.ts')`
in `next.config.ts`, and wrapped the app in `NextIntlClientProvider` so client
components can call `useTranslations()` and server components `getTranslations()`.
The five components that used the old manual dictionary (`blogs-header`,
`blogs-grid`, `become-part-of-conversation`, `programs-hero`, `programs-header`)
were migrated, the `locale` prop-drilling through `BlogsClient` / `ProgramsView`
was dropped, and the legacy `src/lib/i18n.ts` was deleted.

### Routing (rec #2)

Native `[locale]` routing replaced the old `proxy.ts` rewrite:

- `src/i18n/routing.ts` defines the locales (`en`, `ar`), default (`en`),
  `localePrefix: 'as-needed'`, and `localeDetection: false` (no
  Accept-Language auto-redirect, so English stays at the root).
- `src/i18n/navigation.ts` exports the locale-aware `Link`, `redirect`,
  `usePathname`, `useRouter`, `getPathname`. Use these for internal navigation.
- `src/i18n/request.ts` reads the locale from the `[locale]` segment and loads
  the message namespaces.
- `src/proxy.ts` wraps `createMiddleware(routing)` and keeps the ipinfo.io
  country lookup (English shell only). The matcher excludes `api`, `admin`,
  `_next`, `favicon`, and `sitemap`/`robots`.
- The whole `(frontend)` route tree moved under `[locale]/`. `globals.css`,
  `typography.css`, `favicon.ico`, and the sitemap/robots routes stay at the
  `(frontend)` root (they aren't localized).
- `[locale]/layout.tsx` validates the locale (`notFound()` on an unknown one),
  calls `setRequestLocale`, and exports `generateStaticParams` for both locales.
  `LivePreviewRefresh` is wrapped in `Suspense` so its `useSearchParams()`
  doesn't break static prerendering.

The legacy locale-link system was then removed: every `LocaleLink` / `next/link`
+ `localePath()` was swapped for the `Link` from `@/i18n/navigation`, and
`locale-link.tsx`, `use-locale.ts`, and the `localePath()` export were deleted.
`LocaleToggle` was deliberately kept on plain anchors so switching language does
a full reload (fresh translated content and the correct `dir`).

One bug surfaced during that cleanup: `header.tsx`, `footer.tsx`,
`blog-posts-list.tsx`, and the `resolveRequestLocale()` fallback were still
reading the old `x-locale` header (gone after the middleware swap), so they
rendered English navigation on Arabic pages. They all resolve the locale through
`getLocale()` now.

## Review pass — fixes and SEO completion

A review of the migration, plus the follow-up SEO and structured-data work.
`npx tsc --noEmit` and `pnpm build` both pass clean (33 pages).

### Bugs fixed

- Arabic pages were declaring the English URL as their canonical
  (`${SITE_URL}${fullPath}`), which tells Google the Arabic page is a duplicate.
  Added `localeCanonical()` in `lib/url.ts`; each locale is self-canonical now,
  and the editor's `meta.canonicalURL` overrides it when set.
- Six files (careers + travel-destinations) still imported `next/link`, so their
  internal links dropped the locale on `/ar/*` pages. Moved them to
  `@/i18n/navigation`.
- `translationComplete` reset itself on every English publish — the
  `translationGate` hook compared `sections` with `JSON.stringify`, which
  false-positived and wiped the flag. The auto-reset was removed; it's a manual
  flag now, and the guard that blocks publishing an incomplete Arabic version
  stays.

### SEO fields (were saved in the admin but never rendered)

The admin had `meta`, `openGraph`, and `structuredData` as top-level groups on
the doc, but `lib/types.ts` modelled them as nested under `meta`, so the page
read the wrong path. The types were corrected, then wired up:

- No Index / No Follow now emit `robots` metadata.
- Open Graph title/description/image override the meta fields and fall back to
  them when empty.
- The low-value OG `type` field was removed from the admin (it's hardcoded).
- The Programs detail and category pages had no `generateMetadata` at all —
  added title, description, canonical, OG, and robots so they match the rest.

### Structured data (JSON-LD)

The schema fields collected data but nothing output it. Added
`components/json-ld.tsx` and `lib/structuredData.ts`:

- Blog posts emit `BlogPosting`, built automatically from the post's own fields.
  The manual Article Schema field group was removed from the collection.
- Programs emit `Course`, built automatically from the program; the `course`
  group (mode, level, dates) is optional enrichment.
- Pages let the editor pick the type (`WebPage` / `AboutPage` / `ContactPage` /
  `FAQPage` / Auto); an FAQ block produces `FAQPage` from its questions.

## Running it

```powershell
pnpm dev
# one app, one port (3000) — site + Payload admin together
```

Quick checks:

- `/blogs` → "BLOGS"; `/ar/blogs` → "المدونة"
- `/programs` → "OUR PROGRAMS" + "All" filter; `/ar/programs` → "برامجنا" + "الكل"
- View-source a blog and a program page and look for the `application/ld+json`
  block and a `rel="canonical"` that carries `/ar` on Arabic pages.

If something shows a raw key (e.g. `blogs.heading` instead of "BLOGS"), the
namespace is missing from `request.ts` or the layout isn't wrapping the page in
`NextIntlClientProvider`.

## Files touched

```
Migration:
  M  src/lib/api.ts, server-request.ts, nav.ts
  M  next.config.ts, src/proxy.ts
  A  src/i18n/{routing,navigation,request}.ts
  A  src/messages/{en,ar}/{common,blogs,programs}.json
  D  src/lib/i18n.ts, src/components/locale-link.tsx, src/lib/use-locale.ts
  (entire (frontend) tree moved under [locale]/)

Review pass:
  M  src/lib/types.ts, url.ts
  A  src/lib/structuredData.ts, src/components/json-ld.tsx
  M  src/hooks/translationGate.ts
  M  src/collections/Blog/index.ts
  M  src/fields/seo/index.ts, courseSchema.ts
  D  src/fields/seo/articleSchema.ts
  M  (frontend)/[locale]/{[[...slug]],blogs/[slug],blogs/category/[slug]}/page.tsx
  M  (frontend)/[locale]/programs/{[programSlug],category/[typeSlug]}/page.tsx
  M  (frontend)/[locale]/careers/{job-detail-content,job-listing-card,job-opportunity-card,related-programs,suggest-new-opportunities}.tsx
  M  src/components/blocks/travel-destinations-strip.tsx
```

## Notes

- Routing keeps English at the root (`as-needed`) rather than an `/en/about`
  prefix, so the existing URLs and SEO paths stay intact. Switching to an
  explicit `/en` prefix is a one-line change in `i18n/routing.ts` if preferred.
- `push: true` is on for local development. For production, set it to
  `process.env.NODE_ENV !== 'production'` and apply schema changes through the
  committed migrations (`pnpm payload migrate`).
