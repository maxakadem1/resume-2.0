'use client'

import { useCallback, useRef, useState } from 'react'
import { LuArrowDown, LuCheck, LuCopy, LuPause, LuPlay } from 'react-icons/lu'
import RenderVideo from './RenderVideo'
import { useCopy } from '@/components/shell/useCopy'
import { Dot, buttonClass, cn } from '@/components/ui'
import { profile, renders, type RenderKey } from '@/content/profile'

function formatTime(seconds: number) {
  const s = Math.max(0, seconds)
  return `00:${s.toFixed(1).padStart(4, '0')}`
}

export default function Hero() {
  const [render, setRender] = useState<RenderKey>('blocks')
  const [paused, setPaused] = useState(false)
  const { copied, copy } = useCopy()
  const video = useRef<HTMLVideoElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const clock = useRef<HTMLSpanElement>(null)

  // Written straight to the DOM every frame, so the page doesn't re-render.
  const onTime = useCallback((progress: number) => {
    if (bar.current) bar.current.style.transform = `scaleX(${progress})`
    const el = video.current
    if (clock.current && el?.duration)
      clock.current.textContent = `${formatTime(el.currentTime)} / ${formatTime(el.duration)}`
  }, [])

  const source = renders[render]

  return (
    <section
      id='overview'
      aria-label='Introduction'
      className='surface-dots relative overflow-hidden rounded-2xl border border-line bg-[#030303]'
    >
      {/* A faint blue bloom behind the render, picked up from the glass. */}
      <div
        aria-hidden
        className='pointer-events-none absolute -right-40 top-1/2 size-[720px] -translate-y-1/2 rounded-full bg-primary/[0.13] blur-[120px]'
      />

      <div className='relative grid lg:min-h-[min(80vh,780px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'>
        {/* Render stage */}
        <div className='relative order-first flex items-center justify-center lg:order-last'>
          <div className='relative aspect-square w-full max-w-[460px] lg:max-w-none'>
            <RenderVideo
              key={render}
              ref={video}
              source={source}
              paused={paused}
              onTime={onTime}
              className='render-mask absolute inset-0 size-full object-cover'
            />
          </div>

          <div className='absolute inset-x-4 top-4 flex items-center justify-between gap-2 sm:inset-x-5 sm:top-5'>
            <span className='glass flex h-7 items-center gap-2 rounded-full border border-line-strong px-2.5 font-mono text-2xs text-muted'>
              <Dot accent='sky' pulse={!paused} />
              {source.file}
            </span>
            <div className='glass flex h-7 items-center gap-0.5 rounded-full border border-line-strong p-0.5'>
              {(Object.keys(renders) as RenderKey[]).map((key) => (
                <button
                  key={key}
                  type='button'
                  aria-pressed={render === key}
                  onClick={() => {
                    setRender(key)
                    setPaused(false)
                  }}
                  className={cn(
                    'h-6 rounded-full px-2.5 text-2xs font-medium transition-colors',
                    render === key
                      ? 'bg-white/[0.12] text-foreground'
                      : 'text-muted hover:text-foreground',
                  )}
                >
                  {renders[key].label}
                </button>
              ))}
              <button
                type='button'
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play render' : 'Pause render'}
                className='grid h-6 w-7 place-items-center rounded-full text-muted transition-colors hover:text-foreground'
              >
                {paused ? (
                  <LuPlay className='size-3' aria-hidden />
                ) : (
                  <LuPause className='size-3' aria-hidden />
                )}
              </button>
            </div>
          </div>

          <div className='absolute inset-x-4 bottom-4 hidden items-center gap-3 sm:inset-x-5 sm:bottom-5 lg:flex'>
            <span className='font-mono text-3xs uppercase tracking-wider text-faint'>
              Made in Blender
            </span>
            <div className='relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]'>
              <div
                ref={bar}
                className='absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-sky'
              />
            </div>
            <span
              ref={clock}
              className='font-mono text-3xs tabular-nums text-faint'
            >
              00:00.0 / 00:00.0
            </span>
          </div>
        </div>

        {/* Introduction */}
        <div className='relative flex flex-col justify-center gap-6 px-5 pb-6 pt-2 sm:px-10 sm:pb-10 lg:py-16 lg:pl-12 lg:pr-0'>
          <span className='glass flex h-7 w-fit items-center gap-2 rounded-full border border-line-strong px-2.5 text-2xs text-muted'>
            <Dot accent='mint' />
            {profile.currently}
            <span className='hidden text-faint sm:inline'>·</span>
            <span className='hidden sm:inline'>{profile.location}</span>
          </span>

          <h1 className='text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl xl:text-7xl'>
            <span className='block text-foreground'>Maxim</span>
            <span className='block text-foreground'>Abdulkhalikov</span>
          </h1>

          <p className='max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base'>
            Frontend engineer with a designer’s eye. I build the platform
            behind lottery apps played by{' '}
            <span className='text-foreground'>millions of people</span> across
            8 clients, and in my own time I ship tools for{' '}
            <span className='text-sky'>AI retrieval</span>,{' '}
            <span className='text-violet'>real-time graphics</span> and{' '}
            <span className='text-amber'>games</span>. The glass is mine too:
            I model and render it in Blender.
          </p>

          <div className='flex flex-wrap items-center gap-2'>
            <a href='#projects' className={buttonClass('primary', 'lg')}>
              See my projects
              <LuArrowDown aria-hidden />
            </a>
            <a href='#pollard' className={buttonClass('outline', 'lg')}>
              What I do at work
            </a>
            <button
              type='button'
              onClick={() => copy(profile.email)}
              className={buttonClass('ghost', 'lg')}
            >
              {copied ? (
                <LuCheck className='text-mint' aria-hidden />
              ) : (
                <LuCopy aria-hidden />
              )}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
