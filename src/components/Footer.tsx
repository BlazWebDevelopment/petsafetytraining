import { Container } from './Container'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-3 py-8 sm:flex-row sm:items-center">
          <div className="text-sm text-slate-300/70">
            © {year} Pet Safety Training. All rights reserved.
          </div>
          <div className="text-xs text-slate-300/60">
            Photos are loaded from a public image source for demo purposes.
          </div>
        </div>
      </Container>
    </footer>
  )
}

