'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'
import { Container } from './Container'
import { LogoMark } from './Logo'

function todayLine() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const subscribe = () => () => {}
const getServerSnapshot = () => ''

export function Navbar() {
  const pathname = usePathname()
  const dateLine = useSyncExternalStore(
    subscribe,
    todayLine,
    getServerSnapshot,
  )

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`)

  const linkClass = (href: string) =>
    [
      'relative px-1 py-1 text-[13px] font-medium text-ink-soft transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-ink hover:after:scale-x-100',
      isActive(href) ? 'text-ink after:scale-x-100' : '',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface/92 shadow-nav backdrop-blur-md supports-[backdrop-filter]:bg-surface/80">
      <div className="border-b border-rule/80 bg-paper/80">
        <Container>
          <div className="flex h-9 items-center justify-between gap-4 text-[11px] font-medium text-ink-mute">
            <span className="hidden sm:inline">
              Practical training · Thoughtful adoption
            </span>
            <span
              suppressHydrationWarning
              className="tabular-nums sm:ml-auto"
            >
              {dateLine || '\u00A0'}
            </span>
            <span className="hidden font-semibold text-sage lg:inline">
              Safer pets, better homes
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <LogoMark className="h-11 w-11 shrink-0" />
            <div className="leading-tight">
              <div className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Pet Safety Training
              </div>
              <div className="mt-0.5 hidden text-[11px] font-medium text-ink-mute sm:block">
                Safety-first care for dogs &amp; their people
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className={linkClass('/')}>
              Home
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
    </header>
  )
}
