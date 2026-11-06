'use client'

import Link from 'next/link'
import {
  LuBriefcase,
  LuCheck,
  LuFileText,
  LuFolderGit2,
  LuGithub,
  LuGraduationCap,
  LuHome,
  LuLinkedin,
  LuMail,
  LuSearch,
  LuUser,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'
import LogoMark from './LogoMark'
import { useCopy } from './useCopy'
import { Dot, Kbd, cn } from '@/components/ui'
import { sections, type SectionId } from '@/content/nav'
import { profile } from '@/content/profile'
import { featured } from '@/content/projects'

const icons: Record<SectionId, IconType> = {
  overview: LuHome,
  projects: LuFolderGit2,
  work: LuBriefcase,
  experience: LuGraduationCap,
  about: LuUser,
  contact: LuMail,
}

const row =
  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] text-muted transition-colors hover:bg-hover hover:text-foreground [&_svg]:size-3.5 [&_svg]:shrink-0'

export default function Sidebar({
  home,
  active,
  onOpenCommand,
}: {
  home: boolean
  active?: SectionId
  onOpenCommand: () => void
}) {
  const { copied, copy } = useCopy()
  const href = (id: string) => (home ? `#${id}` : `/#${id}`)

  return (
    <aside className='sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line lg:flex'>
      <Link
        href='/'
        className='flex h-13 shrink-0 items-center gap-2.5 px-4'
        aria-label={`${profile.name}, home`}
      >
        <LogoMark />
        <span className='truncate text-[13px] font-medium tracking-tight'>
          {profile.name}
        </span>
      </Link>

      <div className='px-2'>
        <button
          type='button'
          onClick={onOpenCommand}
          className='flex h-8 w-full items-center gap-2 rounded-lg border border-white/[0.11] bg-white/[0.03] px-2.5 text-[13px] text-faint shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] transition-colors hover:bg-white/[0.06] hover:text-muted'
        >
          <LuSearch className='size-3.5' aria-hidden />
          Search
          <span className='ml-auto flex gap-0.5'>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      </div>

      <nav aria-label='Sections' className='mt-4 flex flex-col gap-px px-2'>
        {sections.map(({ id, label }) => {
          const Icon = icons[id]
          const current = active === id
          return (
            <a
              key={id}
              href={href(id)}
              aria-current={current ? 'location' : undefined}
              className={cn(row, current && 'bg-hover text-foreground')}
            >
              <Icon aria-hidden />
              {label}
            </a>
          )
        })}
      </nav>

      <div className='mt-6 px-4 pb-1.5 text-2xs font-medium uppercase tracking-wider text-faint'>
        Projects
      </div>
      <div className='flex flex-col gap-px px-2'>
        {featured.map((p) => (
          <a key={p.slug} href={href(p.slug)} className={row}>
            <Dot accent={p.accent} />
            <span className='truncate'>{p.title}</span>
          </a>
        ))}
      </div>

      <div className='mt-auto flex flex-col gap-px border-t border-line p-2'>
        <Link href='/resume' className={row}>
          <LuFileText aria-hidden />
          Resume
        </Link>
        <a
          href={profile.links.github}
          target='_blank'
          rel='noopener noreferrer'
          className={row}
        >
          <LuGithub aria-hidden />
          GitHub
        </a>
        <a
          href={profile.links.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className={row}
        >
          <LuLinkedin aria-hidden />
          LinkedIn
        </a>
        <button
          type='button'
          onClick={() => copy(profile.email)}
          className={row}
        >
          {copied ? (
            <LuCheck className='text-mint' aria-hidden />
          ) : (
            <LuMail aria-hidden />
          )}
          <span className='truncate'>
            {copied ? 'Email copied' : 'Copy email'}
          </span>
        </button>
      </div>
    </aside>
  )
}
