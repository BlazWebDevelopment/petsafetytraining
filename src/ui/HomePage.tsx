import Link from 'next/link'
import type { ReactNode } from 'react'
import { Container } from '../components/Container'
import { getAllArticles } from '../lib/data/articles'
import { getAllDogs } from '../lib/data/dogs'
import { formatArticleDate, formatArticleDateShort } from '../lib/format'
import { getArticleCoverAlt, getArticleCoverSrc } from '../lib/articleCovers'
import { animalPhotoUrl } from '../lib/photos'
import type { Article, Dog } from '../lib/types'

function PrimaryLinkButton({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <Link href={to} className="btn-primary">
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
    <Link href={to} className="btn-secondary">
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
    <div className="mb-6 border-b border-rule pb-4">
      <div className="flex items-baseline justify-between gap-4">
        <div className="eyebrow">{eyebrow}</div>
        <div className="hidden h-px flex-1 self-center bg-rule sm:block" />
      </div>
      <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink-soft">
          {desc}
        </p>
      ) : null}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-rule bg-paper-2/80 p-4 shadow-nav">
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
        {label}
      </div>
    </div>
  )
}

function Ornament() {
  return (
    <div className="my-12 flex items-center justify-center gap-4 text-ink-mute">
      <span className="block h-px w-20 bg-rule" />
      <span className="text-[10px] font-semibold uppercase tracking-editorial text-sage">
        · · ·
      </span>
      <span className="block h-px w-20 bg-rule" />
    </div>
  )
}

