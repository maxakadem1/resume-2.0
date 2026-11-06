'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/components/ui'

interface Source {
  mp4: string
  webm: string
}

/**
 * A looping, muted Blender render that fades in once it can play. With `lazy`
 * it only starts loading near the viewport, and it pauses while off screen.
 * Give it a `key` per source so a new render starts from a clean state.
 */
const RenderVideo = forwardRef<
  HTMLVideoElement,
  {
    source: Source
    className?: string
    lazy?: boolean
    onTime?: (progress: number) => void
    paused?: boolean
  }
>(function RenderVideo({ source, className, lazy, onTime, paused }, ref) {
  const local = useRef<HTMLVideoElement | null>(null)
  const [ready, setReady] = useState(false)
  const [near, setNear] = useState(!lazy)

  const setRefs = useCallback(
    (el: HTMLVideoElement | null) => {
      local.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
      // A cached file can be ready before React attaches its handlers.
      if (el && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setReady(true)
    },
    [ref],
  )

  useEffect(() => {
    const el = local.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          if (!paused) el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [paused])

  // Sources are added once the video is near the viewport; load them then.
  useEffect(() => {
    if (lazy && near) local.current?.load()
  }, [lazy, near])

  useEffect(() => {
    const el = local.current
    if (!el || !near) return
    if (paused) el.pause()
    else el.play().catch(() => {})
  }, [paused, near, source])

  useEffect(() => {
    if (!onTime) return
    let frame = 0
    const tick = () => {
      const el = local.current
      if (el && el.duration) onTime(el.currentTime / el.duration)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onTime])

  return (
    <video
      ref={setRefs}
      autoPlay={!lazy && !paused}
      loop
      muted
      playsInline
      preload={near ? 'auto' : 'none'}
      aria-hidden
      data-ready={ready}
      onLoadedData={() => setReady(true)}
      className={cn('video-fade', className)}
    >
      {near && (
        <>
          <source src={source.mp4} type='video/mp4' />
          <source src={source.webm} type='video/webm' />
        </>
      )}
    </video>
  )
})

export default RenderVideo
