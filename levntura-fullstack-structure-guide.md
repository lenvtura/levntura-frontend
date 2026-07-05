# Levntura — Fullstack Structure Guide

This document is the reference for the unified Levntura app. It explains where every file lives, what it does, and what you would change it for. It replaces the separate backend and frontend structure guides — the two projects have been merged into one.

The app is a single **Next.js (App Router) application with Payload CMS mounted inside it**. The public site lives in the `(frontend)` route group; the Payload admin and API live in the `(payload)` route group. The pages read content through Payload's **Local API** (a direct in-memory call) rather than over HTTP — one domain, one build, one deploy.

---

## Stack

| Piece | What it is |
|---|---|
| Next.js 16 | App Router + Server Components. Hosts both the site and the Payload admin. |
| React 19 | |
| Payload 3.84.1 | Node-based headless CMS. The admin UI is served from `src/app/(payload)/`. |
| PostgreSQL | Via `@payloadcms/db-postgres` (Drizzle ORM under the hood). |
| Lexical | Rich-text editor (`@payloadcms/richtext-lexical`). |
| Form Builder | `@payloadcms/plugin-form-builder` — registers the `forms` and `form-submissions` collections. |
| next-intl 4 | i18n — `[locale]` URL routing, middleware, message namespaces. Wired in `src/i18n/`. |
| Tailwind CSS 4 | Styling, configured CSS-first in `globals.css` (no `tailwind.config.ts`). Plus shadcn-style primitives in `design-system/`. |
| Motion (`motion` v12) | Animations and carousels. |
| Embla Carousel | Every slider. |
| React Hook Form + Zod | Forms and validation. |
| S3 storage | `@payloadcms/storage-s3` — DigitalOcean Spaces, enabled only when `DO_SPACES_BUCKET` is set. |
| Sharp | Image processing (WebP conversion). |
| Resend | Transactional email for form-submission notifications. |
| `@payloadcms/live-preview-react` | Live-preview auto-refresh from the admin. |

Everything runs on a single port (3000 in dev).

---

## Folder tree

