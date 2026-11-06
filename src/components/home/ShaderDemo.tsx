'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  LuGrid,
  LuImage,
  LuPalette,
  LuRows,
  LuSparkles,
} from 'react-icons/lu'
import { WindowFrame, cn } from '@/components/ui'
import { renders } from '@/content/profile'

/*
 * A pocket version of Visual Lab's WebGL video path: pixelate, palette map,
 * ordered dither and scan lines, run live on one of my Blender renders.
 */

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAGMENT = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uScale;
uniform float uDpr;
uniform float uPixelate;
uniform float uColors;
uniform float uDither;
uniform float uScan;

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  float cell = uPixelate > 0.5 ? 4.0 * uDpr : 1.0;
  vec2 p = (floor(frag / cell) + 0.5) * cell;
  vec2 uv = (p / uRes - 0.5) * uScale + 0.5;
  vec3 c = texture2D(uTex, uv).rgb;

  if (uColors > 0.5) {
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    vec3 p0 = vec3(0.0);
    vec3 p1 = vec3(0.24, 0.16, 0.62);
    vec3 p2 = vec3(0.71, 0.55, 0.95);
    vec3 p3 = vec3(1.0, 0.94, 0.86);
    l = clamp(l * 1.35, 0.0, 1.0);
    c = l < 0.33 ? mix(p0, p1, l / 0.33)
      : l < 0.66 ? mix(p1, p2, (l - 0.33) / 0.33)
      : mix(p2, p3, (l - 0.66) / 0.34);
  }

  if (uDither > 0.5) {
    vec2 grid = uPixelate > 0.5 ? floor(frag / cell) : floor(frag / (2.0 * uDpr));
    float b = bayer4(grid);
    c = floor(c * 3.0 + b) / 3.0;
  }

  if (uScan > 0.5) {
    float s = mod(frag.y, 4.0 * uDpr);
    c *= s < 1.5 * uDpr ? 0.4 : 1.08;
  }

  gl_FragColor = vec4(c, 1.0);
}
`

const LAYERS = [
  { key: 'scan', label: 'Scan lines', icon: LuRows },
  { key: 'dither', label: 'Dither', icon: LuSparkles },
  { key: 'colors', label: 'Colors', icon: LuPalette },
  { key: 'pixelate', label: 'Pixelate', icon: LuGrid },
] as const satisfies readonly { key: string; label: string; icon: IconType }[]

type LayerKey = (typeof LAYERS)[number]['key']

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

export default function ShaderDemo({
  screenshot,
}: {
  screenshot: { src: string; alt: string; width: number; height: number }
}) {
  const [tab, setTab] = useState<'live' | 'app'>('live')
  const [on, setOn] = useState<Record<LayerKey, boolean>>({
    pixelate: true,
    colors: true,
    dither: true,
    scan: false,
  })
  const [failed, setFailed] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // The draw loop reads the toggles without restarting WebGL.
  const layers = useRef(on)
  useEffect(() => {
    layers.current = on
  }, [on])

  useEffect(() => {
    if (tab !== 'live') return
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) {
      setFailed(true)
      return
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true)
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const uRes = u('uRes')
    const uScale = u('uScale')
    const uDpr = u('uDpr')
    const flags = {
      pixelate: u('uPixelate'),
      colors: u('uColors'),
      dither: u('uDither'),
      scan: u('uScan'),
    }

    let frame = 0
    let visible = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uDpr, dpr)
      // Cover-fit the square render into the canvas.
      const aspect = canvas.width / canvas.height
      gl.uniform2f(uScale, aspect > 1 ? 1 : aspect, aspect > 1 ? 1 / aspect : 1)
    }

    const draw = () => {
      frame = requestAnimationFrame(draw)
      if (!visible || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video)
      for (const key of Object.keys(flags) as LayerKey[])
        gl.uniform1f(flags[key], layers.current[key] ? 1 : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) video.play().catch(() => {})
      else video.pause()
    })
    io.observe(canvas)
    resize()
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      io.disconnect()
      video.pause()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [tab])

  const showLive = tab === 'live' && !failed

  return (
    <WindowFrame
      title={
        <>
          visual-lab <span className='text-faint/60'>/</span>{' '}
          {showLive ? 'glass_blocks.mp4' : 'pic1.png'}
        </>
      }
      right={
        <div className='flex rounded-md border border-line p-px text-3xs'>
          {(['live', 'app'] as const).map((t) => (
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
              {t === 'live' ? 'Live demo' : 'Real app'}
            </button>
          ))}
        </div>
      }
    >
      {showLive ? (
        <div className='flex flex-col'>
          <div className='surface-dots relative bg-black p-3'>
            <canvas
              ref={canvasRef}
              className='aspect-[4/3] w-full rounded-lg bg-black'
              aria-label='The glass blocks render processed live by the selected effect layers'
              role='img'
            />
            <video
              ref={videoRef}
              src={renders.blocks.mp4}
              muted
              loop
              playsInline
              preload='metadata'
              crossOrigin='anonymous'
              className='hidden'
            />
          </div>

          <div className='flex flex-wrap items-center gap-1 border-t border-line p-2'>
            {LAYERS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type='button'
                aria-pressed={on[key]}
                onClick={() => setOn((s) => ({ ...s, [key]: !s[key] }))}
                className={cn(
                  'flex h-7 items-center gap-1.5 rounded-lg border px-2 text-[12px] transition-colors',
                  on[key]
                    ? 'border-violet/30 bg-violet/[0.12] text-foreground'
                    : 'border-line text-faint hover:bg-hover hover:text-muted',
                )}
              >
                <Icon className={cn('size-3', on[key] && 'text-violet')} aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className='relative bg-black'>
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            sizes='(min-width: 1280px) 640px, 100vw'
            className='h-auto w-full'
          />
          {failed && (
            <p className='absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-3xs text-faint'>
              <LuImage className='mr-1 inline size-3' aria-hidden />
              WebGL is unavailable here, so this is a screenshot.
            </p>
          )}
        </div>
      )}
    </WindowFrame>
  )
}
