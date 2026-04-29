# Pet Safety Training (Next.js)

This is the **Pet Safety Training** website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Local development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` (or the next available port if 3000 is busy).

## Routes

- `/`: Home (training site landing page)
- `/adopt`: Adoption listings + random animal photo gallery
- `/article/when-wealth-isnt-enough`: Featured article page (with Rex image)

## Build

```bash
npm run build
npm run start
```

## Favicons / logo

Favicons and the `favicon.ico` are generated from `public/logo.svg`:

```bash
npm run generate:icons
```
