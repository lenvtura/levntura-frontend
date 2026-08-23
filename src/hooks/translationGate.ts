import type { CollectionBeforeChangeHook } from 'payload'

export const translationGate: CollectionBeforeChangeHook = ({
  data,
  req,
}) => {
  if ((req.context as { autoSeed?: boolean })?.autoSeed) return data

  // `translationComplete` is a fully manual flag the editor controls. It only
  // decides whether the Arabic URL is advertised to search engines — see
  // sitemap.xml, which emits the AR hreflang only when this is true.
  //
  // We intentionally do NOT auto-reset it on English edits: the old
  // JSON.stringify diff of `sections` gave false positives (block ids / key
  // order differ on every save), so it wiped the editor's choice on each
  // publish. The editor turns it on/off by hand now.

  // Safety gate: never let an Arabic version go live while it's still marked
  // incomplete (i.e. publishing while the admin locale is Arabic).
  if (
    req.locale === 'ar' &&
    data._status === 'published' &&
    !data.translationComplete
  ) {
    throw new Error(
      'Cannot publish Arabic version until "Translation Complete" is checked. Please review the AR content first.',
    )
  }

  return data
}
