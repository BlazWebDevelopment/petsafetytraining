# もふもふ日和。 (Next.js)

A Japanese-language pet blog built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

The layout follows the two-column livedoor blog convention (content left, sidebar right)
with the classic `/archives/<id>.html` permalink structure.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` (or the next available port if 3000 is busy).

## Routes

- `/` — index listing all entries, newest first, with truncated previews
- `/archives/<id>.html` — a single entry (e.g. `/archives/55857704.html`)
- `/archives/cat_<id>.html` — category archive (e.g. `/archives/cat_315740.html`)

All routes are statically prerendered via `generateStaticParams`. Unknown slugs
return the 404 page (`dynamicParams = false`).

## Content

Entries, categories, and the family profiles live in:

- `src/lib/posts.ts` — the entries and category definitions
- `src/lib/site.ts` — blog title, description, author bio, family profiles

To add an entry, append to `POSTS` in `src/lib/posts.ts`. The `id` becomes the
permalink and `body` is an array of paragraphs. Everything else — the index
preview, sidebar "最新記事" list, category counts, monthly archive counts, and
prev/next navigation — is derived automatically.

Entry photos are rendered by `src/components/Photo.tsx`, which draws a
deterministic pastel placeholder from a seed string. Swap it for real `<img>`
tags when you have photos.

## Build

```bash
npm run build
npm run start
```

## Favicons

Icon files in `public/` are generated from a source image:

```bash
npm run generate:icons
```
