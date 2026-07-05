import type { EmailAdapter } from 'payload'
import nodemailer from 'nodemailer'

type EmailGroup = {
  enabled?: boolean
  fromAddress?: string
  fromName?: string
  smtp?: {
    host?: string
    port?: number
    secure?: boolean
    user?: string
    password?: string
  }
}

// SMTP creds live in SiteSettings so the admin toggles email from the dashboard.
// When disabled or misconfigured, sends are skipped silently — no warning, no error.
export const dashboardEmailAdapter: EmailAdapter = ({ payload }) => ({
  name: 'dashboard-smtp',
  defaultFromAddress: 'noreply@levntura.com',
  defaultFromName: 'Levntura',

  sendEmail: async (message) => {
    let config: EmailGroup | undefined
    try {
      const settings = (await payload.findGlobal({ slug: 'site-settings' })) as {
        email?: EmailGroup
      } | null
      config = settings?.email ?? undefined
    } catch {
      return { skipped: true }
    }

    if (!config?.enabled) return { skipped: true }
    if (!config.fromAddress || !config.smtp?.host || !config.smtp.user || !config.smtp.password) {
      return { skipped: true }
    }

    try {
      const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port || 587,
        secure: config.smtp.secure || false,
        auth: { user: config.smtp.user, pass: config.smtp.password },
      })

      const from =
        message.from ||
        (config.fromName ? `"${config.fromName}" <${config.fromAddress}>` : config.fromAddress)

      return await transporter.sendMail({ ...message, from })
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        payload.logger.warn(`[email] ${err instanceof Error ? err.message : 'send failed'}`)
      }
      return { error: true }
    }
  },
})
