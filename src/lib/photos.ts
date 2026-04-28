export type AnimalTopic = 'dog' | 'cat' | 'puppy' | 'kitten' | 'rabbit' | 'pet'

export function animalPhotoUrl(
  topic: AnimalTopic,
  seed: number,
  width = 1200,
  height = 800,
) {
  const safeSeed = Number.isFinite(seed) ? Math.abs(Math.floor(seed)) : 1
  // Using loremflickr for simple category-based photos (works well in dev without API keys).
  // `lock` makes the image stable per seed while still "random enough" across cards.
  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(topic)}?lock=${safeSeed}`
}

