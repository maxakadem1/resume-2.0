import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { LuArrowUpRight } from 'react-icons/lu'

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

/* -------------------------------- Buttons -------------------------------- */

const buttonBase =
  'relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border text-[13px] font-medium outline-none transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary/70 [&_svg]:size-3.5 [&_svg]:shrink-0'

export const buttonVariants = {
  primary:
    'border-primary bg-primary text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16)] shadow-sm shadow-primary/25 hover:bg-primary/90',
  outline:
    'border-white/[0.11] bg-white/[0.04] text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] hover:bg-white/[0.08]',
  ghost:
    'border-transparent text-muted hover:bg-hover hover:text-foreground',
  glass:
    'glass rounded-full border-line-strong text-foreground hover:border-white/25',
} as const

export const buttonSizes = {
  sm: 'h-7 px-2.5',
  md: 'h-8 px-3',
  lg: 'h-9 px-3.5',
} as const

export function buttonClass(
  variant: keyof typeof buttonVariants = 'outline',
  size: keyof typeof buttonSizes = 'md',
  className?: string,
) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)
}

/* ---------------------------------- Kbd ---------------------------------- */

export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        'pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center rounded bg-white/[0.07] px-1 font-sans text-2xs font-medium text-muted',
        className,
      )}
      {...props}
    />
  )
}

/* --------------------------------- Badge --------------------------------- */

export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-px text-2xs text-muted',
        className,
      )}
      {...props}
    />
  )
}

export const accentBg = {
  sky: 'bg-sky',
  violet: 'bg-violet',
  amber: 'bg-amber',
  mint: 'bg-mint',
} as const

export const accentText = {
  sky: 'text-sky',
  violet: 'text-violet',
  amber: 'text-amber',
  mint: 'text-mint',
} as const

export function Dot({
  accent,
  className,
  pulse,
}: {
  accent: keyof typeof accentBg
  className?: string
  pulse?: boolean
}) {
  return (
    <span className={cn('relative inline-flex size-1.5 shrink-0', className)}>
      {pulse && (
        <span
          className={cn(
            'absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden',
            accentBg[accent],
          )}
        />
      )}
      <span className={cn('relative size-1.5 rounded-full', accentBg[accent])} />
    </span>
  )
}

/* -------------------------------- Section -------------------------------- */

export function SectionHeader({
  id,
  title,
  children,
}: {
  id: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <header className='mb-8 flex flex-col gap-2 md:mb-10'>
      <h2
        id={id}
        className='text-balance text-2xl font-medium tracking-tight text-foreground md:text-3xl'
      >
        {title}
      </h2>
      {children && (
        <p className='max-w-2xl text-pretty text-[15px] leading-relaxed text-muted'>
          {children}
        </p>
      )}
    </header>
  )
}

/* --------------------------------- Links --------------------------------- */

interface LinkProps {
  href: string
  children: ReactNode
  className?: string
}

const isExternal = (href: string) => /^https?:/.test(href)

/** Text link. External links open in a new tab and say so to screen readers. */
export function InlineLink({ href, children, className }: LinkProps) {
  const external = isExternal(href)
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground underline decoration-white/25 underline-offset-[3px] transition-colors hover:decoration-white/70',
        className,
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {external && <span className='sr-only'> (opens in a new tab)</span>}
    </Link>
  )
}

/** Button-styled link, with an arrow when it leaves the site. */
export function ButtonLink({
  href,
  children,
  variant = 'outline',
  size = 'md',
  className,
  arrow,
}: LinkProps & {
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  arrow?: boolean
}) {
  const external = isExternal(href)
  return (
    <Link
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {(arrow ?? external) && (
        <LuArrowUpRight className='-ml-0.5 opacity-60' aria-hidden />
      )}
      {external && <span className='sr-only'> (opens in a new tab)</span>}
    </Link>
  )
}

/* ------------------------------ Window frame ----------------------------- */

/** A quiet app-window frame around a screenshot or live demo. */
export function WindowFrame({
  title,
  right,
  children,
  className,
}: {
  title: ReactNode
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black',
        className,
      )}
    >
      <div className='flex h-9 items-center gap-3 border-b border-line px-3'>
        <div className='flex gap-1.5' aria-hidden>
          <span className='size-2.5 rounded-full bg-white/10' />
          <span className='size-2.5 rounded-full bg-white/10' />
          <span className='size-2.5 rounded-full bg-white/10' />
        </div>
        <div className='min-w-0 flex-1 truncate text-center font-mono text-2xs text-faint'>
          {title}
        </div>
        <div className='flex min-w-[42px] justify-end'>{right}</div>
      </div>
      {children}
    </div>
  )
}
