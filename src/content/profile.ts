// Single source of truth for identity and contact details.
export const profile = {
  name: 'Maxim Abdulkhalikov',
  shortName: 'Maxim',
  role: 'Frontend Engineer',
  currently: 'Acting tech lead at Pollard Banknote',
  location: 'Winnipeg, Canada',
  summary:
    'Frontend engineer and acting tech lead building the platform behind lottery apps played by millions, plus open-source tools for graphics, retrieval and games.',
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
    file: 'glass_blocks.blend',
    mp4: '/GlassBlocks2.mp4',
    webm: '/GlassBlocks2.webm',
  },
  rings: {
    label: 'Rings',
    file: 'glass_rings.blend',
    mp4: '/glassDonuts.mp4',
    webm: '/glassDonuts.webm',
  },
} as const

export type RenderKey = keyof typeof renders
