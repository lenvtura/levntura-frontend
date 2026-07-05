/**
 * Seed logic for the three site-wide globals: Header, Footer, SiteSettings.
 *
 * Populates each global with Levntura's current values (matching what was
 * previously hardcoded on the frontend) for both English and Arabic locales.
 * Safe to re-run: existing values are overwritten in place via
 * `payload.updateGlobal`.
 *
 * Shared between:
 *   - HTTP endpoint:  src/app/(payload)/api/admin/seed-globals/route.ts
 *   - CLI script:     src/scripts/seed-globals.ts  (pnpm seed:globals)
 *
 * Payload v3 localization gotcha: arrays with localized inner fields share
 * the row structure across locales, but localized field values are stored
 * per-locale-per-row. To make the EN and AR writes target the SAME rows
 * (instead of one wiping the other), every array item must carry a stable
 * `id` that we re-use across both writes. Without an explicit id, Payload
 * generates a new UUID per write and the previous locale's values orphan.
 */

import { randomUUID } from 'node:crypto'
import type { Payload } from 'payload'

// ─── Header defaults ─────────────────────────────────────────────────────

interface HeaderNavSeed {
  labelEn: string
  labelAr: string
  url: string
}

const HEADER_NAV: HeaderNavSeed[] = [
  { labelEn: 'Home', labelAr: 'الرئيسية', url: '/' },
  { labelEn: 'Blogs', labelAr: 'المدونة', url: '/blogs' },
  { labelEn: 'About us', labelAr: 'من نحن', url: '/about' },
  { labelEn: 'Gallery', labelAr: 'المعرض', url: '/gallery' },
  { labelEn: 'Programs', labelAr: 'البرامج', url: '/programs' },
  { labelEn: 'Contact', labelAr: 'تواصل معنا', url: '/contact' },
]

// ─── Footer defaults ─────────────────────────────────────────────────────

interface FooterLinkSeed {
  labelEn: string
  labelAr: string
  url: string
}

const FOOTER_OPPORTUNITIES: FooterLinkSeed[] = [
  { labelEn: 'Travel & Work', labelAr: 'سافر واعمل', url: '/' },
  { labelEn: 'Camp Counselor', labelAr: 'مرشد معسكرات', url: '/about' },
  { labelEn: 'Travel & Study', labelAr: 'سافر وادرس', url: '/blogs' },
  { labelEn: 'Internship', labelAr: 'تدريب', url: '/careers' },
  { labelEn: 'Student Portal', labelAr: 'بوابة الطالب', url: '/careers' },
]

interface FooterAddressSeed {
  labelEn: string
  labelAr: string
  addressEn: string
  addressAr: string
}

const FOOTER_ADDRESSES: FooterAddressSeed[] = [
  {
    labelEn: 'Jordan Office',
    labelAr: 'مكتب الأردن',
    addressEn: 'Mecca st, Buld 145, office 408, Amman Jordan, 11185',
    addressAr: 'شارع مكة، عمارة 145، مكتب 408، عمان، الأردن، 11185',
  },
  {
    labelEn: 'Egypt Office',
    labelAr: 'مكتب مصر',
    addressEn: '3 Skies Plaza, S 90th st, New Cairo, Egypt, 11835',
    addressAr: '3 سكايز بلازا، شارع 90 الجنوبي، القاهرة الجديدة، مصر، 11835',
  },
]

interface FooterPhoneSeed {
  number: string
  labelEn: string
  labelAr: string
}

const FOOTER_PHONES: FooterPhoneSeed[] = [
  { number: '+962 79 082 2202', labelEn: 'Jordan', labelAr: 'الأردن' },
  { number: '+20 150 0050392', labelEn: 'Egypt', labelAr: 'مصر' },
]

