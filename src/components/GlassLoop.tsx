'use client'

import { useEffect, useRef } from 'react'

/**
 * One of the Blender renders, looping. The files are several megabytes, so
 * nothing is fetched until the video is near the viewport, and it only plays
 * while on screen.
 */
export default function GlassLoop({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload='none'
      aria-label='Looping render of glass blocks'
    >
      <source src='/GlassBlocks2.webm' type='video/webm' />
      <source src='/GlassBlocks2.mp4' type='video/mp4' />
    </video>
  )
}
