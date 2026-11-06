// Single source of truth for identity and contact details.
export const profile = {
  name: 'Maxim Abdulkhalikov',
  shortName: 'Maxim',
  role: 'Frontend Engineer',
  currently: 'Software Developer at Pollard Banknote',
  location: 'Winnipeg, Canada',
  summary:
    'Frontend engineer building the shared platform behind lottery apps for 8 clients, plus open-source tools for AI retrieval and real-time graphics.',
  email: 'abdulhalikov0@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/abdulkhalikov/',
    github: 'https://github.com/maxakadem1',
    source: 'https://github.com/maxakadem1/resume-2.0',
  },
} as const

export const renders = {
  blocks: {
    label: 'Blocks',
    mp4: '/GlassBlocks2.mp4',
    webm: '/GlassBlocks2.webm',
  },
  rings: {
    label: 'Rings',
    mp4: '/glassDonuts.mp4',
    webm: '/glassDonuts.webm',
  },
} as const

export type RenderKey = keyof typeof renders
