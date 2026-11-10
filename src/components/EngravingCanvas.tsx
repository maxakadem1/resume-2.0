'use client'

import { useEffect, useRef } from 'react'

/*
  The hero drawing: an armillary of rings around a cut gem, ray-marched and
  then shaded the way an engraver would, with line weight standing in for
  tone. Flat facets get straight hatching at their own angle, rings get short
  strokes across the band, and an acid beam crosses it all, misregistered into
  red and green like the glow in the Procreate drawings.

  The canvas fills its parent. The form is centred on the element marked
  `data-engraving-stage`, so layout decides where it sits, not the shader.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2 uCenter;   // form centre, device px, origin bottom-left
uniform float uScale;   // device px per unit
uniform float uPx;      // device pixel ratio
uniform float uTime;
uniform float uIntro;   // 0 to 1 while the drawing inks in
uniform vec2 uMouse;    // -1..1, eased
uniform vec3 uBg;
uniform vec3 uFg;
uniform vec3 uAcid;
uniform float uPaper;   // 0 = white line on ink, 1 = black line on paper

const float TAU = 6.28318530718;
const float FOCAL = 2.2;
const float CAM = 4.0;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdOcta(vec3 p, float s) { p = abs(p); return (p.x + p.y + p.z - s) * 0.57735027; }
float sdTorus(vec3 p, vec2 t) { vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }

vec3 tumble(vec3 p) {
  p.yz *= rot(-0.42 + uMouse.y * 0.3);
  p.xz *= rot(uTime * 0.22 + uMouse.x * 0.6);
  return p;
}
vec3 ringA(vec3 p) { p.xy *= rot(uTime * 0.31); p.yz *= rot(1.15); return p; }
vec3 ringB(vec3 p) { p.yz *= rot(2.0 - uTime * 0.24); p.xy *= rot(0.55); return p; }
vec3 ringC(vec3 p) { p.xz *= rot(uTime * 0.17); p.xy *= rot(1.5708 + sin(uTime * 0.2) * 0.3); return p; }
vec3 gemSpace(vec3 p) { p.xy *= rot(0.615); p.yz *= rot(0.4); return p; }

const vec2 RA = vec2(0.98, 0.06);
const vec2 RB = vec2(1.2, 0.045);
const vec2 RC = vec2(1.38, 0.03);

// x: distance, y: material (0 gem, 1..3 rings)
vec2 map(vec3 p) {
  p = tumble(p);
  float gem = sdOcta(gemSpace(p) * vec3(1.0, 0.72, 1.0), 0.6) * 0.72 - 0.012;
  vec2 res = vec2(gem, 0.0);
  float a = sdTorus(ringA(p), RA); if (a < res.x) res = vec2(a, 1.0);
  float b = sdTorus(ringB(p), RB); if (b < res.x) res = vec2(b, 2.0);
  float c = sdTorus(ringC(p), RC); if (c < res.x) res = vec2(c, 3.0);
  return res;
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    map(p + e.xyy).x - map(p - e.xyy).x,
    map(p + e.yxy).x - map(p - e.yxy).x,
    map(p + e.yyx).x - map(p - e.yyx).x
  ));
}

// One family of parallel strokes. coord is in periods, weight is the share of
// each period that is line, aa is one device pixel in the same units.
float strokes(float coord, float weight, float aa) {
  float f = 1.0 - abs(fract(coord) - 0.5) * 2.0;
  float edge = 1.0 - clamp(weight, 0.0, 1.0);
  return smoothstep(edge - aa, edge + aa, f) * step(0.03, weight);
}

float guide(vec2 uv, vec2 origin, float angle) {
  vec2 n = vec2(-sin(angle), cos(angle));
  float d = abs(dot(uv - origin, n)) * uScale;
  return 1.0 - smoothstep(0.4 * uPx, 1.3 * uPx, d);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - uCenter) / uScale;
  vec2 css = (frag - uCenter) / uPx;

  // Faint construction lines behind the form, as in the drawings.
  float g = guide(uv, vec2(-0.2, 0.3), 1.08)
          + guide(uv, vec2(0.35, -0.1), -1.02)
          + guide(uv, vec2(0.0, -0.55), 0.36)
          + guide(uv, vec2(0.1, 0.62), -0.25)
          + guide(uv, vec2(-0.5, 0.0), 2.2);
  g = clamp(g, 0.0, 1.0) * smoothstep(2.6, 0.5, length(uv)) * 0.13 * uIntro;

  float ink = g;

  if (length(uv) < 0.93) {
    vec3 ro = vec3(0.0, 0.0, CAM);
    vec3 rd = normalize(vec3(uv, -FOCAL));
    float t = 2.4;
    float id = -1.0;
    float nearest = 1e3;
    float nearestT = t;

    for (int i = 0; i < 80; i++) {
      vec2 h = map(ro + rd * t);
      if (h.x < 0.0012) { id = h.y; break; }
      if (h.x < nearest) { nearest = h.x; nearestT = t; }
      t += h.x;
      if (t > 6.0) break;
    }

    if (id > -0.5) {
      vec3 p = ro + rd * t;
      vec3 n = normalAt(p);
      vec3 light = normalize(vec3(-0.55, 0.75, 0.6));
      float diff = max(dot(n, light), 0.0);
      float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      float tone = clamp(0.07 + 0.95 * diff + 0.22 * rim, 0.0, 1.0);

      // On ink the lines are the light; on paper they are the shadow.
      float v = mix(tone, 1.0 - tone, uPaper) * uIntro;
      float s;

      if (id < 0.5) {
        float period = 4.6;
        float aa = 0.8 / (period * 0.5 * uPx);
        vec2 dir = normalize(n.xy + vec2(1e-4, 0.0));
        s = strokes(dot(css, dir) / period, v * 0.96, aa);
        s = max(s, strokes(dot(css, vec2(-dir.y, dir.x)) / period, (v - 0.55) * 1.7, aa));
      } else {
        vec3 q = tumble(p);
        vec2 ring = RA;
        if (id < 1.5) { q = ringA(q); }
        else if (id < 2.5) { q = ringB(q); ring = RB; }
        else { q = ringC(q); ring = RC; }
        // Whole number of strokes so the pattern closes around the ring.
        float count = floor(ring.x * uScale / uPx * 0.55 * TAU / 4.4);
        float period = TAU * ring.x * 0.55 * uScale / count;
        float aa = 0.9 / (period * 0.5);
        s = strokes(atan(q.z, q.x) / TAU * count, 0.12 + v * 0.86, aa);
      }
      ink = s;
    } else {
      // A ray that only just missed draws the outline.
      float width = 1.15 * uPx / uScale * nearestT / FOCAL;
      ink = max(ink, (1.0 - smoothstep(width * 0.6, width * 1.5, nearest)) * uIntro);
    }
  }

  vec3 col = mix(uBg, uFg, ink);

  // The beam.
  vec2 b = uv - vec2(0.0, 0.2 + uMouse.y * 0.05);
  float reach = smoothstep(1.3, 0.3, abs(b.x) / max(uIntro, 0.001));
  float dy = b.y * uScale / uPx;
  float flicker = 0.86 + 0.14 * sin(uTime * 2.3) * sin(uTime * 0.71);
  float core = (1.0 - smoothstep(0.5, 1.5, abs(dy))) * reach;
  float glow = exp(-abs(dy) / 10.0) * reach * flicker;
  float red = (1.0 - smoothstep(0.7, 1.9, abs(dy + 2.4))) * reach;
  float green = (1.0 - smoothstep(0.7, 1.9, abs(dy - 2.4))) * reach;

  vec3 onInk = col + uAcid * glow * 0.6;
  vec3 onPaper = mix(col, uAcid, clamp(glow * 1.25, 0.0, 1.0));
  col = mix(onInk, onPaper, uPaper);
  col = mix(col, vec3(1.0, 0.24, 0.24), red * 0.85);
  col = mix(col, vec3(0.16, 1.0, 0.55), green * 0.85);
  col = mix(col, mix(vec3(1.0, 1.0, 0.8), uAcid, uPaper), core);

  gl_FragColor = vec4(col, 1.0);
}
`

const UNIFORMS = [
  'uCenter',
  'uScale',
  'uPx',
  'uTime',
  'uIntro',
  'uMouse',
  'uBg',
  'uFg',
  'uAcid',
  'uPaper',
] as const

type Uniforms = Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>
type Rgb = [number, number, number]

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }
  return shader
}

function readColor(style: CSSStyleDeclaration, name: string): Rgb {
  const parts = style.getPropertyValue(name).trim().split(/\s+/).map(Number)
  return [parts[0] / 255 || 0, parts[1] / 255 || 0, parts[2] / 255 || 0]
}

const ease = (current: Rgb, target: Rgb, k: number): Rgb => [
  current[0] + (target[0] - current[0]) * k,
  current[1] + (target[1] - current[1]) * k,
  current[2] + (target[2] - current[2]) * k,
]

export default function EngravingCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    const vert = gl && compile(gl, gl.VERTEX_SHADER, VERT)
    const frag = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl?.createProgram()
    if (!gl || !vert || !frag || !program) {
      canvas.style.display = 'none'
      return
    }

    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      canvas.style.display = 'none'
      return
    }
    gl.useProgram(program)

    // One triangle that covers the viewport.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = Object.fromEntries(
      UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Uniforms

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement

    let ratio = 1
    let center: [number, number] = [0, 0]
    let scale = 1
    let target = { bg: [0, 0, 0] as Rgb, fg: [1, 1, 1] as Rgb, acid: [1, 1, 0] as Rgb, paper: 0 }
    let shown = { ...target }
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const readTheme = () => {
      const style = getComputedStyle(root)
      target = {
        bg: readColor(style, '--bg'),
        fg: readColor(style, '--fg'),
        acid: readColor(style, '--acid'),
        paper: root.dataset.theme === 'paper' ? 1 : 0,
      }
    }

    const measure = () => {
      const box = host.getBoundingClientRect()
      if (!box.width || !box.height) return
      // Cap the pixel count: the shader is per-pixel work.
      ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      ratio = Math.min(ratio, Math.sqrt(2_400_000 / (box.width * box.height)))
      canvas.width = Math.round(box.width * ratio)
      canvas.height = Math.round(box.height * ratio)
      gl.viewport(0, 0, canvas.width, canvas.height)

      const stage = host.querySelector<HTMLElement>('[data-engraving-stage]')
      const s = stage?.getBoundingClientRect() ?? box
      center = [
        (s.left - box.left + s.width / 2) * ratio,
        (box.height - (s.top - box.top + s.height / 2)) * ratio,
      ]
      scale = s.width * 0.94 * ratio
    }

    const start = performance.now()
    let frame = 0
    let visible = true

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000
      const k = still ? 1 : 0.08
      shown = {
        bg: ease(shown.bg, target.bg, k),
        fg: ease(shown.fg, target.fg, k),
        acid: ease(shown.acid, target.acid, k),
        paper: shown.paper + (target.paper - shown.paper) * k,
      }
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      const intro = still ? 1 : Math.min(1, elapsed / 2.2)
      gl.uniform2f(u.uCenter, center[0], center[1])
      gl.uniform1f(u.uScale, scale)
      gl.uniform1f(u.uPx, ratio)
      gl.uniform1f(u.uTime, still ? 7.5 : elapsed + 7.5)
      gl.uniform1f(u.uIntro, 1 - Math.pow(1 - intro, 3))
      gl.uniform2f(u.uMouse, mouse.x, mouse.y)
      gl.uniform3fv(u.uBg, shown.bg)
      gl.uniform3fv(u.uFg, shown.fg)
      gl.uniform3fv(u.uAcid, shown.acid)
      gl.uniform1f(u.uPaper, shown.paper)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now: number) => {
      draw(now)
      frame = requestAnimationFrame(loop)
    }

    const play = () => {
      cancelAnimationFrame(frame)
      if (still) frame = requestAnimationFrame(draw)
      else if (visible && !document.hidden) frame = requestAnimationFrame(loop)
    }

    readTheme()
    shown = { ...target }
    measure()
    play()

    const resize = new ResizeObserver(() => {
      measure()
      play()
    })
    resize.observe(host)

    const themeWatch = new MutationObserver(() => {
      readTheme()
      play()
    })
    themeWatch.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    const inView = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      play()
    })
    inView.observe(host)

    const onPointer = (event: PointerEvent) => {
      mouse.tx = (event.clientX / window.innerWidth) * 2 - 1
      mouse.ty = (event.clientY / window.innerHeight) * 2 - 1
    }
    if (!still) window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', play)

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      themeWatch.disconnect()
      inView.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', play)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
