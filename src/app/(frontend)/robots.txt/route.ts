/**
 * /robots.txt — generated inline with explicit Content-Type so the
 * browser displays plain text correctly.
 */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com"
).replace(/\/$/, "");

export const dynamic = "force-dynamic";

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