```
levntura-full/
├── .env                                          Secrets (not committed)
├── .env.example
├── package.json
├── tsconfig.json                                 @/* -> ./src/*, @payload-config -> src/payload.config.ts
├── next.config.ts                                withPayload + images + cacheComponents:false + webpack
├── postcss.config.mjs                            Tailwind v4 (@tailwindcss/postcss)
├── playwright.config.ts                          E2E test config
├── vitest.config.mts                             Unit test config
├── media/                                         Local media store (dev, when S3 is off)
├── public/
│   └── assets/videos/                            Hero / testimonial mp4s served as static URLs
│
└── src/
    ├── payload.config.ts                          Central config — registers everything
    ├── payload-types.ts                           Auto-generated types (do not edit)
    ├── proxy.ts                                    Middleware: next-intl locale routing + country detection
    │
    ├── i18n/                                       next-intl wiring
    │   ├── routing.ts                             locales ['en','ar'], defaultLocale 'en', localePrefix 'as-needed'
    │   ├── navigation.ts                          locale-aware Link / redirect / usePathname / useRouter
    │   └── request.ts                             per-request locale (from [locale] segment) + message loading
    ├── messages/                                   Translation files, one folder per locale × namespace
    │   ├── en/                                    common.json · blogs.json · programs.json
    │   └── ar/                                    common.json · blogs.json · programs.json
    │
    ├── app/                                        Next.js App Router
    │   ├── (frontend)/                             The public site
    │   │   ├── globals.css                         Tailwind v4 @theme + brand --lev-* variables  (stays at root)
    │   │   ├── typography.css                      typography-* utility classes  (stays at root)
    │   │   ├── favicon.ico
    │   │   ├── sitemap.xml/route.ts                Dynamic XSLT-styled sitemap (Local API) — root, not localized
    │   │   ├── sitemap.xsl/route.ts                Sitemap tree-view styling
    │   │   ├── robots.txt/route.ts                 robots.txt (points at /sitemap.xml)
    │   │   └── [locale]/                           Locale segment — 'en' at root, 'ar' under /ar
    │   │       ├── layout.tsx                      Root: html lang/dir (from params) + Header + Footer + LivePreviewRefresh + ScrollRestore
    │   │       ├── [[...slug]]/page.tsx            Catch-all — home + every CMS page
    │   │       ├── blogs/                          Blog listing + detail + category
    │   │       ├── careers/                        Careers listing + detail (static data)
    │   │       └── programs/                       Programs listing + detail + category + calendly
    │   └── (payload)/                              Payload admin + REST/GraphQL API
    │       ├── layout.tsx
    │       ├── custom.scss
    │       ├── admin/[[...segments]]/              Admin UI catch-all
    │       ├── admin/importMap.js                  Generated import map for admin components
    │       └── api/
    │           ├── [...slug]/route.ts              Payload REST API
    │           ├── graphql/route.ts
    │           ├── graphql-playground/route.ts
    │           └── admin/
    │               ├── seed-blogs/route.ts          On-demand seed endpoints (guarded by secret)
    │               ├── seed-globals/route.ts
    │               ├── seed-site/route.ts
    │               └── submissions/export/route.ts  CSV export of form submissions
    │
    ├── access/                                     Access-control rules (anyone, authenticated, roles)
    ├── fields/                                     Reusable field groups (seo, slug, countries)
    ├── hooks/                                      Shared collection hooks
    ├── blocks/                                     Page-builder block schemas (37) + index.ts
    ├── collections/                                Content collections
    ├── globals/                                    Single-record settings (SiteSettings, Header, Footer)
    ├── migrations/                                 Database migrations
    ├── scripts/                                    Seed entry points + legacy converter
    │
    ├── components/                                 React components
    │   ├── admin/                                  Custom Payload admin components
    │   ├── blocks/                                 One wrapper per CMS block + block-renderer.tsx
    │   ├── sections/                               Shared section utilities
    │   ├── header.tsx · footer.tsx                 Async server components (getHeader / getFooter)
    │   ├── json-ld.tsx                             <script type="application/ld+json"> renderer
    │   ├── live-preview-refresh.tsx · locale-toggle.tsx · scroll-restore.tsx · ...
    │   ├── about/ · gallery/                       Heavy presentation components used by blocks
    │
    ├── lib/                                        Data layer + integration
    │   ├── api.ts                                  Local API wrappers (getX functions)
    │   ├── types.ts                                All TypeScript types (mirror of Payload)
    │   ├── url.ts                                  mediaUrl + resolveCmsUrl + mediaAlt + localeCanonical
    │   ├── structuredData.ts                       JSON-LD builders (Article / Course / Page + FAQ)
    │   ├── server-request.ts                       resolveLocale (next-intl getLocale) + resolvePreview
    │   ├── nav.ts                                  resolveNav + FALLBACK_NAV
    │   ├── livePreview.ts                          Live-preview URL builder + breakpoints
    │   ├── webhooks.ts                             Outbound webhook dispatcher
    │   ├── email/                                  Email adapter + templates
    │   └── seeds/                                  Seed functions + data
    │
    ├── design-system/                              Low-level UI primitives (shadcn-style)
    ├── atoms/                                      Brand-specific small components
    ├── assets/                                     Fonts, icons, logos, photos
    ├── constants/                                  Static lookup data
    ├── helpers/                                    Small pure functions (track-event)
    └── wrappers/                                   Higher-order client wrappers (GTM)
```

> **The `@/*` alias maps to `src/*`.** Both the CMS code and the site code import with `@/...`. Frontend code that imports something living in the app directory must include the route group **and the `[locale]` segment**, e.g. `@/app/(frontend)/[locale]/programs/work-and-travel/jobs-slider`.

---

## Layer 1: Shared building blocks (CMS)

### `src/access/`

Access rules. Each function returns `true`/`false` or a query filter.

| File | What it does | Change it when |
|---|---|---|
| `anyone.ts` | Allows everyone, no login (`() => true`). | Do not change. |
| `authenticated.ts` | Allows any logged-in user. | Do not change. |
| `authenticatedOrPublished.ts` | Admin sees everything; public sees published only. | Do not change. |
| `roles.ts` | `isAdmin`, `isContentEditor`. | You add a role or change permissions. |

### `src/fields/`

