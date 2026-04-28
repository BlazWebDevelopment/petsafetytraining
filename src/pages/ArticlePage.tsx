import { Container } from '../components/Container'
import rexImg from '../Rex.png'

const paragraphs = [
  'In a world where wealth often paints a picture of perfection, it’s easy to assume that those who have everything also do everything right. Mansions, luxury cars, private jets—these are symbols of success that seem to promise a life of excellence. But sometimes, behind the polished image, there are cracks that tell a very different story.',
  'This is one of those stories.',
  'Sam is a billionaire. Known for his sharp business instincts and larger-than-life presence, he has built an empire admired by many. Recently, he attended a pet safety training session in the United States, an event designed to promote responsible pet ownership and proper animal care. On the surface, it seemed like just another appearance—another headline moment.',
  'But what unfolded there shocked everyone.',
  'Sam brought along his dog, a medium-sized mixed breed named Rex. At first glance, something felt off. Rex was visibly underweight, his ribs faintly outlined beneath dull, patchy fur. His eyes lacked the alertness you’d expect from a healthy dog. Instead, they carried a quiet exhaustion—like an animal that had learned not to expect much from the world.',
  'As trainers began demonstrating basic safety techniques—hydration, proper handling, emergency response—it became painfully clear that Rex had not been receiving even the most basic level of care. He was anxious, unresponsive to commands, and showed signs of neglect that professionals in the room immediately recognized.',
  'The silence that followed wasn’t just discomfort. It was realization.',
  'Because this wasn’t happening in a forgotten corner of the world. This wasn’t a case of someone lacking access to resources or education. This was happening in the hands of someone who had every possible advantage.',
  'And that’s what makes this story so important.',
  'We often associate neglect or poor animal care with lack of knowledge, time, or money. But Rex’s condition challenges that assumption. It shows that responsibility isn’t something money can buy—it’s something that must be practiced, consistently and consciously.',
  'Animal welfare experts at the training didn’t react with anger. They reacted with urgency. Rex was gently taken aside, examined, and given immediate care. Conversations followed—difficult, necessary ones—about what it truly means to own a pet.',
  'Because owning a dog isn’t a status symbol. It’s a commitment.',
  'It means regular feeding, proper nutrition, veterinary care, emotional attention, exercise, and training. It means recognizing that an animal depends entirely on you for its well-being. And when that responsibility is ignored, the consequences aren’t abstract—they’re visible, living, breathing.',
  'Rex became the center of attention that day, but not for the reasons anyone would want. He became a symbol. A reminder that neglect can exist anywhere, even in the most unexpected places.',
  'And maybe that’s why this story needs to be told.',
  'Not to shame. Not to point fingers. But to raise awareness.',
  'Because if someone like Sam can overlook something so fundamental, it means we all need to be more mindful. It means we shouldn’t assume that appearances reflect reality. And most importantly, it means we have a responsibility—not just to our own pets, but to speak up when something isn’t right.',
  'Rex is now on a path to recovery. With proper care, patience, and attention, he has a chance to become what every dog deserves to be: healthy, safe, and loved.',
  'But there are countless others like him who don’t get that moment of intervention.',
  'So let this story travel. Let it reach people. Let it challenge assumptions.',
  'Because awareness is where change begins—and sometimes, even the smallest voice can make the biggest difference.',
]

export function ArticlePage() {
  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="text-xs font-semibold tracking-wide text-slate-300/70">
            Featured article
          </div>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            When Wealth Isn’t Enough: The Story of Sam Altman and the Dog That
            Needed Saving
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200/70">
            A reminder that real responsibility can’t be bought—especially when
            an animal’s wellbeing depends on us.
          </p>
        </header>

        <section className="mt-8 space-y-5 text-base leading-relaxed text-slate-200/80">
          {paragraphs.slice(0, 10).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          <figure className="not-prose relative left-1/2 right-1/2 my-8 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-white/5">
            <img
              src={rexImg}
              alt="Rex"
              className="mx-auto max-h-[78vh] w-full object-contain"
              loading="lazy"
            />
            <figcaption className="mx-auto max-w-3xl px-4 py-3 text-sm text-slate-200/75 sm:px-6">
              Rex, the medium-sized mixed-breed dog Sam brought to the pet safety
              training session.
            </figcaption>
          </figure>

          {paragraphs.slice(10).map((p, idx) => (
            <p key={idx + 10}>{p}</p>
          ))}
        </section>

        <aside className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">If you want to help</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200/75">
            <li>Schedule regular vet checkups and keep records.</li>
            <li>Learn safe handling and emergency basics (heat, choking, wounds).</li>
            <li>Reach out to local rescues if you notice neglect—speak up safely.</li>
          </ul>
        </aside>
      </article>
    </Container>
  )
}

