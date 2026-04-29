import { notFound } from 'next/navigation'
import { Layout } from '../../../components/Layout'
import { Container } from '../../../components/Container'
import { animalPhotoUrl } from '../../../lib/photos'
import { getAllArticles, getArticleBySlug } from '../../../lib/data/articles'

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

  return (
    <Layout>
      <Container>
        <article className="mx-auto max-w-3xl">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-xs font-semibold tracking-wide text-slate-300/70">
              Article
            </div>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {article.title}
            </h1>
            <div className="mt-4 text-sm text-slate-200/70">
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              })}{' '}
              · {article.author}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-200/70">
              {article.excerpt}
            </p>
          </header>

          <figure className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={animalPhotoUrl(article.coverTopic, article.coverSeed, 1400, 900)}
              alt=""
              className="h-[320px] w-full object-cover sm:h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </figure>

          <section className="mt-8 space-y-5 text-base leading-relaxed text-slate-200/80">
            {article.content.slice(0, 8).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            {isRexStory ? (
              <figure className="not-prose relative left-1/2 right-1/2 my-8 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-white/5">
                <img
                  src="/rex.png"
                  alt="Rex"
                  className="mx-auto max-h-[78vh] w-full object-contain"
                  loading="lazy"
                />
                <figcaption className="mx-auto max-w-3xl px-4 py-3 text-sm text-slate-200/75 sm:px-6">
                  Rex, the medium-sized mixed-breed dog Sam brought to the pet safety
                  training session.
                </figcaption>
              </figure>
            ) : null}

            {article.content.slice(8).map((p, idx) => (
              <p key={idx + 8}>{p}</p>
            ))}
          </section>
        </article>
      </Container>
    </Layout>
  )
}

