import Link from 'next/link'
import { FAMILY, SITE } from '../lib/site'
import {
  getAllPosts,
  getCategoryCounts,
  getMonthlyArchives,
} from '../lib/posts'
import { PawIcon, Photo } from './Photo'

function Module({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-11">
      <h2 className="sidetitle">
        <PawIcon className="h-5 w-5 shrink-0" />
        {title}
      </h2>
      <div className="mt-3 text-[13px] leading-[1.6] text-ink">{children}</div>
    </section>
  )
}

export function Sidebar() {
  const recent = getAllPosts().slice(0, 5)
  const categories = getCategoryCounts()
  const months = getMonthlyArchives()

  return (
    <aside className="w-full shrink-0 lg:w-[300px]">
      <section className="mb-11 text-center">
        <div className="mx-auto w-full max-w-[240px]">
          <Photo
            seed="profile"
            src={SITE.authorImage}
            alt={SITE.authorName}
            ratio="aspect-square"
            frame={false}
          />
        </div>
        <p className="mt-5 font-round text-[20px] font-bold">
          {SITE.authorName}
        </p>
        <p className="mt-4 text-left text-[13px] leading-[1.7]">
          {SITE.authorBio}
        </p>
      </section>

      <Module title="家族の紹介">
        <div className="space-y-12">
          {FAMILY.map((f) => (
            <div key={f.name}>
              <div className="mx-auto w-full max-w-[240px]">
                <Photo
                  seed={f.seed}
                  src={f.image}
                  alt={f.name}
                  ratio="aspect-square"
                  frame={false}
                />
              </div>
              <p className="mt-5 text-center font-round text-[20px] font-bold">
                {f.name}
              </p>
              <p className="mt-4 text-left text-[13px] leading-[1.7]">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </Module>

      <Module title="最新記事">
        <ul>
          {recent.map((p) => (
            <li key={p.id} className="flex gap-3 py-2">
              <Link href={`/archives/${p.id}.html`} className="shrink-0">
                <span className="block h-[60px] w-[60px]">
                  <Photo
                    seed={p.id}
                    src={p.image}
                    alt=""
                    ratio="aspect-square"
                    frame={false}
                    rounded="rounded-lg"
                  />
                </span>
              </Link>
              <Link
                href={`/archives/${p.id}.html`}
                className="text-[13px] leading-[1.5] transition-opacity hover:opacity-50"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </Module>

      <Module title="カテゴリ別アーカイブ">
        <ul>
          {categories.map(({ category, count }) => (
            <li key={category.id}>
              <Link
                href={`/archives/cat_${category.id}.html`}
                className="side-link"
              >
                {category.name} ({count})
              </Link>
            </li>
          ))}
        </ul>
      </Module>

      <Module title="月別アーカイブ">
        <ul>
          {months.map((m) => (
            <li key={m.key}>
              <span className="side-link">
                {m.label} ({m.count})
              </span>
            </li>
          ))}
        </ul>
      </Module>
    </aside>
  )
}
