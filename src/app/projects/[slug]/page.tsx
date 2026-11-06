import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LuArrowLeft } from 'react-icons/lu'
import Shell from '@/components/shell/Shell'
import { Badge, ButtonLink } from '@/components/ui'
import { galleryProjects, getGalleryProject } from '@/content/projects'

interface Props {
  params: Promise<{ slug: string }>
}

// Every project is known at build time, so unknown slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
  return galleryProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getGalleryProject((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: `${project.title}: ${project.kind.toLowerCase()}, ${project.year}`,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getGalleryProject((await params).slug)
  if (!project) notFound()

  const others = galleryProjects.filter((p) => p.slug !== project.slug)

  return (
    <Shell crumb={project.title}>
      <main className='mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14 lg:py-12 xl:px-10'>
        <aside className='flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit'>
          <Link
            href='/#projects'
            className='group flex w-fit items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-foreground'
          >
            <LuArrowLeft className='size-3.5 transition group-hover:-translate-x-0.5' aria-hidden />
            All projects
          </Link>

          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <Badge>{project.kind}</Badge>
              <span className='text-2xs text-faint'>{project.year}</span>
            </div>
            <h1 className='text-3xl font-medium tracking-tight text-foreground'>
              {project.title}
            </h1>
          </div>

          <div className='flex flex-col gap-3 text-pretty text-[14px] leading-relaxed text-muted'>
            {project.body}
          </div>

          {project.links && (
            <div className='flex flex-wrap gap-2'>
              {project.links.map((l) => (
                <ButtonLink key={l.href} href={l.href} variant='outline'>
                  {l.label}
                </ButtonLink>
              ))}
            </div>
          )}

          <nav aria-label='Other projects' className='border-t border-line pt-5'>
            <h2 className='pb-2 text-2xs font-medium uppercase tracking-wider text-faint'>
              More work
            </h2>
            <ul className='flex flex-col gap-px'>
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className='-mx-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] text-muted transition-colors hover:bg-hover hover:text-foreground'
                  >
                    {p.title}
                    <span className='ml-auto text-2xs text-faint'>{p.kind}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className='flex flex-col gap-3'>
          {project.images.map((image, index) => (
            <div
              key={image}
              className='overflow-hidden rounded-xl border border-line bg-surface'
            >
              <Image
                src={image}
                alt={`${project.title}, image ${index + 1}`}
                width={1400}
                height={1000}
                sizes='(min-width: 1024px) 820px, 100vw'
                className='h-auto w-full'
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </main>
    </Shell>
  )
}
