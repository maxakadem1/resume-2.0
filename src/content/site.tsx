// Everything the site says, in one place. Mirrors resume/Resume.tex and
// public/Resume.pdf: update them together.
import type { ReactNode } from 'react'

export const profile = {
  name: 'Maxim Abdulkhalikov',
  first: 'Maxim',
  last: 'Abdulkhalikov',
  role: 'Software Developer',
  currently: 'Core Product Team, Pollard Banknote',
  location: 'Winnipeg, Canada',
  timeZone: 'America/Winnipeg',
  summary:
    'Software developer and acting technical lead building the platform behind lottery products used by millions of players across 8 clients.',
  email: 'abdulhalikov0@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/abdulkhalikov/',
    github: 'https://github.com/maxakadem1',
    source: 'https://github.com/maxakadem1/resume-2.0',
  },
} as const

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'record', label: 'Record' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export const heroFacts = [
  { value: '8', label: 'lottery clients on one shared platform' },
  { value: '40+', label: 'widgets in production for each of them' },
  { value: '30k+', label: 'players on site at the Arizona launch' },
  { value: '~15', label: 'developers who escalate to me' },
]

export const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'Vite',
  'Node.js',
  'WebGL',
  'Python',
  'FastAPI',
  'AWS Amplify',
  'Storybook',
  'Playwright',
  'Figma',
  'Blender',
]

/* ------------------------------------------------------------------ Work */

export interface Measure {
  label: string
  note: string
  before: string
  after: string
  /** How much of the "before" bar the "after" bar fills, 0 to 1. */
  ratio: number
}

export const ledger: Measure[] = [
  {
    label: 'QA time per widget',
    note: 'Standalone widget workbench: sandboxes, hot reload, mock APIs',
    before: '7–8 h',
    after: '<10 min',
    ratio: 0.022,
  },
  {
    label: 'Dependency vulnerabilities',
    note: 'Create React App to Vite, 25 of them high or critical',
    before: '380',
    after: '0',
    ratio: 0,
  },
  {
    label: 'Speed Index',
    note: 'Production client app moved to Next.js',
    before: '5.1 s',
    after: '1.3 s',
    ratio: 1.3 / 5.1,
  },
  {
    label: 'Largest Contentful Paint',
    note: 'Same migration, same app',
    before: '4.2 s',
    after: '2.0 s',
    ratio: 2.0 / 4.2,
  },
]

export interface Job {
  company: string
  url: string
  title: string
  start: string
  end: string
  lead: string
  items: { title: string; body: string }[]
  stack: string[]
}

