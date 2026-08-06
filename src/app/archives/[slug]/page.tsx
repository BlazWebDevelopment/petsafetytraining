import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Layout } from '../../../components/Layout'
import { Photo } from '../../../components/Photo'
import { PostSummary } from '../../../components/PostSummary'
import {
  CATEGORIES,
  getAdjacentPosts,
  getAllPosts,
  getCategoryById,
  getExcerpt,
  getPostById,
  getPostsByCategory,
} from '../../../lib/posts'
import { formatDateFull } from '../../../lib/format'
import { SITE } from '../../../lib/site'

export const dynamic = 'force-static'
export const dynamicParams = false

/** '55857704.html' -> entry, 'cat_315740.html' -> category archive. */
function resolve(slug: string) {
  if (!slug.endsWith('.html')) return null
  const key = slug.slice(0, -'.html'.length)

  if (key.startsWith('cat_')) {
    const category = getCategoryById(key.slice(4))
    return category ? ({ kind: 'category', category } as const) : null
  }

  const post = getPostById(key)
  return post ? ({ kind: 'post', post } as const) : null
}

export function generateStaticParams() {
  return [
    ...getAllPosts().map((p) => ({ slug: `${p.id}.html` })),
    ...CATEGORIES.map((c) => ({ slug: `cat_${c.id}.html` })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resolved = resolve(slug)
  if (!resolved) return {}

  if (resolved.kind === 'category') {
    return {
      title: `カテゴリ: ${resolved.category.name}`,
      description: `${SITE.title}の「${resolved.category.name}」カテゴリの記事一覧です。`,
    }
  }

  const description = getExcerpt(resolved.post, 120)
  return {
    title: resolved.post.title,
    description,
    openGraph: {
      title: resolved.post.title,
      description,
      type: 'article',
      locale: 'ja_JP',
      publishedTime: resolved.post.date.replace(' ', 'T'),
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resolved = resolve(slug)
  if (!resolved) return notFound()

  if (resolved.kind === 'category') {
    const posts = getPostsByCategory(resolved.category.id)
    return (
      <Layout>
        <div className="entry-divider pb-5">
          <p className="text-[10px] text-ink-mute">カテゴリ別アーカイブ</p>
          <h1 className="mt-1.5 font-round text-[20px] font-bold tracking-[1px] text-brown">
            {resolved.category.name} ({posts.length})
          </h1>
        </div>

        {posts.map((post, i) => (
          <PostSummary
            key={post.id}
            post={post}
            last={i === posts.length - 1}
          />
        ))}
      </Layout>
    )
  }

  const { post } = resolved
  const { newer, older } = getAdjacentPosts(post.id)

  // Two photos break up the body the way the entries on the source layout do.
  const first = post.body.slice(0, 3)
  const second = post.body.slice(3, 6)
  const rest = post.body.slice(6)

  return (
    <Layout>
      <article>
        <header className="mb-6">
          <h1 className="font-round text-[22px] font-bold leading-[1.5] tracking-[1px] text-brown sm:text-[28px]">
            {post.title}
          </h1>
          <div className="mt-3">
            <time
              dateTime={post.date.replace(' ', 'T')}
              className="entry-date"
            >
              {formatDateFull(post.date)}
            </time>
            <p className="mt-1.5">
              {post.categories.map((c, i) => (
                <span key={c.id}>
                  {i > 0 ? <span className="px-1 text-rose">｜</span> : null}
                  <Link
                    href={`/archives/cat_${c.id}.html`}
                    className="entry-cat"
                  >
                    {c.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </header>

        <Photo
          seed={post.id}
          src={post.image}
          alt={post.title}
          ratio="aspect-[3/2]"
          className="mb-9"
        />

        <div className="article-body">
          {first.map((p, i) => (
            <p key={`a${i}`}>{p}</p>
          ))}
        </div>

        {post.image2 ? (
          <Photo
            seed={`${post.id}-2`}
            src={post.image2}
            alt={post.title}
            ratio="aspect-[3/2]"
            className="my-9"
          />
        ) : null}

        {second.length ? (
          <div className="article-body mt-6">
            {second.map((p, i) => (
              <p key={`b${i}`}>{p}</p>
            ))}
          </div>
        ) : null}

        {rest.length ? (
          <div className="article-body mt-6">
            {rest.map((p, i) => (
              <p key={`c${i}`}>{p}</p>
            ))}
          </div>
        ) : null}

        <div className="entry-divider mt-10 pb-4">
          <p className="entry-date">
            {formatDateFull(post.date)} ／ {SITE.authorName}
          </p>
        </div>
      </article>

      <nav className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
        {older ? (
          <Link
            href={`/archives/${older.id}.html`}
            className="flex-1 text-left transition-opacity hover:opacity-50"
          >
            <span className="entry-date">← 前の記事</span>
            <span className="mt-1.5 block text-[13px] font-bold leading-snug text-brown">
              {older.title}
            </span>
          </Link>
        ) : (
          <span className="hidden flex-1 sm:block" />
        )}

        {newer ? (
          <Link
            href={`/archives/${newer.id}.html`}
            className="flex-1 text-right transition-opacity hover:opacity-50"
          >
            <span className="entry-date">次の記事 →</span>
            <span className="mt-1.5 block text-[13px] font-bold leading-snug text-brown">
              {newer.title}
            </span>
          </Link>
        ) : (
          <span className="hidden flex-1 sm:block" />
        )}
      </nav>

      <div className="mt-9 text-center">
        <Link href="/" className="btn-more">
          記事一覧へもどる
        </Link>
      </div>
    </Layout>
  )
}
