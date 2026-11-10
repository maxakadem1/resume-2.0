'use client'

import { useEffect, useState } from 'react'
import { ExternalLink } from './ui'
import { profile } from '@/content/site'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      id='contact'
      aria-labelledby='contact-title'
      className='mx-auto w-full max-w-page scroll-mt-14 px-5 pt-28 sm:px-8 md:pt-44 lg:px-12'
    >
      <div className='border-t border-line-strong pt-5'>
        <p data-reveal className='label'>
          <span className='text-fg'>§ 05</span>
          <span className='px-2' aria-hidden>
            —
          </span>
          Contact
        </p>

        <h2
          id='contact-title'
          data-reveal
          className='display mt-10 text-balance [font-size:clamp(3.6rem,13vw,13rem)]'
        >
          Let’s build <em className='mark'>something.</em>
        </h2>

        <div className='mt-14 grid gap-x-8 gap-y-10 md:grid-cols-12 md:items-end'>
          <div data-reveal className='md:col-span-8'>
            <p className='max-w-md text-pretty text-lg text-muted'>
              Open to frontend and platform roles. Email is the fastest way to
              reach me.
            </p>
            <button
              type='button'
              onClick={copy}
              className='group mt-6 flex w-full max-w-full flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line-strong pb-3 text-left transition-colors hover:border-fg'
            >
              <span className='fringe break-all font-serif leading-none [font-size:clamp(1.5rem,4.6vw,4rem)]'>
                {profile.email}
              </span>
              <span className='label ml-auto' aria-live='polite'>
                {copied ? <span className='mark'>Copied ✓</span> : 'Click to copy'}
              </span>
            </button>
          </div>

          <ul data-reveal className='flex flex-wrap gap-3 md:col-span-4 md:justify-end'>
            <li>
              <ExternalLink href={profile.links.linkedin} className='btn'>
                LinkedIn <span aria-hidden>↗</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.github} className='btn'>
                GitHub <span aria-hidden>↗</span>
              </ExternalLink>
            </li>
            <li>
              <a href='/Resume.pdf' className='btn btn-solid'>
                Résumé <span aria-hidden>↓</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
