'use client'

import { LuCheck, LuCopy, LuGithub, LuLinkedin } from 'react-icons/lu'
import RenderVideo from './RenderVideo'
import { useCopy } from '@/components/shell/useCopy'
import { ButtonLink } from '@/components/ui'
import { profile, renders } from '@/content/profile'

export default function ContactSection() {
  const { copied, copy } = useCopy()

  return (
    <section id='contact' aria-labelledby='contact-title' className='scroll-mt-16 pt-24 md:pt-32'>
      <div className='surface-dots relative overflow-hidden rounded-2xl border border-line bg-[#030303]'>
        <div
          aria-hidden
          className='pointer-events-none absolute -left-24 top-1/2 size-[520px] -translate-y-1/2 rounded-full bg-sky/[0.08] blur-[110px]'
        />
        <div className='relative grid items-center md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]'>
          <div className='flex flex-col gap-5 p-6 sm:p-10 lg:p-14'>
            <h2
              id='contact-title'
              className='text-balance text-3xl font-medium tracking-tight text-foreground sm:text-5xl'
            >
              Let’s build something.
            </h2>
            <p className='max-w-md text-pretty text-[15px] leading-relaxed text-muted'>
              Open to frontend and platform roles. Email is the fastest way to
              reach me.
            </p>

            <button
              type='button'
              onClick={() => copy(profile.email)}
              className='group flex w-full max-w-md items-center gap-3 rounded-xl border border-white/[0.11] bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.06]'
            >
              <span className='min-w-0 flex-1 truncate font-mono text-[13px] text-foreground sm:text-sm'>
                {profile.email}
              </span>
              <span className='flex items-center gap-1.5 text-2xs text-muted group-hover:text-foreground'>
                {copied ? (
                  <>
                    <LuCheck className='size-3.5 text-mint' aria-hidden />
                    Copied
                  </>
                ) : (
                  <>
                    <LuCopy className='size-3.5' aria-hidden />
                    Copy
                  </>
                )}
              </span>
            </button>

            <div className='flex flex-wrap gap-2'>
              <ButtonLink href={profile.links.linkedin} variant='outline' arrow={false}>
                <LuLinkedin aria-hidden />
                LinkedIn
              </ButtonLink>
              <ButtonLink href={profile.links.github} variant='outline' arrow={false}>
                <LuGithub aria-hidden />
                GitHub
              </ButtonLink>
            </div>
          </div>

          <div className='relative hidden aspect-square md:block'>
            <RenderVideo
              lazy
              source={renders.rings}
              className='render-mask absolute inset-0 size-full object-cover'
            />
          </div>
        </div>
      </div>

      <footer className='flex flex-col gap-2 py-10 text-2xs text-faint sm:flex-row sm:items-center sm:justify-between'>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a
          href={profile.links.source}
          target='_blank'
          rel='noopener noreferrer'
          className='w-fit hover:text-muted'
        >
          View source
          <span className='sr-only'> (opens in a new tab)</span>
        </a>
      </footer>
    </section>
  )
}
