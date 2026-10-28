// Mirrors public/Resume.pdf. Update both together.

export interface Role {
  title: string
  company: string
  companyUrl: string
  location: string
  start: string
  end: string
  bullets: string[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Credential {
  title: string
  organization: string
  location: string
  start: string
  end: string
  details?: string
}

export const roles: Role[] = [
  {
    title: 'Software Developer, Core Product Team',
    company: 'Pollard Banknote',
    companyUrl: 'https://www.pollardbanknote.com/',
    location: 'Winnipeg, MB',
    start: 'Mar 2024',
    end: 'Present',
    bullets: [
      'Own the shared platform behind Pollard’s lottery products: client web and mobile apps plus an embeddable widget system running 40+ widgets in production for each of 8 clients across multiple environments, serving millions of players.',
      'Architected the widget system and 30+ React components, building about half of them myself.',
      'Acting technical lead for Arizona’s relaunch: led 8 developers over 12 weeks, organized workstreams, assigned ownership, and unblocked the team. Shipped on time, with 30,000+ players on the site immediately after launch.',
      'Developed react-core, the shared TypeScript API layer connecting every front end to Pollard’s backend services for authentication, loyalty points, location verification, and gameplay.',
      'Built Konsole, an internal tool for creating and managing database records (games, polls, surveys) through APIs instead of direct database edits, with role-based permissions and validation workflows.',
      'Built a standalone widget development environment (sandboxes, hot reloading, Storybook, mock APIs, test harnesses) so developers and QA test widgets in isolation, cutting QA time per widget from a full day (7–8 hours) to under 10 minutes.',
      'Chose and led the widget build’s migration from Create React App to Vite, cutting dependency vulnerabilities from 380 (25 high/critical) to 0, shrinking bundles, and making the codebase maintainable again.',
      'Led a production app’s migration to Next.js, improving Speed Index from 5.1s to 1.3s and Largest Contentful Paint from 4.2s to 2.0s.',
      'Built the build, versioning, and publishing pipelines for shared packages. Deploy production Next.js apps on AWS Amplify with Route 53 DNS.',
      'Technical escalation point for about 15 developers. Mentor co-op through senior developers via pairing, code review, onboarding, and architecture documentation.',
    ],
  },
  {
    title: 'Frontend Architect and Developer',
    company: 'OutreachGenius',
    companyUrl: 'https://outreachgenius.ai/',
    location: 'Winnipeg, MB',
    start: 'May 2023',
    end: 'Jan 2024',
    bullets: [
      'One of the first engineers at an early-stage startup: architected the web app and Chrome extension, a Tailwind design system, and Firebase real-time data and authentication.',
      'Migrated the Chrome extension from legacy Vue to React and TypeScript. It grew from 0 to 500+ users.',
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Java', 'GraphQL', 'Python'],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Next.js', 'React Native', 'Node.js', 'Vite', 'Vue.js'],
  },
  {
    label: 'Cloud and Infrastructure',
    items: [
      'AWS (Amplify, Route 53)',
      'Firebase',
      'Vercel',
      'CI/CD',
      'Monorepos',
      'Package publishing',
    ],
  },
  {
    label: 'Tools',
    items: [
      'Jest',
      'Playwright',
      'Storybook',
      'Contentful (CMS)',
      'Redux',
      'Tailwind',
      'Figma',
      'Accessibility (WCAG)',
    ],
  },
]

export const education: Credential[] = [
  {
    title: 'B.Sc. Computer Science',
    organization: 'University of Manitoba',
    location: 'Winnipeg, MB',
    start: 'Sep 2018',
    end: 'May 2023',
  },
  {
    title: 'Diploma in Art and Design',
    organization: 'Art School of Kasteyev',
    location: 'Almaty, KZ',
    start: 'Sep 2016',
    end: 'Jun 2018',
  },
]

export const volunteering: Credential[] = [
  {
    title: 'Promotions Executive, Lead Designer',
    organization: 'DevClub / Hackathon Winnipeg',
    location: 'Winnipeg, MB',
    start: 'Apr 2022',
    end: 'Present',
    details:
      'Organized the largest UofM hackathon since 2015 and secured sponsors for events of 200–300+ students.',
  },
]
