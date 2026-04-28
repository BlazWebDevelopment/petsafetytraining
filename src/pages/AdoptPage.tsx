import { Container } from '../components/Container'
import { animalPhotoUrl, type AnimalTopic } from '../lib/photos'

type Pet = {
  id: string
  name: string
  species: 'Dog' | 'Cat' | 'Rabbit'
  age: string
  location: string
  traits: string[]
  topic: AnimalTopic
  seed: number
}

const pets: Pet[] = [
  {
    id: 'rex',
    name: 'Rex',
    species: 'Dog',
    age: '2 years',
    location: 'Austin, TX',
    traits: ['Gentle', 'Smart', 'Needs routine'],
    topic: 'dog',
    seed: 101,
  },
  {
    id: 'luna',
    name: 'Luna',
    species: 'Cat',
    age: '1 year',
    location: 'Portland, OR',
    traits: ['Calm', 'Indoor-friendly', 'Cuddly'],
    topic: 'cat',
    seed: 102,
  },
  {
    id: 'milo',
    name: 'Milo',
    species: 'Dog',
    age: '4 months',
    location: 'Tampa, FL',
    traits: ['Playful', 'Learning fast', 'Food-motivated'],
    topic: 'puppy',
    seed: 103,
  },
  {
    id: 'nala',
    name: 'Nala',
    species: 'Cat',
    age: '3 years',
    location: 'Denver, CO',
    traits: ['Quiet', 'Observant', 'Good with kids'],
    topic: 'kitten',
    seed: 104,
  },
  {
    id: 'hazel',
    name: 'Hazel',
    species: 'Rabbit',
    age: '8 months',
    location: 'Raleigh, NC',
    traits: ['Curious', 'Gentle', 'Treat-lover'],
    topic: 'rabbit',
    seed: 105,
  },
  {
    id: 'buddy',
    name: 'Buddy',
    species: 'Dog',
    age: '5 years',
    location: 'San Diego, CA',
    traits: ['Loyal', 'Walks well', 'House-trained'],
    topic: 'dog',
    seed: 106,
  },
]

function Chip({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200/80">
      {text}
    </span>
  )
}

export function AdoptPage() {
  const gallery = Array.from({ length: 10 }).map((_, i) => {
    const t: AnimalTopic[] = ['dog', 'cat', 'rabbit', 'puppy', 'kitten']
    const topic = t[i % t.length]
    return {
      id: `${topic}-${i}`,
      topic,
      seed: 500 + i * 7,
    }
  })

  return (
    <Container>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Adopt a pet
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200/70">
            These are demo adoption cards with random animal photos. Later we can
            connect this page to your real shelter/rescue listings.
          </p>
        </div>
        <a
          href="mailto:adoptions@petsafetytraining.local?subject=Adoption%20interest"
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-400/20 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
        >
          Contact adoptions
        </a>
      </header>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <article
            key={pet.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative">
              <img
                src={animalPhotoUrl(pet.topic, pet.seed, 1200, 800)}
                alt={`${pet.species} named ${pet.name}`}
                className="h-52 w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="text-lg font-semibold text-white">{pet.name}</div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100/90">
                  {pet.species}
                </div>
              </div>
            </div>

            <div className="p-5">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-slate-300/60">Age</dt>
                  <dd className="font-medium text-slate-100">{pet.age}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-300/60">Location</dt>
                  <dd className="font-medium text-slate-100">{pet.location}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {pet.traits.map((t) => (
                  <Chip key={t} text={t} />
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href={`mailto:adoptions@petsafetytraining.local?subject=I%20want%20to%20adopt%20${encodeURIComponent(
                    pet.name,
                  )}`}
                  className="flex-1 rounded-2xl bg-sky-400 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
                >
                  Apply to adopt
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  title="Demo button"
                >
                  Save
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-white">
          More animals looking for a safe home
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200/70">
          Random photos are shown below (dog/cat/rabbit) to bring the page to life.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={animalPhotoUrl(g.topic, g.seed, 800, 800)}
                alt={g.topic}
                className="h-36 w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="px-3 py-2 text-xs text-slate-200/70">
                {g.topic}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}

