import { LuArrowUpRight } from 'react-icons/lu'
import { Badge, Dot, SectionHeader } from '@/components/ui'
import { caseStudies, pollard, type Metric } from '@/content/work'

function MetricValue({ metric, large }: { metric: Metric; large?: boolean }) {
  return (
    <div className='flex flex-col gap-1'>
      <div
        className={
          large
            ? 'flex flex-wrap items-baseline gap-x-2.5 text-[34px] font-medium leading-none tracking-[-0.03em] text-foreground sm:text-[40px]'
            : 'flex flex-wrap items-baseline gap-x-2 text-lg font-medium tracking-tight text-foreground'
        }
      >
        {metric.before && (
          <>
            <span className={large ? 'text-xl text-faint line-through decoration-faint/50 sm:text-2xl' : 'text-sm text-faint line-through decoration-faint/50'}>
              {metric.before}
            </span>
            <span className='sr-only'> to </span>
          </>
        )}
        {metric.value}
      </div>
      <div className='text-2xs text-faint'>{metric.label}</div>
    </div>
  )
}

export default function PollardSection() {
  return (
    <section id='pollard' aria-labelledby='pollard-title' className='scroll-mt-16 pt-28 md:pt-36'>
      <SectionHeader
        index='02'
        eyebrow='Day job'
        title={
          <span id='pollard-title'>
            The platform behind lottery apps played by millions.
          </span>
        }
      >
        {pollard.intro}
      </SectionHeader>

      <div className='mb-4 flex flex-wrap items-center gap-2 text-[13px]'>
        <a
          href={pollard.companyUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex items-center gap-1.5 font-medium text-foreground'
        >
          {pollard.company}
          <LuArrowUpRight className='size-3 text-faint group-hover:text-foreground' aria-hidden />
          <span className='sr-only'> (opens in a new tab)</span>
        </a>
        <span className='text-faint'>·</span>
        <span className='text-muted'>
          {pollard.title}, {pollard.team}
        </span>
        <Badge className='ml-auto'>
          <Dot accent='mint' />
          {pollard.start} – {pollard.end}
        </Badge>
      </div>

      <div className='grid gap-3 md:grid-cols-2'>
        {caseStudies.map((study) => (
          <article
            key={study.slug}
            id={study.slug}
            className='group flex scroll-mt-20 flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6'
          >
            <div className='flex items-center justify-between gap-3'>
              <h3 className='text-[15px] font-medium text-foreground'>{study.title}</h3>
              <ul className='hidden flex-wrap justify-end gap-1 sm:flex' aria-label='Stack'>
                {study.stack.slice(0, 3).map((s) => (
                  <li key={s}>
                    <Badge className='text-3xs'>{s}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <p className='mt-1 text-[13px] text-muted'>{study.summary}</p>

            <div className='mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-line pb-6'>
              <MetricValue metric={study.metric} large />
              {study.secondary && <MetricValue metric={study.secondary} />}
            </div>

            <dl className='mt-5 grid gap-3 text-[13px] leading-relaxed'>
              {(
                [
                  ['Problem', study.problem],
                  ['What I did', study.approach],
                  ['Result', study.result],
                ] as const
              ).map(([label, body]) => (
                <div key={label} className='grid gap-0.5 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-3'>
                  <dt className='text-faint'>{label}</dt>
                  <dd className={label === 'Result' ? 'text-foreground' : 'text-muted'}>{body}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className='mt-3 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4'>
        {pollard.alsoBuilt.map((item) => (
          <div key={item.title} className='flex flex-col gap-1 bg-black p-4'>
            <h3 className='font-mono text-2xs text-mint'>{item.title}</h3>
            <p className='text-[13px] leading-relaxed text-muted'>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
