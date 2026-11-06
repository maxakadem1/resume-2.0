'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { GlassLogoName } from './logos'
import { cn } from '@/components/ui'

// three.js is large and needs WebGL: load it in its own bundle, in the browser only.
const GlassLogoCanvas = dynamic(() => import('./GlassLogoCanvas'), { ssr: false })

/**
 * A spinning glass logo that fills its parent, which needs a definite size. The 3D
 * scene only loads once the slot nears the viewport, renders only while it is on
 * screen, and fades in after its first frame.
 */
export default function GlassLogo({
  name,
  className,
}: {
  name: GlassLogoName
  className?: string
}) {
  const container = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = container.current
    if (!el) return
    const nearby = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), {
      rootMargin: '600px',
    })
    const onScreen = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    nearby.observe(el)
    onScreen.observe(el)
    return () => {
      nearby.disconnect()
      onScreen.disconnect()
    }
  }, [])

  return (
    <div
      ref={container}
      className={cn('relative size-full cursor-grab active:cursor-grabbing', className)}
      style={{ touchAction: 'pan-y' }}
    >
      {/* A soft blue bloom, there before the glass and behind it after. */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-[18%] rounded-full bg-primary/20 blur-[70px]'
      />
      {near && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          <GlassLogoCanvas name={name} visible={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  )
}
