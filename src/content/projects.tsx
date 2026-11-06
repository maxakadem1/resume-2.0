import type { ReactNode } from 'react'
import { InlineLink } from '@/components/ui'

export type Accent = 'sky' | 'violet' | 'amber' | 'mint'

export interface Stat {
  value: string
  label: string
}

export interface FeaturedProject {
  slug: string
  title: string
  year: string
  status: string
  accent: Accent
  tagline: string
  body: string
  highlights: string[]
  stats: Stat[]
  stack: string[]
  live?: string
  source: string
  image: { src: string; alt: string; width: number; height: number }
}

export const featured: FeaturedProject[] = [
  {
    slug: 'godot-rag',
    title: 'Godot Docs RAG',
    year: '2026',
    status: 'Live',
    accent: 'sky',
    tagline:
      'Ask the Godot Engine docs in plain English and watch every retrieval step happen.',
    body: 'A retrieval-augmented generation pipeline built directly on the OpenAI and Pinecone SDKs, with no RAG framework. The Next.js front end streams the whole trace live: what vector search found, what keyword search found, how the two were fused and which chunks the answer cites.',
    highlights: [
      'Custom reStructuredText parser and heading-aware chunking, measured with the embedding model’s own tokenizer',
      'Hybrid retrieval: Pinecone vectors plus a hand-written BM25 index, fused with Reciprocal Rank Fusion',
      'Grounded answers with citations, prompt-injection fencing and an evaluation harness behind every change',
      'Incremental, crash-safe sync, Redis-backed rate limits and 57 offline tests in CI',
    ],
    stats: [
      { value: '8,580', label: 'chunks from 1,565 pages' },
      { value: '89%', label: 'hit rate @5' },
      { value: '0.81', label: 'MRR' },
      { value: '$0.05', label: 'full re-index' },
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'Pinecone', 'Next.js', 'three.js', 'Redis'],
    live: 'https://godot-rag-sgky.vercel.app/',
    source: 'https://github.com/maxakadem1/godot-rag',
    image: {
      src: '/work/godot-rag.webp',
      alt: 'Godot Docs RAG answering “How do I connect a signal in code?” with its pipeline trace open',
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: 'visual-lab',
    title: 'Visual Lab',
    year: '2026',
    status: 'Live',
    accent: 'violet',
    tagline:
      'A browser effects workspace: stack pixel, dither, bloom and glitch layers on images and video in real time.',
    body: 'Drop in an image or a video and build a treatment out of effect layers. Images render through Canvas 2D, video through a WebGL path, and nothing leaves the browser. The demo here is a small port of its shaders, running live on one of my Blender renders.',
    highlights: [
      '10 stackable effects with drag-to-reorder, hide, duplicate and per-layer inspectors',
      'Palette sampling from the source, hold-to-compare and full-resolution PNG export',
      'Command menu, keyboard shortcuts, light and dark themes and mobile drawers',
    ],
    stats: [
      { value: '10', label: 'stackable effects' },
      { value: 'WebGL', label: 'real-time video' },
      { value: '100%', label: 'client-side' },
    ],
    stack: ['Next.js', 'TypeScript', 'WebGL', 'Canvas 2D', 'Tailwind'],
    live: 'https://visual-lab-chi.vercel.app',
    source: 'https://github.com/maxakadem1/visual-lab',
    image: {
      src: '/work/visual-lab.webp',
      alt: 'Visual Lab with one of my drawings run through dither and scan-line layers',
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: 'souls-of-terra',
    title: 'Souls of Terra',
    year: '2026',
    status: 'In development',
    accent: 'amber',
    tagline:
      'A Souls-inspired content mod for Terraria, built around a global soul economy.',
    body: 'Enemies release souls, you carry them at your own risk, and death leaves your whole balance in a bloodstain you have to walk back to. Souls buy gear rather than levels: a forge to imbue and temper weapons, soulspells, mutations and an original boss in a buried court.',
    highlights: [
      'Rewards computed globally from each enemy’s scaled stats, so modded and Master Mode enemies pay fairly with no per-enemy tables',
      'Server-authoritative balance and spending, synced in multiplayer',
      'Procedurally drawn soul orbs whose colour, size and glow track their value, plus custom HLSL shaders',
    ],
    stats: [
      { value: '25k', label: 'lines of C#' },
      { value: '6', label: 'custom shaders' },
      { value: '1', label: 'original boss' },
    ],
    stack: ['C#', 'tModLoader', 'HLSL', 'Game design'],
    source: 'https://github.com/maxakadem1/SoulsOfTerra',
    image: {
      src: '/work/souls-of-terra.webp',
      alt: 'A player in Terraria collecting soul orbs from defeated enemies',
      width: 704,
      height: 602,
    },
  },
]

export interface SmallProject {
  title: string
  year: string
  description: string
  href: string
  external?: boolean
  tags: string[]
  image?: string
}

export const moreProjects: SmallProject[] = [
  {
    title: '3D Scratch Ticket',
    year: '2025',
    description:
      'A physically based scratch-off ticket in three.js with a tunable holographic foil material.',
    href: 'https://3d-scratch.vercel.app',
    external: true,
    tags: ['three.js', 'React', 'Shaders'],
    image: '/work/scratch-ticket.webp',
  },
  {
    title: 'PacketVis',
    year: '2022',
    description:
      'University research project: Wireshark captures rendered as packets flying across a 3D world map.',
    href: '/projects/packetvis',
    tags: ['React', 'deck.gl', 'Mapbox', 'Flask'],
    image: '/packet_vis/pic1.png',
  },
  {
    title: 'DevClub website',
    year: '2022',
    description:
      'Designed and built the University of Manitoba programming club’s site.',
    href: '/projects/devclub',
    tags: ['Design', 'Frontend'],
    image: '/devclub/pic1.png',
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

export const galleryProjects: GalleryProject[] = [
  {
    slug: 'packetvis',
    title: 'PacketVis',
    year: '2022',
    kind: 'Research project',
    images: [1, 2, 3, 4].map((n) => `/packet_vis/pic${n}.png`),
    links: [
      { label: 'Source', href: 'https://github.com/maxakadem1/packet-visual' },
    ],
    body: (
      <>
        <p>
          A research project from my degree at the University of Manitoba, built
          with a team of four. I led the frontend.
        </p>
        <p>
          PacketVis reads network traffic captured by Wireshark and renders it
          on a 3D world map with deck.gl and Mapbox, showing packets flying in
          and out of the user’s IP address. A Python and Scapy backend parses
          the capture files.
        </p>
      </>
    ),
  },
  {
    slug: 'devclub',
    title: 'UofM DevClub',
    year: '2022',
    kind: 'Website',
    images: [1, 2, 3, 4, 5, 6].map((n) => `/devclub/pic${n}.png`),
    links: [{ label: 'devclub.ca', href: 'https://devclub.ca/' }],
    body: (
      <>
        <p>
          DevClub is the University of Manitoba’s programming club, where I
          served as an executive and lead designer.
        </p>
        <p>
          Together with another developer and the club president at the time,{' '}
          <InlineLink href='https://www.linkedin.com/in/manzik/'>
            Mohsen Yousefian
          </InlineLink>
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
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/musica/pic${n}.png`),
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
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
      (n) => `/music-animals/pic${n}.png`,
    ),
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
    images: [1, 2, 3, 4, 5].map((n) => `/art/pic${n}.png`),
    body: (
      <>
        <p>A collection of my recent digital work, drawn in Procreate.</p>
        <p>Most of it is inspired by the games I play in my spare time.</p>
      </>
    ),
  },
]

export const designWork = galleryProjects.filter((p) =>
  ['musica', 'musicAnimals', 'artwork'].includes(p.slug),
)

export function getGalleryProject(slug: string) {
  return galleryProjects.find((project) => project.slug === slug)
}
