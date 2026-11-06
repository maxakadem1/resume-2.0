# Maxim Abdulkhalikov Portfolio

<img width="1392" height="1215" alt="image" src="https://github.com/user-attachments/assets/8237fb82-efa9-4c0d-9d87-db71a9c031e4" />


Portfolio and resume site for Maxim Abdulkhalikov, a frontend engineer working
in React, TypeScript and Next.js. It leads with personal projects (Godot Docs
RAG, Visual Lab, Souls of Terra), then Pollard Banknote work with before and
after metrics, experience, an about section and contact.

The design follows the same t3code-inspired system as
[Visual Lab](https://github.com/maxakadem1/visual-lab) and
[Godot Docs RAG](https://github.com/maxakadem1/godot-rag): a pure black canvas,
hairline borders, dense Inter and JetBrains Mono type, a sidebar shell and a
`Ctrl K` command menu. Blender renders anchor the hero and contact sections.

## Tech Stack

- Next.js 16 App Router
- React and TypeScript
- Tailwind CSS
- WebGL (the Visual Lab demo shader)
- React Icons (Lucide set)
- React GA4 for page-view analytics

## Features

- App-style shell: sticky sidebar with scroll-spy, breadcrumb top bar and a
  keyboard-driven command menu (`Ctrl/⌘ K`) that also serves as mobile nav.
- Hero built around looping Blender renders, with a render switcher, play and
  pause, and a live timeline.
- Featured project cards with screenshots, stats and links. The Visual Lab card
  runs a small WebGL port of its effects (pixelate, palette map, ordered dither,
  scan lines) live on the glass render.
- Pollard case studies as metric cards (problem, approach, result).
- Experience timeline, skills, artwork grid and a contact card with copy-email.
- Gallery pages for earlier work and design, generated from one route. Old
  case-study URLs redirect to their cards on the home page.
- Semantic, accessible markup: landmarks, labelled toggles, screen-reader hints
  for links that open a new tab, and reduced-motion support.

## Routes

| Route              | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `/`                | Home page with every section                    |
| `/projects/[slug]` | Gallery page for earlier work, design and art   |
| `/resume`          | Embedded `public/Resume.pdf` viewer             |

## Project Structure

```text
.
├── analytics.ts
├── public/
│   ├── Resume.pdf, Header.png
│   ├── GlassBlocks2.*, glassDonuts.*   Blender renders
│   ├── work/                           project screenshots
│   └── project image folders
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── resume/page.tsx
│   │   └── projects/[slug]/page.tsx
│   ├── content/        profile, projects, work, experience, nav
│   └── components/
│       ├── shell/      Shell, Sidebar, TopBar, CommandMenu
│       ├── home/       Hero, ShaderDemo and each home section
│       ├── ui.tsx      buttons, badges, window frame, links
│       └── Analytics.tsx
├── tailwind.config.ts  design tokens
└── package.json
```

## Editing Content

All copy lives in `src/content/`. `experience.ts` and `work.ts` mirror
`public/Resume.pdf`, so update them together. Featured projects, smaller
experiments and gallery pages are all in `projects.tsx`.

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
