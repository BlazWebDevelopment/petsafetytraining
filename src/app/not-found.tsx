import Link from 'next/link'
import { Layout } from '../components/Layout'
import { Container } from '../components/Container'

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="text-sm font-semibold text-slate-300/70">404</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Page not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-200/70">
            The page you’re looking for doesn’t exist. Use the navigation above or
            head back home.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
            >
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

