'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'
import { Container } from './Container'
import { LogoMark } from './Logo'

function todayDateline() {
  return new Date()
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })
    .toUpperCase()
}

// `useSyncExternalStore` is the React-blessed way to render a value that is
// only available on the client (today's date in the visitor's timezone) while
// keeping SSR markup stable. The server snapshot returns an empty string, so
// the initial HTML matches what the client renders during hydration; after
// hydration, the live client snapshot takes over without a mismatch.
const subscribe = () => () => {}
const getServerSnapshot = () => ''

export function Navbar() {
  const pathname = usePathname()
  const dateline = useSyncExternalStore(
    subscribe,
    todayDateline,
    getServerSnapshot,
  )

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`)

  const linkClass = (href: string) =>
    [
      'px-1 py-1 text-[11px] font-bold uppercase tracking-editorial transition-colors',
      isActive(href)
        ? 'text-accent border-b-2 border-accent'
        : 'text-ink hover:text-accent border-b-2 border-transparent hover:border-accent',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="border-b border-ink/70 bg-paper-2/60">
        <Container>
          <div className="flex h-7 items-center justify-between text-[10px] font-semibold uppercase tracking-editorial text-ink/80">
            <span className="hidden sm:inline">Vol. I · No. III</span>
            <span
              suppressHydrationWarning
              className="hidden sm:inline tabular-nums"
            >
              {dateline || '\u00A0'}
            </span>
            <span className="text-accent">Safer Pets · Better Homes</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <LogoMark className="h-12 w-12" />
            <div className="leading-none">
              <div className="font-display text-2xl font-black tracking-tight text-ink sm:text-[28px]">
                Pet Safety Training
              </div>
              
            </div>
          </Link>

          <nav className="flex items-center gap-5 sm:gap-7">
            <Link href="/" className={linkClass('/')}>
              Front Page
            </Link>
            <Link href="/adopt" className={linkClass('/adopt')}>
              Adopt
            </Link>
            <Link href="/articles" className={linkClass('/articles')}>
              Articles
            </Link>
          </nav>
        </div>
      </Container>
      <div className="double-rule" />
    </header>
  )
}
