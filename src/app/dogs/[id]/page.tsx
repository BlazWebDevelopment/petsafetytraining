import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Layout } from '../../../components/Layout'
import { Container } from '../../../components/Container'
import { animalPhotoUrl } from '../../../lib/photos'
import { getAllDogs } from '../../../lib/data/dogs'

export const dynamic = 'force-static'

export function generateStaticParams() {
  // Pre-render all dogs (590) as static pages.
  return getAllDogs().map((d) => ({ id: d.id }))
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200/80">
      {children}
    </span>
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const dog = getAllDogs().find((d) => d.id === id)
  if (!dog) return notFound()

  return (
    <Layout>
      <Container>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <img
                src={animalPhotoUrl(dog.photoTopic, dog.photoSeed, 1400, 900)}
                alt={`${dog.name}`}
                className="h-[340px] w-full object-cover sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {dog.traits.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">About {dog.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200/75">
                {dog.description}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold tracking-wide text-slate-300/70">
                Rescue profile
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {dog.name}
              </h1>
              <div className="mt-2 text-sm text-slate-200/70">{dog.breed}</div>

              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-slate-300/60">Age</dt>
                  <dd className="font-medium text-slate-100">{dog.ageYears} yrs</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-300/60">Sex</dt>
                  <dd className="font-medium text-slate-100">{dog.sex}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-300/60">Size</dt>
                  <dd className="font-medium text-slate-100">{dog.size}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-300/60">Energy</dt>
                  <dd className="font-medium text-slate-100">{dog.energy}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-slate-300/60">Location</dt>
                  <dd className="font-medium text-slate-100">{dog.location}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-200/70">
                <Badge>
                  Kids: {dog.goodWithKids ? 'Yes' : 'Prefer older'}
                </Badge>
                <Badge>Dogs: {dog.goodWithDogs ? 'Yes' : 'Maybe'}</Badge>
                <Badge>Cats: {dog.goodWithCats ? 'Yes' : 'Maybe'}</Badge>
                <Badge>{dog.vaccinated ? 'Vaccinated' : 'Vaccines pending'}</Badge>
                <Badge>
                  {dog.spayedNeutered ? 'Spayed/Neutered' : 'Not yet fixed'}
                </Badge>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:adoptions@petsafetytraining.com?subject=Adoption%20interest%20for%20${encodeURIComponent(
                    dog.name,
                  )}%20(${encodeURIComponent(dog.id)})`}
                  className="flex-1 rounded-2xl bg-emerald-400 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                >
                  Apply to adopt
                </a>
                <Link
                  href="/adopt"
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  Back
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Layout>
  )
}

