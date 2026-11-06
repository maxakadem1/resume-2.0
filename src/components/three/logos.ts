/**
 * Logos that can be rendered as glass. Each one is a flat mask in a 1024-unit square
 * (solid where the glass is) plus the dimensions of the solid grown from it.
 */

/**
 * The Godot Engine logo, from the default project icon.svg (1024-unit space).
 * Logo by Andrea Calabró, CC BY 4.0. Not affiliated with Godot.
 */
const GODOT = {
  body: 'm105 673 152 14q12 1 15 14l4 67 132 10 8-61q2-11 15-15h162q13 4 15 15l8 61 132-10 4-67q3-13 15-14l152-14V427q30-39 56-81-35-59-83-108-43 20-82 47-40-37-88-64 7-51 8-102-59-28-123-42-26 43-46 89-49-7-98 0-20-46-46-89-64 14-123 42 1 51 8 102-48 27-88 64-39-27-82-47-48 49-83 108 26 42 56 81zm0 33v39c0 276 813 276 814 0v-39l-134 12-5 69q-2 10-14 13l-162 11q-12 0-16-11l-10-65H446l-10 65q-4 11-16 11l-162-11q-12-3-14-13l-5-69z',
  nose: 'M483 600c0 34 58 34 58 0v-86c0-34-58-34-58 0z',
  eyes: [
    { cx: 299, cy: 526, r: 90 },
    { cx: 725, cy: 526, r: 90 },
  ],
}

export interface GlassShape {
  /** Middle of the logo's bounding box, in logo units. */
  center: { x: number; y: number }
  /** Logo units covered by the marching cubes grid. */
  span: number
  /** Marching cubes cells per side. */
  grid: number
  /** Half the slab's thickness at the edges. */
  halfThickness: number
  /** Extra half-thickness towards the middle of wide areas. */
  bulge: number
  /** How far in from the edge the bulge reaches full height. */
  bulgeWidth: number
  /** Radius of the rounded edges. */
  rounding: number
  /** Blur radius that softens the outline's corners. */
  cornerSoftening: number
  /** Blur radius for the bulge. */
  bulgeSmoothing: number
}

export interface GlassLogoSpec {
  label: string
  shape: GlassShape
  /** Tint of the glass. */
  attenuation: string
  /** Size in the frame. */
  scale: number
  /** Fills a 1024 x 1024 canvas with the logo in opaque white. */
  draw: (ctx: CanvasRenderingContext2D) => Promise<void>
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const glassLogos = {
  godot: {
    label: 'Spinning 3D Godot logo in blue glass. Drag to spin it.',
    attenuation: '#3a46ff',
    scale: 1.08,
    shape: {
      center: { x: 512, y: 491 },
      span: 1040,
      grid: 112,
      halfThickness: 92,
      bulge: 38,
      bulgeWidth: 170,
      rounding: 64,
      cornerSoftening: 9,
      bulgeSmoothing: 28,
    },
    async draw(ctx) {
      ctx.fillStyle = '#fff'
      ctx.fill(new Path2D(GODOT.body))
      ctx.globalCompositeOperation = 'destination-out'
      for (const e of GODOT.eyes) {
        ctx.beginPath()
        ctx.arc(e.cx, e.cy, e.r * 0.86, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fill(new Path2D(GODOT.nose))
      ctx.globalCompositeOperation = 'source-over'
    },
  },
  pollard: {
    label: 'Spinning 3D Pollard Banknote logo in blue glass. Drag to spin it.',
    attenuation: '#3a46ff',
    scale: 1.3,
    // The mark is thin strokes, so it is grown into rounded tubes rather than a slab.
    shape: {
      center: { x: 517, y: 504 },
      span: 1000,
      grid: 128,
      halfThickness: 40,
      bulge: 6,
      bulgeWidth: 40,
      rounding: 30,
      cornerSoftening: 5,
      bulgeSmoothing: 10,
    },
    // White mark on black, traced from the app icon (public/logos/pollard-mask.png).
    async draw(ctx) {
      ctx.drawImage(await loadImage('/logos/pollard-mask.png'), 0, 0, 1024, 1024)
    },
  },
  outreachgenius: {
    label: 'Spinning 3D OutreachGenius logo in indigo glass. Drag to spin it.',
    attenuation: '#3a46ff',
    scale: 1.15,
    // The icon from the OutreachGenius logo, without the wordmark.
    shape: {
      center: { x: 512, y: 512 },
      span: 1000,
      grid: 128,
      halfThickness: 50,
      bulge: 12,
      bulgeWidth: 50,
      rounding: 36,
      cornerSoftening: 6,
      bulgeSmoothing: 14,
    },
    // public/logos/outreachgenius.svg is 295.4 x 187.6: fit it 900 units wide, centred.
    async draw(ctx) {
      const w = 900
      const h = (w * 187.6) / 295.4
      ctx.drawImage(await loadImage('/logos/outreachgenius.svg'), (1024 - w) / 2, (1024 - h) / 2, w, h)
      // The icon is navy: turn every pixel it covers white.
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 1024, 1024)
      ctx.globalCompositeOperation = 'source-over'
    },
  },
} satisfies Record<string, GlassLogoSpec>

export type GlassLogoName = keyof typeof glassLogos
