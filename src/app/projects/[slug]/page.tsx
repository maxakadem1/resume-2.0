import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import { ExternalLink } from '@/components/ui'
import { galleryProjects, getGalleryProject } from '@/content/site'

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

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default async function ProjectPage({ params }: Props) {
  const project = getGalleryProject((await params).slug)
  if (!project) notFound()

  const index = galleryProjects.indexOf(project)
  const next = galleryProjects[(index + 1) % galleryProjects.length]

  return (
    <>
      <main
        id='main'
        className='mx-auto w-full max-w-page px-5 pt-28 sm:px-8 lg:px-12'
      >
        <Link href='/#projects' className='label transition-colors hover:text-fg'>
          <span className='fringe'>← All projects</span>
        </Link>

        <header className='mt-8 grid gap-x-8 gap-y-6 border-t border-line-strong pt-5 md:grid-cols-12'>
          <p className='label md:col-span-3'>
            <span className='text-fg'>{project.kind}</span>
            <span className='px-2' aria-hidden>
              —
            </span>
            {project.year}
          </p>
          <h1 className='display [font-size:clamp(3.4rem,11vw,10rem)] md:col-span-9'>
            {project.title}
          </h1>
        </header>

        <div className='grid gap-x-8 gap-y-10 pt-12 md:grid-cols-12 md:pt-20'>
          <aside className='md:col-span-4 lg:col-span-3'>
            <div className='flex flex-col gap-6 md:sticky md:top-24'>
              <div className='flex flex-col gap-4 text-pretty leading-relaxed text-muted'>
                {project.body}
              </div>
              {project.links && (
                <div className='flex flex-wrap gap-3'>
                  {project.links.map((link) => (
                    <ExternalLink key={link.href} href={link.href} className='btn'>
                      {link.label} <span aria-hidden>↗</span>
                    </ExternalLink>
                  ))}
                </div>
              )}
              <p className='label border-t border-line pt-4'>
                {project.images.length} plates
              </p>
            </div>
          </aside>

          <ol className='grid gap-x-6 gap-y-10 sm:grid-cols-2 md:col-span-8 lg:col-span-9'>
            {project.images.map((image, i) => (
              <li
                key={image}
                data-reveal
                className={i % 3 === 0 ? 'sm:col-span-2' : ''}
              >
                <figure>
                  <div className='plate'>
                    <Image
                      src={image}
                      alt={`${project.title}, plate ${i + 1}`}
                      width={1100}
                      height={1100}
                      sizes={
                        i % 3 === 0
                          ? '(min-width: 768px) 66vw, 100vw'
                          : '(min-width: 768px) 33vw, 100vw'
                      }
                      className='h-auto w-full'
                      priority={i === 0}
                    />
                  </div>
                  <figcaption className='label mt-3'>
                    <span className='text-fg'>Pl. {roman[i] ?? i + 1}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href={`/projects/${next.slug}`}
          className='group mt-28 flex items-end justify-between gap-6 border-t border-line-strong pt-5 md:mt-40'
        >
          <span className='label'>Next — {next.kind}</span>
          <span className='display text-right text-6xl sm:text-8xl'>
            <span className='fringe'>{next.title}</span>{' '}
            <span
              aria-hidden
              className='inline-block font-sans text-4xl text-muted transition-transform duration-300 ease-out group-hover:translate-x-2'
            >
              →
            </span>
          </span>
        </Link>
      </main>
      <Footer />
    </>
  )
}
