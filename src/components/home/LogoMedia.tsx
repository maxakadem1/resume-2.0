'use client'

import Image from 'next/image'
import { useState } from 'react'
import GlassLogo from '@/components/three/GlassLogo'
import type { GlassLogoName } from '@/components/three/logos'
import { WindowFrame, cn } from '@/components/ui'

/** A project's glass logo, with a tab for a screenshot of the real app. */
export default function LogoMedia({
  logo,
  title,
  screenshot,
}: {
  logo: GlassLogoName
  title: string
  screenshot: { src: string; alt: string; width: number; height: number }
}) {
  const [tab, setTab] = useState<'3d' | 'app'>('3d')

  return (
    <WindowFrame
      title={title}
      right={
        <div className='flex rounded-md border border-line p-px text-3xs'>
          {(['3d', 'app'] as const).map((t) => (
            <button
              key={t}
              type='button'
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={cn(
                'rounded-[5px] px-1.5 py-0.5 font-medium transition-colors',
                tab === t ? 'bg-white/10 text-foreground' : 'text-faint hover:text-muted',
              )}
            >
              {t === '3d' ? '3D' : 'Real app'}
            </button>
          ))}
        </div>
      }
    >
      {tab === '3d' ? (
        <div className='surface-dots relative aspect-[16/10] bg-black'>
          <GlassLogo name={logo} />
        </div>
      ) : (
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          sizes='(min-width: 1280px) 640px, 100vw'
          className='h-auto w-full'
        />
      )}
    </WindowFrame>
  )
}
