import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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
      <Script id="gtm-head" strategy="beforeInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NXW7WLQX');
          `}
      </Script>
      <body
        className={`${Gelion.className} bg-foreground antialiased relative`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NXW7WLQX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Header />
        <div style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
          {children}
        </div>
        <Footer />

        <GoogleAnalytics gaId={"G-L73SE4X3QR"} />
      </body>
    </html>
  );
}
