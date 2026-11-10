import { ExternalLink, Section, Stack, delay } from './ui'
import { jobs, ledger, type Job } from '@/content/site'

export default function Work() {
  const [pollard, ...earlier] = jobs

  return (
    <Section
      id='work'
      index='01'
      label='Work'
      title={
        <>
          Work, <em className='mark'>measured.</em>
        </>
      }
    >
      <JobBlock job={pollard} index={1}>
        <Ledger />
      </JobBlock>
      {earlier.map((job, i) => (
        <JobBlock key={job.company} job={job} index={i + 2} />
      ))}
    </Section>
  )
}

function JobBlock({
  job,
  index,
  children,
}: {
  job: Job
  index: number
  children?: React.ReactNode
}) {
  return (
    <article className='grid gap-x-8 gap-y-8 pt-16 md:grid-cols-12 md:pt-24'>
      <div data-reveal className='md:col-span-3'>
        <div className='flex flex-col gap-2 md:sticky md:top-24'>
          <p className='label'>
            <span className='text-fg'>{String(index).padStart(2, '0')}</span>
            <span className='px-2' aria-hidden>
              /
            </span>
            {job.start} – {job.end}
          </p>
          <p className='text-sm text-muted'>{job.title}</p>
        </div>
      </div>

      <div className='md:col-span-9'>
        <h3 data-reveal className='display text-5xl sm:text-7xl'>
          <ExternalLink href={job.url} className='group inline-flex items-baseline gap-3'>
            <span className='fringe'>{job.company}</span>
            <span
              aria-hidden
              className='font-sans text-2xl text-muted transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 sm:text-3xl'
            >
              ↗
            </span>
          </ExternalLink>
        </h3>
        <p
          data-reveal
          style={delay(80)}
          className='mt-6 max-w-3xl text-pretty text-xl leading-snug sm:text-2xl'
        >
          {job.lead}
        </p>

        {children}

        <dl className='mt-14 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3'>
          {job.items.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              style={delay((i % 3) * 70)}
              className='border-t border-line py-5'
            >
              <dt className='flex items-baseline gap-3 font-medium'>
                <span className='label text-faint'>{String(i + 1).padStart(2, '0')}</span>
                {item.title}
              </dt>
              <dd className='mt-2 text-pretty text-sm leading-relaxed text-muted'>
                {item.body}
              </dd>
            </div>
          ))}
        </dl>

        <div data-reveal className='mt-2 border-t border-line pt-5'>
          <Stack items={job.stack} />
        </div>
      </div>
    </article>
  )
}

/** Before and after, drawn to scale: the hatched bar is where things started. */
function Ledger() {
  return (
    <div className='mt-14'>
      <div data-reveal className='flex items-center justify-between border-b border-line-strong pb-3'>
        <h4 className='label text-fg'>The ledger</h4>
        <p className='label flex items-center gap-4'>
          <span className='flex items-center gap-2'>
            <span aria-hidden className='hatch h-2.5 w-5 border border-line-strong' />
            Before
          </span>
          <span className='flex items-center gap-2'>
            <span aria-hidden className='h-2.5 w-5 bg-acid' />
            After
          </span>
        </p>
      </div>

      <ul>
        {ledger.map((row) => (
          <li
            key={row.label}
            data-reveal
            className='grid items-center gap-x-8 gap-y-4 border-b border-line py-6 md:grid-cols-9'
          >
            <div className='md:col-span-3'>
              <p className='font-medium'>{row.label}</p>
              <p className='mt-1 text-pretty text-sm text-muted'>{row.note}</p>
            </div>

            <div aria-hidden className='flex flex-col gap-1.5 md:col-span-3'>
              <div className='bar hatch h-3 w-full border border-line-strong' />
              <div className='relative h-3'>
                <div
                  className='bar absolute inset-y-0 left-0 bg-acid'
                  style={{
                    width: `max(3px, ${(row.ratio * 100).toFixed(1)}%)`,
                    transitionDelay: '0.45s',
                  }}
                />
              </div>
            </div>

            <p className='flex items-baseline gap-3 md:col-span-3 md:justify-end'>
              <span className='sr-only'>From</span>
              <span className='font-mono text-sm text-faint line-through decoration-1'>
                {row.before}
              </span>
              <span aria-hidden className='text-faint'>
                →
              </span>
              <span className='sr-only'>to</span>
              <span className='display whitespace-nowrap text-5xl sm:text-6xl'>
                <span className='mark'>{row.after}</span>
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
