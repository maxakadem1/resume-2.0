import type { ReactNode } from 'react'
import { InlineLink } from '@/components/links'

export interface Metric {
  label: string
  value: string
  before?: string
}

export interface CaseStudy {
  kind: 'case-study'
  slug: string
  title: string
  summary: string
  metrics: Metric[]
  sections: { heading: string; body: string }[]
  stack: string[]
}

export interface GalleryProject {
  kind: 'gallery'
  slug: string
  title: string
  year: string
  group: 'earlier' | 'art'
  images: string[]
  body: ReactNode
}

export type Project = CaseStudy | GalleryProject

// Case studies describe Pollard Banknote work at the level of detail on the resume.
export const caseStudies: CaseStudy[] = [
  {
    kind: 'case-study',
    slug: 'widget-platform',
    title: 'Widget Platform',
    summary:
      'An embeddable widget system and the development environment around it, running 40+ widgets in production for each of 8 lottery clients.',
    metrics: [
      { label: 'QA time per widget', before: '7–8 h', value: '<10 min' },
      { label: 'Widgets in production per client', value: '40+' },
      { label: 'Lottery clients on the platform', value: '8' },
      { label: 'Shared React components', value: '30+' },
    ],
    sections: [
      {
        heading: 'Problem',
        body: 'Pollard’s client web and mobile apps share the same lottery features, deployed across 8 clients and multiple environments. Each widget had to be verified the slow way, and a full QA pass on a single widget took a whole working day.',
      },
      {
        heading: 'Approach',
        body: 'I architected the widget system and its library of 30+ React components, building about half of them myself. Around it I built a standalone development environment with sandboxes, hot reloading, Storybook, mock APIs, and test harnesses, so developers and QA can exercise any widget in isolation. I also built the build, versioning, and publishing pipelines that ship the shared packages to every client team.',
      },
      {
        heading: 'Result',
        body: 'QA time per widget dropped from 7–8 hours to under 10 minutes. The platform now serves millions of players, and I support the roughly 15 developers building on it.',
      },
    ],
    stack: ['React', 'TypeScript', 'Storybook', 'Mock APIs', 'CI/CD'],
  },
  {
    kind: 'case-study',
    slug: 'vite-migration',
    title: 'Create React App to Vite',
    summary:
      'Choosing and leading the migration of the widget build off Create React App.',
    metrics: [
      { label: 'Dependency vulnerabilities', before: '380', value: '0' },
      { label: 'High and critical', before: '25', value: '0' },
    ],
    sections: [
      {
        heading: 'Problem',
        body: 'The widget build sat on Create React App, which is no longer maintained. Its dependency tree carried 380 known vulnerabilities, 25 of them high or critical, and the setup had become hard to change.',
      },
      {
        heading: 'Approach',
        body: 'I evaluated the options, chose Vite, and led the migration of the widget build.',
      },
      {
        heading: 'Result',
        body: 'Vulnerabilities went from 380 to 0, bundles got smaller, and the codebase became maintainable again.',
      },
    ],
    stack: ['Vite', 'React', 'TypeScript'],
  },
  {
    kind: 'case-study',
    slug: 'nextjs-migration',
    title: 'Next.js Migration',
    summary:
      'Moving a production lottery app to Next.js and the shared widget architecture.',
    metrics: [
      { label: 'Speed Index', before: '5.1s', value: '1.3s' },
      { label: 'Largest Contentful Paint', before: '4.2s', value: '2.0s' },
    ],
    sections: [
      {
        heading: 'Problem',
        body: 'A production client app was slow to render and sat outside the shared platform, so it couldn’t reuse the widgets and patterns every other client used.',
      },
      {
        heading: 'Approach',
        body: 'I led the migration to Next.js and Pollard’s shared widget architecture, applying the patterns developed by the Core Product Team.',
      },
      {
        heading: 'Result',
        body: 'Speed Index improved from 5.1s to 1.3s and Largest Contentful Paint from 4.2s to 2.0s. The client team now maintains and extends the app on its own.',
      },
    ],
    stack: ['Next.js', 'React', 'Core Web Vitals'],
  },
  {
    kind: 'case-study',
    slug: 'arizona-relaunch',
    title: 'Arizona Relaunch',
    summary:
      'Leading 8 developers through a 12-week relaunch of Arizona’s lottery platform.',
    metrics: [
      { label: 'Developers led', value: '8' },
      { label: 'Weeks to launch', value: '12' },
      { label: 'Players right after launch', value: '30,000+' },
    ],
    sections: [
      {
        heading: 'Problem',
        body: 'Arizona was relaunching on Pollard’s platform under a fixed production deadline, with a team of 8 developers who needed clear ownership to move in parallel.',
      },
      {
        heading: 'Approach',
        body: 'As acting technical lead I broke the requirements into workstreams, assigned ownership, reviewed implementation decisions, and unblocked the team day to day.',
      },
      {
        heading: 'Result',
        body: 'The relaunch shipped on time, with more than 30,000 players on the site immediately after launch.',
      },
    ],
    stack: ['Technical leadership', 'Workstream planning', 'Code review'],
  },
]

