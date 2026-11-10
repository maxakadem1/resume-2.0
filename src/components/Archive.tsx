'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ArchiveRow } from '@/content/site'

/**
 * An index of smaller work. With a mouse, the row under the cursor shows its
 * image floating beside the pointer; on touch screens each row carries a
 * thumbnail instead.
 */
export default function Archive({ rows }: { rows: ArchiveRow[] }) {
  const [active, setActive] = useState<number | null>(null)
  const preview = useRef<HTMLDivElement>(null)

  // Scrolling moves rows out from under a still pointer, so drop the preview.
  useEffect(() => {
    const hide = () => setActive(null)
    window.addEventListener('scroll', hide, { passive: true })
    return () => window.removeEventListener('scroll', hide)
  }, [])

  const follow = (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || !preview.current) return
    const row = (event.target as HTMLElement).closest<HTMLElement>('[data-row]')
    setActive(row ? Number(row.dataset.row) : null)
    const x = Math.min(event.clientX + 28, window.innerWidth - 300)
    const y = Math.min(Math.max(event.clientY - 140, 72), window.innerHeight - 300)
    preview.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  return (
    <div onPointerMove={follow} onPointerLeave={() => setActive(null)}>
      <ul>
        {rows.map((row, i) => {
          const content = (
            <>
              <span className='label w-7 shrink-0 text-faint'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className='relative size-12 shrink-0 overflow-hidden border border-line [@media(hover:hover)]:hidden'>
                <Image src={row.image} alt='' fill sizes='48px' className='object-cover' />
              </span>
              <span className='min-w-0 flex-1'>
                <span className='fringe display block truncate pb-1 text-3xl transition-transform duration-500 ease-out group-hover:translate-x-3 sm:text-5xl'>
                  {row.title}
                </span>
                <span className='label mt-1 block truncate sm:hidden'>{row.kind}</span>
              </span>
              <span className='label hidden w-64 truncate sm:block'>{row.kind}</span>
              <span className='label hidden w-16 text-right md:block'>{row.year}</span>
              <span
                aria-hidden
                className='w-5 text-right text-muted transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-fg'
              >
                {row.external ? '↗' : '→'}
              </span>
            </>
          )
          const className =
            'group flex items-center gap-4 border-b border-line py-5 transition-colors sm:gap-6'

          return (
            <li
              key={row.title}
              data-reveal
              data-row={i}
            >
              {row.external ? (
                <a href={row.href} target='_blank' rel='noopener noreferrer' className={className}>
                  {content}
                  <span className='sr-only'> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={row.href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          )
        })}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className='pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block'
      >
        <div
          className={
            'plate size-[272px] origin-top-left transition-[opacity,transform] duration-300 ease-out ' +
            (active === null ? 'scale-90 opacity-0' : 'scale-100 opacity-100')
          }
        >
          {rows.map((row, i) => (
            <Image
              key={row.title}
              src={row.image}
              alt=''
              fill
              sizes='272px'
              className={
                'object-cover object-top transition-opacity duration-300 ' +
                (active === i ? 'opacity-100' : 'opacity-0')
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
