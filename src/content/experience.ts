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
    // Details live in the Work section, so the timeline only names the role.
    title: 'Software Developer, Core Product Team',
    organization: 'Pollard Banknote',
    url: 'https://www.pollardbanknote.com/',
    location: 'Winnipeg, MB',
    start: 'Mar 2024',
    end: 'Present',
  },
  {
    title: 'Frontend Architect and Developer',
    organization: 'OutreachGenius',
    url: 'https://outreachgenius.ai/',
    location: 'Winnipeg, MB',
    start: 'May 2023',
    end: 'Jan 2024',
    bullets: [
      'One of the first engineers at an early-stage startup: built the web app, Chrome extension and Tailwind design system on Firebase.',
      'Moved the extension from legacy Vue to React and TypeScript as it grew from 0 to 500+ users.',
    ],
  },
]

export const volunteering: Entry[] = [
  {
    title: 'Promotions Executive, Lead Designer',
    organization: 'DevClub / Hackathon Winnipeg',
    url: 'https://devclub.ca/',
    location: 'Winnipeg, MB',
    start: 'Apr 2022',
    end: 'Present',
    bullets: [
      'Organized the largest UofM hackathon since 2015, for 200–300+ students.',
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
    items: ['RAG', 'OpenAI', 'Pinecone', 'Evaluation harnesses'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Blender', 'Procreate', 'Design systems'],
  },
]
