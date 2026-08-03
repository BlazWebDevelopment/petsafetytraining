import { favicons } from 'favicons'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'public', 'logo.svg')
const OUT_DIR = path.join(ROOT, 'public')

const configuration = {
  path: '/',
  appName: 'もふもふ日和。',
  appShortName: 'もふもふ日和',
  appDescription:
    '元保護犬と元保護猫の4匹と暮らす、ほんわかした毎日の記録です。',
  developerName: 'もふもふ日和。',
  background: '#fff7f7',
  theme_color: '#fff7f7',
  icons: {
    favicons: true,
    android: true,
    appleIcon: true,
    appleStartup: false,
    windows: false,
    yandex: false,
  },
}

const response = await favicons(SOURCE, configuration)

await Promise.all(
  response.images.map(async (img) => {
    await fs.writeFile(path.join(OUT_DIR, img.name), img.contents)
  }),
)

await Promise.all(
  response.files.map(async (file) => {
    await fs.writeFile(path.join(OUT_DIR, file.name), file.contents)
  }),
)

// Also write a helper snippet so you can paste/update tags if desired.
await fs.writeFile(path.join(OUT_DIR, 'favicon-tags.html'), response.html.join('\n'))

console.log('Generated favicons into /public')

