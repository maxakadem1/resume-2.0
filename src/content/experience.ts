// Mirrors public/Resume.pdf. Update both together.

export interface Entry {
  title: string
  organization: string
  url?: string
  location: string
  start: string
  end: string
  bullets?: string[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const roles: Entry[] = [
  {
    title: 'Software Developer, Core Product Team',
    organization: 'Pollard Banknote',
    url: 'https://www.pollardbanknote.com/',
    location: 'Winnipeg, MB',
    start: 'Mar 2024',
    end: 'Present',
    bullets: [
      'Own the shared platform behind Pollard’s lottery products: client web and mobile apps plus an embeddable widget system running 40+ widgets in production for each of 8 clients, serving millions of players.',
      'Architected the widget system and 30+ React components; built react-core, the shared TypeScript API layer, and Konsole, an internal records tool.',
      'Acting tech lead for Arizona’s relaunch: led 8 developers over 12 weeks and shipped on time to 30,000+ players.',
      'Led the CRA to Vite and Next.js migrations; built the package release pipelines and deploy production Next.js on AWS Amplify.',
    ],
  },
  {
    title: 'Frontend Architect and Developer',
    organization: 'OutreachGenius',
    url: 'https://outreachgenius.ai/',
    location: 'Winnipeg, MB',
    start: 'May 2023',
    end: 'Jan 2024',
    bullets: [
      'One of the first engineers at an early-stage startup: architected the web app and Chrome extension, a Tailwind design system, and Firebase real-time data and auth.',
      'Migrated the Chrome extension from legacy Vue to React and TypeScript as it grew from 0 to 500+ users.',
    ],
  },
  {
    title: 'Promotions Executive, Lead Designer',
    organization: 'DevClub / Hackathon Winnipeg',
    url: 'https://devclub.ca/',
    location: 'Winnipeg, MB',
    start: 'Apr 2022',
    end: 'Present',
    bullets: [
      'Organized the largest UofM hackathon since 2015 and secured sponsors for events of 200–300+ students.',
    ],
  },
]

export const education: Entry[] = [
  {
    title: 'B.Sc. Computer Science',
    organization: 'University of Manitoba',
    location: 'Winnipeg, MB',
    start: '2018',
    end: '2023',
  },
  {
    title: 'Diploma in Art and Design',
    organization: 'Art School of Kasteyev',
    location: 'Almaty, KZ',
    start: '2016',
    end: '2018',
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'Java', 'GraphQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Vite', 'Tailwind', 'Redux', 'WebGL', 'three.js'],
  },
  {
    label: 'Platform',
    items: ['Node.js', 'FastAPI', 'AWS Amplify', 'Vercel', 'Firebase', 'CI/CD', 'Monorepos', 'Package publishing'],
  },
  {
    label: 'Quality',
    items: ['Jest', 'Playwright', 'Vitest', 'Storybook', 'Accessibility (WCAG)'],
  },
  {
    label: 'AI and data',
    items: ['RAG', 'OpenAI', 'Pinecone', 'BM25', 'Evaluation harnesses'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Blender', 'Procreate', 'Design systems'],
  },
]
