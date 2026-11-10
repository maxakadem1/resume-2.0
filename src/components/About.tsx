import Image from 'next/image'
import Link from 'next/link'
import GlassLoop from './GlassLoop'
import { Section, delay } from './ui'
import { getGalleryProject } from '@/content/site'

const numerals = ['I', 'II', 'III', 'IV', 'V']

export default function About() {
  const art = getGalleryProject('artwork')?.images ?? []

  return (
    <Section
      id='about'
      index='04'
      label='About'
      title={
        <>
          Art school <em className='mark'>first.</em>
        </>
      }
    >
      <div className='grid gap-x-8 gap-y-10 pt-16 md:grid-cols-12 md:pt-24'>
        <figure data-reveal className='md:col-span-4 lg:col-span-3'>
          <div className='plate group aspect-square bg-black'>
            <GlassLoop className='absolute inset-0 size-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0' />
          </div>
          <figcaption className='label mt-3'>
            <span className='text-fg'>Fig. 2</span>
            <span className='px-2' aria-hidden>
              —
            </span>
            Glass study, Blender
          </figcaption>
        </figure>

        <div className='md:col-span-8 lg:col-span-9'>
          <p
            data-reveal
            className='text-balance font-serif leading-[1.08] [font-size:clamp(1.9rem,4vw,3.6rem)]'
          >
            I studied art and design in Almaty before computer science in
            Winnipeg, and I still work where the two meet. I care how an
            interface <em className='mark'>feels</em>, not only whether it
            ships.
          </p>
          <div
            data-reveal
            style={delay(100)}
            className='mt-10 grid gap-x-8 gap-y-4 text-pretty leading-relaxed text-muted sm:grid-cols-2'
          >
            <p>
              I like taking a system from the architecture call to production,
              and leaving it easy for the next developer. Most of my best work
              is the unglamorous kind: build tooling, shared packages, the
              environment that turns a day of QA into ten minutes.
            </p>
            <p>
              Off the clock I model in Blender and draw in Procreate. The plates
              below are mine, and so is the drawing at the top of this page: the
              same white line and acid yellow, redrawn every frame by a fragment
              shader.
            </p>
          </div>
        </div>
      </div>

      <div className='pt-16 md:pt-24'>
        <div data-reveal className='flex items-baseline justify-between border-b border-line-strong pb-3'>
          <h3 className='label text-fg'>Plates</h3>
          <Link href='/projects/artwork' className='label transition-colors hover:text-fg'>
            <span className='fringe'>All artwork →</span>
          </Link>
        </div>
        <ul className='-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-6 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0'>
          {art.map((src, i) => (
            <li
              key={src}
              data-reveal
              style={delay(i * 70)}
              className='w-[68vw] shrink-0 snap-center sm:w-[40vw] lg:w-auto'
            >
              <Link href='/projects/artwork' className='group block'>
                <div className='plate aspect-square'>
                  <div className='absolute inset-0 overflow-hidden'>
                    <Image
                      src={src}
                      alt={`Ink drawing, plate ${numerals[i]}`}
                      fill
                      sizes='(min-width: 1024px) 20vw, 68vw'
                      className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]'
                    />
                  </div>
                </div>
                <p className='label mt-3'>
                  <span className='text-fg'>Pl. {numerals[i]}</span>
                  <span className='px-2' aria-hidden>
                    —
                  </span>
                  Procreate
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