| Folder | What it does |
|---|---|
| `seo/` | `meta` / `openGraph` / `sitemap` groups (each **top-level** on the doc, not nested under `meta`) + `pageSchemaFields` (the `structuredData` type picker for Pages) and `courseSchema` (Course enrichment for Programs). Blog needs no schema fields — Article JSON-LD is automatic. |
| `slug/` | Auto-generated slug field factory + `formatSlug`. |
| `countries/` | `PROGRAM_COUNTRY_OPTIONS` — shared by the Programs `country` field and the ProgramsList block filter. |

Where each SEO set is used:
```typescript
// Pages, ProgramTypes, BlogCategories  — structuredData type picker (WebPage/FAQPage…)
fields: [...seoFields, ...pageSchemaFields]
// Blog  — Article JSON-LD is automatic, so no extra schema fields
fields: [...seoFields]
// Programs  — Course enrichment fields (mode / level / dates)
fields: [...seoFields, ...courseSchemaFields]
```

### `src/hooks/`

| File | Runs on | What it does |
|---|---|---|
| `populatePublishedAt.ts` | Draft/publish collections | Stamps the publish date on first publish. |
| `populateDateModified.ts` | Collections with dateModified | Updates dateModified on save. |
| `translationGate.ts` | Localized collections | Blocks publishing the AR version while `translationComplete` is false. (`translationComplete` is a fully manual flag — the old auto-reset on EN edits was removed.) |
| `seedTranslation.ts` | Localized collections | Copies EN values into the AR locale on create. |
| `createRedirectOnSlugChange.ts` | Collections with a slug | Factory: creates a 301 when the slug changes. |
| `revalidatePath.ts` | Frontend-facing collections | Factory: invalidates the Next.js cache **in-process via `next/cache`** when content changes. |
| `notifyFormSubmission.ts` | form-submissions | Sends the Resend email on a new submission. |

