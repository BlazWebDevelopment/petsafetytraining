import type { Dog, Energy, Sex, Size } from '../types'

declare global {
  var __pst_dogs_cache: Dog[] | undefined
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rand: () => number, arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)]!
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const NAMES = [
  'Buddy',
  'Bella',
  'Charlie',
  'Lucy',
  'Max',
  'Luna',
  'Rocky',
  'Daisy',
  'Milo',
  'Sadie',
  'Cooper',
  'Bailey',
  'Bear',
  'Molly',
  'Tucker',
  'Zoey',
  'Rex',
  'Nala',
  'Oliver',
  'Coco',
  'Leo',
  'Penny',
  'Rosie',
  'Scout',
  'Finn',
  'Hazel',
  'Ruby',
  'Winston',
  'Oreo',
  'Pepper',
]

const BREEDS = [
  'Mixed Breed',
  'Labrador Retriever Mix',
  'German Shepherd Mix',
  'Pit Bull Terrier Mix',
  'Husky Mix',
  'Cattle Dog Mix',
  'Boxer Mix',
  'Beagle Mix',
  'Golden Retriever Mix',
  'Terrier Mix',
  'Shepherd Mix',
  'Pointer Mix',
  'Corgi Mix',
  'Aussie Mix',
  'Doberman Mix',
]

const TRAITS = [
  'House-trained',
  'Crate-trained',
  'Leash manners',
  'Food-motivated',
  'Affectionate',
  'Playful',
  'Quiet at home',
  'Smart',
  'Gentle',
  'Curious',
  'Loves car rides',
  'Good recall foundation',
  'Learns quickly',
  'Snuggle buddy',
  'Adventurous',
]

const LOCATIONS = [
  'Austin, TX',
  'Portland, OR',
  'Denver, CO',
  'San Diego, CA',
  'Raleigh, NC',
  'Phoenix, AZ',
  'Nashville, TN',
  'Boston, MA',
  'Seattle, WA',
  'Chicago, IL',
  'Atlanta, GA',
  'Minneapolis, MN',
  'Tampa, FL',
  'Salt Lake City, UT',
  'Charlotte, NC',
  'San Jose, CA',
  'Philadelphia, PA',
  'Columbus, OH',
  'Kansas City, MO',
  'New Orleans, LA',
]

function buildDescription(
  name: string,
  breed: string,
  energy: Energy,
  size: Size,
  location: string,
  goodWithKids: boolean,
) {
  const kidText = goodWithKids
    ? 'has shown good manners around respectful kids'
    : 'would do best in an adult-focused home or with older teens'
  return `${name} is a ${size.toLowerCase()} ${breed} in ${location} with ${energy.toLowerCase()} energy. ${name} ${kidText}, enjoys a predictable routine, and is looking for a calm, safety-first home that will continue training and enrichment.`
}

export function getAllDogs(): Dog[] {
  if (globalThis.__pst_dogs_cache) return globalThis.__pst_dogs_cache

  const rand = mulberry32(20260429)
  const usedSlugs = new Map<string, number>()

  const dogs: Dog[] = []
  for (let i = 0; i < 590; i++) {
    const name = pick(rand, NAMES)
    const breed = pick(rand, BREEDS)
    const sex: Sex = rand() < 0.5 ? 'Male' : 'Female'
    const size: Size = pick(rand, ['Small', 'Medium', 'Large'])
    const energy: Energy = pick(rand, ['Low', 'Medium', 'High'])
    const ageYearsRaw = rand() < 0.25 ? rand() * 1.2 : 1 + rand() * 11
    const ageYears = Math.max(0.3, Math.round(ageYearsRaw * 10) / 10)
    const goodWithKids = rand() < 0.75
    const goodWithDogs = rand() < 0.8
    const goodWithCats = rand() < 0.55
    const vaccinated = rand() < 0.92
    const spayedNeutered = rand() < 0.78
    const location = pick(rand, LOCATIONS)
    const photoTopic = ageYears < 1.0 ? 'puppy' : 'dog'
    const photoSeed = 1000 + i * 3

    const baseSlug = slugify(`${name}-${breed}-${location.split(',')[0]}`)
    const n = usedSlugs.get(baseSlug) ?? 0
    usedSlugs.set(baseSlug, n + 1)
    const slug = n === 0 ? baseSlug : `${baseSlug}-${n + 1}`

    const traitCount = 3 + Math.floor(rand() * 4)
    const traits = Array.from({ length: traitCount })
      .map(() => pick(rand, TRAITS))
      .filter((v, idx, arr) => arr.indexOf(v) === idx)
      .slice(0, 6)

    const description = buildDescription(
      name,
      breed,
      energy,
      size,
      location,
      goodWithKids,
    )

    dogs.push({
      id: `dog_${(i + 1).toString().padStart(4, '0')}`,
      slug,
      name,
      breed,
      ageYears,
      sex,
      size,
      energy,
      goodWithKids,
      goodWithDogs,
      goodWithCats,
      vaccinated,
      spayedNeutered,
      location,
      description,
      traits,
      photoTopic,
      photoSeed,
    })
  }

  globalThis.__pst_dogs_cache = dogs
  return globalThis.__pst_dogs_cache
}

export function getDogById(id: string): Dog | undefined {
  return getAllDogs().find((d) => d.id === id)
}

