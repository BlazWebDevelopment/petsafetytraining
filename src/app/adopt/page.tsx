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
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Rescue dogs
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200/70">
              Browse our rescue directory. Use search and filters to find the right
              match.
            </p>
          </div>
          <div className="text-xs text-slate-300/60">
            {filtered.length} results · page {safePage} / {totalPages}
          </div>
        </header>

        <DirectoryControls
          defaults={{
            q: q ?? '',
            size: size ?? '',
            energy: energy ?? '',
            sex: sex ?? '',
          }}
        />

        <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {slice.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </section>

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
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200/80">
      {children}
    </span>
  )
}

function DogCard({ dog }: { dog: Dog }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="relative">
        <img
          src={animalPhotoUrl(dog.photoTopic, dog.photoSeed, 1200, 900)}
          alt={`${dog.name}`}
          className="h-44 w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="text-base font-semibold text-white">{dog.name}</div>
          <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100/90">
            {dog.size}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs text-slate-300/60">
          {dog.breed} · {dog.location}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip>{dog.sex}</Chip>
          <Chip>{dog.energy} energy</Chip>
          <Chip>Kids: {dog.goodWithKids ? 'Yes' : 'Older'}</Chip>
          <Chip>Dogs: {labelBool(dog.goodWithDogs)}</Chip>
          <Chip>Cats: {labelBool(dog.goodWithCats)}</Chip>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-200/70">
          {dog.description}
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href={`/dogs/${dog.id}`}
            className="flex-1 rounded-2xl bg-sky-400 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
          >
            View profile
          </Link>
          <a
            href={`mailto:adoptions@petsafetytraining.com?subject=Adoption%20interest%20for%20${encodeURIComponent(
              dog.name,
            )}%20(${encodeURIComponent(dog.id)})`}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <Link
        href={hrefForPage(prev)}
        className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
      >
        Previous
      </Link>
      <div className="text-sm text-slate-200/70">
        Page <span className="font-semibold text-white">{page}</span> of{' '}
        <span className="font-semibold text-white">{totalPages}</span>
      </div>
      <Link
        href={hrefForPage(next)}
        className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
      >
        Next
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
      className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <div className="text-xs font-semibold text-slate-300/70">Search</div>
          <input
            name="q"
            placeholder="Name, breed, location…"
            defaultValue={defaults.q}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
          />
        </label>

        <label className="block">
          <div className="text-xs font-semibold text-slate-300/70">Size</div>
          <select
            name="size"
            defaultValue={defaults.size}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
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
          <div className="text-xs font-semibold text-slate-300/70">Energy</div>
          <select
            name="energy"
            defaultValue={defaults.energy}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
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
          <div className="text-xs font-semibold text-slate-300/70">Sex</div>
          <select
            name="sex"
            defaultValue={defaults.sex}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
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

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-2xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
        >
          Apply filters
        </button>
        <Link
          href="/adopt"
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
        >
          Reset
        </Link>
      </div>
    </form>
  )
}

