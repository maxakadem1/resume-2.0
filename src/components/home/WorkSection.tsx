import { LuArrowUpRight } from 'react-icons/lu'
import GlassLogo from '@/components/three/GlassLogo'
import { Badge, SectionHeader, cn } from '@/components/ui'
import { jobs, type Job } from '@/content/work'

function JobHeader({ job }: { job: Job }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
        <h3 className='text-2xl font-medium tracking-tight text-foreground sm:text-[28px]'>
          <a
            href={job.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-2'
          >
            {job.company}
            <LuArrowUpRight className='size-4 text-faint transition-colors group-hover:text-foreground' aria-hidden />
            <span className='sr-only'> (opens in a new tab)</span>
          </a>
        </h3>
        <span className='text-2xs text-faint'>
          {job.start} – {job.end}
        </span>
      </div>
      <p className='text-[13px] text-muted'>{job.title}</p>
      <p className='text-pretty text-[15px] leading-relaxed text-sky'>{job.tagline}</p>
    </div>
  )
}

function JobDetails({ job }: { job: Job }) {
  return (
    <>
      {job.stats && (
        <dl className='grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line'>
          {job.stats.map((s) => (
            <div key={s.label} className='flex flex-col gap-0.5 bg-black px-3 py-2.5'>
              <dt className='text-2xs leading-snug text-faint'>{s.label}</dt>
              <dd className='order-first text-lg font-medium tracking-tight text-foreground'>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <ul className='flex flex-col gap-2 text-[13px] leading-relaxed text-muted'>
        {job.highlights.map((h) => (
          <li key={h} className='flex gap-2.5'>
            <span aria-hidden className='mt-[0.55em] size-1 shrink-0 rounded-full bg-sky' />
            {h}
          </li>
        ))}
      </ul>

      <ul className='flex flex-wrap gap-1.5' aria-label='Built with'>
        {job.stack.map((s) => (
          <li key={s}>
            <Badge>{s}</Badge>
          </li>
        ))}
      </ul>
    </>
  )
}

const columns = 'grid items-start gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-12'

export default function WorkSection() {
  return (
    <section id='work' aria-labelledby='work-title' className='scroll-mt-16 pt-24 md:pt-32'>
      <SectionHeader id='work-title' title='Work' />

      <div className='flex flex-col gap-16 md:gap-20'>
        {jobs.map((job, i) =>
          job.logo ? (
            // The glass logo beside everything else, alternating sides like the projects.
            <article key={job.company} className={columns}>
              <div
                className={cn(
                  'surface-dots relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-[#030303] xl:sticky xl:top-20',
                  i % 2 === 1 && 'xl:order-last',
                )}
              >
                <GlassLogo name={job.logo} />
              </div>
              <div className='flex min-w-0 flex-col gap-5'>
                <JobHeader job={job} />
                <JobDetails job={job} />
              </div>
            </article>
          ) : (
            // Without a logo, the header takes the media column.
            <article key={job.company} className={`${columns} border-t border-line pt-10`}>
              <JobHeader job={job} />
              <div className='flex min-w-0 flex-col gap-5'>
                <JobDetails job={job} />
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  )
}
