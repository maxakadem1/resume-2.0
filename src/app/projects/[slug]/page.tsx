import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailPage from '@/components/ProjectDetailPage'
import { getProject, projects } from '@/content/projects'

interface Props {
  params: Promise<{ slug: string }>
}

// Every project is known at build time, so unknown slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}

  return {
    title: project.title,
    description:
      project.kind === 'case-study'
        ? project.summary
        : `${project.title} (${project.year})`,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  return <ProjectDetailPage project={project} />
}
