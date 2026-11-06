'use client'

/**
 * A logo as a real 3D object in blue glass that spins. Ported from godot-rag.
 *
 * The glass look: MeshTransmissionMaterial renders the scene behind the object into a
 * texture and samples it through the surface, bending it (ior), splitting colours
 * (chromaticAberration) and tinting it (attenuation). On a black page there would be
 * nothing to bend, so the refraction pass uses a studio of bright strips of light
 * (the environment) as its background, while the page itself stays black.
 */
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { buildGlassLogoGeometry } from './glassLogoGeometry'
import { glassLogos, type GlassLogoName } from './logos'

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
          background={env ?? undefined}
          backside
          backsideThickness={0.6}
          samples={10}
          resolution={1024}
          transmission={1}
          thickness={1.2}
          roughness={0}
          ior={1.5}
          chromaticAberration={0.6}
          anisotropicBlur={0.05}
          distortion={0}
          color='#ffffff'
          attenuationColor={glassLogos[name].attenuation}
          attenuationDistance={0.3}
          clearcoat={1}
          clearcoatRoughness={0}
          specularIntensity={1}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  )
}

/** Soft area lights for reflections and for the glass to refract. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      {/* A dark room, so the glass has deep shadows to set off its highlights. */}
      <color attach='background' args={['#000004']} />
      {/* Key lights: thin white strips that become the crisp streaks on the glass. */}
      <Lightformer form='rect' intensity={6} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 0.5, 1]} />
      <Lightformer form='rect' intensity={6} position={[-4, 1, 3]} rotation-y={Math.PI / 3} scale={[0.5, 8, 1]} />
      <Lightformer form='rect' intensity={5} position={[4, -1, 3]} rotation-y={-Math.PI / 3} scale={[0.4, 8, 1]} />
      <Lightformer form='rect' intensity={3} position={[0, -5, 1]} rotation-x={-Math.PI / 2} scale={[8, 0.3, 1]} />
      {/* Accents: thin coloured strips that the colour splitting turns into fringes. */}
      <Lightformer form='rect' intensity={2} position={[-5, -2, -1]} rotation-y={Math.PI / 2} scale={[4, 0.25, 1]} color='#3ee0ff' />
      <Lightformer form='rect' intensity={1.5} position={[5, 2, -1]} rotation-y={-Math.PI / 2} scale={[4, 0.25, 1]} color='#b46bff' />
      {/* Behind: patches of blue glow that parts of the logo refract. */}
      <Lightformer form='circle' intensity={2.2} position={[1.5, 1, -6]} scale={4} color='#2b45ff' />
      <Lightformer form='rect' intensity={1.5} position={[-3, -2, -5]} scale={[6, 1, 1]} color='#2233ff' />
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
      gl={{ alpha: true, antialias: true }}
      aria-label={glassLogos[name].label}
      role='img'
    >
      <Studio />
      <Logo name={name} reducedMotion={reducedMotion} onFirstFrame={onReady} />
    </Canvas>
  )
}
