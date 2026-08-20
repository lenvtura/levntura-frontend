import type { CollectionBeforeChangeHook } from 'payload'

/**
 * On CREATE, default a post's `language` to the admin locale it's being
 * authored in — so writing a post while the admin is switched to Arabic marks
 * it `ar` automatically, and English authoring marks it `en`.
 *
 * Why: blog posts are single-language, but the fields are still localized, so
 * the content lands in whichever locale column the editor is viewing. Without
 * this, the manual `language` flag (default `en`) easily drifts from the locale
 * the content was actually typed in — e.g. Arabic content flagged `en`, which
 * makes the post show (broken) on the English site and hide on the Arabic one.
 *
 * Create-only: later edits never flip the flag, so an editor can still override
 * the language by hand in the sidebar.
 */
export const setDefaultLanguage: CollectionBeforeChangeHook = ({
  data,
  operation,
  req,
}) => {
  if (operation === 'create' && (req.locale === 'en' || req.locale === 'ar')) {
    data.language = req.locale
  }
  return data
}
