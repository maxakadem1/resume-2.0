import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { profile } from '@/content/site'

export const metadata: Metadata = {
  title: 'Résumé',
}

export default function ResumePage() {
  return (
    <>
      <main
        id='main'
        className='mx-auto flex min-h-[100svh] w-full max-w-page flex-col px-5 pt-28 sm:px-8 lg:px-12'
      >
        <div className='flex flex-wrap items-end justify-between gap-6 border-b border-line-strong pb-6'>
          <div>
            <p className='label'>{profile.name}</p>
            <h1 className='display mt-3 text-6xl sm:text-8xl'>
              Résumé, <em className='mark'>on paper.</em>
            </h1>
          </div>
          <a href='/Resume.pdf' download className='btn btn-solid'>
            Download PDF <span aria-hidden>↓</span>
          </a>
        </div>
        {/* The PDF lives in public so it can be opened directly as well. */}
        <div className='plate mt-8 flex-1'>
          <iframe
            className='block h-full min-h-[82vh] w-full bg-white'
            src='/Resume.pdf'
            title='Résumé PDF'
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
