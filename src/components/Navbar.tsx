'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from './Container'
import { LogoMark } from './Logo'

const navLinkBase =
  'rounded-xl px-3 py-2 text-sm font-medium text-slate-200/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`)

  const linkClass = (href: string) =>
    `${navLinkBase} ${isActive(href) ? 'bg-white/10 text-white' : ''}`

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <LogoMark className="h-9 w-9 drop-shadow-sm" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-white">
                Pet Safety Training
              </div>
              <div className="text-xs text-slate-300/70 group-hover:text-slate-200">
                safer pets, better homes
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/" className={linkClass('/')}>
              Home
            </Link>
            <Link href="/adopt" className={linkClass('/adopt')}>
              Adopt
            </Link>
            <Link
              href="/articles"
              className={linkClass('/articles')}
            >
              Articles
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  )
}

