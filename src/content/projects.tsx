import type { ReactNode } from 'react'
import type { GlassLogoName } from '@/components/three/logos'
import { InlineLink } from '@/components/ui'

export type Accent = 'sky' | 'violet' | 'amber' | 'mint'

export interface Stat {
  value: string
  label: string
}

export interface FeaturedProject {
  slug: string
  title: string
  /** Shown next to the title when the project isn't finished. */
  status?: string
  accent: Accent
  tagline: string
  highlights: string[]
  /** Only for projects with numbers worth reading. */
  stats?: Stat[]
  stack: string[]
  live?: string
  source: string
  image: { src: string; alt: string; width: number; height: number }
  /** Shown as a spinning glass logo, with the screenshot one tab away. */
  logo?: GlassLogoName
}

export const featured: FeaturedProject[] = [
  {
    slug: 'godot-rag',
    title: 'Godot Docs RAG',
    accent: 'sky',
    tagline:
      'Ask the Godot Engine docs in plain English and watch every retrieval step happen.',
    highlights: [
      'Hybrid search: Pinecone vectors plus a hand-written BM25 index, fused with Reciprocal Rank Fusion. No RAG framework.',
      'Grounded answers with citations, and an evaluation harness behind every change',
      'Crash-safe incremental sync, rate limiting and 57 tests in CI',
    ],
    stats: [
      { value: '89%', label: 'hit rate @5' },
      { value: '0.81', label: 'MRR' },
      { value: '8,580', label: 'chunks indexed' },
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'Pinecone', 'Next.js', 'Redis'],
    live: 'https://godot-rag-sgky.vercel.app/',
    source: 'https://github.com/maxakadem1/godot-rag',
    logo: 'godot',
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
    accent: 'violet',
    tagline:
      'Stack pixel, dither, bloom and glitch layers on images and video in real time, entirely in the browser.',
    highlights: [
      '10 stackable effects: Canvas 2D for images, a WebGL path for video',
      'Drag-to-reorder layers, palette sampling and full-resolution export',
      'The demo here is a port of its shaders, running on one of my Blender renders',
    ],
    stack: ['Next.js', 'TypeScript', 'WebGL', 'Canvas 2D'],
    live: 'https://visual-lab-chi.vercel.app',
    source: 'https://github.com/maxakadem1/visual-lab',
    image: {
      src: '/work/visual-lab.webp',
      alt: 'Visual Lab with one of my drawings run through dither and scan-line layers',
      width: 1600,
      height: 1000,
    },
  },
]

export interface SmallProject {
  title: string
  year: string
  description: string
  href: string
  external?: boolean
  image?: string
}

export const moreProjects: SmallProject[] = [
  {
    title: '3D Scratch Ticket',
    year: '2025',
    description:
      'A three.js scratch-off ticket with a holographic foil shader.',
    href: 'https://3d-scratch.vercel.app',
    external: true,
    image: '/work/scratch-ticket.webp',
  },
  {
    title: 'PacketVis',
    year: '2022',
    description:
      'Research project: Wireshark captures as packets flying across a 3D map.',
    href: '/projects/packetvis',
    image: '/packet_vis/pic1.png',
  },
  {
    title: 'DevClub website',
    year: '2022',
    description:
      'Designed and built the UofM programming club’s site.',
    href: '/projects/devclub',
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
