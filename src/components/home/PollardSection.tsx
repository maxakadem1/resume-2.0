import { LuArrowUpRight } from 'react-icons/lu'
import GlassLogo from '@/components/three/GlassLogo'
import { Badge, SectionHeader } from '@/components/ui'
import { pollard } from '@/content/work'

export default function PollardSection() {
  return (
    <section id='pollard' aria-labelledby='pollard-title' className='scroll-mt-16 pt-24 md:pt-32'>
      <SectionHeader id='pollard-title' title='Work' />

      <article className='grid items-start gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-12'>
        <div className='surface-dots relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-[#030303] xl:sticky xl:top-20'>
          <GlassLogo name='pollard' />
        </div>

        <div className='flex min-w-0 flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
              <h3 className='text-2xl font-medium tracking-tight text-foreground sm:text-[28px]'>
                <a
                  href={pollard.companyUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center gap-2'
                >
                  {pollard.company}
                  <LuArrowUpRight className='size-4 text-faint transition-colors group-hover:text-foreground' aria-hidden />
                  <span className='sr-only'> (opens in a new tab)</span>
                </a>
              </h3>
              <span className='text-2xs text-faint'>
                {pollard.start} – {pollard.end}
              </span>
            </div>
            <p className='text-[13px] text-muted'>{pollard.title}</p>
            <p className='text-pretty text-[15px] leading-relaxed text-sky'>{pollard.tagline}</p>
          </div>

          <dl className='grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line'>
            {pollard.stats.map((s) => (
              <div key={s.label} className='flex flex-col gap-0.5 bg-black px-3 py-2.5'>
                <dt className='text-2xs leading-snug text-faint'>{s.label}</dt>
                <dd className='order-first text-lg font-medium tracking-tight text-foreground'>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className='flex flex-col gap-2 text-[13px] leading-relaxed text-muted'>
            {pollard.highlights.map((h) => (
              <li key={h} className='flex gap-2.5'>
                <span aria-hidden className='mt-[0.55em] size-1 shrink-0 rounded-full bg-sky' />
                {h}
              </li>
            ))}
          </ul>

          <ul className='flex flex-wrap gap-1.5' aria-label='Built with'>
            {pollard.stack.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  )
}
