// Sections of the home page, shared by the sidebar, top bar and command menu.
export const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'pollard', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']
