import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { profile } from '@/content/profile'

const inter = Inter({ subsets: ['latin'] })

const defaultTitle = `${profile.name} · Frontend Developer`

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
