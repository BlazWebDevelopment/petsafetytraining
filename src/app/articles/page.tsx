import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { Container } from '../../components/Container'
import { animalPhotoUrl } from '../../lib/photos'
import { getAllArticles } from '../../lib/data/articles'
import { formatArticleDate, formatArticleDateShort } from '../../lib/format'
import type { Article } from '../../lib/types'

function articleCoverSrc(
  article: Article,
  width: number,
  height: number,
) {
  if (article.slug === 'mikolas-pygmy-hippo-neuralink') return '/pigmi.jpg'
  return animalPhotoUrl(article.coverTopic, article.coverSeed, width, height)
}

export const dynamic = 'force-static'

export default function Page() {
  const articles = getAllArticles()
  const [lead, ...rest] = articles

  return (
    <Layout>
      <Container>
        <header className="border-2 border-ink bg-paper p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
            <div className="eyebrow">Section · Editorial</div>
            <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              {articles.length} pieces in print
            </div>
          </div>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Articles & Editorial
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">
            Stories and practical reminders that help pets stay safe, healthy,
            and loved — printed for the conscientious owner.
          </p>
        </header>

        {lead ? (
          <article className="mt-8 grid gap-0 border-2 border-ink bg-paper md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="photo-frame border-0 border-b border-ink p-2 md:border-b-0 md:border-r md:border-ink">
                <img
                  src={articleCoverSrc(lead, 1400, 900)}
                  alt={
                    lead.slug === 'mikolas-pygmy-hippo-neuralink'
                      ? 'Mikolas, the pygmy hippo'
                      : ''
                  }
                  className="h-64 w-full object-cover sm:h-80 md:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col p-6 md:col-span-5 md:p-8">
              <div className="eyebrow">Latest Headline</div>
              <h2 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
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
                  Read the full story →
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        <section className="mt-10">
          <div className="mb-6 border-b-2 border-ink pb-3">
            <div className="eyebrow">More from the desk</div>
            <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-ink">
              All articles
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <article
                key={a.id}
                className="flex flex-col border-2 border-ink bg-paper transition-shadow hover:shadow-press-sm"
              >
                <div className="photo-frame border-0 border-b border-ink p-1.5">
                  <img
                    src={articleCoverSrc(a, 1200, 800)}
                    alt={
                      a.slug === 'mikolas-pygmy-hippo-neuralink'
                        ? 'Mikolas, the pygmy hippo'
                        : ''
                    }
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
                      className="link-underline text-sm font-bold uppercase tracking-editorial"
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
