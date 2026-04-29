export type Sex = 'Male' | 'Female'
export type Size = 'Small' | 'Medium' | 'Large'
export type Energy = 'Low' | 'Medium' | 'High'

export type Dog = {
  id: string
  slug: string
  name: string
  breed: string
  ageYears: number
  sex: Sex
  size: Size
  energy: Energy
  goodWithKids: boolean
  goodWithDogs: boolean
  goodWithCats: boolean
  vaccinated: boolean
  spayedNeutered: boolean
  location: string
  description: string
  traits: string[]
  photoTopic: 'dog' | 'puppy'
  photoSeed: number
}

export type Article = {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string // ISO string
  coverTopic: 'dog' | 'cat' | 'rabbit' | 'pet'
  coverSeed: number
  content: string[] // paragraphs
}

