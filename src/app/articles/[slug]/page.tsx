import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Layout } from '../../../components/Layout'
import { Container } from '../../../components/Container'
import { getArticleCoverAlt, getArticleCoverSrc } from '../../../lib/articleCovers'
import { getAllArticles, getArticleBySlug } from '../../../lib/data/articles'
import { formatArticleDate } from '../../../lib/format'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return notFound()

  const isRexStory = article.slug === 'when-wealth-isnt-enough'
  const isMikolasStory = article.slug === 'mikolas-pygmy-hippo-neuralink'
  const isNovaStory =
    article.slug === 'novas-journey-from-celebrity-companion-to-elite-safety-trainee'

  const dateLong = formatArticleDate(article.publishedAt).toUpperCase()

  return (
    <Layout>
      <Container>
        <div className="mb-6 flex items-center justify-between border-b border-rule pb-3">
          <div className="eyebrow">Article</div>
          <Link
            href="/articles"
            className="text-[11px] font-semibold uppercase tracking-editorial text-ink-soft hover:text-accent"
          >
            ← All articles
          </Link>
        </div>

        <article className="mx-auto max-w-3xl">
          <header className="section-surface p-6 sm:p-8">
            <div className="text-center text-[11px] font-semibold uppercase tracking-editorial text-accent">
              {dateLong} · {article.author}
            </div>
            <div className="mt-4 rule" />
            <h1 className="mt-5 text-balance text-center font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {article.title}
            </h1>
            <div className="mt-5 rule" />
            <p className="mt-5 text-center font-display text-lg font-medium leading-relaxed text-ink-soft">
              {article.excerpt}
            </p>
          </header>

          <figure className="mt-6">
            <div className="photo-frame">
              <img
                src={getArticleCoverSrc(article, 1400, 900)}
                alt={getArticleCoverAlt(article)}
                className="h-[320px] w-full object-cover sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <figcaption className="mt-2 text-center text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              {isMikolasStory
                ? 'Mikolas, inside the Neuralink research facility.'
                : isNovaStory
                  ? 'Nova, a young Shiba Inu.'
                  : isRexStory
                    ? 'A reminder that wealth is not the same as care.'
                    : 'A photographic study.'}
            </figcaption>
          </figure>

          <section className="mt-10 space-y-5 text-[17px] leading-[1.75] text-ink-soft">
            {article.content.slice(0, 1).map((p, idx) => (
              <p key={idx} className="drop-cap">
                {p}
              </p>
            ))}

            {article.content.slice(1, 8).map((p, idx) => (
              <p key={idx + 1}>{p}</p>
            ))}

            {isRexStory ? (
              <figure className="not-prose relative left-1/2 right-1/2 my-10 w-screen -translate-x-1/2 border-y border-rule bg-surface py-6 shadow-nav">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <div className="photo-frame">
                    <img
                      src="/rex.png"
                      alt="Rex"
                      className="mx-auto max-h-[78vh] w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-[12px] font-semibold uppercase tracking-editorial text-ink-mute">
                    Rex — the medium-sized mixed-breed dog Sam brought to the
                    pet safety training session.
                  </figcaption>
                </div>
              </figure>
            ) : null}

            {isMikolasStory ? (
              <figure className="not-prose relative left-1/2 right-1/2 my-10 w-screen -translate-x-1/2 border-y border-rule bg-surface py-6 shadow-nav">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <div className="photo-frame">
                    <img
                      src="/stat.png"
                      alt="Mikolas, the pygmy hippo"
                      className="mx-auto max-h-[78vh] w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-[12px] font-semibold uppercase tracking-editorial text-ink-mute">
                    Mikolas — &ldquo;Subject M-04&rdquo; in internal documentation,
                    photographed inside the Neuralink research facility where he
                    spent his entire life.
                  </figcaption>
                </div>
              </figure>
            ) : null}

            {article.content.slice(8).map((p, idx) => (
              <p key={idx + 8}>{p}</p>
            ))}
          </section>

          <div className="mt-12 border-t border-rule pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
                Filed {dateLong} · {article.author}
              </div>
              <div className="flex gap-3">
                <Link href="/articles" className="btn-secondary">
                  ← All articles
                </Link>
                <Link href="/" className="btn-primary">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </Layout>
  )
}
