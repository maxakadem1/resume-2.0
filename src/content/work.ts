// Pollard Banknote work, at the level of detail on the resume (public/Resume.pdf).

export interface Metric {
  label: string
  value: string
  before?: string
}

export interface CaseStudy {
  slug: string
  title: string
  summary: string
  metric: Metric
  secondary?: Metric
  problem: string
  approach: string
  result: string
  stack: string[]
}

export const pollard = {
  company: 'Pollard Banknote',
  companyUrl: 'https://www.pollardbanknote.com/',
  team: 'Core Product Team',
  title: 'Software Developer',
  start: 'Mar 2024',
  end: 'Present',
  intro:
    'I own the shared platform behind Pollard’s lottery products: client web and mobile apps, an embeddable widget system running 40+ widgets in production for each of 8 clients, and react-core, the TypeScript API layer every front end uses for authentication, loyalty points, location verification and gameplay.',
  alsoBuilt: [
    {
      title: 'react-core',
      body: 'Shared TypeScript API layer connecting every front end to Pollard’s backend services.',
    },
    {
      title: 'Konsole',
      body: 'Internal tool for managing games, polls and surveys through APIs, with role-based permissions and validation.',
    },
    {
      title: 'Release pipelines',
      body: 'Build, versioning and publishing for shared packages. Production Next.js on AWS Amplify and Route 53.',
    },
    {
      title: 'Mentoring',
      body: 'Escalation point for ~15 developers. Pairing, code review, onboarding and architecture docs for co-op through senior.',
    },
  ],
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'widget-platform',
    title: 'Widget platform',
    summary:
      'The embeddable widget system and the development environment around it.',
    metric: { label: 'QA time per widget', before: '7–8 h', value: '<10 min' },
    secondary: { label: 'widgets per client, 8 clients', value: '40+' },
    problem:
      'Client web and mobile apps share the same lottery features across 8 clients and several environments, and a full QA pass on a single widget took a whole working day.',
    approach:
      'I architected the widget system and its 30+ React components, building about half of them. Around it I built a standalone environment with sandboxes, hot reloading, Storybook, mock APIs and test harnesses, so developers and QA can exercise any widget in isolation.',
    result:
      'QA per widget went from 7–8 hours to under 10 minutes. The platform now serves millions of players.',
    stack: ['React', 'TypeScript', 'Storybook', 'Mock APIs'],
  },
  {
    slug: 'arizona-relaunch',
    title: 'Arizona relaunch',
    summary: 'Acting tech lead for a fixed-deadline relaunch of a state lottery.',
    metric: { label: 'players right after launch', value: '30,000+' },
    secondary: { label: 'developers led over 12 weeks', value: '8' },
    problem:
      'Arizona was relaunching on Pollard’s platform under a fixed production deadline, with 8 developers who needed clear ownership to move in parallel.',
    approach:
      'I broke the requirements into workstreams, assigned ownership, reviewed implementation decisions and unblocked the team day to day.',
    result:
      'Shipped on time, with more than 30,000 players on the site immediately after launch.',
    stack: ['Technical leadership', 'Planning', 'Code review'],
  },
  {
    slug: 'nextjs-migration',
    title: 'Next.js migration',
    summary: 'Moving a slow production app onto Next.js and the shared widgets.',
    metric: { label: 'Speed Index', before: '5.1 s', value: '1.3 s' },
    secondary: { label: 'Largest Contentful Paint', before: '4.2 s', value: '2.0 s' },
    problem:
      'A production client app rendered slowly and sat outside the shared platform, so it couldn’t reuse the widgets every other client used.',
    approach:
      'I led its migration to Next.js and Pollard’s shared widget architecture, applying the Core Product Team’s patterns.',
    result:
      'Speed Index dropped from 5.1 s to 1.3 s and LCP from 4.2 s to 2.0 s. The client team now maintains it on its own.',
    stack: ['Next.js', 'React', 'Core Web Vitals'],
  },
  {
    slug: 'vite-migration',
    title: 'CRA to Vite',
    summary: 'Choosing and leading the widget build’s move off Create React App.',
    metric: { label: 'dependency vulnerabilities', before: '380', value: '0' },
    secondary: { label: 'high and critical', before: '25', value: '0' },
    problem:
      'The widget build sat on the unmaintained Create React App, carrying 380 known vulnerabilities, 25 of them high or critical.',
    approach: 'I evaluated the options, chose Vite and led the migration.',
    result:
      'Vulnerabilities went from 380 to 0, bundles got smaller and the codebase became maintainable again.',
    stack: ['Vite', 'React', 'TypeScript'],
  },
]
