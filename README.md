# Maxim Abdulkhalikov Portfolio

<img width="1392" height="1215" alt="image" src="https://github.com/user-attachments/assets/8237fb82-efa9-4c0d-9d87-db71a9c031e4" />


Portfolio and resume site for Maxim Abdulkhalikov, a frontend developer working
in React, TypeScript, and Next.js. It covers professional experience, case
studies from production work, earlier design projects, artwork, and an embedded
resume PDF.

The site is built as a small static-friendly Next.js application with App Router
routes, Tailwind styling, animated section transitions, and locally hosted media
assets.

## Tech Stack

- Next.js 16 App Router
- React
- TypeScript
- Tailwind CSS
- React Spring for panel transitions
- React Icons for navigation and external-link indicators
- React GA4 for page-view analytics

## Features

- Minimal single-screen home experience with animated background media.
- Interactive content panels for experience, projects, about, and contact.
- Typed content layer in `src/content/` that drives every panel and page.
- Case study pages with before/after metrics, plus image galleries for earlier
  work, all generated statically from one `/projects/[slug]` route.
- Semantic, accessible markup: landmarks, heading hierarchy, labelled toggles,
  and screen-reader hints for links that open a new tab.
- Embedded PDF resume route.
- Open Graph and Twitter metadata using `public/Header.png`.
- GA4 page-view tracking.
- ESLint configured for Next.js and TypeScript.

## Routes

| Route                    | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `/`                      | Home page and interactive portfolio menu |
| `/resume`                | Embedded `public/Resume.pdf` viewer      |
| `/projects/[slug]`       | Case study or gallery page per project   |

## Project Structure

```text
.
├── analytics.ts
├── public/
│   ├── Resume.pdf
│   ├── Header.png
│   ├── GlassBlocks2.webm
│   ├── GlassBlocks2.mp4
│   ├── glassDonuts.webm
│   ├── glassDonuts.mp4
│   └── project image folders
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── resume/page.tsx
│   │   └── projects/[slug]/page.tsx
│   ├── content/
│   │   ├── profile.ts
│   │   ├── experience.ts
│   │   └── projects.tsx
│   └── components/
│       ├── HomePage.tsx
│       ├── Panel.tsx
│       ├── ProjectDetailPage.tsx
│       ├── links.tsx
│       └── content section components
├── eslint.config.mjs
├── tailwind.config.ts
└── package.json
```

## Editing Content

All copy lives in `src/content/`. `experience.ts` mirrors `public/Resume.pdf`,
so update both together. To add a project, append an entry to `caseStudies` or
`galleryProjects` in `projects.tsx`; its page and menu link are generated.

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
