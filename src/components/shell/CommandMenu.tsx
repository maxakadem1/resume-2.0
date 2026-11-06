'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  LuArrowRight,
  LuArrowUpRight,
  LuCopy,
  LuCornerDownLeft,
  LuFileText,
  LuGithub,
  LuHash,
  LuLinkedin,
  LuSearch,
} from 'react-icons/lu'
import { useCopy } from './useCopy'
import { Dot, Kbd, cn } from '@/components/ui'
import { sections } from '@/content/nav'
import { profile } from '@/content/profile'
import { featured, galleryProjects, type Accent } from '@/content/projects'

interface Item {
  id: string
  group: string
  label: string
  hint?: string
  icon?: IconType
  accent?: Accent
  run: () => void | Promise<unknown>
  keepOpen?: boolean
}

interface Props {
  open: boolean
  onClose: () => void
  home: boolean
}

/** Mounted only while open, so every opening starts with a fresh query. */
export default function CommandMenu({ open, ...props }: Props) {
  return open ? <CommandDialog {...props} /> : null
}

function CommandDialog({ onClose, home }: Omit<Props, 'open'>) {
  const router = useRouter()
  const { copied, copy } = useCopy()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => {
      if (home) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      else router.push(`/#${id}`)
    }
    const visit = (href: string) => () => {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
    return [
      ...sections.map((s) => ({
        id: `section-${s.id}`,
        group: 'Go to',
        label: s.label,
        icon: LuHash,
        run: go(s.id),
      })),
      ...featured.map((p) => ({
        id: `project-${p.slug}`,
        group: 'Projects',
        label: p.title,
        hint: p.live ? 'Open live' : 'Source',
        accent: p.accent,
        run: visit(p.live ?? p.source),
      })),
      ...galleryProjects.map((p) => ({
        id: `gallery-${p.slug}`,
        group: 'Earlier work',
        label: p.title,
        hint: p.kind,
        icon: LuArrowRight,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      {
        id: 'copy-email',
        group: 'Contact',
        label: copied ? 'Copied to clipboard' : 'Copy email address',
        hint: profile.email,
        icon: LuCopy,
        run: () => copy(profile.email),
        keepOpen: true,
      },
      {
        id: 'resume',
        group: 'Contact',
        label: 'Resume',
        hint: 'PDF',
        icon: LuFileText,
        run: () => router.push('/resume'),
      },
      {
        id: 'github',
        group: 'Contact',
        label: 'GitHub',
        icon: LuGithub,
        run: visit(profile.links.github),
      },
      {
        id: 'linkedin',
        group: 'Contact',
        label: 'LinkedIn',
        icon: LuLinkedin,
        run: visit(profile.links.linkedin),
      },
    ]
  }, [home, router, copied, copy])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) =>
      `${i.label} ${i.group} ${i.hint ?? ''}`.toLowerCase().includes(q),
    )
  }, [items, query])

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus())
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const select = (item: Item | undefined) => {
    if (!item) return
    if (!item.keepOpen) onClose()
    void item.run()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(filtered[index])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Tab') {
      // Keep focus in the dialog; the list is driven by the arrow keys.
      e.preventDefault()
    }
  }

  let lastGroup = ''

  return (
    <div
      className='fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-3 pt-[12vh] backdrop-blur-[2px]'
      onMouseDown={onClose}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Command menu'
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className='pop-in flex max-h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c]/95 shadow-2xl shadow-black backdrop-blur-xl'
      >
        <div className='flex items-center gap-2.5 border-b border-line px-3.5'>
          <LuSearch className='size-4 text-faint' aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
            placeholder='Jump to a section, project or link…'
            className='h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-faint'
            role='combobox'
            aria-expanded='true'
            aria-controls='command-list'
            aria-activedescendant={filtered[index]?.id}
          />
          <Kbd>Esc</Kbd>
        </div>

        <div
          ref={listRef}
          id='command-list'
          role='listbox'
          className='overflow-y-auto p-1.5'
        >
          {filtered.length === 0 && (
            <p className='px-3 py-8 text-center text-[13px] text-faint'>
              Nothing matches “{query}”.
            </p>
          )}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup
            lastGroup = item.group
            const Icon = item.icon
            return (
              <div key={item.id}>
                {showGroup && (
                  <div className='px-2.5 pb-1 pt-2.5 text-2xs font-medium text-faint'>
                    {item.group}
                  </div>
                )}
                <div
                  id={item.id}
                  role='option'
                  aria-selected={i === index}
                  data-index={i}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => select(item)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-muted',
                    i === index && 'bg-white/[0.07] text-foreground',
                  )}
                >
                  <span className='grid size-4 place-items-center'>
                    {item.accent ? (
                      <Dot accent={item.accent} />
                    ) : (
                      Icon && <Icon className='size-3.5' aria-hidden />
                    )}
                  </span>
                  <span className='truncate'>{item.label}</span>
                  {item.hint && (
                    <span className='ml-auto truncate pl-3 text-2xs text-faint'>
                      {item.hint}
                    </span>
                  )}
                  {!item.hint && <span className='ml-auto' />}
                  {i === index &&
                    (item.group === 'Projects' ||
                    item.id === 'github' ||
                    item.id === 'linkedin' ? (
                      <LuArrowUpRight className='size-3.5 shrink-0 text-faint' aria-hidden />
                    ) : (
                      <LuCornerDownLeft className='size-3.5 shrink-0 text-faint' aria-hidden />
                    ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className='flex items-center gap-3 border-t border-line px-3.5 py-2 text-2xs text-faint'>
          <span className='flex items-center gap-1'>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            navigate
          </span>
          <span className='flex items-center gap-1'>
            <Kbd>↵</Kbd>
            open
          </span>
          <span className='ml-auto'>{filtered.length} results</span>
        </div>
      </div>
    </div>
  )
}
