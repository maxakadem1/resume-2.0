import type { Metadata } from 'next'
import { LuDownload } from 'react-icons/lu'
import Shell from '@/components/shell/Shell'
import { buttonClass } from '@/components/ui'
import { profile } from '@/content/profile'

export const metadata: Metadata = {
  title: 'Resume',
}

export default function ResumePage() {
  return (
    <Shell crumb='Resume'>
      <main className='flex flex-1 flex-col gap-3 p-3 sm:p-6'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-[13px] text-muted'>
            {profile.name} <span className='text-faint'>· Resume</span>
          </h1>
          <a href='/Resume.pdf' download className={buttonClass('outline', 'sm')}>
            <LuDownload aria-hidden />
            Download PDF
          </a>
        </div>
        {/* The PDF lives in public so it can be opened directly as well. */}
        <iframe
          className='min-h-[80vh] w-full flex-1 rounded-xl border border-line bg-surface'
          src='/Resume.pdf'
          title='Resume PDF'
        />
      </main>
    </Shell>
  )
}
