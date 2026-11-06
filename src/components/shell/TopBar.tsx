'use client'

import Link from 'next/link'
import { LuCommand, LuFileText } from 'react-icons/lu'
import LogoMark from './LogoMark'
import { buttonClass } from '@/components/ui'
import { profile } from '@/content/profile'

export default function TopBar({
  crumb,
  onOpenCommand,
}: {
  crumb?: string
  onOpenCommand: () => void
}) {
  return (
    <div className='sticky top-0 z-30 bg-black/85 backdrop-blur-xl flex h-13 shrink-0 items-center gap-2 border-b border-line px-4 sm:px-6'>
      <Link href='/' className='flex items-center gap-2 lg:hidden'>
        <LogoMark />
        <span className='text-[13px] font-medium tracking-tight'>
          {profile.name}
        </span>
      </Link>

      <div className='hidden items-center gap-1.5 text-[13px] lg:flex'>
        <Link href='/' className='text-faint transition-colors hover:text-muted'>
          maxworks.dev
        </Link>
        {crumb && (
          <>
            <span className='text-faint/60'>/</span>
            <span key={crumb} className='fade-in text-foreground'>
              {crumb}
            </span>
          </>
        )}
      </div>

      <div className='ml-auto flex items-center gap-1.5'>
        <button
          type='button'
          onClick={onOpenCommand}
          className={buttonClass('ghost', 'sm', 'lg:hidden')}
          aria-label='Open menu'
        >
          <LuCommand aria-hidden />
          Menu
        </button>
        <Link href='/resume' className={buttonClass('primary', 'sm')}>
          <LuFileText aria-hidden />
          Resume
        </Link>
      </div>
    </div>
  )
}
