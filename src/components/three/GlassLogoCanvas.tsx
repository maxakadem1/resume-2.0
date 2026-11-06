'use client'

/**
 * A logo as a real 3D object in blue glass that spins. Ported from godot-rag.
 *
 * The look is matched to the Blender renders in the hero. MeshTransmissionMaterial
 * renders what is behind the object into a texture and samples it through the surface,
 * bending it (ior) and splitting colours (chromaticAberration, the realtime stand-in for
 * Blender's three-IOR glass dispersion). On a black page there would be nothing to bend,
 * so the refraction pass uses the studio (the environment) as its background, while the
 * page itself stays black.
 *
 * Where the blue comes from matters: the glass is only lightly tinted and the studio it
 * refracts is indigo. A strongly tinted glass absorbs the red and green out of white light
 * before it can be split, which leaves flat neon blue with no rainbow fringes.
 */
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { buildGlassLogoGeometry } from './glassLogoGeometry'
import { glassLogos, type GlassLogoName } from './logos'

/** The glass's own tint: light, so white light keeps enough red and green to split. */
const GLASS_COLOR = '#98a6ff'
/** What the glass refracts where no light is: gives its body the indigo of the renders. */
const STUDIO_BACKGROUND = '#0b0c46'

/**
 * Splits colour the way glass dispersion in Blender does. Each sample stands for one
 * wavelength: its IOR runs from ior x (1 - chromaticAberration) for red to
 * ior x (1 + chromaticAberration) for blue, and it adds to red, green and blue by
 * overlapping response curves. Neighbouring bands overlap into yellow and cyan, so a
 * white streak fans out into a full rainbow.
 *
 * drei's own version keeps green at a single IOR and smears only red and blue, so its
 * fringes come out almost all magenta, with no green or yellow.
 */
const SPECTRAL_SAMPLE = /float aberration = chromaticAberration \* sampleProgress;[\s\S]*?\)\.b;/
const SPECTRAL_DIVIDE = /transmission \/= (\d+\.0);/

function patchDispersion(instance: unknown) {
  const m = instance as THREE.MeshPhysicalMaterial | null
  if (!m || m.customProgramCacheKey() === 'spectral-dispersion') return
  const inject = m.onBeforeCompile
  m.onBeforeCompile = (shader, renderer) => {
    inject.call(m, shader, renderer)
    const fs = shader.fragmentShader
    if (!SPECTRAL_SAMPLE.test(fs) || !SPECTRAL_DIVIDE.test(fs)) {
      console.warn('GlassLogo: drei transmission shader changed; spectral dispersion skipped')
      return
    }
    shader.fragmentShader = fs
      .replace('vec3 transmission = vec3(0.0);', 'vec3 transmission = vec3(0.0);\nvec3 spectralWeight = vec3(1e-4);')
      .replace(
        SPECTRAL_SAMPLE,
        `vec3 w = max(vec3(0.0), 1.0 - abs(vec3(sampleProgress) - vec3(0.1667, 0.5, 0.8333)) * 3.0);
              float spectralIor = material.ior * (1.0 + chromaticAberration * (2.0 * sampleProgress - 1.0));
              transmission += w * getIBLVolumeRefraction(
                sampleNorm, v, material.roughness, material.diffuseColor, pos, modelScale, attenuationCoefficient, F,
                viewMatrix, projectionMatrix, spectralIor, sampleThickness, material.attenuationDistance
              ).rgb;
              spectralWeight += w;`,
      )
      .replace(SPECTRAL_DIVIDE, 'transmission /= chromaticAberration == 0.0 ? vec3($1) : spectralWeight;')
  }
  m.customProgramCacheKey = () => 'spectral-dispersion'
  m.needsUpdate = true
}

