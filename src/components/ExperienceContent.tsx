import Panel, { type PanelProps } from '@/components/Panel'
import { InlineLink } from '@/components/links'
import {
  education,
  roles,
  skills,
  volunteering,
  type Credential,
} from '@/content/experience'

const bulletClass =
  "relative pl-4 before:absolute before:left-0 before:text-gray-600 before:content-['–']"

function Dates({ start, end }: { start: string; end: string }) {
  return (
    <span className='text-gray-500 text-sm whitespace-nowrap'>
      {start} – {end}
    </span>
  )
}

function CredentialList({
  title,
  items,
}: {
  title: string
  items: Credential[]
}) {
  return (
    <section>
      <h3 className='text-gray-300 text-lg pb-3'>{title}</h3>
      <ul className='flex flex-col gap-4'>
        {items.map((item) => (
          <li key={item.title}>
            <div className='flex flex-wrap items-baseline gap-x-2 text-gray-300'>
              {item.title}
              <Dates start={item.start} end={item.end} />
            </div>
            <div className='text-gray-500 italic'>
              {item.organization}, {item.location}
            </div>
            {item.details && (
              <p className='text-gray-300 pt-1'>{item.details}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ExperienceContent({ style, onBack }: PanelProps) {
  return (
    <Panel
      title='Experience'
      style={style}
      onBack={onBack}
      bodyClassName='flex flex-col gap-16 py-4'
    >
      <ol className='flex flex-col gap-16'>
        {roles.map((role) => (
          <li key={`${role.company}-${role.start}`}>
            <article>
              <header className='pb-2'>
                <div className='flex flex-wrap items-baseline gap-x-2'>
                  <h3 className='text-gray-300 text-lg'>{role.title}</h3>
                  <Dates start={role.start} end={role.end} />
                </div>
                <InlineLink
                  href={role.companyUrl}
                  className='text-gray-500 italic hover:text-white w-fit'
                >
                  {role.company}, {role.location}
                </InlineLink>
              </header>
              <ul className='flex flex-col gap-3 text-gray-300'>
                {role.bullets.map((bullet) => (
                  <li key={bullet} className={bulletClass}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <section>
        <h3 className='text-gray-300 text-lg pb-3'>Technical Skills</h3>
        <dl className='flex flex-col gap-3'>
          {skills.map((group) => (
            <div key={group.label}>
              <dt className='text-gray-500'>{group.label}</dt>
              <dd className='text-gray-300'>{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CredentialList title='Education' items={education} />
      <CredentialList title='Volunteering' items={volunteering} />
    </Panel>
  )
}
