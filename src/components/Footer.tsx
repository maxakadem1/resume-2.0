import { ExternalLink } from './ui'
import { profile } from '@/content/site'

export default function Footer() {
  return (
    <footer className='no-print mt-28 overflow-hidden border-t border-line-strong md:mt-40'>
      <div className='mx-auto flex w-full max-w-page flex-col gap-3 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12'>
        <p className='label'>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className='label'>Set in Instrument Serif and Geist. Drawn in GLSL.</p>
        <p className='label flex gap-6'>
          <ExternalLink href={profile.links.source} className='transition-colors hover:text-fg'>
            <span className='fringe'>View source ↗</span>
          </ExternalLink>
          <a href='#top' className='transition-colors hover:text-fg'>
            <span className='fringe'>Back to top ↑</span>
          </a>
        </p>
      </div>
      {/* The surname once more, cropped by the bottom of the page. */}
      <p
        aria-hidden
        className='display hatch-text -mb-[0.2em] select-none whitespace-nowrap text-center leading-none [font-size:17.4vw]'
      >
        {profile.last}
      </p>
    </footer>
  )
}
