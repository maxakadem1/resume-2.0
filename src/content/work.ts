// Pollard Banknote work, at the level of detail on the resume (public/Resume.pdf).

export interface Stat {
  value: string
  label: string
}

export const pollard = {
  company: 'Pollard Banknote',
  companyUrl: 'https://www.pollardbanknote.com/',
  title: 'Software Developer, Core Product Team',
  start: 'Mar 2024',
  end: 'Present',
  tagline:
    'I build the shared platform behind lottery apps for 8 clients, played by millions of people.',
  highlights: [
    'Designed the embeddable widget system (40+ widgets per client) and built a test environment that cut QA per widget from a full day to under 10 minutes',
    'Acting tech lead for Arizona’s relaunch: led 8 developers for 12 weeks and shipped on time to 30,000+ players',
    'Led a slow client app’s move to Next.js, making it load nearly 4× faster',
    'Moved the widget build from Create React App to Vite, taking known security vulnerabilities from 380 to 0',
    'Built react-core, the TypeScript API layer every front end uses, and review code for a team of about 15 developers',
  ],
  stats: [
    { value: '<10 min', label: 'QA per widget, down from a day' },
    { value: '30,000+', label: 'players at the Arizona launch' },
    { value: '4×', label: 'faster load after Next.js' },
  ] satisfies Stat[],
  stack: ['React', 'TypeScript', 'Next.js', 'Vite', 'Storybook', 'AWS Amplify'],
}
