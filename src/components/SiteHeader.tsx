import Link from 'next/link'
import { SITE } from '../lib/site'
import { CATEGORIES } from '../lib/posts'
import { PawIcon } from './Photo'

export function SiteHeader() {
  return (
    <header>
      <div className="mx-auto max-w-shell px-4 pb-2 pt-12 text-center sm:pt-16">
        <Link href="/" className="inline-block transition-opacity hover:opacity-70">
          <span className="flex items-center justify-center gap-3">
            <PawIcon className="h-8 w-8 shrink-0" />
            <span className="font-round text-[30px] font-bold tracking-wide text-brown sm:text-[42px]">
              {SITE.title}
            </span>
            <PawIcon className="h-8 w-8 shrink-0 -scale-x-100" />
          </span>
        </Link>
        <p className="mx-auto mt-5 max-w-2xl text-[12px] leading-[1.9] text-ink-soft">
          {SITE.description}
        </p>
      </div>

      <nav className="mx-auto max-w-shell px-4 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li>
            <Link
              href="/"
              className="text-[13px] transition-opacity hover:opacity-50"
            >
              HOME
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link
                href={`/archives/cat_${c.id}.html`}
                className="text-[13px] transition-opacity hover:opacity-50"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
