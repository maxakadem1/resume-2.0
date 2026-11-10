'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { profile, sections } from '@/content/site'

type Theme = 'ink' | 'paper'

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'paper' ? 'paper' : 'ink'

function setTheme(theme: Theme) {
  if (theme === 'paper') document.documentElement.dataset.theme = 'paper'
  else delete document.documentElement.dataset.theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode: the choice just lasts for this page.
  }
}

const timeFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: profile.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function subscribeMinute(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000)
  return () => window.clearInterval(id)
}

/** Which home section is under the top of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const hero = document.getElementById('top')
    if (hero) observer.observe(hero)
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [enabled])

  return enabled ? active : null
}

export default function Nav() {
  const pathname = usePathname()
  const theme = useSyncExternalStore<Theme>(subscribeTheme, readTheme, () => 'ink')
  const time = useSyncExternalStore(
    subscribeMinute,
    () => timeFormat.format(new Date()),
    () => '',
  )
  const active = useActiveSection(pathname === '/')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const next: Theme = theme === 'ink' ? 'paper' : 'ink'

  return (
    <header className='no-print fixed inset-x-0 top-0 z-50'>
      <div
        className={
          'flex h-14 items-center gap-6 border-b px-5 transition-colors duration-300 sm:px-8 lg:px-12 ' +
          (scrolled || open
            ? 'border-line bg-bg/85 backdrop-blur-md'
            : 'border-transparent')
        }
      >
        <Link
          href='/'
          onClick={() => setOpen(false)}
          className='group flex items-baseline gap-3'
          aria-label={`${profile.name}, home`}
        >
          <span className='fringe font-serif text-2xl leading-none'>
            M<span className='italic'>A</span>
          </span>
          <span className='label hidden whitespace-nowrap lg:inline'>{profile.role}</span>
        </Link>

        <nav aria-label='Sections' className='ml-auto hidden md:block'>
          <ul className='flex items-center gap-7'>
            {sections.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`/#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={
                    'label group flex items-center gap-1.5 transition-colors hover:text-fg ' +
                    (active === id ? '!text-fg' : '')
                  }
                >
                  <span className='text-faint'>0{i + 1}</span>
                  <span className='fringe'>{label}</span>
                  <span
                    aria-hidden
                    className={
                      'size-1 rounded-full bg-acid transition-opacity ' +
                      (active === id ? 'opacity-100' : 'opacity-0')
                    }
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='ml-auto flex items-center gap-5 md:ml-0'>
          <span className='label hidden items-center gap-2 whitespace-nowrap xl:flex' suppressHydrationWarning>
            <span aria-hidden className='blink size-1.5 rounded-full bg-acid' />
            Winnipeg {time}
          </span>

          <button
            type='button'
            onClick={() => setTheme(next)}
            aria-label={`Switch to ${next} theme`}
            className='label group flex items-center gap-2 transition-colors hover:text-fg'
          >
            <span
              aria-hidden
              className='relative size-3.5 overflow-hidden rounded-full border border-fg'
            >
              <span
                className={
                  'absolute inset-y-0 left-0 w-1/2 bg-fg transition-transform duration-500 ease-out ' +
                  (theme === 'paper' ? 'translate-x-full' : '')
                }
              />
            </span>
            <span suppressHydrationWarning>{theme}</span>
          </button>

          <a href='/Resume.pdf' className='label hidden whitespace-nowrap transition-colors hover:text-fg sm:block'>
            <span className='fringe'>Résumé ↓</span>
          </a>

          <button
            type='button'
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls='menu'
            className='label !text-fg md:hidden'
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id='menu'
          aria-label='Sections'
          className='flex h-[calc(100dvh-3.5rem)] flex-col justify-between overflow-y-auto bg-bg px-5 pb-8 pt-6 md:hidden'
        >
          <ul>
            {sections.map(({ id, label }, i) => (
              <li key={id} className='border-b border-line'>
                <a
                  href={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className='flex items-baseline gap-4 py-4'
                >
                  <span className='label'>0{i + 1}</span>
                  <span className='display text-5xl'>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className='flex flex-wrap gap-3 pt-8'>
            <a href='/Resume.pdf' className='btn btn-solid'>
              Résumé ↓
            </a>
            <a href={`mailto:${profile.email}`} className='btn'>
              Email
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
