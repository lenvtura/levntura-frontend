import crypto from 'crypto'
import type { CollectionAfterChangeHook, Payload } from 'payload'

export type WebhookEvent = 'form_submission'

type WebhookConfig = {
  url?: string
  secret?: string
  events?: WebhookEvent[]
  enabled?: boolean
}

type SiteSettingsWithWebhooks = {
  integrations?: {
    webhooks?: WebhookConfig[]
  }
} | null

const sendOne = async (
  webhook: WebhookConfig,
  event: WebhookEvent,
  data: unknown,
  payload: Payload,
): Promise<void> => {
  if (!webhook.url) return

  try {
    const body = JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      data,
    })

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Levntura-Event': event,
    }

    if (webhook.secret) {
      const signature = crypto
        .createHmac('sha256', webhook.secret)
        .update(body)
        .digest('hex')
      headers['X-Levntura-Signature'] = `sha256=${signature}`
    }

    const res = await fetch(webhook.url, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) {
      payload.logger.warn(
        `[webhook] ${webhook.url} → ${res.status} ${res.statusText}`,
      )
    }
  } catch (err) {
    payload.logger.warn(
      `[webhook] ${webhook.url} failed: ${(err as Error).message}`,
    )
  }
}

export const sendWebhook = async (
  event: WebhookEvent,
  data: unknown,
  payload: Payload,
): Promise<void> => {
  let settings: SiteSettingsWithWebhooks
  try {
    settings = (await payload.findGlobal({
      slug: 'site-settings',
    })) as SiteSettingsWithWebhooks
  } catch {
    return
  }

  const webhooks = settings?.integrations?.webhooks ?? []
  const targets = webhooks.filter(
    (w) => w.enabled && w.url && (w.events || []).includes(event),
  )

  if (targets.length === 0) return

  await Promise.allSettled(
    targets.map((w) => sendOne(w, event, data, payload)),
  )
}

export const dispatchWebhookHook = (
  event: WebhookEvent,
): CollectionAfterChangeHook => {
  return async ({ doc, operation, req: { payload } }) => {
    if (operation !== 'create') return doc
    await sendWebhook(event, doc, payload)
    return doc
  }
}