> `revalidatePath` used to POST over HTTP to a separate frontend with a shared secret. Now that it's one app, it calls Next's `revalidatePath` directly (dynamic-imported so CLI seed scripts, which run outside a request scope, don't crash).

### `src/blocks/`

The page-builder blocks — 37 in total, one folder per block, plus `index.ts` for exports and groups. Categories: Hero (`Hero`, `HeroHome`, `HeroBlogPost`, `HeroWithImageGrid`, `GalleryHero`, `TravelDestinations`), layout (`RichText`, `Content`, `CTA`, `PromptCTA`, `DecoratedCTA`, `RelatedItems`), media (`Gallery`, `MediaShowcase`, `ImageFeature`, `PartnersCarousel`, `VideoTestimonials`), programs (`ProgramShowcase`, `ProgramsList`, `FeatureCards`, `AlternatingContent`, `BlogPostsList`), people/stats (`FoundersCarousel`, `MissionStats`, `ValuesList`, `TextTestimonials`), forms (`ContactForm`, `FormBlock`, `AddressList`, `MapEmbed`), social (`SocialFeed`), about (`EducationStats`, `VentureGrid`, `MemoriesGrid`), gallery (`PhotoGrid`, `GalleryCta`), and `FAQ`.

Groups defined in `index.ts`:

| Group | Contains | Used by |
|---|---|---|
| `contentBlocks` | Every block except TravelDestinations (Pages-only) and HeroBlogPost (Blog-only). | Pages, Programs (Extra Sections), ProgramTypes. |
| `articleBlocks` | HeroBlogPost, RichText, Content, Gallery, FAQ, CTA. | Blog. |

**Adding a block (five steps):**
1. Create the schema in `src/blocks/MyNewBlock/index.ts` (`enumName` on every select + a `defaultValue`).
2. Add it to the exports and the `contentBlocks` array in `src/blocks/index.ts`.
3. Confirm the collection includes the right block group — Payload silently drops blocks not in the allowed list.
4. Add the interface to `src/lib/types.ts` and to the `Block` union.
5. Create `src/components/blocks/my-new-block.tsx` and add a case in `block-renderer.tsx`.

---

## Layer 2: Content collections — `src/collections/`

| Collection | File | Notes |
|---|---|---|
| Users | `Users/Users.ts` | Auth + roles (Admin, Editor, SEO, User). `read` is public (blog cards need author info). |
| Media | `Media/Media.ts` | Uploads → WebP @85%, focalPoint, localized `alt`. `read`/`create` public (anonymous CV upload). `staticDir: 'media'`. |
| Pages | `Pages/index.ts` | Block builder. `buildFullPath` combines parent + slug into `fullPath`; `revalidatePage` wraps `revalidatePath('pages')`. |
| Redirects | `Redirects/index.ts` | 301/302 redirects (from / to / type / enabled). |
| ProgramTypes | `ProgramTypes/index.ts` | Internship, Work & Travel, Camp Counselor, Study Abroad, Volunteering. |
| Programs | `Programs/index.ts` | Structured detail-page field groups + Extra Sections blocks. `iconKey` selects map to frontend SVGs. |
| BlogCategories | `BlogCategories/index.ts` | description, image, color. |
| Blog | `Blog/index.ts` | `setDefaultAuthor`, `calculateReadingTime` (~200 wpm), category/tags/relatedPosts. |

**Forms (plugin):** `@payloadcms/plugin-form-builder` auto-registers `forms` and `form-submissions`, configured in `payload.config.ts` (`uploadCollections: ['media']`, custom submission UI, `defaultToEmail`). Submissions add a `status` select + `internalNotes`, render through `SubmissionDataCell`/`SubmissionDataField`, add the `SubmissionsExportButton`, and fire `notifyFormSubmission` + the `form_submission` webhook on `afterChange`.

---

## Layer 3: Globals — `src/globals/`

| Global | File | Contains |
|---|---|---|
| SiteSettings | `SiteSettings/index.ts` | Branding, default SEO, social links, code injection, robots/maintenance. |
| Header | `Header/index.ts` | `navigation` array (label, type, page ref, submenu) + optional `cta`. |
| Footer | `Footer/index.ts` | tagline, columns (max 4), copyright, bottomLinks. |

Globals are fetched once in the root layout.

---

## Layer 4: Frontend foundation — `src/lib/` + `design-system/` + `atoms/`

### `src/lib/api.ts` — the data layer (Local API)

Every function calls Payload's **Local API** (`getPayload` → `payload.find` / `findGlobal`) — a direct, in-memory database call. No HTTP, no `CMS_URL`. All functions are server-only.

| Function | Returns | Draft/preview |
|---|---|---|
| `getPageByPath(path, locale, opts)` | A page by `fullPath` | Yes |
| `getPages(locale)` | All pages — for the sitemap | – |
| `getBlogPost(slug, locale, opts)` | A single post | Yes |
| `getBlogPosts(locale, opts)` | Listing — `limit`, `categorySlug`, `page` | – |
| `getBlogCategories / getBlogCategory` | Categories / one category | – |
| `getProgram(slug, locale, opts)` | A single program | Yes |
| `getPrograms(locale, opts)` | Listing — `typeSlug`, `country`, `onlyOpen`, `sortBy` | – |
| `getProgramType / getProgramTypes` | One type / all types | Yes / – |
| `getHeader / getFooter / getSiteSettings` | Globals (return `null` when unseeded) | – |

```typescript
import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getProgram(slug: string, locale: Locale) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug } },
    locale, depth: 2, limit: 1,
  })
  return res.docs[0] ?? null
}
```

`depth: 2` populates relations two levels deep (program.type, blog.category…). `draft`/`preview` adds `draft: true` — the Local API bypasses access control by default, so it returns the draft version with **no shared secret and no preview endpoint** (those were removed in the merge).

Change it when: you add a collection (add `get<Collection>(slug)` and `get<Collections>()` here), or need deeper relations.

### `src/lib/types.ts`

The TypeScript types — each mirrors a collection, block, or global. Organized as: primitives (`Locale`, `Media`, `PaginatedResponse<T>`) → blocks (one interface each + the `Block` union) → collections → forms → globals. A new block must be added to the `Block` union.

### `src/lib/url.ts`

| Function | Purpose |
|---|---|
| `mediaUrl(media, size?)` | Resolves a `Media` to an absolute URL. `size` is kept for backward compatibility; always returns the original. |
| `resolveCmsUrl(path)` | Absolutizes a relative path against `SERVER_URL` (from `NEXT_PUBLIC_SITE_URL` / optional `PAYLOAD_PUBLIC_SERVER_URL`); normalizes localhost → 127.0.0.1 in dev. |
| `mediaAlt(media, fallback)` | Alt text with a fallback when empty. |
| `localeCanonical(siteUrl, locale, path)` | Builds a locale-aware absolute canonical (English at root, Arabic under `/ar`) so each locale page is self-canonical. Used by every `generateMetadata`. |

> `localePath()` was removed in the i18n routing migration — internal links now use `Link` from `@/i18n/navigation`, which prefixes the active locale automatically.

### `src/i18n/` — next-intl

- `routing.ts` — `defineRouting({ locales: ['en','ar'], defaultLocale: 'en', localePrefix: 'as-needed', localeDetection: false })`. Single source of truth for locales; English serves at `/`, Arabic at `/ar`, no Accept-Language auto-redirect.
- `navigation.ts` — `createNavigation(routing)` exports locale-aware `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`. Use these for all internal navigation.
- `request.ts` — `getRequestConfig` reading the locale from the `[locale]` segment (`requestLocale`) and eager-loading the `common`/`blogs`/`programs` namespaces for that locale.

### `src/messages/` — translations

One JSON per locale × namespace (`en/`, `ar/` each with `common.json`, `blogs.json`, `programs.json`). Loaded by `request.ts`; consumed via `useTranslations('namespace')` (client) / `getTranslations` (server). Chrome strings only — CMS content is localized in Payload.

### `src/lib/server-request.ts`, `nav.ts`

- `server-request.ts` — `resolveLocale()` (thin wrapper over next-intl `getLocale()`, driven by the `[locale]` segment) and `resolvePreview(searchParams)` (`{ draft, preview, isPreview }`).
- `nav.ts` — `resolveNav(header, locale)` + `FALLBACK_NAV` (used when the Header global isn't seeded yet). Emits **locale-agnostic** hrefs; the locale-aware `<Link>` adds the prefix.

### `src/design-system/` and `src/atoms/`

`design-system/` holds shadcn-style primitives (`button` CVA variants, `carousel` Embla wrapper forced `dir="ltr"`, `form` react-hook-form helpers, `input*`, `select`, `sheet`, `font.ts` Gelion, `helpers.ts` `cn()`). `atoms/` holds brand pieces (`logo`, `button-with-arrow`, `start-now-btn`, `nav-links`, `social-share-icons` country-aware, `fade-up-animator` Motion wrapper).

### `src/constants/`, `wrappers/`, `helpers/`

Static lookups (`header-height`, `routes`, `social-media`, `travels` fallback), `google-events-wrapper.tsx` (GTM), and `track-event.ts` (`pushDataLayer`).

---

## Layer 5: Routes — `src/app/(frontend)/[locale]/`

> Every page lives under the `[locale]` segment. `globals.css`, `typography.css`, `favicon.ico`, and the sitemap/robots route handlers stay at the `(frontend)` root (not localized).

### `[locale]/layout.tsx` — Root
Reads `locale` from `params`, validates with `hasLocale` (`notFound()` otherwise), calls `setRequestLocale`, and exports `generateStaticParams` for both locales. Sets `<html lang dir>` from the locale, fetches `getSiteSettings`, sets `metadataBase` from `NEXT_PUBLIC_SITE_URL`, renders the maintenance gate, injects `headCode`/`bodyCode`, and mounts `<Header />`, `<Footer />`, `<LivePreviewRefresh />` (wrapped in `<Suspense>` — its `useSearchParams()` would otherwise break static prerendering), `<ScrollRestore />`.

### `[[...slug]]/page.tsx` — Catch-all
Serves `/` and every Pages doc. Resolves locale + preview, builds `fullPath`, calls `getPageByPath`, `notFound()` if null, then `<BlockRenderer blocks={page.sections} locale={locale} />`. A static folder named after a CMS page would win over this catch-all.

### `blogs/`, `careers/`, `programs/`
| Route | Notes |
|---|---|
| `/blogs`, `/blogs/[slug]`, `/blogs/category/[slug]` | Listing maps CMS → `UiBlogPost`; cards guard against a missing image with a placeholder. |
| `/careers`, `/careers/[slug]` | Static data (`careers-data.ts`, `career-detail-data.ts`). |
| `/programs`, `/programs/[programSlug]`, `/programs/category/[typeSlug]`, `/programs/calendly/[slug]` | Detail = structured template (`program-detail.tsx`) + BlockRenderer extras + apply form (Calendly first, else inline form). `[programSlug]/icons/` maps `iconKey` → SVG. |

### `sitemap.xml/route.ts`, `robots.txt/route.ts`
`/sitemap.xml` reads Pages/Programs/Blog/ProgramTypes via the **Local API** and builds XML (XSLT-styled by `sitemap.xsl`). `/robots.txt` points at `/sitemap.xml`. (The old `(payload)/api/robots` and `/api/sitemap` were removed — these are the canonical ones.)

---

## Layer 6: Components — `src/components/`

| File / folder | What it does |
|---|---|
| `header.tsx` / `footer.tsx` | Async server components — `getHeader` / `getFooter`. Header uses `mix-blend-difference`. |
| `blocks/block-renderer.tsx` | The `switch` on `blockType` → wrapper. Unknown blocks are skipped (warned in dev). Register new blocks here. |
| `blocks/<name>.tsx` | One thin wrapper per CMS block; heavy presentation moves into `about/` or `gallery/`. |
| `blocks/contact-form-client.tsx` | Central form renderer (ContactForm, GalleryCta, ProgramApplyForm, FormBlock). Uploads files to `/api/media`, then POSTs to `/api/form-submissions` (relative, same origin). |
| `program-apply-form.tsx` | Wraps the renderer, injects a hidden `_program` field. |
| `live-preview-refresh.tsx` | Self-gates on `?preview=true`; validates against the current origin and calls `router.refresh()`. Mounted once in layout. |
| `scroll-restore.tsx`, `locale-toggle.tsx` | Scroll fix; language switcher (portal-based, plain anchors → full reload for fresh CMS data + correct `dir`). |
| `admin/` | Custom Payload admin components (`AdminAvatar`, `SubmissionDataCell`, `SubmissionDataField`, `SubmissionsExportButton`). |

---

## SEO & structured data

Each route's `generateMetadata` reads the doc's SEO fields and emits the tags;
`localeCanonical()` keeps every locale self-canonical (Arabic → `/ar/...`).

| Field (admin SEO tab) | Wired into |
|---|---|
| `meta.title` / `meta.description` | `<title>` / `<meta description>` (fallback to the doc's title/excerpt) |
| `meta.canonicalURL` | `<link rel="canonical">` — overrides the locale-aware default |
| `meta.noIndex` / `meta.noFollow` | `robots` metadata |
| `openGraph.{title,description,image}` | OG tags — override, else fall back to `meta` |
| `sitemap.excludeFromSitemap` | drops the doc from `sitemap.xml` |
| `structuredData` (Pages only) | JSON-LD type picker (see below) |

Routes that define `generateMetadata`: `[[...slug]]` (Pages), `blogs/[slug]`,
`blogs/category/[slug]`, `programs/[programSlug]`, `programs/category/[typeSlug]`.

**JSON-LD** — `lib/structuredData.ts` builders, rendered by `components/json-ld.tsx`:

| Doc | Type | How |
|---|---|---|
| Blog post | `BlogPosting` | **Automatic** from the post's own fields (title, author, dates, word count, image). No admin fields. |
| Program | `Course` | **Automatic** from program fields; the optional `course` group (mode / level / dates) enriches it. |
| Page | `WebPage` / `AboutPage` / `ContactPage` / `FAQPage` | The editor picks the type in `structuredData`; `auto` detects an FAQ block and emits `FAQPage` from its Q&A items. |

All builders skip a doc set to `noIndex`.

---

## Config and glue

### `src/payload.config.ts`
Registers collections (order matters: ProgramTypes before Programs, BlogCategories before Blog), globals, and plugins (form-builder; s3Storage only when `DO_SPACES_BUCKET` is set). Defines `serverURL`, `cors`, and `csrf` — all derived from a single `NEXT_PUBLIC_SITE_URL` (with an optional `PAYLOAD_PUBLIC_SERVER_URL` override). Localization is `en` + `ar` (`rtl: true`, `defaultLocale: 'en'`, `fallback: true`). Postgres adapter has `push: true`.

### `src/proxy.ts` — Middleware
Named `proxy.ts` (Next 16 convention). Wraps next-intl's `createMiddleware(routing)` for locale negotiation (`localePrefix: 'as-needed'` → `/blogs` rewrites to `/en/blogs`, `/ar/blogs` stays, the browser URL stays clean). Best-effort visitor-country lookup is injected into a `user-country` request header (English shell only). Matcher excludes `api`, `admin`, `_next/static`, `_next/image`, `favicon.ico`, and `sitemap`/`robots` (root metadata routes must not be locale-prefixed).

### `next.config.ts`
`withPayload(...)` wrapper. `cacheComponents: false` (so `headers()` works in the layout). `images.unoptimized` in dev only. `images.remotePatterns`: Unsplash, DO Spaces (path + virtual-host), flagcdn. A new upload host must be added here or `next/image` throws.

### Tailwind v4
No `tailwind.config.ts`. The theme (brand `--lev-*` palette + colors) is declared with `@theme` inside `src/app/(frontend)/globals.css`; `postcss.config.mjs` wires `@tailwindcss/postcss`.

### `src/lib/email/` and `webhooks.ts`
Email adapter (Resend/SMTP) + templates (`layout.ts`, `formSubmissionNotify.ts`); `escapeHTML` guards submitter input. `webhooks.ts` dispatches the `form_submission` webhook.

### `src/payload-types.ts`
Auto-generated — do not edit. Regenerate with `pnpm generate:types`.

---

## Data flow (one request)

`/ar/about`:
1. `proxy.ts` (next-intl middleware) resolves the locale and rewrites to `/ar/about` internally so the App Router sees `[locale] = 'ar'`.
2. `(frontend)/[locale]/[[...slug]]/page.tsx` matches; `params.slug = ['about']` (locale is its own segment).
3. `resolveLocale()` → `'ar'` (next-intl `getLocale()`); `buildFullPath` → `/about`.
4. `getPageByPath('/about', 'ar')` → `payload.find({ collection: 'pages', where: { fullPath }, locale: 'ar', depth: 2 })` — a direct DB call.
5. `<BlockRenderer>` loops `page.sections`, renders each wrapper.
6. `<html lang="ar" dir="rtl">` (from `params.locale`) with Header, content, Footer.

**Live preview:** the admin opens `SITE_URL/about?preview=true`; the page reads the draft through the Local API (no secret); `LivePreviewRefresh` refreshes the iframe on each edit.

**Caching:** pages render dynamically per request (they read the request locale / CMS data via the Local API, which isn't fetch-cached). `generateStaticParams` pre-renders the two locale shells where a route has no other dynamic data. The `revalidatePath` hook invalidates route segments in-process when content changes.

---

## Migrations

`src/migrations/` holds the schema migrations (one squashed snapshot, `20260604_222458`). With `push: true` on the Postgres adapter, dev pushes schema changes directly, so migrations are a reference snapshot. For a stable production DB, switch to `push: false` and run `pnpm payload migrate`.

---

## Seeds

The seed system builds the whole CMS from nothing (admin user, globals, content). Run from the project root:

```bash
pnpm seed        # admin user + base globals (idempotent)
pnpm seed:all    # globals + site + blogs (downloads seed images from DO Spaces)
```

Entry point `src/scripts/seed.ts` calls the functions in `src/lib/seeds/`: `ensureFirstAdmin`, `seedSite`, `seedGlobals`, `seedForms`, `seedPages`, `seedPrograms`, `seedProgramDetails`. Data in `lib/seeds/data/` (`galleryImages`, `programDetailContent`, `local-images/`); utils `ensureMediaFromFile` / `ensureMediaFromUrl` (idempotent). Standalone re-seeds in `src/scripts/`: `seed-blogs`, `seed-globals`, `seed-site`, plus `convert-legacy-to-json` (+ `legacy-blog-data/`).

> The `/api/admin/seed-*` HTTP wrappers (guarded by `PAYLOAD_PREVIEW_SECRET`) exist for seeding from a browser when there's no terminal. If you only ever seed over SSH, you can delete those routes and the secret.

---

## Notes

1. `@/*` resolves to `src/*`. App-directory imports need the route group, e.g. `@/app/(frontend)/...`.
2. `cacheComponents: false` is required so `headers()` works in the layout.
3. `headers()`, `params`, and `searchParams` are async in Next 16 — `await` them.
4. The middleware file is `proxy.ts`, not `middleware.ts`.
5. Carousels force `dir="ltr"` (in `design-system/carousel.tsx`) so Embla doesn't reverse in RTL.
6. Use `Link` (and `useRouter`/`usePathname`) from `@/i18n/navigation` for internal navigation — it prefixes the active locale automatically. Don't hardcode `/ar` or pass an explicit `locale` prop (that force-prefixes even the default locale).
7. The header uses `mix-blend-difference`, so `LocaleToggle` is portal-based.
8. AR drafts don't render while `translationComplete` is false; content falls back to EN.
9. `lockDocuments: false` on Pages/Blog/Programs/ProgramTypes/BlogCategories removes the "Document modified" warning.
10. A static folder wins over the catch-all — restoring `(frontend)/about/` would stop the CMS serving that route.
11. `generateStaticParams` in the program detail route reads the DB via the Local API, so `pnpm build` needs a reachable `DATABASE_URL`.
12. `push: true` can drop columns on schema drift — move to migrations before production.
13. `ensureFirstAdmin.ts` creates the seed admin (`admin@admin.com`). Change those credentials before deploying.
14. Image fields can be empty — wrappers fall back to a placeholder or `FALLBACK_IMAGE` so pages never break on a missing image.

---

## Where to look

| Need to | Go to |
|---|---|
| Edit the overall layout (header/footer/maintenance) | `src/app/(frontend)/[locale]/layout.tsx` |
| Add/edit an API call | `src/lib/api.ts` + `src/lib/types.ts` |
| Edit a block's design | `src/components/blocks/<name>.tsx` |
| Add a block | `src/blocks/` + `src/blocks/index.ts` + `lib/types.ts` + `components/blocks/` + `block-renderer.tsx` |
| Add a collection | `src/collections/` + register in `src/payload.config.ts` |
| Edit brand colors | `src/app/(frontend)/globals.css` (`@theme`) |
| Edit image hosts | `next.config.ts` `remotePatterns` |
| Edit the sitemap / robots | `src/app/(frontend)/sitemap.xml/route.ts` · `robots.txt/route.ts` |
| Edit forms (validation/upload) | `src/components/blocks/contact-form-client.tsx` |
| Edit live-preview behavior | `src/components/live-preview-refresh.tsx` |
| Add a locale | `payload.config.ts` (Payload localization) + `i18n/routing.ts` (`locales`) + `messages/<locale>/*.json` |
| Edit UI translations | `src/messages/<locale>/<namespace>.json` |
| Edit a page's SEO meta (title/canonical/OG/robots) | that route's `generateMetadata` |
| Edit structured data (JSON-LD) | `src/lib/structuredData.ts` + `components/json-ld.tsx` |
| Edit seeds | `src/lib/seeds/` + `src/scripts/` |

---

## Env vars

```
DATABASE_URL=postgres://...                       # Postgres connection
PAYLOAD_SECRET=<random 32+ char>                  # encryption key
NEXT_PUBLIC_SITE_URL=https://www.levntura.com     # the single public domain (serverURL, CORS, CSRF, SEO, media)
RESEND_API_KEY=re_...                             # Resend
DEFAULT_NOTIFICATION_EMAIL=admin@...              # where submission notifications go
DO_SPACES_BUCKET= / ENDPOINT= / REGION= / ACCESS_KEY= / SECRET_KEY=   # S3 storage (empty = local /media)
PAYLOAD_PREVIEW_SECRET=<value>                    # guards the /api/admin/seed-* endpoints only
```

Removed in the merge: `NEXT_PUBLIC_CMS_URL` (no separate CMS), `PAYLOAD_PUBLIC_SERVER_URL` (folded into `NEXT_PUBLIC_SITE_URL`, optional override only), `FRONTEND_URL` / `REVALIDATE_SECRET` (revalidation is in-process now).

---

*The blocks system is generic and not tied to Levntura — keep the blocks you need and remove the rest. The patterns here are standard Payload, so the Payload docs (payloadcms.com/docs) cover anything not specific to this project.*
