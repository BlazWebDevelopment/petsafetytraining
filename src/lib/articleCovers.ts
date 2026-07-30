import { animalPhotoUrl } from './photos'
import type { Article } from './types'

const CUSTOM_COVER_SRC: Record<string, string> = {
  'neuralink-under-fire-after-zoo-animal-dies-during-brain-implant-experiment':
    '/pigmi.jpg',
  'mikolas-pygmy-hippo-neuralink': '/pigmi.jpg',
  'novas-journey-from-celebrity-companion-to-elite-safety-trainee': '/Nova2.png',
  'loyal-dog-dies-trying-to-reach-owner-during-arrest-incident':
    '/1c1a5a40-2c13-449f-bd05-1c9b5e668a63_1920x1080.jpg',
}

export function getArticleCoverSrc(
  article: Article,
  width: number,
  height: number,
): string {
  return (
    CUSTOM_COVER_SRC[article.slug] ??
    animalPhotoUrl(article.coverTopic, article.coverSeed, width, height)
  )
}

export function getArticleCoverAlt(article: Article): string {
  if (
    article.slug ===
    'neuralink-under-fire-after-zoo-animal-dies-during-brain-implant-experiment'
  ) {
    return 'Ellyn, the pygmy animal'
  }
  if (article.slug === 'mikolas-pygmy-hippo-neuralink') {
    return 'Mikolas, the pygmy hippo'
  }
  if (article.slug === 'novas-journey-from-celebrity-companion-to-elite-safety-trainee') {
    return 'Nova, a Shiba Inu puppy'
  }
  if (article.slug === 'loyal-dog-dies-trying-to-reach-owner-during-arrest-incident') {
    return 'Jackie, a German Shepherd, with his favorite toy.'
  }
  return ''
}
