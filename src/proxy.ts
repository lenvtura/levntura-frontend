import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

// next-intl owns locale negotiation now: English at the root, Arabic under
// `/ar` (localePrefix 'as-needed'). It rewrites `/blogs` → `/en/blogs` and
// `/ar/blogs` → `/ar/blogs` internally so the App Router sees a `[locale]`
// segment, while the browser URL stays clean.
const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // Best-effort visitor-country lookup, forwarded to the app as a request
  // header (read by social-share-icons). Mirrors the old behaviour: only the
  // English shell pays the lookup cost — `/ar/*` skips it.
  const { pathname } = request.nextUrl;
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  if (!isArabic) {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();
      if (data?.country) {
        const headers = new Headers(request.headers);
        headers.set("user-country", data.country);
        // Clone the request with the extra header so next-intl forwards it.
        request = new NextRequest(request, { headers });
      }
    } catch {
      // country header is optional
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Exclude Payload admin + api, Next internals, and the root metadata routes
  // (sitemap/robots live at `/` and must not be locale-prefixed).
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|sitemap|robots).*)",
  ],
};