function Logo({
  name,
  reducedMotion,
  onFirstFrame,
}: {
  name: GlassLogoName
  reducedMotion: boolean
  onFirstFrame: () => void
}) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const frames = useRef(0)
  const group = useRef<THREE.Group>(null)
  const env = useThree((s) => s.scene.environment)
  const drag = useRef({ active: false, lastX: 0, velocity: 0 })
  const { gl } = useThree()

  useEffect(() => {
    let cancelled = false
    let built: THREE.BufferGeometry | undefined
    buildGlassLogoGeometry(glassLogos[name]).then((g) => {
      built = g
      if (cancelled) g.dispose()
      else setGeometry(g)
    })
    return () => {
      cancelled = true
      built?.dispose()
    }
  }, [name])

  // Drag to spin: horizontal pointer movement adds spin that decays back to the idle speed.
  useEffect(() => {
    const el = gl.domElement
    const down = (e: PointerEvent) => {
      drag.current = { active: true, lastX: e.clientX, velocity: drag.current.velocity }
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return
      drag.current.velocity += (e.clientX - drag.current.lastX) * 0.012
      drag.current.lastX = e.clientX
    }
    const up = () => (drag.current.active = false)
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [gl])

  useFrame((state, dt) => {
    const g = group.current
    if (!g || !geometry) return
    if (++frames.current === 2) onFirstFrame() // frame 1 compiles shaders
    const idle = reducedMotion ? 0 : 0.45 // radians per second
    drag.current.velocity *= Math.exp(-dt * 2.5)
    g.rotation.y += (idle + drag.current.velocity) * dt
    // Lean a little towards the pointer.
    const k = 1 - Math.exp(-dt * 4)
    g.rotation.x += (-state.pointer.y * 0.25 + 0.12 - g.rotation.x) * k
    g.rotation.z += (state.pointer.x * -0.08 - g.rotation.z) * k
  })

  if (!geometry) return null
  return (
    <group ref={group} scale={glassLogos[name].scale}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          ref={patchDispersion}
          background={env ?? undefined}
          backside
          backsideThickness={0.6}
          backsideEnvMapIntensity={1}
          samples={16}
          resolution={1024}
          transmission={1}
          thickness={1.2}
          // A little frost, like the renders: softens what shows through and the fringes.
          roughness={0.16}
          ior={1.5}
          // Red refracts at ior x 0.91 and blue at x 1.09 (patchDispersion).
          // Much more smears the fringes into a flat haze; much less hides them.
          chromaticAberration={0.09}
          anisotropicBlur={0.05}
          distortion={0}
          color={GLASS_COLOR}
          attenuationColor={glassLogos[name].attenuation}
          attenuationDistance={6}
          clearcoat={1}
          clearcoatRoughness={0}
          specularIntensity={1}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  )
}

/**
 * Thin bright strips straight behind the logo: [x, y, width, height, tilt]. The glass
 * refracts what the camera sees behind it, so these sit inside its field of view.
 */
const SLIVERS: [number, number, number, number, number][] = [
  [-1.8, 1.1, 3.2, 0.09, 0.35],
  [1.4, -0.9, 0.09, 3.4, 0.4],
  [-0.9, -1.3, 2.8, 0.08, -0.3],
  [2.1, 1.3, 2.2, 0.08, -0.6],
]

/**
 * The lighting: a dark indigo room the glass refracts (so its body reads as an even
 * indigo), broad white panels for the big soft highlights, and thin, very bright white
 * strips that the colour splitting fans out into rainbows.
 */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach='background' args={[STUDIO_BACKGROUND]} />
      {/* Broad soft panels: the large white highlights on faces turned to the light. */}
      <Lightformer form='rect' intensity={14} position={[1, 5, 2]} scale={[8, 2.5, 1]} />
      <Lightformer form='rect' intensity={10} position={[5, 1, 3]} scale={[2.5, 7, 1]} />
      {/* Crisp strips: thin streaks on the surface. */}
      <Lightformer form='rect' intensity={20} position={[-4, 1, 3]} scale={[0.4, 8, 1]} />
      <Lightformer form='rect' intensity={10} position={[0, -5, 1]} scale={[8, 0.3, 1]} />
      {/* Behind: bright slivers seen through the glass, split into colour. */}
      {SLIVERS.map(([x, y, w, h, tilt], i) => (
        <Lightformer key={i} form='rect' intensity={26} position={[x, y, -6]} rotation={[0, 0, tilt]} scale={[w, h, 1]} />
      ))}
      {/* Sides: streaks reflected along the edges. */}
      <Lightformer form='rect' intensity={8} position={[-5, -2, -1]} scale={[4, 0.2, 1]} />
      <Lightformer form='rect' intensity={8} position={[5, 2, -1]} scale={[4, 0.2, 1]} />
    </Environment>
  )
}

export default function GlassLogoCanvas({
  name,
  visible,
  onReady,
}: {
  name: GlassLogoName
  visible: boolean
  onReady: () => void
}) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <Canvas
      frameloop={visible ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.2], fov: 32 }}
      // AgX, as in Blender: bright blues stay blue and roll off to white, where ACES turns them violet.
      gl={{ alpha: true, antialias: true, toneMapping: THREE.AgXToneMapping }}
      aria-label={glassLogos[name].label}
      role='img'
    >
      <Studio />
      <Logo name={name} reducedMotion={reducedMotion} onFirstFrame={onReady} />
    </Canvas>
  )
}
