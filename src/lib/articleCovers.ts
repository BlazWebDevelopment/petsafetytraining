import { animalPhotoUrl } from './photos'
import type { Article } from './types'

const CUSTOM_COVER_SRC: Record<string, string> = {
  'mikolas-pygmy-hippo-neuralink': '/pigmi.jpg',
  'novas-journey-from-celebrity-companion-to-elite-safety-trainee': '/Nova.jpg',
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
  if (article.slug === 'mikolas-pygmy-hippo-neuralink') {
    return 'Mikolas, the pygmy hippo'
  }
  if (article.slug === 'novas-journey-from-celebrity-companion-to-elite-safety-trainee') {
    return 'Nova, a Shiba Inu puppy'
  }
  return ''
}
