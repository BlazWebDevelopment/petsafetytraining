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

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc?: string
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-semibold tracking-wide text-slate-300/70">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-200/70">{desc}</p>
      ) : null}
    </div>
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
            Real-world training for everyday pet owners—learn safe handling, home
            hazard prevention, and simple emergency readiness. Build confidence,
            reduce risk, and help pets live healthier, safer lives.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryLinkButton to="/adopt">Browse pets for adoption</PrimaryLinkButton>
            <SecondaryLinkButton to="/article/when-wealth-isnt-enough">
              Read the featured article
            </SecondaryLinkButton>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Modules" value="8 core skills" />
            <Stat label="Formats" value="In-person + online" />
            <Stat label="Level" value="Beginner-friendly" />
          </div>

          <div className="mt-6 grid gap-2 text-sm text-slate-200/70 sm:grid-cols-2">
            {[
              'Safer walks & leash handling',
              'Hydration & heat safety',
              'Home hazard checklist',
              'Basics of first response',
            ].map((x) => (
              <div key={x} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-400" />
                <span>{x}</span>
              </div>
            ))}
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

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Practical training',
            desc: 'Clear steps for handling, nutrition basics, and safety-first routines.',
          },
          {
            title: 'Emergency readiness',
            desc: 'Know what to do first for heat issues, choking risks, wounds, and stress.',
          },
          {
            title: 'Confidence for owners',
            desc: 'Build habits that keep pets calm and safe at home, on walks, and in transit.',
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

      <section className="mt-16">
        <SectionHeading
          eyebrow="Program"
          title="What you’ll learn"
          desc="A realistic starter curriculum designed for pet owners. These sections can later be connected to real lesson pages, booking, and pricing."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {[
            {
              title: 'Safe handling & body language',
              desc: 'Read stress signals, prevent bites, and handle pets safely in daily situations.',
            },
            {
              title: 'Home safety checklist',
              desc: 'Toxic foods, cords, chemicals, small-object choking risks, and room-by-room fixes.',
            },
            {
              title: 'Walk safety & leash skills',
              desc: 'Calm exits, safe greetings, avoiding hazards, and building reliable recall habits.',
            },
            {
              title: 'Heat, hydration & seasonal risks',
              desc: 'Recognize overheating early, plan safer walks, and protect paws and coats.',
            },
            {
              title: 'Transport & travel',
              desc: 'Crate/seat safety, car anxiety tips, and what to pack for emergencies.',
            },
            {
              title: 'First response basics',
              desc: 'What to do first (and what not to do) before you reach a vet in urgent moments.',
            },
          ].map((m) => (
            <div
              key={m.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-white">{m.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-200/70">
                  module
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-200/70">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Formats"
            title="Choose how you train"
            desc="Flexible options for busy owners. Replace with real scheduling later."
          />
          <div className="mt-6 space-y-4">
            {[
              {
                title: 'Small-group session (60–90 min)',
                desc: 'Hands-on practice with a trainer, focused on safety skills and routines.',
              },
              {
                title: 'Private session (1:1)',
                desc: 'For anxious pets or specific goals: handling, walks, travel, or home hazards.',
              },
              {
                title: 'Online refresher (30 min)',
                desc: 'Quick check-ins to keep progress on track and answer questions.',
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-base font-semibold text-white">{x.title}</div>
                <div className="mt-2 text-sm text-slate-200/70">{x.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-emerald-400/15 via-sky-400/10 to-fuchsia-400/15 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={animalPhotoUrl('pet', 77, 1400, 900)}
              alt="Pets"
              className="h-[360px] w-full object-cover sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">What to bring</div>
              <div className="mt-2 text-sm text-slate-200/70">
                Leash, treats, water, and any medical notes.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Before training</div>
              <div className="mt-2 text-sm text-slate-200/70">
                Light meal, short walk, and a calm arrival.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Stories"
          title="What owners say"
          desc="Short testimonials help the page feel like a real training site."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              quote:
                'The home safety checklist alone was worth it. We fixed hazards we never noticed.',
              name: 'Jordan M.',
              location: 'Phoenix, AZ',
            },
            {
              quote:
                'Our walks are calmer and safer. I finally know what to do when my dog gets overstimulated.',
              name: 'Tanya R.',
              location: 'Nashville, TN',
            },
            {
              quote:
                'Clear, practical, and not overwhelming. The emergency basics gave me real confidence.',
              name: 'Chris L.',
              location: 'Boston, MA',
            },
          ].map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <blockquote className="text-sm leading-relaxed text-slate-200/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-xs text-slate-300/70">
                <span className="font-semibold text-white">{t.name}</span> ·{' '}
                {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          desc="Quick answers that people expect on training websites."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {[
            {
              q: 'Do you train puppies and kittens?',
              a: 'Yes—sessions are adjusted by age, energy level, and attention span.',
            },
            {
              q: 'Is this obedience training?',
              a: 'It’s safety-first training: handling, prevention, and emergency readiness (with calm behavior basics).',
            },
            {
              q: 'What if my pet is anxious or reactive?',
              a: 'Private sessions are best. We focus on safety, spacing, and confidence building.',
            },
            {
              q: 'Do I need special equipment?',
              a: 'No—just a leash, treats, water, and a comfortable collar/harness.',
            },
          ].map((f) => (
            <div
              key={f.q}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-semibold text-white">{f.q}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-200/70">
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 mb-4 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-wide text-slate-300/70">
              Get started
            </div>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to make your home safer for your pet?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/70">
              Start with the adoption listings or read the featured article—then
              we can add real booking, pricing, and lesson pages when you’re
              ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryLinkButton to="/adopt">Explore adoptions</PrimaryLinkButton>
              <SecondaryLinkButton to="/article/when-wealth-isnt-enough">
                Read the article
              </SecondaryLinkButton>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-sky-400/20 via-emerald-400/10 to-fuchsia-400/20 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <img
                src={animalPhotoUrl('dog', 88, 1400, 900)}
                alt="Dog training"
                className="h-64 w-full object-cover sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

