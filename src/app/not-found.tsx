import Link from 'next/link'
import { Layout } from '../components/Layout'
import { Container } from '../components/Container'

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <div className="mx-auto max-w-2xl border-2 border-ink bg-paper p-10 text-center">
          <div className="eyebrow">Press error</div>
          <div className="mt-3 font-display text-[120px] font-black leading-none text-ink">
            404
          </div>
          <div className="my-4 double-rule" />
          <h1 className="font-display text-3xl font-black tracking-tight text-ink">
            Page not found
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            This edition has gone to print without that page. Use the
            navigation above or head back to the front page.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/" className="btn-primary">
              Front page
            </Link>
            <Link href="/adopt" className="btn-secondary">
              Browse rescues
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
