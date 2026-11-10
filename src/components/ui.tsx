import type { ReactNode } from 'react'

/** Stagger helper for `data-reveal` elements. */
export const delay = (ms: number) =>
  ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties

export function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string
  index: string
  label: string
  title: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className='mx-auto w-full max-w-page scroll-mt-14 px-5 pt-28 sm:px-8 md:pt-44 lg:px-12'
    >
      <header
        data-reveal
        className='grid gap-x-8 gap-y-5 border-t border-line-strong pt-5 md:grid-cols-12'
      >
        <p className='label md:col-span-3'>
          <span className='text-fg'>§ {index}</span>
          <span className='px-2' aria-hidden>
            —
          </span>
          {label}
        </p>
        <h2
          id={`${id}-title`}
          className='display text-balance [font-size:clamp(3.2rem,9.5vw,9rem)] md:col-span-9'
        >
          {title}
        </h2>
      </header>
      {children}
    </section>
  )
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className={className}>
      {children}
      <span className='sr-only'> (opens in a new tab)</span>
    </a>
  )
}

export function Stack({ items }: { items: string[] }) {
  return (
    <ul className='label flex flex-wrap gap-x-2 gap-y-1'>
      {items.map((item, i) => (
        <li key={item} className='flex gap-2'>
          {i > 0 && (
            <span aria-hidden className='text-faint'>
              /
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  )
}
