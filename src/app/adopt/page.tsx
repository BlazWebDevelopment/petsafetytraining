import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { Container } from '../../components/Container'
import { animalPhotoUrl } from '../../lib/photos'
import { getAllDogs } from '../../lib/data/dogs'
import type { Dog, Energy, Sex, Size } from '../../lib/types'

type SearchParams = Record<string, string | string[] | undefined>

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v
}

function norm(s: string) {
  return s.trim().toLowerCase()
}

function parsePage(v: string | undefined) {
  const n = Number(v)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.floor(n)
}

function asEnum<T extends string>(v: string | undefined, allowed: readonly T[]) {
  if (!v) return undefined
  return (allowed as readonly string[]).includes(v) ? (v as T) : undefined
}

function buildQueryHref(base: string, params: Record<string, string | undefined>) {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v) q.set(k, v)
  }
  const s = q.toString()
  return s ? `${base}?${s}` : base
}

function filterDogs(
  dogs: Dog[],
  opts: {
    q?: string
    size?: Size
    energy?: Energy
    sex?: Sex
  },
) {
  const q = opts.q ? norm(opts.q) : ''

  return dogs.filter((d) => {
    if (opts.size && d.size !== opts.size) return false
    if (opts.energy && d.energy !== opts.energy) return false
    if (opts.sex && d.sex !== opts.sex) return false

    if (!q) return true
    const hay = `${d.name} ${d.breed} ${d.location} ${d.size} ${d.energy} ${d.sex}`.toLowerCase()
    return hay.includes(q)
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const all = getAllDogs()

  const sizes: readonly Size[] = ['Small', 'Medium', 'Large'] as const
  const energies: readonly Energy[] = ['Low', 'Medium', 'High'] as const
  const sexes: readonly Sex[] = ['Male', 'Female'] as const

  const q = first(sp.q)
  const size = asEnum(first(sp.size), sizes)
  const energy = asEnum(first(sp.energy), energies)
  const sex = asEnum(first(sp.sex), sexes)

  const filtered = filterDogs(all, { q, size, energy, sex })

  const page = parsePage(first(sp.page))
  const perPage = 24
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * perPage
  const slice = filtered.slice(start, start + perPage)

  const queryBase = {
    q: q?.trim() || undefined,
    size,
    energy,
    sex,
  }

  return (
    <Layout>
      <Container>
        <header className="border-2 border-ink bg-paper p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
            <div className="eyebrow">Section · Classifieds</div>
            <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              {filtered.length} results · page {safePage} of {totalPages}
            </div>
          </div>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            The Rescue Directory
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">
            Hand-curated profiles of dogs awaiting safer homes. Use the search
            and filters below — every entry is shareable, with compatibility
            notes and a contact line.
          </p>
        </header>

        <DirectoryControls
          defaults={{
            q: q ?? '',
            size: size ?? '',
            energy: energy ?? '',
            sex: sex ?? '',
          }}
        />

        {slice.length === 0 ? (
          <div className="mt-6 border-2 border-ink bg-paper p-8 text-center">
            <div className="font-display text-2xl font-bold text-ink">
              No matching listings
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Try clearing a filter or broadening your search.
            </p>
            <div className="mt-4 flex justify-center">
              <Link href="/adopt" className="btn-secondary">
                Reset all filters
              </Link>
            </div>
          </div>
        ) : (
          <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {slice.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </section>
        )}

        <Pagination
          page={safePage}
          totalPages={totalPages}
          hrefForPage={(p) =>
            buildQueryHref('/adopt', { ...queryBase, page: String(p) })
          }
        />
      </Container>
    </Layout>
  )
}

function labelBool(v: boolean) {
  return v ? 'Yes' : 'Maybe'
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>
}

function DogCard({ dog }: { dog: Dog }) {
  return (
    <article className="flex flex-col border-2 border-ink bg-paper transition-shadow hover:shadow-press-sm">
      <div className="photo-frame border-0 border-b border-ink p-1.5">
        <img
          src={animalPhotoUrl(dog.photoTopic, dog.photoSeed, 1200, 900)}
          alt={`${dog.name}`}
          className="h-44 w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-bold text-ink">
            {dog.name}
          </h2>
          <span className="pill">{dog.size}</span>
        </div>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
          {dog.breed} · {dog.location}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip>{dog.sex}</Chip>
          <Chip>{dog.energy} energy</Chip>
          <Chip>Kids: {dog.goodWithKids ? 'Yes' : 'Older'}</Chip>
          <Chip>Dogs: {labelBool(dog.goodWithDogs)}</Chip>
          <Chip>Cats: {labelBool(dog.goodWithCats)}</Chip>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {dog.description}
        </p>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/dogs/${dog.id}`}
            className="btn-primary flex-1 !py-2 text-[11px]"
          >
            View profile
          </Link>
          <a
            href={`mailto:adoptions@petsafetytraining.com?subject=Adoption%20interest%20for%20${encodeURIComponent(
              dog.name,
            )}%20(${encodeURIComponent(dog.id)})`}
            className="btn-secondary !py-2 text-[11px]"
          >
            Contact
          </a>
        </div>
      </div>
    </article>
  )
}

function Pagination({
  page,
  totalPages,
  hrefForPage,
}: {
  page: number
  totalPages: number
  hrefForPage: (p: number) => string
}) {
  const prev = Math.max(1, page - 1)
  const next = Math.min(totalPages, page + 1)
  const isFirst = page <= 1
  const isLast = page >= totalPages

  return (
    <div className="mt-12 flex items-center justify-center gap-4 border-y-2 border-ink py-5">
      <Link
        href={hrefForPage(prev)}
        aria-disabled={isFirst}
        className={[
          'btn-secondary',
          isFirst ? 'pointer-events-none opacity-40' : '',
        ].join(' ')}
      >
        ← Previous
      </Link>
      <div className="text-sm text-ink-soft">
        Page{' '}
        <span className="font-display text-lg font-black text-ink">{page}</span>{' '}
        of{' '}
        <span className="font-display text-lg font-black text-ink">
          {totalPages}
        </span>
      </div>
      <Link
        href={hrefForPage(next)}
        aria-disabled={isLast}
        className={[
          'btn-secondary',
          isLast ? 'pointer-events-none opacity-40' : '',
        ].join(' ')}
      >
        Next →
      </Link>
    </div>
  )
}

function DirectoryControls({
  defaults,
}: {
  defaults: { q: string; size: '' | Size; energy: '' | Energy; sex: '' | Sex }
}) {
  const sizes: Size[] = ['Small', 'Medium', 'Large']
  const energies: Energy[] = ['Low', 'Medium', 'High']
  const sexes: Sex[] = ['Male', 'Female']

  return (
    <form
      action="/adopt"
      method="get"
      className="mt-6 border-2 border-ink bg-paper-2/40 p-5"
    >
      <div className="eyebrow-ink mb-4 flex items-center gap-3">
        <span>Search & Filter</span>
        <span className="h-px flex-1 bg-ink/40" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <div className="text-[11px] font-bold uppercase tracking-editorial text-ink-mute">
            Search
          </div>
          <input
            name="q"
            placeholder="Name, breed, location…"
            defaultValue={defaults.q}
            className="input-field mt-2"
          />
        </label>

        <label className="block">
          <div className="text-[11px] font-bold uppercase tracking-editorial text-ink-mute">
            Size
          </div>
          <select
            name="size"
            defaultValue={defaults.size}
            className="select-field mt-2"
          >
            <option value="">Any</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <div className="text-[11px] font-bold uppercase tracking-editorial text-ink-mute">
            Energy
          </div>
          <select
            name="energy"
            defaultValue={defaults.energy}
            className="select-field mt-2"
          >
            <option value="">Any</option>
            {energies.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <div className="text-[11px] font-bold uppercase tracking-editorial text-ink-mute">
            Sex
          </div>
          <select
            name="sex"
            defaultValue={defaults.sex}
            className="select-field mt-2"
          >
            <option value="">Any</option>
            {sexes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ink/40 pt-4">
        <button type="submit" className="btn-primary">
          Apply filters
        </button>
        <Link href="/adopt" className="btn-secondary">
          Reset
        </Link>
      </div>
    </form>
  )
}
