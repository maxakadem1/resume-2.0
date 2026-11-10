import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import Analytics from '@/components/Analytics'
import Nav from '@/components/Nav'
import RevealObserver from '@/components/RevealObserver'
import { profile } from '@/content/site'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const defaultTitle = `${profile.name} · ${profile.role}`

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxworks.dev',
  ),
  title: {
    default: defaultTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  openGraph: {
    type: 'website',
    title: defaultTitle,
    description: profile.summary,
    images: '/Header.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: profile.summary,
    creator: '@maxakadem1',
    images: ['/Header.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#090908',
}

// Runs before first paint: restores the saved theme and marks the document as
// scripted, which is what lets globals.css hide elements awaiting a reveal.
const boot = `try{var t=localStorage.getItem('theme');if(t==='paper')document.documentElement.dataset.theme='paper'}catch(e){}document.documentElement.classList.add('js')`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a
          href='#main'
          className='btn btn-solid fixed left-4 top-4 z-[100] -translate-y-24 focus:translate-y-0'
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  )
}
