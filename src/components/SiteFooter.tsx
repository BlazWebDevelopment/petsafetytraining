import Link from 'next/link'
import { SITE } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="pb-14">
      <div className="mx-auto max-w-shell px-4 text-center">
        <Link
          href="#top"
          className="text-[12px] text-ink-soft transition-opacity hover:opacity-50"
        >
          ↑このページのトップヘ
        </Link>
        <p className="mt-6 text-[11px] leading-[1.9] text-ink-mute">
          {SITE.title}
          <br />
          掲載している文章および写真の無断転載はご遠慮ください。
        </p>
      </div>
    </footer>
  )
}
