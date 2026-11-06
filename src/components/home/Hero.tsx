"use client"

import { useState } from "react"
import { LuArrowDown, LuPause, LuPlay } from "react-icons/lu"
import RenderVideo from "./RenderVideo"
import { Dot, buttonClass, cn } from "@/components/ui"
import { profile, renders, type RenderKey } from "@/content/profile"

export default function Hero() {
  const [render, setRender] = useState<RenderKey>("blocks")
  const [paused, setPaused] = useState(false)

  return (
    <section
      id="overview"
      aria-label="Introduction"
      className="surface-dots relative overflow-hidden rounded-2xl border border-line bg-[#030303]"
    >
      {/* A faint blue bloom behind the render, picked up from the glass. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 size-[720px] -translate-y-1/2 rounded-full bg-primary/[0.13] blur-[120px]"
      />

      <div className="relative grid lg:min-h-[min(80vh,780px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Introduction */}
        <div className="relative flex flex-col justify-center gap-6 px-5 pt-8 sm:px-10 sm:pt-12 lg:py-16 lg:pl-12 lg:pr-0">
          <span className="glass flex h-7 w-fit items-center gap-2 rounded-full border border-line-strong px-2.5 text-2xs text-muted">
            <Dot accent="mint" />
            {profile.currently}
            <span className="hidden text-faint sm:inline">·</span>
            <span className="hidden sm:inline">{profile.location}</span>
          </span>

          <h1 className="text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl xl:text-7xl">
            <span className="block text-foreground">Maxim</span>
            <span className="block text-foreground">Abdulkhalikov</span>
          </h1>

          <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
            Software Engineer with an eye for product. I build the shared
            platform behind lottery apps for 8 clients, and in my own time I
            ship tools for <span className="text-sky">AI retrieval</span> and{" "}
            <span className="text-violet">real-time graphics</span>.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <a href="#work" className={buttonClass("primary", "lg")}>
              See my work
              <LuArrowDown aria-hidden />
            </a>
            <a href="#projects" className={buttonClass("outline", "lg")}>
              Projects
            </a>
          </div>
        </div>

        {/* Render stage: below the intro on small screens, beside it on large. */}
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none">
            <RenderVideo
              key={render}
              source={renders[render]}
              paused={paused}
              className="render-mask absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="glass absolute right-4 top-4 flex h-7 items-center gap-0.5 rounded-full border border-line-strong p-0.5 sm:right-5 sm:top-5">
            {(Object.keys(renders) as RenderKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={render === key}
                onClick={() => {
                  setRender(key)
                  setPaused(false)
                }}
                className={cn(
                  "h-6 rounded-full px-2.5 text-2xs font-medium transition-colors",
                  render === key
                    ? "bg-white/[0.12] text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {renders[key].label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play render" : "Pause render"}
              className="grid h-6 w-7 place-items-center rounded-full text-muted transition-colors hover:text-foreground"
            >
              {paused ? (
                <LuPlay className="size-3" aria-hidden />
              ) : (
                <LuPause className="size-3" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
