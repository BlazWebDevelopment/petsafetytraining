// Stable, deterministic date formatters.
// We always use the `en-US` locale and the `UTC` time zone so the string
// produced on the server matches the string produced on the client. This
// prevents React hydration mismatches when the host machine's locale or
// timezone differs from the visitor's browser.

const LONG_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  timeZone: 'UTC',
}

const SHORT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
}

export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', LONG_OPTIONS)
}

export function formatArticleDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', SHORT_OPTIONS)
}
