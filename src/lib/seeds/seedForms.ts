/**
 * Seed default forms in the Forms collection (form-builder plugin).
 *
 * Creates two template forms editors can duplicate and customize:
 *   1. "Contact Us"          — name, email, phone, message
 *   2. "Program Application" — name, email, phone, age, country, education, message
 *
 * Idempotent: if a form with the same title already exists, it's skipped
 * (preserves editor's manual edits across re-runs).
 */

import type { Payload } from 'payload'

// ─── Lexical helper ──────────────────────────────────────────────────────

/**
 * Builds a minimal valid Lexical document with a single text paragraph.
 * The form-builder plugin requires a rich-text `confirmationMessage`
 * whenever `confirmationType` is set to 'message'.
 */
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

export interface SeedFormsResult {
  ok: boolean
  message: string
  forms: {
    contactFormId?: string | number
    applicationFormId?: string | number
  }
  created: string[]
  skipped: string[]
  errors: string[]
}

// ─── Form definitions ────────────────────────────────────────────────────

const CONTACT_FORM = {
  title: 'Contact Us',
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Full Name',
      required: true,
      width: 100,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
      width: 100,
    },
    {
      blockType: 'text',
      name: 'phone',
      label: 'Phone Number',
      required: true,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'message',
      label: 'Your Message',
      required: true,
      width: 100,
    },
  ],
  submitButtonLabel: 'Send Message',
  confirmationType: 'message',
  confirmationMessage: lexicalParagraph(
    "Thanks for reaching out! We've received your message and will get back to you within 1–2 business days.",
  ),
}

const APPLICATION_FORM = {
  title: 'Program Application',
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Full Name',
      required: true,
      width: 50,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
      width: 50,
    },
    {
      blockType: 'text',
      name: 'phone',
      label: 'Phone Number',
      required: true,
      width: 50,
    },
    {
      blockType: 'number',
      name: 'age',
      label: 'Age',
      required: false,
      width: 50,
    },
    {
      blockType: 'country',
      name: 'country',
      label: 'Country',
      required: false,
      width: 50,
    },
    {
      blockType: 'text',
      name: 'education',
      label: 'Education',
      required: false,
      width: 50,
    },
    {
      // Program-of-interest dropdown — editors-style select so the
      // applicant picks from a predefined list instead of free-typing.
      // On a specific program detail page the applicant naturally picks
      // the matching option; on a generic contact context they pick
      // whatever they want.
      blockType: 'select',
      name: 'program',
      label: 'Program of Interest',
      required: true,
      width: 100,
      options: [
        { label: 'Summer Work & Travel', value: 'summer-work-travel' },
        { label: 'Camp Counselor', value: 'camp-counselor' },
        { label: 'Internship & Trainee', value: 'internship' },
        { label: 'Study Abroad', value: 'study-abroad' },
        { label: 'Language Programs', value: 'language' },
      ],
    },
    {
      blockType: 'textarea',
      name: 'coverLetter',
      label: 'Cover Letter / Why you want to join',
      required: false,
      width: 100,
    },
    {
      // form-builder's "upload" field type — enabled via plugin config
      // `fields: { upload: true }`. Files attach to the Media collection so
      // they share storage with the rest of the site (DO Spaces in prod).
      // The plugin's Upload block uses `uploadCollection` (singular string),
      // NOT `relationTo` — the latter is silently ignored and validation
      // fails because `uploadCollection` is required.
      blockType: 'upload',
      name: 'cv',
      label: 'CV / Resume (PDF preferred)',
      required: false,
      width: 100,
      uploadCollection: 'media',
    },
  ],
  submitButtonLabel: 'Submit Application',
  confirmationType: 'message',
  confirmationMessage: lexicalParagraph(
    "Application received — thank you! Our team will review it and reach out within a few business days.",
  ),
}

// ─── Helper ──────────────────────────────────────────────────────────────

async function ensureForm(
  payload: Payload,
  formData: typeof CONTACT_FORM,
): Promise<{ id: string | number; created: boolean }> {
  const existing = await payload.find({
    collection: 'forms',
    where: { title: { equals: formData.title } },
    limit: 1,
  })
  if (existing.docs[0]) {
    return { id: existing.docs[0].id, created: false }
  }

  const result = await payload.create({
    collection: 'forms',
    data: formData as never,
  })

  return { id: result.id, created: true }
}

// ─── Public API ──────────────────────────────────────────────────────────

export async function seedForms(payload: Payload): Promise<SeedFormsResult> {
  const result: SeedFormsResult = {
    ok: true,
    message: '',
    forms: {},
    created: [],
    skipped: [],
    errors: [],
  }

  try {
    const contact = await ensureForm(payload, CONTACT_FORM)
    result.forms.contactFormId = contact.id
    ;(contact.created ? result.created : result.skipped).push(CONTACT_FORM.title)
  } catch (err) {
    result.errors.push(`Contact Us: ${(err as Error).message}`)
  }

  try {
    const app = await ensureForm(payload, APPLICATION_FORM)
    result.forms.applicationFormId = app.id
    ;(app.created ? result.created : result.skipped).push(APPLICATION_FORM.title)
  } catch (err) {
    result.errors.push(`Program Application: ${(err as Error).message}`)
  }

  result.message = `Forms seed done. created=${result.created.length}, skipped=${result.skipped.length}, errors=${result.errors.length}.`
  if (result.errors.length) result.ok = false

  return result
}
