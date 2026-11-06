import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Analytics from '@/components/Analytics'
import { profile } from '@/content/profile'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

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
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${inter.variable} ${mono.variable}`}>
      <body className='font-sans text-[14px] leading-normal'>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
