import { LuArrowUpRight, LuDownload } from 'react-icons/lu'
import { Badge, ButtonLink, SectionHeader, cn } from '@/components/ui'
import { education, roles, skills, type Entry } from '@/content/experience'

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className='relative flex flex-col'>
      {entries.map((entry, i) => (
        <li
          key={`${entry.organization}-${entry.start}`}
          className='relative grid gap-1 pb-8 pl-6 last:pb-0 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 sm:pl-0'
        >
          <div className='flex items-start gap-3 font-mono text-2xs tabular-nums text-faint sm:justify-end sm:pt-[3px] sm:text-right'>
            {entry.start} – {entry.end}
          </div>

          {/* Rail and node */}
          <span
            aria-hidden
            className={cn(
              'absolute left-[3px] top-1.5 h-full w-px bg-line sm:left-[147px]',
              i === entries.length - 1 && 'hidden',
            )}
          />
          <span
            aria-hidden
            className={cn(
              'absolute left-0 top-[5px] size-[7px] rounded-full border sm:left-[144px]',
              entry.end === 'Present'
                ? 'border-mint bg-mint/40'
                : 'border-line-strong bg-black',
            )}
          />

          <div className='flex flex-col gap-1.5 sm:pl-6'>
            <div className='flex flex-wrap items-baseline gap-x-2'>
              <h3 className='text-[14px] font-medium text-foreground'>{entry.title}</h3>
            </div>
            <div className='text-[13px] text-muted'>
              {entry.url ? (
                <a
                  href={entry.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center gap-1 hover:text-foreground'
                >
                  {entry.organization}
                  <LuArrowUpRight className='size-3 text-faint group-hover:text-foreground' aria-hidden />
                  <span className='sr-only'> (opens in a new tab)</span>
                </a>
              ) : (
                entry.organization
              )}
              <span className='text-faint'> · {entry.location}</span>
            </div>
            {entry.bullets && (
              <ul className='mt-1.5 flex flex-col gap-1.5 text-[13px] leading-relaxed text-muted'>
                {entry.bullets.map((b) => (
                  <li key={b} className="relative pl-3.5 before:absolute before:left-0 before:text-faint before:content-['–']">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function ExperienceSection() {
  return (
    <section id='experience' aria-labelledby='experience-title' className='scroll-mt-16 pt-28 md:pt-36'>
      <SectionHeader
        index='03'
        eyebrow='Experience'
        title={<span id='experience-title'>Where I’ve worked and studied.</span>}
      />

      <div className='grid gap-12 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:gap-16'>
        <div className='flex flex-col gap-12'>
          <Timeline entries={roles} />
          <div>
            <h3 className='mb-5 text-2xs font-medium uppercase tracking-wider text-faint'>
              Education
            </h3>
            <Timeline entries={education} />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='rounded-2xl border border-line bg-surface p-5'>
            <h3 className='mb-4 text-2xs font-medium uppercase tracking-wider text-faint'>
              Toolbox
            </h3>
            <dl className='flex flex-col gap-4'>
              {skills.map((group) => (
                <div key={group.label} className='flex flex-col gap-2'>
                  <dt className='text-[12px] text-muted'>{group.label}</dt>
                  <dd className='flex flex-wrap gap-1'>
                    {group.items.map((item) => (
                      <Badge key={item} className='text-foreground/80'>
                        {item}
                      </Badge>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className='flex flex-wrap gap-2'>
            <ButtonLink href='/resume' variant='outline' arrow={false}>
              View resume
            </ButtonLink>
            <a href='/Resume.pdf' download className='inline-flex h-8 items-center gap-2 rounded-lg px-3 text-[13px] font-medium text-muted transition-colors hover:bg-hover hover:text-foreground'>
              <LuDownload className='size-3.5' aria-hidden />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
