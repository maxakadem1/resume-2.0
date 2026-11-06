import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { LuArrowRight, LuArrowUpRight, LuGithub } from 'react-icons/lu'
import ShaderDemo from './ShaderDemo'
import {
  Badge,
  ButtonLink,
  Dot,
  SectionHeader,
  WindowFrame,
  accentBg,
  accentText,
  cn,
} from '@/components/ui'
import {
  designWork,
  featured,
  moreProjects,
  type FeaturedProject,
} from '@/content/projects'

/** Godot RAG's pipeline, drawn in the same stage colours the app uses. */
function Pipeline() {
  const step = 'rounded-md border px-2 py-1 font-mono text-3xs sm:text-2xs'
  return (
    <div
      className='flex flex-wrap items-center gap-1.5 text-faint'
      aria-label='Pipeline: question, vector and keyword search in parallel, rank fusion, cited answer'
    >
      <span className={cn(step, 'border-line text-muted')}>question</span>
      <LuArrowRight className='size-3' aria-hidden />
      <span className='flex flex-col gap-1'>
        <span className={cn(step, 'border-sky/30 bg-sky/10 text-sky')}>vector · Pinecone</span>
        <span className={cn(step, 'border-amber/30 bg-amber/10 text-amber')}>keyword · BM25</span>
      </span>
      <LuArrowRight className='size-3' aria-hidden />
      <span className={cn(step, 'border-mint/30 bg-mint/10 text-mint')}>RRF fusion</span>
      <LuArrowRight className='size-3' aria-hidden />
      <span className={cn(step, 'border-violet/30 bg-violet/10 text-violet')}>cited answer</span>
    </div>
  )
}

function Media({ project }: { project: FeaturedProject }) {
  if (project.slug === 'visual-lab') return <ShaderDemo screenshot={project.image} />

  const host = project.live
    ? new URL(project.live).host
    : 'Terraria · tModLoader'
  return (
    <WindowFrame
      title={host}
      right={
        project.live ? (
          <span className='flex items-center gap-1 font-mono text-3xs text-mint'>
            <Dot accent='mint' pulse />
            live
          </span>
        ) : (
          <span className='font-mono text-3xs text-amber'>wip</span>
        )
      }
    >
      <div className='relative bg-black'>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes='(min-width: 1280px) 640px, 100vw'
          // The animated WebP is served as is, so it keeps playing.
          unoptimized={project.slug === 'souls-of-terra'}
          className={cn(
            'h-auto w-full',
            project.slug === 'souls-of-terra' && 'aspect-[4/3] object-cover [image-rendering:pixelated]',
          )}
        />
      </div>
    </WindowFrame>
  )
}

function Featured({
  project,
  index,
  extra,
}: {
  project: FeaturedProject
  index: number
  extra?: ReactNode
}) {
  const flip = index % 2 === 1
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className='grid scroll-mt-20 items-start gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-12'
    >
      <div className={cn('min-w-0 xl:sticky xl:top-20', flip && 'xl:order-last')}>
        <Media project={project} />
      </div>

      <div className='flex min-w-0 flex-col gap-5'>
        <div className='flex flex-wrap items-center gap-2 text-2xs text-faint'>
          <span className='font-mono'>{String(index + 1).padStart(2, '0')}</span>
          <span className='h-px w-4 bg-line-strong' />
          <Badge>
            <Dot accent={project.accent} pulse={project.status === 'Live'} />
            {project.status}
          </Badge>
          <span>{project.year}</span>
        </div>

        <div className='flex flex-col gap-2'>
          <h3
            id={`${project.slug}-title`}
            className='text-2xl font-medium tracking-tight text-foreground sm:text-[28px]'
          >
            {project.title}
          </h3>
          <p className={cn('text-pretty text-[15px] leading-relaxed', accentText[project.accent])}>
            {project.tagline}
          </p>
        </div>

        <p className='text-pretty text-[14px] leading-relaxed text-muted'>{project.body}</p>

        {extra}

        <dl
          className={cn(
            'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line',
            project.stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4',
          )}
        >
          {project.stats.map((s) => (
            <div key={s.label} className='flex flex-col gap-0.5 bg-black px-3 py-2.5'>
              <dt className='text-2xs leading-snug text-faint'>{s.label}</dt>
              <dd className='order-first text-lg font-medium tracking-tight text-foreground'>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className='flex flex-col gap-2 text-[13px] leading-relaxed text-muted'>
          {project.highlights.map((h) => (
            <li key={h} className='flex gap-2.5'>
              <span
                aria-hidden
                className={cn(
                  'mt-[0.55em] size-1 shrink-0 rounded-full',
                  accentBg[project.accent],
                )}
              />
              {h}
            </li>
          ))}
        </ul>

        <ul className='flex flex-wrap gap-1.5' aria-label='Built with'>
          {project.stack.map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-2 pt-1'>
          {project.live && (
            <ButtonLink href={project.live} variant='primary'>
              Open live app
            </ButtonLink>
          )}
          <ButtonLink href={project.source} variant='outline' arrow={false}>
            <LuGithub aria-hidden />
            Source
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  return (
    <section id='projects' aria-labelledby='projects-title' className='scroll-mt-16 pt-24 md:pt-32'>
      <SectionHeader
        index='01'
        eyebrow='Projects'
        title={<span id='projects-title'>Things I built because I wanted them to exist.</span>}
      >
        Designed, built and shipped on my own time, end to end: an AI retrieval
        system, a real-time graphics tool and a game mod. All open source, and
        two of them are live right now.
      </SectionHeader>

      <div className='flex flex-col gap-20 md:gap-28'>
        {featured.map((project, i) => (
          <Featured
            key={project.slug}
            project={project}
            index={i}
            extra={project.slug === 'godot-rag' ? <Pipeline /> : undefined}
          />
        ))}
      </div>

      <div className='mt-24 md:mt-32'>
        <h3 className='mb-4 text-[13px] font-medium text-muted'>More experiments</h3>
        <div className='grid gap-3 md:grid-cols-3'>
          {moreProjects.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              {...(p.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className='group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong'
            >
              {p.image && (
                <div className='relative aspect-[16/9] overflow-hidden border-b border-line bg-black'>
                  <Image
                    src={p.image}
                    alt=''
                    fill
                    sizes='(min-width: 768px) 33vw, 100vw'
                    className='object-cover object-top opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100'
                  />
                </div>
              )}
              <div className='flex flex-1 flex-col gap-2 p-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-[14px] font-medium text-foreground'>{p.title}</span>
                  <span className='text-2xs text-faint'>{p.year}</span>
                  <LuArrowUpRight
                    className='ml-auto size-3.5 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground'
                    aria-hidden
                  />
                </div>
                <p className='text-[13px] leading-relaxed text-muted'>{p.description}</p>
                <div className='mt-auto flex flex-wrap gap-1 pt-1'>
                  {p.tags.map((t) => (
                    <Badge key={t} className='text-3xs'>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              {p.external && <span className='sr-only'> (opens in a new tab)</span>}
            </Link>
          ))}
        </div>

        <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-line px-4 py-3 text-[13px]'>
          <span className='text-faint'>Design work</span>
          {designWork.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className='group flex items-center gap-1.5 text-muted transition-colors hover:text-foreground'
            >
              {p.title}
              <span className='text-2xs text-faint'>{p.kind}</span>
              <LuArrowRight
                className='size-3 text-faint transition group-hover:translate-x-0.5'
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