export const jobs: Job[] = [
  {
    company: 'Pollard Banknote',
    url: 'https://www.pollardbanknote.com/',
    title: 'Software Developer, Core Product Team',
    start: 'Mar 2024',
    end: 'Present',
    lead: 'I own the shared platform behind Pollard’s lottery products: client web and mobile apps, plus an embeddable widget system running in production for 8 clients and millions of players.',
    items: [
      {
        title: 'Widget platform',
        body: 'Architected the embeddable widget system and its 30+ React components, and built about half of them myself. 40+ widgets run in production for each client.',
      },
      {
        title: 'Arizona relaunch',
        body: 'Acting technical lead: 8 developers, 12 weeks, shipped on time. 30,000+ players were on the site immediately after launch.',
      },
      {
        title: 'react-core',
        body: 'The shared TypeScript API layer connecting every front end to authentication, loyalty points, location verification and gameplay.',
      },
      {
        title: 'Widget workbench',
        body: 'A standalone environment with sandboxes, hot reloading, Storybook, mock APIs and test harnesses, so developers and QA test widgets in isolation.',
      },
      {
        title: 'Konsole',
        body: 'Internal tool for managing games, polls and surveys through APIs instead of direct database edits, with role-based permissions and validation.',
      },
      {
        title: 'Pipelines',
        body: 'Build, versioning and publishing pipelines for the shared packages. Production Next.js apps deployed on AWS Amplify with Route 53.',
      },
      {
        title: 'Mentoring',
        body: 'Technical escalation point for about 15 developers, from co-op to senior: pairing, code review, onboarding and architecture docs.',
      },
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'React Native', 'Vite', 'Storybook', 'AWS Amplify'],
  },
  {
    company: 'OutreachGenius',
    url: 'https://outreachgenius.ai/',
    title: 'Frontend Architect and Developer',
    start: 'May 2023',
    end: 'Jan 2024',
    lead: 'One of the first engineers at an early-stage startup. I designed and built the interface for both the SaaS web app and its Chrome extension.',
    items: [
      {
        title: '0 to 500+ users',
        body: 'Rewrote the Chrome extension from a legacy Vue codebase into maintainable React and TypeScript while it grew from nothing.',
      },
      {
        title: 'One design system',
        body: 'A Tailwind-based system shared by the web app and the extension, designed in Figma and implemented end to end.',
      },
      {
        title: 'Real-time data',
        body: 'Integrated Firebase for live data and authentication across both products.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vue', 'Firebase', 'Tailwind', 'Chrome extensions'],
  },
]

/* -------------------------------------------------------------- Projects */

export interface Featured {
  title: string
  tagline: string
  points: string[]
  stats: { value: string; label: string }[]
  stack: string[]
  live: string
  source: string
  image: { src: string; alt: string }
}

export const featured: Featured[] = [
  {
    title: 'Godot Docs RAG',
    tagline:
      'Ask the Godot Engine docs in plain English, and watch every retrieval step happen.',
    points: [
      'Hybrid search over 1,565 pages: Pinecone vectors plus a hand-written BM25 index, fused by rank. No RAG framework.',
      'An evaluation set of 38 labelled questions sits behind every change. Vector search doubled recall on paraphrased questions.',
      'FastAPI and Next.js on Vercel, with streamed answers that cite their sources, rate limits and a daily cap on LLM cost.',
    ],
    stats: [
      { value: '89%', label: 'hit rate @5' },
      { value: '0.81', label: 'MRR' },
      { value: '8,580', label: 'chunks indexed' },
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'Pinecone', 'Next.js', 'Redis'],
    live: 'https://godot-rag-sgky.vercel.app/',
    source: 'https://github.com/maxakadem1/godot-rag',
    image: {
      src: '/work/godot-rag.webp',
      alt: 'Godot Docs RAG answering “How do I connect a signal in code?” with its pipeline trace open',
    },
  },
  {
    title: 'Visual Lab',
    tagline:
      'Stack pixel, dither, bloom and glitch layers on images and video, in real time, entirely in the browser.',
    points: [
      '10 customizable effects with live previews as parameters change.',
      'Two rendering pipelines: Canvas 2D for images, WebGL shaders for video, so effects stay real-time on moving footage.',
      'Drag-to-reorder layers, palette extraction and full-resolution PNG export.',
    ],
    stats: [
      { value: '10', label: 'stackable effects' },
      { value: '2', label: 'render pipelines' },
      { value: '0', label: 'servers involved' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'WebGL', 'Canvas 2D'],
    live: 'https://visual-lab-chi.vercel.app',
    source: 'https://github.com/maxakadem1/visual-lab',
    image: {
      src: '/work/visual-lab.webp',
      alt: 'Visual Lab with one of my drawings run through dither and scan-line layers',
    },
  },
]

export interface GalleryProject {
  slug: string
  title: string
  year: string
  kind: string
  images: string[]
  links?: { label: string; href: string }[]
  body: ReactNode
}

const pics = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/${dir}/pic${i + 1}.png`)

export const galleryProjects: GalleryProject[] = [
  {
    slug: 'packetvis',
    title: 'PacketVis',
    year: '2022',
    kind: 'Research project',
    images: pics('packet_vis', 4),
    links: [{ label: 'Source', href: 'https://github.com/maxakadem1/packet-visual' }],
    body: (
      <>
        <p>
          A research project from my degree at the University of Manitoba, built
          with a team of four. I led the frontend.
        </p>
        <p>
          PacketVis reads network traffic captured by Wireshark and renders it on
          a 3D world map with deck.gl and Mapbox, showing packets flying in and
          out of the user’s IP address. A Python and Scapy backend parses the
          capture files.
        </p>
      </>
    ),
  },
  {
    slug: 'devclub',
    title: 'UofM DevClub',
    year: '2022',
    kind: 'Website',
    images: pics('devclub', 6),
    links: [{ label: 'devclub.ca', href: 'https://devclub.ca/' }],
    body: (
      <>
        <p>
          DevClub is the University of Manitoba’s programming club, where I
          served as an executive and lead designer.
        </p>
        <p>
          Together with another developer and the club president at the time,{' '}
          <a
            className='link'
            href='https://www.linkedin.com/in/manzik/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Mohsen Yousefian
          </a>
          , I designed and built the club’s new website, which showcases club
          activities and award winners.
        </p>
      </>
    ),
  },
  {
    slug: 'musica',
    title: 'Musica',
    year: '2021',
    kind: 'UI design',
    images: pics('musica', 9),
    body: (
      <>
        <p>A freelance UI concept exploring a modern look for music apps.</p>
        <p>
          The form language is built around circles: every shape is round and
          smooth, which gives the app a comfortable feel. The palette reflects
          the night, with black, white and yellow standing in for the moon and
          stars, and a simple wave pattern ties the screens together.
        </p>
      </>
    ),
  },
  {
    slug: 'musicAnimals',
    title: 'Music Animals',
    year: '2021',
    kind: 'UI design',
    images: pics('music-animals', 9),
    body: (
      <>
        <p>A UI design for a student team building a song-hosting app.</p>
        <p>
          It targets a younger audience with bold imagery and sharp contrast:
          scorpion motifs and an orange, black and white palette.
        </p>
      </>
    ),
  },
  {
    slug: 'artwork',
    title: 'Artwork',
    year: 'Ongoing',
    kind: 'Illustration',
    images: pics('art', 5),
    body: (
      <>
        <p>A collection of my recent digital work, drawn in Procreate.</p>
        <p>Most of it is inspired by the games I play in my spare time.</p>
      </>
    ),
  },
]

export function getGalleryProject(slug: string) {
  return galleryProjects.find((project) => project.slug === slug)
}

export interface ArchiveRow {
  title: string
  kind: string
  year: string
  href: string
  image: string
  external?: boolean
}

// The index under the featured projects: smaller builds, then design work.
export const archive: ArchiveRow[] = [
  {
    title: '3D Scratch Ticket',
    kind: 'three.js, holographic foil shader',
    year: '2025',
    href: 'https://3d-scratch.vercel.app',
    image: '/work/scratch-ticket.webp',
    external: true,
  },
  ...galleryProjects.map((p) => ({
    title: p.title,
    kind: p.kind,
    year: p.year,
    href: `/projects/${p.slug}`,
    image: p.images[0],
  })),
]

/* ---------------------------------------------------------------- Record */

export interface Entry {
  title: string
  organization: string
  location: string
  dates: string
  note?: string
}

export const roles: Entry[] = jobs.map((job) => ({
  title: job.title,
  organization: job.company,
  location: 'Winnipeg, MB',
  dates: `${job.start} – ${job.end}`,
}))

export const education: Entry[] = [
  {
    title: 'B.Sc. Computer Science',
    organization: 'University of Manitoba',
    location: 'Winnipeg, MB',
    dates: '2018 – 2023',
  },
  {
    title: 'Diploma in Art and Design',
    organization: 'Art School of Kasteyev',
    location: 'Almaty, KZ',
    dates: '2016 – 2018',
  },
]

export const volunteering: Entry[] = [
  {
    title: 'Promotions Executive, Lead Designer',
    organization: 'DevClub / Hackathon Winnipeg',
    location: 'Winnipeg, MB',
    dates: 'Apr 2022 – Present',
    note: 'Organized the largest UofM hackathon since 2015 and secured sponsors for events of 200–300+ students.',
  },
]

export const skills = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'GraphQL'],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Next.js', 'React Native', 'Node.js', 'Vite', 'Vue.js'],
  },
  {
    label: 'Cloud',
    items: ['AWS Amplify', 'Route 53', 'Firebase', 'Vercel', 'CI/CD', 'Monorepos', 'Package publishing'],
  },
  {
    label: 'Tools',
    items: ['Jest', 'Playwright', 'Storybook', 'Contentful', 'Redux', 'Tailwind', 'Accessibility (WCAG)'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Blender', 'Procreate', 'Design systems'],
  },
]
