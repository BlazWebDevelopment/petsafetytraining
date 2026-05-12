import Link from 'next/link'
import { Layout } from '../components/Layout'
import { Container } from '../components/Container'

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <div className="mx-auto max-w-2xl section-surface p-10 text-center lg:border-t-4 lg:border-t-accent">
          <div className="eyebrow">Missing page</div>
          <div className="mt-3 font-display text-[108px] font-bold leading-none text-ink">
            404
          </div>
          <div className="my-4 rule" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
            Page not found
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            That address does not exist. Use the navigation above or head back
            to the home page.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/" className="btn-primary">
              Home
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
