import { favicons } from 'favicons'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'public', 'logo.svg')
const OUT_DIR = path.join(ROOT, 'public')

const configuration = {
  path: '/',
  appName: 'Pet Safety Training',
  appShortName: 'Pet Safety',
  appDescription: 'Pet Safety Training — safer pets, better homes.',
  developerName: 'Pet Safety Training',
  background: '#020617',
  theme_color: '#0b1220',
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

