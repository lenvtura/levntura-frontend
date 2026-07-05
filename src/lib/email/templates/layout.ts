import type { SiteContext } from '../helpers'

type LayoutArgs = {
  ctx: SiteContext
  body: string
  preheader?: string
}

export const renderLayout = ({ ctx, body, preheader }: LayoutArgs): string => {
  const { siteName, logoURL, websiteURL, brand } = ctx
  const year = new Date().getFullYear()
  const cleanDomain = websiteURL.replace(/^https?:\/\//, '')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${siteName}</title>
</head>
<body style="margin:0; padding:0; background:${brand.bg}; font-family: Arial, Helvetica, sans-serif; color:${brand.text};">
  ${preheader ? `<div style="display:none; max-height:0; overflow:hidden;">${preheader}</div>` : ''}
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${brand.bg};">
    <tr>
      <td align="center" style="padding: 32px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; max-width:600px;">
          <tr>
            <td align="center" style="background:${brand.primary}; padding:24px;">
              ${
                logoURL
                  ? `<img src="${logoURL}" alt="${siteName}" height="40" style="display:block; height:40px; max-height:40px;"/>`
                  : `<h1 style="color:#ffffff; margin:0; font-size:22px; letter-spacing:0.5px;">${siteName}</h1>`
              }
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px; line-height:1.6; font-size:15px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="background:#fafafa; padding:18px; text-align:center; color:#888; font-size:12px; border-top:1px solid #eee;">
              <p style="margin:0;">© ${year} ${siteName}</p>
              ${
                websiteURL
                  ? `<p style="margin:6px 0 0;"><a href="${websiteURL}" style="color:${brand.primary}; text-decoration:none;">${cleanDomain}</a></p>`
                  : ''
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export const renderButton = (
  label: string,
  url: string,
  brandColor = '#ed8936',
): string => {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
    <tr>
      <td style="border-radius:6px; background:${brandColor};">
        <a href="${url}" style="display:inline-block; padding:12px 24px; color:#ffffff; text-decoration:none; font-weight:bold; font-size:14px;">${label}</a>
      </td>
    </tr>
  </table>`
}

export const renderRow = (label: string, value: string): string => {
  return `<tr>
    <td style="padding:8px 0; border-bottom:1px solid #f0f0f0; color:#666; width:130px;">${label}</td>
    <td style="padding:8px 0; border-bottom:1px solid #f0f0f0; color:#1a202c;">${value || '—'}</td>
  </tr>`
}
