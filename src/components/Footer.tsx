'use client'

import Link from 'next/link'
import { Container } from './Container'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-rule bg-surface">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-lg font-bold tracking-tight text-ink">
              Pet Safety Training
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Resources and adoption listings for people who want calm, safe,
              happy homes for their pets.
            </p>
          </div>

          <div>
            <div className="eyebrow-ink">Explore</div>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="link-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/adopt" className="link-underline">
                  Rescue directory
                </Link>
              </li>
              <li>
                <Link href="/articles" className="link-underline">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow-ink">Contact</div>
            <ul className="mt-3 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href="mailto:editor@petsafetytraining.com"
                  className="link-underline"
                >
                  editor@petsafetytraining.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:adoptions@petsafetytraining.com"
                  className="link-underline"
                >
                  adoptions@petsafetytraining.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow-ink">Newsletter</div>
            <p className="mt-3 text-sm text-ink-soft">
              Occasional safety tips and new listings. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              action="#"
            >
              <input
                type="email"
                placeholder="you@email.com"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-rule py-5 text-center text-[11px] font-medium text-ink-mute">
          © {year} Pet Safety Training. Photos from public sources.
        </div>
      </Container>
    </footer>
  )
}
