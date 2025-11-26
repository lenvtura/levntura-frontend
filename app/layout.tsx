import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { Gelion } from "@/design-system/font";
import { HEADER_HEIGHT } from "@/constants/header-height";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import twitterCardPng from "@/assets/photos/twitter-card.png";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title:
    "Study Abroad Agency In Egypt & Jordan | Work And Travel & J1 Visa | Levntura",
  description:
    "Levntura is a leading study abroad agency in Egypt & Jordan offering Work and Travel and J1 visa programs, empowering youth with cultural exchange worldwide.",
  openGraph: {
    type: "website",
    url: "https://www.levntura.com/",
    title:
      "Study Abroad Agency In Egypt & Jordan | Work And Travel & J1 Visa | Levntura",
    description:
      "Levntura is a leading study abroad agency in Egypt & Jordan offering Work and Travel and J1 visa programs, empowering youth with cultural exchange worldwide.",
    images: [
      {
        url: twitterCardPng.src,
        width: 1200,
        height: 630,
        alt: "Levntura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.levntura.com/",
    title:
      "Study Abroad Agency In Egypt & Jordan | Work And Travel & J1 Visa | Levntura",
    description:
      "Levntura is a leading study abroad agency in Egypt & Jordan offering Work and Travel and J1 visa programs, empowering youth with cultural exchange worldwide.",
    images: [twitterCardPng.src],
  },
  other: {
    "facebook-domain-verification": "aplbfnewceubq9qxhed3c4ixeuixxk",
    "google-site-verification": "sdRE7OEPfgFTN8CzM2zrg2lCDxERdYrKd04ixYEYQ5k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${Gelion.className} overflow-x-hidden bg-foreground antialiased relative`}
      >
        <Header />
        <div style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
          {children}
        </div>
        <Footer />

        <GoogleAnalytics gaId={"G-L73SE4X3QR"} />
        <GoogleTagManager gtmId={"GTM-NXW7WLQX"} />
      </body>
    </html>
  );
}
