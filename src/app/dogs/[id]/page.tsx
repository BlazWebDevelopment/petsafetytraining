import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Layout } from '../../../components/Layout'
import { Container } from '../../../components/Container'
import { animalPhotoUrl } from '../../../lib/photos'
import { getAllDogs } from '../../../lib/data/dogs'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllDogs().map((d) => ({ id: d.id }))
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>
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
        <div className="mb-6 flex items-center justify-between border-b border-rule pb-3">
          <div className="eyebrow">Profile</div>
          <Link
            href="/adopt"
            className="text-[11px] font-semibold uppercase tracking-editorial text-ink-soft hover:text-accent"
          >
            ← Directory
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="photo-frame">
              <img
                src={animalPhotoUrl(dog.photoTopic, dog.photoSeed, 1400, 900)}
                alt={`${dog.name}`}
                className="h-[340px] w-full object-cover sm:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-2 text-center text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              {dog.name} · {dog.breed}
            </div>

            <div className="mt-6 section-surface p-6">
              <div className="eyebrow-ink">Traits</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {dog.traits.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 section-surface p-6">
              <h2 className="font-display text-2xl font-bold text-ink">
                About {dog.name}
              </h2>
              <div className="mt-1 rule" />
              <p className="mt-4 drop-cap text-base leading-relaxed text-ink-soft">
                {dog.description}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="section-surface p-6">
              <div className="eyebrow">Adoption</div>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
                {dog.name}
              </h1>
              <div className="mt-1 text-sm text-ink-soft">
                {dog.breed}
              </div>

              <div className="my-5 rule" />

              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-editorial text-ink-mute">
                    Age
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink">
                    {dog.ageYears} yrs
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-editorial text-ink-mute">
                    Sex
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink">
                    {dog.sex}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-editorial text-ink-mute">
                    Size
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink">
                    {dog.size}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-editorial text-ink-mute">
                    Energy
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink">
                    {dog.energy}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[10px] font-bold uppercase tracking-editorial text-ink-mute">
                    Location
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink">
                    {dog.location}
                  </dd>
                </div>
              </dl>

              <div className="my-5 rule" />

              <div className="eyebrow-ink">Compatibility</div>
              <div className="mt-3 flex flex-wrap gap-2">
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

              <div className="my-5 rule" />

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:adoptions@petsafetytraining.com?subject=Adoption%20interest%20for%20${encodeURIComponent(
                    dog.name,
                  )}%20(${encodeURIComponent(dog.id)})`}
                  className="btn-accent w-full"
                >
                  Apply to adopt
                </a>
                <Link href="/adopt" className="btn-secondary w-full">
                  Back to directory
                </Link>
              </div>

              <p className="mt-5 border-t border-rule pt-4 text-[11px] leading-relaxed text-ink-mute">
                <span className="font-semibold text-ink">
                  adoptions@petsafetytraining.com
                </span>
                .
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </Layout>
  )
}