const FOOTER_SOCIALS: Array<{ platform: string; url: string }> = [
  {
    platform: 'whatsapp',
    url: 'https://api.whatsapp.com/send/?phone=962790922202&text&type=phone_number&app_absent=0',
  },
  { platform: 'instagram', url: 'https://www.instagram.com/levntura.jo/' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/levntura/' },
  { platform: 'facebook', url: 'https://www.facebook.com/levntura' },
  { platform: 'youtube', url: 'https://www.youtube.com/@Levntura' },
]

const COPYRIGHT_EN = `© ${new Date().getFullYear()} Levntura. All rights reserved.`
const COPYRIGHT_AR = `© ${new Date().getFullYear()} لِفِنتورا. جميع الحقوق محفوظة.`

const BOTTOM_LINKS = [
  { labelEn: 'Privacy Policy', labelAr: 'سياسة الخصوصية', url: '/privacy' },
  { labelEn: 'Terms of Service', labelAr: 'شروط الاستخدام', url: '/terms' },
]

// ─── SiteSettings defaults ───────────────────────────────────────────────

// GA + GTM tags previously hardcoded in app/layout.tsx. Moved here so the
// editor can swap IDs without a frontend deploy.
const HEAD_CODE = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L73SE4X3QR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L73SE4X3QR');
</script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NXW7WLQX');</script>
<!-- End Google Tag Manager -->`

const BODY_CODE = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXW7WLQX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`

// ─── Public API ──────────────────────────────────────────────────────────

export interface SeedGlobalsReport {
  ok: boolean
  message: string
  updated: string[]
  errors: string[]
}

export async function seedGlobals(payload: Payload): Promise<SeedGlobalsReport> {
  const report: SeedGlobalsReport = { ok: true, message: '', updated: [], errors: [] }

  // Pre-generate stable IDs for every array item. Same id is reused across
  // the EN and AR writes so Payload updates the existing row instead of
  // creating a new one (which would orphan the previous locale's values).
  const navIds = HEADER_NAV.map(() => randomUUID())
  const oppColumnId = randomUUID()
  const oppIds = FOOTER_OPPORTUNITIES.map(() => randomUUID())
  const addrIds = FOOTER_ADDRESSES.map(() => randomUUID())
  const phoneIds = FOOTER_PHONES.map(() => randomUUID())
  const socialIds = FOOTER_SOCIALS.map(() => randomUUID())
  const bottomIds = BOTTOM_LINKS.map(() => randomUUID())
  const siteSocialIds = FOOTER_SOCIALS.map(() => randomUUID())

  // ── Header ────────────────────────────────────────────────────────────
  try {
    const buildNav = (lang: 'en' | 'ar') =>
      HEADER_NAV.map((n, i) => ({
        id: navIds[i],
        label: lang === 'en' ? n.labelEn : n.labelAr,
        type: 'external' as const,
        externalURL: n.url,
        openInNewTab: false,
      }))

    await payload.updateGlobal({
      slug: 'header',
      locale: 'en',
      data: {
        navigation: buildNav('en'),
        cta: { enabled: false, label: '', url: '' },
      } as never,
    })

    await payload.updateGlobal({
      slug: 'header',
      locale: 'ar',
      data: { navigation: buildNav('ar') } as never,
    })
    report.updated.push('header (en+ar)')
  } catch (err) {
    report.errors.push(`header: ${(err as Error).message}`)
  }

  // ── Footer ────────────────────────────────────────────────────────────
  try {
    const buildColumns = (lang: 'en' | 'ar') => [
      {
        id: oppColumnId,
        title: lang === 'en' ? 'Opportunities' : 'الفرص',
        links: FOOTER_OPPORTUNITIES.map((o, i) => ({
          id: oppIds[i],
          label: lang === 'en' ? o.labelEn : o.labelAr,
          url: o.url,
          openInNewTab: false,
        })),
      },
    ]

    const buildAddresses = (lang: 'en' | 'ar') =>
      FOOTER_ADDRESSES.map((a, i) => ({
        id: addrIds[i],
        label: lang === 'en' ? a.labelEn : a.labelAr,
        address: lang === 'en' ? a.addressEn : a.addressAr,
      }))

    const buildPhones = (lang: 'en' | 'ar') =>
      FOOTER_PHONES.map((p, i) => ({
        id: phoneIds[i],
        number: p.number,
        label: lang === 'en' ? p.labelEn : p.labelAr,
      }))

    const buildBottomLinks = (lang: 'en' | 'ar') =>
      BOTTOM_LINKS.map((b, i) => ({
        id: bottomIds[i],
        label: lang === 'en' ? b.labelEn : b.labelAr,
        url: b.url,
      }))

    const socialLinks = FOOTER_SOCIALS.map((s, i) => ({
      id: socialIds[i],
      platform: s.platform,
      url: s.url,
    }))

    await payload.updateGlobal({
      slug: 'footer',
      locale: 'en',
      data: {
        columns: buildColumns('en'),
        addresses: buildAddresses('en'),
        phones: buildPhones('en'),
        email: 'hello@levntura.com',
        showLogo: true,
        tagline:
          'Empowering youth with cultural exchange and global opportunities.',
        socialLinks,
        showWatermark: true,
        copyright: COPYRIGHT_EN,
        bottomLinks: buildBottomLinks('en'),
      } as never,
    })

    await payload.updateGlobal({
      slug: 'footer',
      locale: 'ar',
      data: {
        columns: buildColumns('ar'),
        addresses: buildAddresses('ar'),
        phones: buildPhones('ar'),
        tagline: 'نمكّن الشباب من خلال التبادل الثقافي والفرص العالمية.',
        copyright: COPYRIGHT_AR,
        bottomLinks: buildBottomLinks('ar'),
      } as never,
    })
    report.updated.push('footer (en+ar)')
  } catch (err) {
    report.errors.push(`footer: ${(err as Error).message}`)
  }

  // ── Site Settings ─────────────────────────────────────────────────────
  try {
    const siteSocials = FOOTER_SOCIALS.map((s, i) => ({
      id: siteSocialIds[i],
      platform: s.platform,
      url: s.url,
    }))

    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'en',
      data: {
        siteName: 'Levntura',
        defaultTitle:
          'Study Abroad Agency In Egypt & Jordan | Work And Travel & J1 Visa | Levntura',
        titleTemplate: '%s | Levntura',
        defaultDescription:
          'Levntura is a leading study abroad agency in Egypt & Jordan offering Work and Travel and J1 visa programs, empowering youth with cultural exchange worldwide.',
        socials: siteSocials,
        headCode: HEAD_CODE,
        bodyCode: BODY_CODE,
        maintenanceMode: false,
      } as never,
    })

    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'ar',
      data: {
        siteName: 'لِفِنتورا',
        defaultTitle: 'لِفِنتورا | برامج Work and Travel و فيزا J1',
        defaultDescription:
          'لِفِنتورا وكالة دراسة في الخارج رائدة في مصر والأردن، نقدم برامج Work and Travel وتأشيرة J1 لتمكين الشباب بالتبادل الثقافي حول العالم.',
      } as never,
    })
    report.updated.push('site-settings (en+ar)')
  } catch (err) {
    report.errors.push(`site-settings: ${(err as Error).message}`)
  }

  report.message = `Seed done. updated=${report.updated.length}, errors=${report.errors.length}.`
  if (report.errors.length) report.ok = false

  return report
}
