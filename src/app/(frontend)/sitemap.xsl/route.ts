/**
 * XSLT stylesheet for /sitemap.xml.
 *
 * Browsers apply this transform when they encounter the
 * `<?xml-stylesheet?>` reference in the sitemap, rendering the XML as
 * a styled HTML table instead of a raw text dump. Bots ignore it.
 */

export const dynamic = "force-static";

const stylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/sitemap:urlset">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Levntura — Sitemap</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 2rem;
            background: #f6f8fa;
            color: #1f2328;
          }
          .container { max-width: 1200px; margin: 0 auto; }
          header {
            margin-bottom: 1.5rem;
            padding: 1.5rem 0;
            border-bottom: 2px solid #d0d7de;
          }
          h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.75rem;
            color: #0a3d3d;
          }
          .stats {
            color: #57606a;
            font-size: 0.9rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          th, td {
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #eaeef2;
            font-size: 0.9rem;
          }
          th {
            background: #f6f8fa;
            font-weight: 600;
            color: #57606a;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #f6f8fa; }
          a { color: #0969da; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .priority-bar {
            display: inline-block;
            width: 50px;
            height: 6px;
            background: #eaeef2;
            border-radius: 3px;
            overflow: hidden;
            vertical-align: middle;
            margin-right: 0.5rem;
          }
          .priority-fill {
            height: 100%;
            background: #0a3d3d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Levntura — XML Sitemap</h1>
            <div class="stats">
              <strong><xsl:value-of select="count(sitemap:url)" /></strong> URLs listed. Generated for search engines.
            </div>
          </header>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:url">
                <tr>
                  <td>
                    <a>
                      <xsl:attribute name="href"><xsl:value-of select="sitemap:loc" /></xsl:attribute>
                      <xsl:value-of select="sitemap:loc" />
                    </a>
                  </td>
                  <td><xsl:value-of select="substring(sitemap:lastmod, 1, 10)" /></td>
                  <td><xsl:value-of select="sitemap:changefreq" /></td>
                  <td>
                    <span class="priority-bar">
                      <span class="priority-fill">
                        <xsl:attribute name="style">width: <xsl:value-of select="number(sitemap:priority) * 100" />%;</xsl:attribute>
                      </span>
                    </span>
                    <xsl:value-of select="sitemap:priority" />
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
`;

export async function GET() {
  return new Response(stylesheet, {
    status: 200,
    headers: {
      "Content-Type": "application/xslt+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
