import { writeFileSync } from 'node:fs'

const lines = []

const res = await fetch('http://localhost:3000/')
const html = await res.text()
lines.push(`index -> HTTP ${res.status}`)

// Sidebar portraits should be bare circles; article thumbs keep the pink frame.
lines.push(`thumb-frame occurrences (article photos): ${(html.match(/thumb-frame/g) || []).length}`)
lines.push(`rounded-full occurrences (sidebar portraits): ${(html.match(/rounded-full/g) || []).length}`)
lines.push(`placeholder frames remaining: ${(html.match(/linear-gradient\(140deg/g) || []).length}`)

const art = await fetch('http://localhost:3000/archives/55857704.html')
const artHtml = await art.text()
lines.push(`\n55857704 -> HTTP ${art.status}`)
lines.push(`  uses kitten-yuna-2.png: ${artHtml.includes('/photos/kitten-yuna-2.png')}`)
lines.push(`  still uses indoor-pets:  ${artHtml.includes('/photos/indoor-pets.png')}`)

const img = await fetch('http://localhost:3000/photos/kitten-yuna-2.png')
lines.push(
  `  image serves: HTTP ${img.status} ${img.headers.get('content-type')} ${(
    Number(img.headers.get('content-length')) / 1024
  ).toFixed(0)} KB`,
)

writeFileSync('verify-out.txt', lines.join('\n'), 'utf8')
