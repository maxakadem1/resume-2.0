# Maxim Abdulkhalikov Portfolio

<img width="1392" height="1215" alt="image" src="https://github.com/user-attachments/assets/8237fb82-efa9-4c0d-9d87-db71a9c031e4" />


Portfolio and resume site for Maxim Abdulkhalikov, a software developer working
in React, TypeScript and Next.js.

The design is taken from my own ink drawings: white engraved line on black, one
acid yellow, and a red and green fringe where the glow misregisters. The hero is
drawn live in that style by a fragment shader, and the whole site flips between
an "ink" theme and the "paper" print pulled from it.

## Tech Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS, with colours as CSS variables so both themes share every class
- Raw WebGL for the hero (no three.js): one ray-marched fragment shader
- Instrument Serif, Geist and Geist Mono through `next/font`
- React GA4 for page-view analytics

## Features

- Hero engraving: an armillary of rings around a cut gem, ray-marched and then
  hatched so line weight stands in for tone. It follows the pointer, inks in on
  load, pauses off screen and holds still under reduced motion.
- Ink and paper themes, saved to `localStorage` and applied before first paint.
- Work section with a before and after ledger drawn to scale.
- Featured projects as framed plates, and an archive index with an image that
  follows the cursor (thumbnails on touch screens).
- Experience, education, volunteering and toolkit in one record section.
- Gallery pages for earlier work, design and art, generated from one route. Old
  case-study URLs redirect to the Work section.
- Semantic, accessible markup: skip link, landmarks, labelled controls,
  screen-reader hints for new-tab links, and content that stays visible
  without JavaScript.

## Routes

| Route              | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `/`                | Home page with every section                  |
| `/projects/[slug]` | Gallery page for earlier work, design and art |
| `/resume`          | Embedded `public/Resume.pdf` viewer           |

## Project Structure

```text
.
├── public/
│   ├── Resume.pdf, Header.png
│   ├── GlassBlocks2.*, glassDonuts.*   Blender renders
│   ├── work/                           project screenshots
│   └── project image folders
├── resume/Resume.tex                   source of Resume.pdf
├── src/
│   ├── app/
│   │   ├── globals.css                 theme tokens and shared styles
│   │   ├── layout.tsx, page.tsx, not-found.tsx
│   │   ├── resume/page.tsx
│   │   └── projects/[slug]/page.tsx
│   ├── content/site.tsx                every word and number on the site
│   └── components/
│       ├── EngravingCanvas.tsx         the hero shader
│       ├── Hero, Work, Projects, Archive, Record, About, Contact, Footer
│       ├── Nav.tsx                     navigation, theme toggle, clock
│       ├── RevealObserver.tsx          scroll reveals for `data-reveal`
│       └── ui.tsx                      section header, links, stack list
├── tailwind.config.ts
└── package.json
```

## Editing Content

All copy lives in `src/content/site.tsx`. It mirrors `resume/Resume.tex` and
`public/Resume.pdf`, so update them together.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Starts the Next.js development server           |
| `npm run build` | Creates a production build and runs type checks |
| `npm run start` | Serves the production build                     |
| `npm run lint`  | Runs ESLint with zero warnings allowed          |

## Quality Checks

Run these before deploying or opening a pull request:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

The project currently uses an npm `overrides` entry to keep PostCSS on a patched
version required by the dependency tree.

## Deployment

The app can be deployed to Vercel or any hosting provider that supports Next.js.
For production:

1. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Deploy the generated Next.js application.
