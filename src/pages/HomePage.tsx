import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container } from '../components/Container'
import { animalPhotoUrl } from '../lib/photos'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-sm text-slate-300/70">{label}</div>
    </div>
  )
}

function PrimaryLinkButton({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-sky-400/20 transition hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
    >
      {children}
    </Link>
  )
}

function SecondaryLinkButton({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      {children}
    </Link>
  )
}

export function HomePage() {
  return (
    <Container>
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Responsible pet ownership starts here
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Pet Safety Training
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-200/75">
            A modern home for pet safety education and simple adoption listings.
            Learn the basics, spot warning signs early, and help pets find safe,
            loving homes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryLinkButton to="/adopt">Browse pets for adoption</PrimaryLinkButton>
            <SecondaryLinkButton to="/article">Read the featured article</SecondaryLinkButton>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Training topics" value="Safety basics" />
            <Stat label="Adoption focus" value="Local-friendly" />
            <Stat label="Content" value="Articles" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-sky-400/20 via-emerald-400/10 to-fuchsia-400/20 blur-2xl" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <img
                src={animalPhotoUrl('dog', 11, 900, 900)}
                alt="Dog"
                className="h-64 w-full object-cover sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid gap-3">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <img
                  src={animalPhotoUrl('cat', 22, 900, 650)}
                  alt="Cat"
                  className="h-32 w-full object-cover sm:h-36"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <img
                  src={animalPhotoUrl('rabbit', 33, 900, 650)}
                  alt="Rabbit"
                  className="h-32 w-full object-cover sm:h-36"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Practical safety training',
            desc: 'Hydration, handling, home hazards, and simple emergency readiness.',
          },
          {
            title: 'Adoption-ready listings',
            desc: 'Browse demo pets with friendly details—ready for your real shelter/rescue data later.',
          },
          {
            title: 'Education that sticks',
            desc: 'Short, clear articles designed to raise awareness and encourage responsible care.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-lg font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-200/70">
              {card.desc}
            </p>
          </div>
        ))}
      </section>
    </Container>
  )
}

