/**
 * CLI runner: seed the two Internship pop-up forms and wire them into
 * Site Settings → Internship.
 *
 *   pnpm seed:forms
 *
 * Idempotent: a form is only created if one with the same title doesn't
 * already exist (preserves editor edits). Site Settings links are only set
 * when they're still empty (never overwrites a manual choice). Safe to run on
 * production.
 */

import 'dotenv/config'
import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import { flushSeedTranslations } from '../hooks/seedTranslation'

function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: null,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              version: 1,
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
              text,
            },
          ],
        },
      ],
    },
  }
}

const SUBSCRIBE_LABEL =
  'Stay informed and take control of your future. Subscribe now and receive updates on exciting new opportunities in your field!'

const APPLY_FORM = {
  title: 'Internship — Apply',
  fields: [
    {
      blockType: 'upload',
      name: 'cv',
      label: 'Upload Your CV',
      required: false,
      width: 100,
      uploadCollection: 'media',
    },
    { blockType: 'text', name: 'name', label: 'Name', required: true, width: 50 },
    { blockType: 'number', name: 'age', label: 'Age', required: false, width: 50 },
    { blockType: 'text', name: 'phone', label: 'Phone number', required: true, width: 50 },
    { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
    { blockType: 'text', name: 'major', label: 'Major', required: false, width: 100 },
    { blockType: 'checkbox', name: 'subscribe', label: SUBSCRIBE_LABEL, required: false, width: 100 },
  ],
  submitButtonLabel: 'APPLY',
  confirmationType: 'message',
  confirmationMessage: lexicalParagraph(
    'Application received — thank you! Our team will review it and get back to you soon.',
  ),
}

const SUGGEST_FORM = {
  title: 'Suggest New Opportunities',
  fields: [
    { blockType: 'text', name: 'name', label: 'Name', required: true, width: 100 },
    { blockType: 'text', name: 'phone', label: 'Phone number', required: true, width: 100 },
    { blockType: 'email', name: 'email', label: 'Email', required: true, width: 100 },
    { blockType: 'text', name: 'major', label: 'Major', required: false, width: 100 },
    { blockType: 'country', name: 'country', label: 'Country', required: false, width: 100 },
    { blockType: 'checkbox', name: 'subscribe', label: SUBSCRIBE_LABEL, required: false, width: 100 },
  ],
  submitButtonLabel: 'APPLY',
  confirmationType: 'message',
  confirmationMessage: lexicalParagraph(
    "Thanks for the suggestion! We'll review it and be in touch.",
  ),
}

// SEED_FORCE=1 → delete any existing form with the same title and recreate it
// fresh (picks up updated field definitions). Default is idempotent (skip).
const FORCE = process.env.SEED_FORCE === '1'

async function ensureForm(
  payload: Payload,
  formData: typeof APPLY_FORM,
): Promise<{ id: string | number; created: boolean }> {
  const existing = await payload.find({
    collection: 'forms',
    where: { title: { equals: formData.title } },
    limit: 1,
  })

  if (existing.docs[0]) {
    if (!FORCE) return { id: existing.docs[0].id, created: false }
    await payload.delete({ collection: 'forms', id: existing.docs[0].id })
    process.stdout.write(`[seed-forms] deleted existing "${formData.title}"\n`)
  }

  const result = await payload.create({
    collection: 'forms',
    data: formData as never,
  })
  return { id: result.id, created: true }
}

const run = async (): Promise<void> => {
  process.stdout.write('[seed-forms] booting payload...\n')
  const payload = await getPayload({ config })

  const apply = await ensureForm(payload, APPLY_FORM)
  const suggest = await ensureForm(payload, SUGGEST_FORM)
  process.stdout.write(
    `[seed-forms] apply=${apply.created ? 'created' : 'exists'} (${apply.id}), suggest=${
      suggest.created ? 'created' : 'exists'
    } (${suggest.id})\n`,
  )

  // Wire into Site Settings only where the link is still empty (don't clobber
  // a manual choice).
  const settings = (await payload.findGlobal({ slug: 'site-settings' })) as {
    internship?: { applyForm?: unknown; suggestForm?: unknown }
  }
  const cur = settings?.internship ?? {}
  const idOf = (v: unknown) =>
    v && typeof v === 'object' ? (v as { id?: unknown }).id : v

  // Keep the current link ONLY if it still points to a form that exists —
  // otherwise (empty, or dangling after a delete) fall back to the seeded one.
  const resolveLink = async (
    curRef: unknown,
    fallbackId: string | number,
  ): Promise<string | number> => {
    const id = idOf(curRef) as string | number | undefined
    if (!id) return fallbackId
    const found = await payload
      .findByID({ collection: 'forms', id, disableErrors: true })
      .catch(() => null)
    return found ? id : fallbackId
  }

  const nextApply = await resolveLink(cur.applyForm, apply.id)
  const nextSuggest = await resolveLink(cur.suggestForm, suggest.id)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { internship: { applyForm: nextApply, suggestForm: nextSuggest } } as never,
  })
  process.stdout.write('[seed-forms] linked forms in Site Settings → Internship.\n')

  await flushSeedTranslations()
  process.exit(0)
}

run().catch((err) => {
  process.stderr.write(`[seed-forms] failed: ${(err as Error).message}\n`)
  process.exit(1)
})
