const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

function parse(date: string): Date {
  // Stored as 'YYYY-MM-DD HH:mm:ss'; treat it as a wall-clock date so the
  // rendered day never shifts with the build machine's timezone.
  const [d, t = '00:00:00'] = date.split(' ')
  const [y, m, day] = d.split('-').map(Number)
  const [hh, mm] = t.split(':').map(Number)
  return new Date(y, m - 1, day, hh, mm)
}

/** 2026年08月03日 — the date heading used above each entry. */
export function formatDateHeading(date: string): string {
  const dt = parse(date)
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')
  return `${dt.getFullYear()}年${mm}月${dd}日`
}

/** 2026年08月03日 (月) 20:27 — the byline under each entry title. */
export function formatDateFull(date: string): string {
  const dt = parse(date)
  const hh = String(dt.getHours()).padStart(2, '0')
  const mi = String(dt.getMinutes()).padStart(2, '0')
  return `${formatDateHeading(date)} (${WEEKDAYS[dt.getDay()]}) ${hh}:${mi}`
}

export function toIso(date: string): string {
  return parse(date).toISOString()
}