export const galleryProjects: GalleryProject[] = [
  {
    kind: 'gallery',
    slug: 'devclub',
    title: 'UofM DevClub',
    year: '2022',
    group: 'earlier',
    images: [1, 2, 3, 4, 5, 6].map((n) => `/devclub/pic${n}.png`),
    body: (
      <>
        <p>
          DevClub is the University of Manitoba’s programming club, where I
          served as an executive.
        </p>
        <p>
          Together with another developer and the club president at the time,{' '}
          <InlineLink href='https://www.linkedin.com/in/manzik/'>
            Mohsen Yousefian
          </InlineLink>
          , I designed and built the club’s new website.
        </p>
        <p>
          The site showcases club activities and award winners. See it live at{' '}
          <InlineLink href='https://devclub.ca/'>devclub.ca</InlineLink>.
        </p>
      </>
    ),
  },
  {
    kind: 'gallery',
    slug: 'packetvis',
    title: 'PacketVis',
    year: '2022',
    group: 'earlier',
    images: [1, 2, 3, 4].map((n) => `/packet_vis/pic${n}.png`),
    body: (
      <>
        <p>
          A research project from my degree at the University of Manitoba.
        </p>
        <p>
          PacketVis reads network traffic captured by Wireshark and renders it
          on a 3D world map, showing packets flying in and out of the user’s IP
          address.
        </p>
      </>
    ),
  },
  {
    kind: 'gallery',
    slug: 'musica',
    title: 'Musica',
    year: '2021',
    group: 'earlier',
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/musica/pic${n}.png`),
    body: (
      <>
        <p>A freelance UI concept exploring a modern look for music apps.</p>
        <p>
          The form language is built around circles: every shape is round and
          smooth, which gives the app a comfortable feel.
        </p>
        <p>
          The palette reflects the night, with black, white, and yellow standing
          in for the moon and stars. A simple wave pattern ties the screens
          together.
        </p>
      </>
    ),
  },
  {
    kind: 'gallery',
    slug: 'musicAnimals',
    title: 'Music Animals',
    year: '2021',
    group: 'earlier',
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
      (n) => `/music-animals/pic${n}.png`,
    ),
    body: (
      <>
        <p>A UI design for a student team building a song-hosting app.</p>
        <p>
          It targets a younger audience with bold imagery and sharp contrast:
          scorpion motifs and an orange, black, and white palette.
        </p>
      </>
    ),
  },
  {
    kind: 'gallery',
    slug: 'artwork',
    title: 'Personal Artwork',
    year: 'Ongoing',
    group: 'art',
    images: [1, 2, 3, 4, 5].map((n) => `/art/pic${n}.png`),
    body: (
      <>
        <p>A collection of my recent digital work, drawn in Procreate.</p>
        <p>Most of it is inspired by the games I play in my spare time.</p>
      </>
    ),
  },
]

export const projects: Project[] = [...caseStudies, ...galleryProjects]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
