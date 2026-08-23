import type { SiteContext } from '../helpers'
import { renderLayout, renderButton, renderRow } from './layout'

type SubmissionField = { field?: string; value?: unknown }

export type FormSubmissionData = {
  formTitle: string
  fields: SubmissionField[]
}

const escapeHTML = (s: unknown): string => {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const humanizeKey = (key: string): string =>
  key
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase())

export const formSubmissionNotifyTemplate = (
  ctx: SiteContext,
  data: FormSubmissionData,
): { subject: string; html: string } => {
  const subject = `New submission: ${data.formTitle}`

  const rows = data.fields.length
    ? data.fields
        .map((f) =>
          renderRow(
            humanizeKey(f.field || 'field'),
            escapeHTML(f.value as unknown),
          ),
        )
        .join('')
    : `<tr><td colspan="2" style="padding:20px; text-align:center; color:#888;">No data submitted.</td></tr>`

  const body = `
    <h2 style="margin:0 0 8px; color:${ctx.brand.primary}; font-size:22px;">New form submission</h2>
    <p style="margin:0 0 6px; color:#666;">Form: <strong>${escapeHTML(data.formTitle)}</strong></p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px; margin-top:20px;">
      ${rows}
    </table>

    ${renderButton('Open Dashboard', ctx.dashboardURL + '/collections/form-submissions', ctx.brand.accent)}
  `

  return {
    subject,
    html: renderLayout({
      ctx,
      body,
      preheader: `New submission to ${data.formTitle}`,
    }),
  }
}
