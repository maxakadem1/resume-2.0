import Image from 'next/image'
import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'
import { SectionHeader } from '@/components/ui'

const art = [1, 2, 3, 4, 5].map((n) => `/art/pic${n}.png`)

export default function AboutSection() {
  return (
    <section id='about' aria-labelledby='about-title' className='scroll-mt-16 pt-24 md:pt-32'>
      <SectionHeader id='about-title' title='About' />

      <div className='grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-16'>
        <div className='flex flex-col gap-4 text-pretty text-[15px] leading-relaxed text-muted'>
          <p>
            I studied art and design in Almaty, Kazakhstan, before computer
            science in Winnipeg, and I still work where the two meet: I care how
            an interface <span className='text-foreground'>feels</span>, not
            only whether it ships.
          </p>
          <p>
            I like taking a system from the architecture call to production and
            leaving it easy for the next developer. Off the clock I model in
            Blender (the glass on this page is mine) and paint in Procreate.
          </p>
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
