import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { Container } from '../../components/Container'
import { animalPhotoUrl } from '../../lib/photos'
import { getAllArticles } from '../../lib/data/articles'

export const dynamic = 'force-static'

export default function Page() {
  const articles = getAllArticles()

  return (
    <Layout>
      <Container>
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Articles
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200/70">
              Stories and practical reminders that help pets stay safe, healthy, and
              loved.
            </p>
          </div>
          <div className="text-xs text-slate-300/60">
            {articles.length} articles
          </div>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="relative">
                <img
                  src={animalPhotoUrl(a.coverTopic, a.coverSeed, 1200, 800)}
                  alt=""
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-300/60">
                  {new Date(a.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}{' '}
                  · {a.author}
                </div>
                <h2 className="mt-2 text-base font-semibold text-white">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
                  >
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-200/70">
                  {a.excerpt}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="text-sm font-semibold text-sky-300 hover:text-sky-200"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </Layout>
  )
}

