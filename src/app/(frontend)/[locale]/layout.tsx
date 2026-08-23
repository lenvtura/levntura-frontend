import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { Gelion } from "@/design-system/font";
import { HEADER_HEIGHT } from "@/constants/header-height";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LivePreviewRefresh } from "@/components/live-preview-refresh";
import { ScrollRestore } from "@/components/scroll-restore";

import { getSiteSettings } from "@/lib/api";
import { mediaUrl } from "@/lib/url";
import type { Locale } from "@/lib/types";

import twitterCardPng from "@/assets/photos/twitter-card.png";

import type { Metadata } from "next";

import "../globals.css";

// Next's generated LayoutProps types `params` as `{ locale: string }`, so we
// accept the broad type here and narrow to `Locale` after validation.
type LocaleParams = { params: Promise<{ locale: string }> };

// Pre-render both locale shells at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const STATIC_TITLE =
  "Study Abroad Agency In Egypt & Jordan | Work And Travel & J1 Visa | Levntura";
const STATIC_DESCRIPTION =
  "Levntura is a leading study abroad agency in Egypt & Jordan offering Work and Travel and J1 visa programs, empowering youth with cultural exchange worldwide.";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const settings = await getSiteSettings(locale);

  const title = settings?.defaultTitle || STATIC_TITLE;
  const description = settings?.defaultDescription || STATIC_DESCRIPTION;
  const faviconHref = mediaUrl(settings?.favicon ?? null);
  const ogImageHref =
    mediaUrl(settings?.defaultOGImage ?? null, "og") ??
    mediaUrl(settings?.defaultOGImage ?? null) ??
    twitterCardPng.src;

  return {
    metadataBase: new URL(
      (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
        .split(",")[0]
        .trim(),
    ),
    title,
    description,
    icons: faviconHref ? { icon: faviconHref } : undefined,
    openGraph: {
      type: "website",
      url: "https://www.levntura.com/",
      title,
      description,
      images: [
        {
          url: ogImageHref,
          width: 1200,
          height: 630,
          alt: "Levntura",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "https://www.levntura.com/",
      title,
      description,
      images: [ogImageHref],
    },
    other: {
      "facebook-domain-verification": "aplbfnewceubq9qxhed3c4ixeuixxk",
      "google-site-verification": "sdRE7OEPfgFTN8CzM2zrg2lCDxERdYrKd04ixYEYQ5k",
    },
  };
}

function MaintenancePage({ locale }: { locale: Locale }) {
  const heading =
    locale === "ar" ? "الموقع تحت الصيانة" : "We're undergoing maintenance";
  const body =
    locale === "ar"
      ? "نعتذر عن الإزعاج. سنعود قريباً."
      : "We'll be back shortly. Thanks for your patience.";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lev-blue text-white p-6 text-center">
      <h1 className="typography-H40 max-w-xl">{heading}</h1>
      <p className="mt-4 typography-S18 max-w-md opacity-90">{body}</p>
    </div>
  );
}

// Raw HTML from Site Settings → Code Injection (GA/GTM/Pixel snippets).
// Rendered as a hidden span at end of body — scripts execute identically
// regardless of position, and GA/GTM still capture client-side route changes.
function RawHtml({ html }: { html: string }) {
  return (
    <span
      style={{ display: "none" }}
      suppressHydrationWarning
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}> &
  LocaleParams) {
  const { locale } = await params;
  // Guard against unknown locales reaching the [locale] segment.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering for this request's locale.
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const [settings, messages] = await Promise.all([
    getSiteSettings(locale),
    // Pull translations once on the server; NextIntlClientProvider rehydrates
    // them on the client so `useTranslations()` works without a network call.
    getMessages(),
  ]);
  const headCode = settings?.headCode?.trim();
  const bodyCode = settings?.bodyCode?.trim();
  const maintenance = Boolean(settings?.maintenanceMode);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${Gelion.className} overflow-x-hidden bg-foreground antialiased relative`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {maintenance ? (
            <MaintenancePage locale={locale} />
          ) : (
            <>
              <ScrollRestore />
              {/* useSearchParams() inside → needs a Suspense boundary so
                  statically-rendered pages don't bail out of prerendering. */}
              <Suspense fallback={null}>
                <LivePreviewRefresh />
              </Suspense>
              <Header />
              <div style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
                {children}
              </div>
              <Footer />
            </>
          )}

          {headCode && <RawHtml html={headCode} />}
          {bodyCode && <RawHtml html={bodyCode} />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
