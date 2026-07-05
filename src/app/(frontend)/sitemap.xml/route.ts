/**
 * /sitemap.xml — built directly from CMS data.
 *
 * Builds the XML by hand and returns it with an explicit
 * `Content-Type: application/xml` so Chrome renders it as an XML tree
 * (Next.js's MetadataRoute.Sitemap in 16.x sometimes ships the response
 * with a Content-Type the browser treats as plain text).
 */

import { getPayload } from "payload";
import config from "@payload-config";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.levntura.com"
).replace(/\/$/, "");

export const dynamic = "force-dynamic";

interface CmsDoc {
  slug?: string;
  fullPath?: string;
  updatedAt?: string;
  dateModified?: string;
  translationComplete?: boolean;
  sitemap?: { excludeFromSitemap?: boolean };
}

interface PaginatedResponse<T> {
  docs: T[];
}

async function fetchPublished<T extends CmsDoc>(
  collection: string,
): Promise<T[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: collection as Parameters<typeof payload.find>[0]["collection"],
      where: { _status: { equals: "published" } },
      limit: 1000,
      depth: 0,
    });
    return res.docs as unknown as T[];
  } catch {
    return [];
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface SitemapEntry {
  path: string;
  lastMod: string;
  changeFreq: "weekly" | "monthly";
  priority: string;
  withAR: boolean;
}

function buildEntry(
  doc: CmsDoc,
  path: string,
  changeFreq: "weekly" | "monthly",
  priority: string,
): SitemapEntry | null {
  if (doc.sitemap?.excludeFromSitemap) return null;
  const lastModRaw = doc.dateModified ?? doc.updatedAt;
  const lastMod = lastModRaw
    ? new Date(lastModRaw).toISOString()
    : new Date().toISOString();
  return {
    path,
    lastMod,
    changeFreq,
    priority,
    withAR: doc.translationComplete === true,
  };
}

function renderEntry(entry: SitemapEntry): string {
  const url = escapeXml(`${SITE_URL}${entry.path}`);
  const arUrl = escapeXml(`${SITE_URL}/ar${entry.path === "/" ? "" : entry.path}`);

  const lines: string[] = [
    "  <url>",
    `    <loc>${url}</loc>`,
    `    <lastmod>${entry.lastMod}</lastmod>`,
    `    <changefreq>${entry.changeFreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
  ];

  if (entry.withAR) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="en" href="${url}"/>`,
      `    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>`,
    );
  }

  lines.push("  </url>");
  return lines.join("\n");
}

export async function GET() {
  const [pages, programs, blog, programTypes] = await Promise.all([
    fetchPublished<CmsDoc>("pages"),
    fetchPublished<CmsDoc>("programs"),
    fetchPublished<CmsDoc>("blog"),
    fetchPublished<CmsDoc>("program-types"),
  ]);

  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [
    {
      path: "/",
      lastMod: now,
      changeFreq: "weekly",
      priority: "1.0",
      withAR: false,
    },
    {
      path: "/blogs",
      lastMod: now,
      changeFreq: "weekly",
      priority: "0.8",
      withAR: false,
    },
    {
      path: "/programs",
      lastMod: now,
      changeFreq: "weekly",
      priority: "0.8",
      withAR: false,
    },
  ];

  for (const page of pages) {
    const slugPath = page.fullPath ?? (page.slug ? `/${page.slug}` : null);
    if (!slugPath) continue;
    const e = buildEntry(page, slugPath, "weekly", "0.8");
    if (e) entries.push(e);
  }

  for (const program of programs) {
    if (!program.slug) continue;
    const e = buildEntry(program, `/programs/${program.slug}`, "monthly", "0.7");
    if (e) entries.push(e);
  }

  for (const post of blog) {
    if (!post.slug) continue;
    const e = buildEntry(post, `/blogs/${post.slug}`, "monthly", "0.7");
    if (e) entries.push(e);
  }

  for (const type of programTypes) {
    if (!type.slug) continue;
    const e = buildEntry(
      type,
      `/programs/category/${type.slug}`,
      "monthly",
      "0.6",
    );
    if (e) entries.push(e);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    // Stylesheet tells the browser to render the sitemap as a nice HTML
    // table. It has no effect on bots — they still see the raw XML.
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries.map(renderEntry),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
