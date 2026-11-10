import { Section, delay } from './ui'
import { education, roles, skills, volunteering, type Entry } from '@/content/site'

export default function Record() {
  return (
    <Section
      id='record'
      index='03'
      label='Record'
      title={
        <>
          The <em className='mark'>record.</em>
        </>
      }
    >
      <div className='grid gap-x-8 gap-y-12 pt-16 md:grid-cols-3 md:pt-24'>
        <Column title='Experience' entries={roles} />
        <Column title='Education' entries={education} wait={80} />
        <Column title='Volunteering' entries={volunteering} wait={160} />
      </div>

      <div className='pt-16 md:pt-24'>
        <h3 data-reveal className='label border-b border-line-strong pb-3 text-fg'>
          Toolkit
        </h3>
        <dl>
          {skills.map((group) => (
            <div
              key={group.label}
              data-reveal
              className='grid gap-x-8 gap-y-2 border-b border-line py-5 md:grid-cols-12'
            >
              <dt className='label md:col-span-3 md:pt-2'>{group.label}</dt>
              <dd className='font-serif text-2xl leading-snug sm:text-3xl md:col-span-9'>
                {group.items.map((item, i) => (
                  <span key={item}>
                    {i > 0 && (
                      <span aria-hidden className='px-2.5 text-faint'>
                        /
                      </span>
                    )}
                    <span className='whitespace-nowrap'>{item}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

function Column({
  title,
  entries,
  wait = 0,
}: {
  title: string
  entries: Entry[]
  wait?: number
}) {
  return (
    <div data-reveal style={delay(wait)}>
      <h3 className='label border-b border-line-strong pb-3 text-fg'>{title}</h3>
      <ul>
        {entries.map((entry) => (
          <li key={entry.title} className='border-b border-line py-5'>
            <p className='label'>{entry.dates}</p>
            <p className='mt-2 font-serif text-3xl leading-none'>{entry.organization}</p>
            <p className='mt-2 text-sm text-muted'>
              {entry.title}
              <span className='px-1.5 text-faint' aria-hidden>
                ·
              </span>
              {entry.location}
            </p>
            {entry.note && (
              <p className='mt-3 text-pretty text-sm leading-relaxed text-muted'>
                {entry.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