export function HomePage() {
  const dogs = getAllDogs()
  const articles = getAllArticles()
  const locations = new Set(dogs.map((d) => d.location)).size

  const featuredDogs = dogs.slice(0, 8)
  const latestArticles = articles.slice(0, 3)
  const leadArticle = articles[0]

  return (
    <Container>
      <section className="section-surface overflow-hidden p-6 sm:p-8 lg:border-l-4 lg:border-l-accent">
        <div className="flex flex-col items-baseline justify-between gap-2 border-b border-rule pb-3 sm:flex-row">
          <div className="eyebrow">Featured</div>
          <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
            Safety &amp; adoption hub
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Safer pets,{' '}
              <span className="text-accent">better homes.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Practical safety guides, a real rescue directory, and habits that
              keep animals out of trouble — and out of the emergency room.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryLinkButton to="/adopt">
                Browse {dogs.length} rescue dogs
              </PrimaryLinkButton>
              <SecondaryLinkButton to="/articles">
                Read articles
              </SecondaryLinkButton>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Rescue profiles" value={`${dogs.length}`} />
              <Stat label="Cities covered" value={`${locations}+`} />
              <Stat label="Articles" value={`${articles.length}`} />
            </div>

            <form
              action="/adopt"
              method="get"
              className="mt-8 rounded-md border border-rule bg-paper/90 p-5 shadow-nav"
            >
              <div className="eyebrow-ink mb-3">Search the directory</div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <input
                  name="q"
                  placeholder="Search by name, breed, or city…"
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Search
                </button>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
                {[
                  'Safety-first adoption guidance',
                  'Clear traits & compatibility flags',
                  'Practical handling + emergency basics',
                  'Shareable filters and links',
                ].map((x) => (
                  <div key={x} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-sage" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5">
            {leadArticle ? (
              <article className="overflow-hidden rounded-md border border-rule bg-surface shadow-card">
                <div className="photo-frame rounded-b-none border-0 border-b border-rule">
                  <img
                    src={getArticleCoverSrc(leadArticle, 1200, 900)}
                    alt={getArticleCoverAlt(leadArticle)}
                    className="h-64 w-full object-cover sm:h-72"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <div className="eyebrow">Spotlight story</div>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
                    <Link
                      href={`/articles/${leadArticle.slug}`}
                      className="hover:text-accent"
                    >
                      {leadArticle.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
                    {formatArticleDate(leadArticle.publishedAt).toUpperCase()} ·{' '}
                    {leadArticle.author}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {leadArticle.excerpt}
                  </p>
                  <Link
                    href={`/articles/${leadArticle.slug}`}
                    className="mt-4 inline-block link-underline text-sm font-bold uppercase tracking-editorial"
                  >
                    Read the full story →
                  </Link>
                </div>
              </article>
            ) : null}
          </aside>
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="The Curriculum"
          title="What every owner should know"
          desc="Three pillars that keep pets safer at home, on walks, and in transit."
        />
        <div className="col-rule grid gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-card lg:grid-cols-3">
          {[
            {
              n: 'I.',
              title: 'Practical Training',
              desc: 'Clear steps for handling, nutrition basics, and safety-first routines.',
            },
            {
              n: 'II.',
              title: 'Emergency Readiness',
              desc: 'Know what to do first for heat issues, choking risks, wounds, and stress.',
            },
            {
              n: 'III.',
              title: 'Confidence for Owners',
              desc: 'Build habits that keep pets calm and safe at home, on walks, and in transit.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-paper/60 p-6">
              <div className="font-display text-3xl font-bold text-accent">
                {card.n}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="Rescue Directory"
          title="Featured dogs ready for a safer home"
          desc="Browse profiles with realistic details. Each page is shareable and includes compatibility notes."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDogs.map((dog) => (
            <FeaturedDogCard key={dog.id} dog={dog} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryLinkButton to="/adopt">Explore all dogs</PrimaryLinkButton>
          <SecondaryLinkButton to="/articles">
            Read all articles
          </SecondaryLinkButton>
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="From the Editorial Desk"
          title="Latest articles & safety stories"
          desc="Short, clear pieces designed to raise awareness and improve daily care."
        />
        <div className="col-rule grid gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-card lg:grid-cols-3">
          {latestArticles.map((a) => (
            <ArticleTeaser key={a.id} article={a} />
          ))}
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="Training path"
          title="What you’ll learn"
          desc="A realistic starter curriculum designed for pet owners. Connectable to real lesson pages, booking, and pricing later on."
        />

        <div className="grid gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-card sm:grid-cols-2">
          {[
            {
              n: '01',
              title: 'Safe handling & body language',
              desc: 'Read stress signals, prevent bites, and handle pets safely in daily situations.',
            },
            {
              n: '02',
              title: 'Home safety checklist',
              desc: 'Toxic foods, cords, chemicals, small-object choking risks, and room-by-room fixes.',
            },
            {
              n: '03',
              title: 'Walk safety & leash skills',
              desc: 'Calm exits, safe greetings, avoiding hazards, and building reliable recall habits.',
            },
            {
              n: '04',
              title: 'Heat, hydration & seasonal risks',
              desc: 'Recognize overheating early, plan safer walks, and protect paws and coats.',
            },
            {
              n: '05',
              title: 'Transport & travel',
              desc: 'Crate/seat safety, car anxiety tips, and what to pack for emergencies.',
            },
            {
              n: '06',
              title: 'First response basics',
              desc: 'What to do first (and what not to do) before you reach a vet in urgent moments.',
            },
          ].map((m, idx) => (
            <div
              key={m.title}
              className={[
                'bg-paper/60 p-6',
                idx % 2 === 0 ? 'sm:border-r sm:border-rule' : '',
                idx < 4 ? 'border-b border-rule' : '',
              ].join(' ')}
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-mono text-xs font-bold tracking-widest text-sage">
                  №&nbsp;{m.n}
                </div>
                <span className="pill">module</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="Formats"
          title="Choose how you train"
          desc="Flexible options for busy owners. Real scheduling can be wired in later."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              {
                title: 'Small-group session',
                meta: '60–90 min · in-person',
                desc: 'Hands-on practice with a trainer, focused on safety skills and routines.',
              },
              {
                title: 'Private session (1:1)',
                meta: 'flexible · in-person',
                desc: 'For anxious pets or specific goals: handling, walks, travel, or home hazards.',
              },
              {
                title: 'Online refresher',
                meta: '30 min · video call',
                desc: 'Quick check-ins to keep progress on track and answer questions.',
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-md border border-rule bg-surface p-5 shadow-nav"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-display text-xl font-bold text-ink">
                    {x.title}
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
                    {x.meta}
                  </div>
                </div>
                <div className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {x.desc}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="photo-frame">
              <img
                src={animalPhotoUrl('pet', 77, 1400, 900)}
                alt="Pets"
                className="h-[360px] w-full object-cover sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-2 text-center text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
              Companions in focus
            </div>
            <div className="mt-4 grid grid-cols-2 gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-nav">
              <div className="border-r border-rule bg-paper/50 p-5">
                <div className="eyebrow-ink">What to bring</div>
                <div className="mt-2 text-sm text-ink-soft">
                  Leash, treats, water, and any medical notes.
                </div>
              </div>
              <div className="bg-paper/50 p-5">
                <div className="eyebrow-ink">Before training</div>
                <div className="mt-2 text-sm text-ink-soft">
                  Light meal, short walk, and a calm arrival.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="Stories from owners"
          title="What people say"
        />
        <div className="col-rule grid gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-card lg:grid-cols-3">
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
            <figure key={t.name} className="bg-paper/60 p-6">
              <div className="font-display text-3xl font-bold leading-none text-accent">
                “
              </div>
              <blockquote className="mt-2 font-display text-lg font-medium leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 border-t border-rule pt-3 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
                <span className="text-ink">{t.name}</span> · {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Ornament />

      <section>
        <SectionHeading
          eyebrow="Frequently Asked"
          title="Common questions"
        />
        <div className="grid gap-0 overflow-hidden rounded-md border border-rule bg-surface shadow-card lg:grid-cols-2">
          {[
            {
              q: 'Do you train puppies and kittens?',
              a: 'Yes — sessions are adjusted by age, energy level, and attention span.',
            },
            {
              q: 'Is this obedience training?',
              a: 'It’s safety-first training: handling, prevention, and emergency readiness, with calm-behavior basics.',
            },
            {
              q: 'What if my pet is anxious or reactive?',
              a: 'Private sessions are best. We focus on safety, spacing, and confidence building.',
            },
            {
              q: 'Do I need special equipment?',
              a: 'No — just a leash, treats, water, and a comfortable collar/harness.',
            },
          ].map((f, idx) => (
            <div
              key={f.q}
              className={[
                'bg-paper/60 p-6',
                idx % 2 === 0 ? 'lg:border-r lg:border-rule' : '',
                idx < 2 ? 'border-b border-rule' : '',
              ].join(' ')}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xl font-bold text-accent">
                  Q.
                </span>
                <div className="font-display text-lg font-bold text-ink">
                  {f.q}
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-xl font-bold text-ink">
                  A.
                </span>
                <p className="text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Ornament />

      <section className="overflow-hidden rounded-md border border-sage/30 bg-sage text-paper shadow-card">
        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-editorial text-paper/70">
              Get started
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-paper sm:text-4xl">
              Ready to make your home safer for your pet?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-paper/85">
              Start with the rescue directory or articles — add booking and
              lessons whenever you are ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/adopt" className="btn-accent">
                Explore adoptions
              </Link>
              <Link
                href="/articles"
                className="btn-secondary !border-paper/35 !bg-transparent !text-paper !shadow-none hover:!bg-paper hover:!text-ink hover:!border-paper"
              >
                Read articles
              </Link>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-md border border-paper/25 bg-black/10 p-1.5">
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

function FeaturedDogCard({ dog }: { dog: Dog }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-rule bg-surface shadow-card transition-shadow hover:shadow-card-hover">
      <div className="photo-frame rounded-none border-x-0 border-t-0 border-b border-rule">
        <img
          src={animalPhotoUrl(dog.photoTopic, dog.photoSeed, 1200, 900)}
          alt={`${dog.name}`}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-ink">
            {dog.name}
          </h3>
          <span className="pill">{dog.size}</span>
        </div>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
          {dog.breed} · {dog.location}
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {dog.description}
        </p>
        <div className="mt-4 flex">
          <Link
            href={`/dogs/${dog.id}`}
            className="btn-primary w-full !py-2"
          >
            View profile →
          </Link>
        </div>
      </div>
    </article>
  )
}

function ArticleTeaser({ article }: { article: Article }) {
  return (
    <article className="bg-paper/60 p-5">
      <div className="photo-frame">
        <img
          src={getArticleCoverSrc(article, 1200, 800)}
          alt={getArticleCoverAlt(article)}
          className="h-40 w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="mt-4 text-[11px] font-semibold uppercase tracking-editorial text-ink-mute">
        {formatArticleDateShort(article.publishedAt).toUpperCase()}
      </div>
      <h3 className="mt-1 font-display text-xl font-bold leading-snug text-ink">
        <Link
          href={`/articles/${article.slug}`}
          className="hover:text-accent"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {article.excerpt}
      </p>
      <Link
        href={`/articles/${article.slug}`}
        className="mt-3 inline-block link-underline text-sm font-bold uppercase tracking-editorial"
      >
        Read more →
      </Link>
    </article>
  )
}
