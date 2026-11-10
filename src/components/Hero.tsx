import EngravingCanvas from './EngravingCanvas'
import { heroFacts, profile, stack } from '@/content/site'

export default function Hero() {
  return (
    <section
      id='top'
      aria-label='Introduction'
      className='relative flex min-h-[100svh] flex-col overflow-hidden'
    >
      <EngravingCanvas className='absolute inset-0 size-full' />

      {/* The frame the form breaks out of. The shader centres on this box. */}
      <div
        data-engraving-stage
        aria-hidden
        className='fade-in pointer-events-none absolute left-1/2 top-[13svh] aspect-[4/5] w-[min(58vw,30svh)] -translate-x-1/2 border border-fg/40 md:left-auto md:right-[9vw] md:top-[12svh] md:w-[min(28vw,40svh)] md:translate-x-0'
        style={{ '--rise-delay': '500ms' } as React.CSSProperties}
      >
        <span className='label absolute -top-6 left-0 whitespace-nowrap bg-bg px-1.5'>
          <span className='text-fg'>Fig. 1</span>
          <span className='hidden md:inline'> — Armillary, drawn live in GLSL</span>
        </span>
      </div>

      <div className='relative mt-auto px-5 pb-6 pt-[52svh] sm:px-8 md:pt-28 lg:px-12'>
        <p
          className='label fade-in flex flex-wrap items-center gap-x-3 gap-y-1'
          style={{ '--rise-delay': '300ms' } as React.CSSProperties}
        >
          <span aria-hidden className='blink size-1.5 rounded-full bg-acid' />
          <span className='text-fg'>{profile.role}</span>
          <span aria-hidden>/</span>
          <span>{profile.currently}</span>
          <span aria-hidden className='hidden sm:inline'>/</span>
          <span className='hidden sm:inline'>{profile.location}</span>
        </p>

        {/* The knockout stroke keeps the name legible where the drawing passes behind it. */}
        <h1 className='display knockout mt-4 [font-size:clamp(3.2rem,17.4vw,29svh)]'>
          <span className='rise'>
            <span>{profile.first}</span>
          </span>
          <span className='rise -mt-[0.04em]'>
            <span style={{ '--rise-delay': '120ms' } as React.CSSProperties}>
              {profile.last}
            </span>
          </span>
        </h1>

        <div
          className='fade-in mt-6 grid gap-8 md:grid-cols-12 md:items-end'
          style={{ '--rise-delay': '700ms' } as React.CSSProperties}
        >
          <p className='max-w-xl text-pretty text-[17px] leading-relaxed md:col-span-6 lg:text-lg'>
            I build the shared platform behind lottery products played by{' '}
            <span className='mark'>millions of people</span>, and lead the
            launches that ship it. Art school first, computer science second:
            I care how software feels, not only whether it works.
          </p>
          <div className='flex flex-wrap gap-3 md:col-span-6 md:justify-end'>
            <a href='#work' className='btn btn-solid'>
              See the work <span aria-hidden>↓</span>
            </a>
            <a href='/Resume.pdf' className='btn'>
              Résumé <span className='text-[10px] opacity-60'>PDF</span>
            </a>
          </div>
        </div>

        <dl
          className='fade-in mt-8 grid grid-cols-2 border-t border-line-strong md:grid-cols-4'
          style={{ '--rise-delay': '900ms' } as React.CSSProperties}
        >
          {heroFacts.map((fact, i) => (
            <div
              key={fact.label}
              className={
                'flex flex-col-reverse gap-1 border-line py-4 pr-4 md:border-l md:pl-5 md:first:border-l-0 md:first:pl-0 ' +
                (i % 2 ? 'border-l pl-4 ' : '') +
                (i < 2 ? 'border-b md:border-b-0' : '')
              }
            >
              <dt className='label normal-case tracking-normal'>{fact.label}</dt>
              <dd className='display text-4xl sm:text-5xl'>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Marquee />
    </section>
  )
}

function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className='flex shrink-0 items-center'>
      {stack.map((item) => (
        <li key={item} className='flex items-center'>
          <span className='px-6 font-serif text-2xl italic'>{item}</span>
          <span aria-hidden className='size-1.5 rotate-45 bg-acid' />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      aria-label='Stack'
      className='marquee-wrap relative overflow-hidden border-y border-line-strong py-3'
    >
      <div className='marquee flex w-max'>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
