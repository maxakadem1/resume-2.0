import type { ReactNode } from 'react'
import Panel, { type PanelProps } from '@/components/Panel'
import { MenuLink } from '@/components/links'
import { caseStudies, galleryProjects } from '@/content/projects'

const earlierWork = galleryProjects.filter((p) => p.group === 'earlier')
const art = galleryProjects.filter((p) => p.group === 'art')

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className='text-gray-300 text-base md:pb-1'>{title}</h3>
      <ul className='flex flex-col gap-2'>{children}</ul>
    </section>
  )
}

export default function ProjectsContent({ style, onBack }: PanelProps) {
  return (
    <Panel
      title='Projects'
      style={style}
      onBack={onBack}
      bodyClassName='flex flex-col gap-6'
    >
      <Group title='Selected Work'>
        {caseStudies.map((study) => (
          <li key={study.slug}>
            <MenuLink href={`/projects/${study.slug}`}>{study.title}</MenuLink>
            <p className='text-gray-600'>{study.summary}</p>
          </li>
        ))}
      </Group>

      <Group title='Earlier Work and Design'>
        {earlierWork.map((project) => (
          <li key={project.slug}>
            <MenuLink href={`/projects/${project.slug}`}>
              {project.title}
              <span className='text-gray-700 ml-2'>{project.year}</span>
            </MenuLink>
          </li>
        ))}
      </Group>

      <Group title='Art'>
        {art.map((project) => (
          <li key={project.slug}>
            <MenuLink href={`/projects/${project.slug}`}>
              {project.title}
            </MenuLink>
          </li>
        ))}
      </Group>
    </Panel>
  )
}
