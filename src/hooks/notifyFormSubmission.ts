import type { CollectionAfterChangeHook } from 'payload'
import { getSiteContext } from '../lib/email/helpers'
import { formSubmissionNotifyTemplate } from '../lib/email/templates/formSubmissionNotify'

type FormRef = { title?: string } | string | null

type SubmissionField = { field?: string; value?: unknown }

const resolveFormTitle = async (
  form: FormRef,
  payload: Parameters<CollectionAfterChangeHook>[0]['req']['payload'],
): Promise<string> => {
  if (!form) return 'a form'
  if (typeof form === 'object') return form.title || 'a form'
  try {
    const f = (await payload.findByID({
      collection: 'forms',
      id: form,
      depth: 0,
    })) as { title?: string } | null
    return f?.title || 'a form'
  } catch {
    return 'a form'
  }
}

export const notifyFormSubmission: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req: { payload },
}) => {
  if (operation !== 'create') return doc

  try {
    const settings = (await payload.findGlobal({ slug: 'site-settings' })) as {
      email?: { notificationEmail?: string; fromAddress?: string }
    } | null
    const adminEmail =
      settings?.email?.notificationEmail || settings?.email?.fromAddress

    if (!adminEmail) return doc

    const formTitle = await resolveFormTitle(doc.form as FormRef, payload)
    const fields = (doc.submissionData as SubmissionField[]) || []

    const ctx = await getSiteContext(payload)
    const { subject, html } = formSubmissionNotifyTemplate(ctx, {
      formTitle,
      fields,
    })

    await payload.sendEmail({ to: adminEmail, subject, html })
  } catch (err) {
    payload.logger.warn(
      `[form-submissions] notify failed: ${(err as Error).message}`,
    )
  }

  return doc
}
