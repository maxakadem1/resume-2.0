import Image from 'next/image'
import Archive from './Archive'
import { ExternalLink, Section, Stack, delay } from './ui'
import { archive, featured, type Featured } from '@/content/site'

const numerals = ['I', 'II', 'III', 'IV']

export default function Projects() {
  return (
    <Section
      id='projects'
      index='02'
      label='Projects'
      title={
        <>
          Built on my <em className='mark'>own time.</em>
        </>
      }
    >
      {featured.map((project, i) => (
        <FeaturedProject key={project.title} project={project} index={i} />
      ))}

      <div className='pt-24 md:pt-32'>
        <div data-reveal className='flex items-baseline justify-between border-b border-line-strong pb-3'>
          <h3 className='label text-fg'>Archive</h3>
          <p className='label'>Smaller builds, design, illustration</p>
        </div>
        <Archive rows={archive} />
      </div>
    </Section>
  )
}

function FeaturedProject({ project, index }: { project: Featured; index: number }) {
  const flip = index % 2 === 1

  return (
    <article className='grid items-start gap-x-8 gap-y-8 pt-16 md:pt-24 lg:grid-cols-12'>
      <figure
        data-reveal
        className={'lg:col-span-7 ' + (flip ? 'lg:order-2' : '')}
      >
        <ExternalLink href={project.live} className='group block'>
          <div className='plate'>
            <div className='overflow-hidden'>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={1600}
                height={1000}
                sizes='(min-width: 1024px) 58vw, 100vw'
                className='h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]'
              />
            </div>
          </div>
        </ExternalLink>
        <figcaption className='label mt-3 flex justify-between gap-4'>
          <span>
            <span className='text-fg'>Pl. {numerals[index]}</span>
            <span className='px-2' aria-hidden>
              —
            </span>
            {project.title}
          </span>
          <span className='hidden sm:inline'>Open the live build ↗</span>
        </figcaption>
      </figure>

      <div className={'lg:col-span-5 ' + (flip ? 'lg:order-1' : '')}>
        <h3 data-reveal className='display text-5xl sm:text-7xl'>
          {project.title}
        </h3>
        <p data-reveal style={delay(80)} className='mt-5 text-pretty text-xl leading-snug'>
          {project.tagline}
        </p>

        <dl data-reveal style={delay(140)} className='mt-8 grid grid-cols-3 border-y border-line-strong'>
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className='flex flex-col-reverse gap-1 border-l border-line py-4 pl-4 first:border-l-0 first:pl-0'
            >
              <dt className='label normal-case tracking-normal'>{stat.label}</dt>
              <dd className='display text-4xl sm:text-5xl'>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <ul data-reveal style={delay(200)} className='mt-2'>
          {project.points.map((point) => (
            <li
              key={point}
              className='flex gap-4 border-b border-line py-4 text-pretty text-sm leading-relaxed text-muted'
            >
              <span aria-hidden className='mt-2 size-1.5 shrink-0 rotate-45 bg-acid' />
              {point}
            </li>
          ))}
        </ul>

        <div data-reveal style={delay(260)} className='mt-5 flex flex-col gap-6'>
          <Stack items={project.stack} />
          <div className='flex flex-wrap gap-3'>
            <ExternalLink href={project.live} className='btn btn-solid'>
              Live <span aria-hidden>↗</span>
            </ExternalLink>
            <ExternalLink href={project.source} className='btn'>
              Source <span aria-hidden>↗</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </article>
  )
}
