import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { Container } from '../../components/Container'
import { getArticleCoverAlt, getArticleCoverSrc } from '../../lib/articleCovers'
import { getAllArticles } from '../../lib/data/articles'
import { formatArticleDate, formatArticleDateShort } from '../../lib/format'

export const dynamic = 'force-static'

export default function Page() {
  const articles = getAllArticles()
  const [lead, ...rest] = articles

  return (
    <Layout>
      <Container>
        <header className="section-surface p-6 sm:p-8 lg:border-l-4 lg:border-l-accent">
          <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-3">
            <div className="eyebrow">Articles</div>
            <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              {articles.length} stories
            </div>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Safety &amp; care
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">
            Practical reminders and stories that help pets stay safe, healthy,
            and loved.
          </p>
        </header>

        {lead ? (
          <article className="mt-8 grid gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-card md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="photo-frame h-full rounded-none border-0 border-b border-rule md:border-b-0 md:border-r md:border-rule">
                <img
                  src={getArticleCoverSrc(lead, 1400, 900)}
                  alt={getArticleCoverAlt(lead)}
                  className="h-64 w-full object-cover sm:h-80 md:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col p-6 md:col-span-5 md:p-8">
              <div className="eyebrow">Latest</div>
              <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                <Link
                  href={`/articles/${lead.slug}`}
                  className="hover:text-accent"
                >
                  {lead.title}
                </Link>
              </h2>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
                {formatArticleDate(lead.publishedAt).toUpperCase()} ·{' '}
                {lead.author}
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {lead.excerpt}
              </p>
              <div className="mt-6">
                <Link
                  href={`/articles/${lead.slug}`}
                  className="btn-primary"
                >
                  Read full article →
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        <section className="mt-10">
          <div className="mb-6 border-b border-rule pb-3">
            <div className="eyebrow">Archive</div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
              All articles
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <article
                key={a.id}
                className="flex flex-col overflow-hidden rounded-md border border-rule bg-surface shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="photo-frame rounded-none border-x-0 border-t-0 border-b border-rule">
                  <img
                    src={getArticleCoverSrc(a, 1200, 800)}
                    alt={getArticleCoverAlt(a)}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
                    {formatArticleDateShort(a.publishedAt).toUpperCase()} ·{' '}
                    {a.author}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
                    <Link
                      href={`/articles/${a.slug}`}
                      className="hover:text-accent"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {a.excerpt}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/articles/${a.slug}`}
                      className="link-underline text-sm font-semibold uppercase tracking-editorial"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  )
}
