'use client'

import Link from 'next/link'
import { Container } from './Container'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t-2 border-ink bg-paper-2/40">
      <div className="double-rule" />
      <Container>
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-xl font-black tracking-tight text-ink">
              Pet Safety Training
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              Established MMXXVI
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Practical, safety-first training and an honest rescue directory —
              printed daily for the conscientious pet owner.
            </p>
          </div>

          <div>
            <div className="eyebrow-ink">Sections</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="link-underline">
                  Front Page
                </Link>
              </li>
              <li>
                <Link href="/adopt" className="link-underline">
                  Rescue Directory
                </Link>
              </li>
              <li>
                <Link href="/articles" className="link-underline">
                  Editorial Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow-ink">Editorial Desk</div>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>Editor: P. S. Trainer</li>
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
            <div className="eyebrow-ink">Subscribe by post</div>
            <p className="mt-3 text-sm text-ink-soft">
              For demonstration purposes — no email is collected.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex gap-2"
              action="#"
            >
              <input
                type="email"
                placeholder="your@address"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary">
                Sign up
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-ink/60 py-4 text-center text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
          © {year} Pet Safety Training · Photos loaded from a public source for
          demo purposes
        </div>
      </Container>
    </footer>
  )
}
