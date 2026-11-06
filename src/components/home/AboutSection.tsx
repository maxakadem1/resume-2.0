import Image from 'next/image'
import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'
import { SectionHeader } from '@/components/ui'

const art = [1, 2, 3, 4, 5].map((n) => `/art/pic${n}.png`)

const facts = [
  { label: 'Based in', value: 'Winnipeg, Canada' },
  { label: 'From', value: 'Almaty, Kazakhstan' },
  { label: 'Trained in', value: 'Art and design, then CS' },
  { label: 'Off the clock', value: 'Blender, Procreate, modding' },
]

export default function AboutSection() {
  return (
    <section id='about' aria-labelledby='about-title' className='scroll-mt-16 pt-28 md:pt-36'>
      <SectionHeader
        index='04'
        eyebrow='About'
        title={<span id='about-title'>An engineer who started as an artist.</span>}
      />

      <div className='grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-16'>
        <div className='flex flex-col gap-4 text-pretty text-[15px] leading-relaxed text-muted'>
          <p>
            I studied art and design in Almaty before computer science in
            Winnipeg, and I still work where the two meet. At work that means
            caring how an interface <span className='text-foreground'>feels</span>,
            not only whether it ships. Off the clock it means Blender renders
            like the glass on this page, digital paintings, and tools like
            Visual Lab that turn images into something new.
          </p>
          <p>
            I like owning systems end to end: making the architecture call,
            building it, getting it to production, and leaving it easy for the
            next developer. Lately that means leading client launches and being
            the person about 15 developers come to when something is stuck.
          </p>
          <p>
            My side projects follow whatever I’m curious about. Right now
            that’s retrieval systems that show their work, real-time image
            processing on the GPU, and game design.
          </p>

          <dl className='mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line'>
            {facts.map((f) => (
              <div key={f.label} className='flex flex-col gap-0.5 bg-black px-4 py-3'>
                <dt className='text-2xs text-faint'>{f.label}</dt>
                <dd className='text-[13px] text-foreground'>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-4 gap-2'>
            {art.map((src, i) => (
              <Link
                key={src}
                href='/projects/artwork'
                aria-label={`Artwork ${i + 1}`}
                className={
                  'group relative overflow-hidden rounded-xl border border-line bg-surface ' +
                  (i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square')
                }
              >
                <Image
                  src={src}
                  alt=''
                  fill
                  sizes={i === 0 ? '(min-width: 1280px) 280px, 50vw' : '(min-width: 1280px) 140px, 25vw'}
                  className='object-cover transition duration-500 group-hover:scale-[1.04]'
                />
              </Link>
            ))}
          </div>
          <Link
            href='/projects/artwork'
            className='group flex w-fit items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-foreground'
          >
            More of my artwork
            <LuArrowRight className='size-3 transition group-hover:translate-x-0.5' aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
