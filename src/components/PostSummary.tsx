import Link from 'next/link'
import type { Post } from '../lib/posts'
import { getExcerpt } from '../lib/posts'
import { formatDateHeading } from '../lib/format'
import { Photo } from './Photo'

/**
 * Index entry. The first entry runs full width with a large photo; the rest use
 * a floated thumbnail on the left with the text block to the right.
 */
export function PostSummary({
  post,
  featured = false,
  last = false,
}: {
  post: Post
  featured?: boolean
  last?: boolean
}) {
  const href = `/archives/${post.id}.html`

  const meta = (
    <>
      <p className="entry-date">{formatDateHeading(post.date)}</p>
      <p className="mt-1.5">
        {post.categories.map((c, i) => (
          <span key={c.id}>
            {i > 0 ? <span className="px-1 text-rose">｜</span> : null}
            <Link href={`/archives/cat_${c.id}.html`} className="entry-cat">
              {c.name}
            </Link>
          </span>
        ))}
      </p>
    </>
  )

  if (featured) {
    return (
      <article className={last ? '' : 'entry-divider pb-10'}>
        <header className="mb-4">
          <h2>
            <Link href={href} className="entry-title text-[22px] sm:text-[28px]">
              {post.title}
            </Link>
          </h2>
          <div className="mt-2.5">{meta}</div>
        </header>

        <Link href={href} className="block">
          <Photo seed={post.id} src={post.image} alt={post.title} ratio="aspect-[3/2]" />
        </Link>

        <div className="mt-6 text-right">
          <Link href={href} className="btn-more">
            続きを読む
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className={last ? 'pt-10' : 'entry-divider pb-10 pt-10'}>
      <div className="sm:flex sm:gap-6">
        <Link href={href} className="block shrink-0 sm:w-[308px]">
          <Photo
            seed={post.id}
            src={post.image}
            alt={post.title}
            ratio="aspect-[308/216]"
          />
        </Link>

        <div className="mt-4 min-w-0 flex-1 sm:mt-0">
          <h2>
            <Link href={href} className="entry-title text-[17px] sm:text-[18px]">
              {post.title}
            </Link>
          </h2>
          <div className="mt-2.5">{meta}</div>

          <p className="clamp-2 mt-3 text-[13px] leading-[1.5] text-ink">
            {getExcerpt(post)}
          </p>

          <div className="mt-5 text-right">
            <Link href={href} className="btn-more">
              続きを読む
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
