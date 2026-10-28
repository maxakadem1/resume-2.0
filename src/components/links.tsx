import Link from 'next/link'
import type { ReactNode } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

// Shared by menu buttons and menu links so both animate identically.
export const menuItemClass =
  'flex flex-row items-center text-gray-500 hover:text-white focus-visible:text-white w-fit transform transition-transform duration-300 ease-in-out hover:translate-x-3 focus-visible:translate-x-3'

interface LinkProps {
  href: string
  children: ReactNode
  newTab?: boolean
  className?: string
}

function NewTabHint() {
  return (
    <>
      <FiArrowUpRight className='inline-block ml-0.5' aria-hidden />
      <span className='sr-only'> (opens in a new tab)</span>
    </>
  )
}

export function MenuLink({ href, children, newTab = true }: LinkProps) {
  return (
    <Link
      href={href}
      className={menuItemClass}
      {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {newTab && <NewTabHint />}
    </Link>
  )
}

export function InlineLink({
  href,
  children,
  newTab = true,
  className = 'text-blue-500 hover:text-blue-300',
}: LinkProps) {
  return (
    <Link
      href={href}
      className={className}
      {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {newTab && <NewTabHint />}
    </Link>
  )
}
