import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { Gelion } from "@/design-system/font";
import { HEADER_HEIGHT } from "@/constants/header-height";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Levntura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Gelion.className} bg-foreground antialiased relative`}
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
