'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import CommandMenu from './CommandMenu'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { sections, type SectionId } from '@/content/nav'

const CommandContext = createContext<() => void>(() => {})

/** Opens the command menu from anywhere inside the shell. */
export const useOpenCommand = () => useContext(CommandContext)

/** Tracks which home section is on screen, for the sidebar and breadcrumb. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId>('overview')

  useEffect(() => {
    if (!enabled) return
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)

    const onScroll = () => {
      // The last section whose top has passed a line a third of the way down.
      const line = window.innerHeight * 0.33
      let current: SectionId = 'overview'
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id as SectionId
      }
      // The contact section is short; select it once the page bottoms out.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4)
        current = 'contact'
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])

  return active
}

export default function Shell({
  children,
  home = false,
  crumb,
}: {
  children: ReactNode
  /** On the home page sections are scrolled to in place, elsewhere linked. */
  home?: boolean
  crumb?: string
}) {
  const [commandOpen, setCommandOpen] = useState(false)
  const active = useActiveSection(home)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const label = crumb ?? sections.find((s) => s.id === active)?.label

  return (
    <CommandContext.Provider value={() => setCommandOpen(true)}>
      <div className='flex min-h-dvh'>
        <Sidebar
          home={home}
          active={home ? active : undefined}
          onOpenCommand={() => setCommandOpen(true)}
        />
        <div className='flex min-w-0 flex-1 flex-col'>
          <TopBar
            crumb={label}
            onOpenCommand={() => setCommandOpen(true)}
          />
          {children}
        </div>
      </div>
      <CommandMenu
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        home={home}
      />
    </CommandContext.Provider>
  )
}
