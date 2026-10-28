'use client'

import { useState } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import ExperienceContent from '@/components/ExperienceContent'
import ProjectsContent from '@/components/ProjectsContent'
import AboutMeContent from '@/components/AboutMeContent'
import ContactMeContent from '@/components/ContactMeContent'
import { InlineLink, MenuLink, menuItemClass } from '@/components/links'
import { profile } from '@/content/profile'
import { BiCircle, BiSolidCircle } from 'react-icons/bi'
import { TiPlus, TiPlusOutline } from 'react-icons/ti'

const videos = {
  Rings: {
    webm: '/glassDonuts.webm',
    mp4: '/glassDonuts.mp4',
  },
  Blocks: {
    webm: '/GlassBlocks2.webm',
    mp4: '/GlassBlocks2.mp4',
  },
}

type BackgroundVideoSource = (typeof videos)[keyof typeof videos]

const sections = {
  experience: { label: 'Experience', Panel: ExperienceContent },
  projects: { label: 'Projects', Panel: ProjectsContent },
  about: { label: 'About', Panel: AboutMeContent },
  contact: { label: 'Contact', Panel: ContactMeContent },
}

type Section = keyof typeof sections

function BackgroundVideo({
  selectedVideo,
  className,
}: {
  selectedVideo: BackgroundVideoSource
  className: string
}) {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleCanPlay = (video: HTMLVideoElement) => {
    setVideoLoaded(true)
    video.play().catch(() => {
      // Muted autoplay can still be delayed by browser reload timing.
    })
  }

  // The server-rendered <video> starts loading before hydration, so a cached
  // file can fire canplay before React attaches onCanPlay. Catch that case
  // when the element is hydrated, otherwise it stays at opacity 0.
  const syncWithReadyState = (video: HTMLVideoElement | null) => {
    if (
      !videoLoaded &&
      video &&
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      handleCanPlay(video)
    }
  }

  return (
    <video
      ref={syncWithReadyState}
      autoPlay
      loop
      muted
      preload='auto'
      playsInline
      aria-hidden
      onLoadedData={(event) => handleCanPlay(event.currentTarget)}
      onCanPlay={(event) => handleCanPlay(event.currentTarget)}
      className={`${className} ${videoLoaded ? 'fade-in loaded' : 'fade-in'}`}
    >
      {/* Prefer WebM, with MP4 fallback for browsers that stall on reload. */}
      <source src={selectedVideo.webm} type='video/webm' />
      <source src={selectedVideo.mp4} type='video/mp4' />
    </video>
  )
}

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<BackgroundVideoSource>(
    videos.Blocks,
  )
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [reset, setReset] = useState(false)
  const showMenu = selectedSection === null

  const transitionProps = useSpring({
    reset,
    from: { opacity: 0, transform: 'translateY(100px)' },
    opacity: !showMenu ? 1 : 0,
    transform: !showMenu ? 'translateY(0)' : 'translateY(100px)',
    config: config.slow,
    onRest: () => setReset(false),
  })

  const openSection = (section: Section | null) => {
    setSelectedSection(section)
    setReset(true)
  }

  const ActivePanel = selectedSection && sections[selectedSection].Panel

  return (
    <main className='flex h-screen flex-row items-center justify-between gap-12 overflow-hidden relative md:p-10 text-sm'>
      <div className='md:backdrop-blur-none backdrop-blur-md z-50 p-4 h-full w-full'>
        <div className='flex flex-col h-full md:w-[100%] w-full justify-end'>
          <header className='mb-8'>
            <h1 className='text-gray-300'>{profile.name}</h1>
            <p className='text-gray-500'>{profile.role}</p>
            <p className='text-gray-600'>{profile.stack}</p>
            <p className='text-gray-600 pb-1'>{profile.currently}</p>
            <div className='text-white flex flex-row gap-2 items-center'>
              <button
                type='button'
                aria-label='Show block animation'
                aria-pressed={selectedVideo === videos.Blocks}
                onClick={() => setSelectedVideo(videos.Blocks)}
              >
                {selectedVideo === videos.Blocks ? (
                  <TiPlus style={{ fontSize: '20px' }} />
                ) : (
                  <TiPlusOutline style={{ fontSize: '20px' }} />
                )}
              </button>
              <button
                type='button'
                aria-label='Show ring animation'
                aria-pressed={selectedVideo === videos.Rings}
                onClick={() => setSelectedVideo(videos.Rings)}
              >
                {selectedVideo === videos.Rings ? (
                  <BiSolidCircle style={{ fontSize: '15px' }} />
                ) : (
                  <BiCircle style={{ fontSize: '15px' }} />
                )}
              </button>
            </div>
          </header>

          <animated.div className='w-full h-[100%]'>
            {showMenu && (
              <nav aria-label='Sections'>
                <ul className='flex flex-col gap-2'>
                  {(Object.keys(sections) as Section[]).map((section) => (
                    <li key={section}>
                      <button
                        type='button'
                        className={menuItemClass}
                        onClick={() => openSection(section)}
                      >
                        {sections[section].label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <MenuLink href='/resume'>Resume</MenuLink>
                  </li>
                </ul>
              </nav>
            )}

            {/* Panels are mounted on demand so each section keeps simple state. */}
            {ActivePanel && (
              <ActivePanel
                style={transitionProps}
                onBack={() => openSection(null)}
              />
            )}
          </animated.div>

          {showMenu && (
            <footer className='w-full flex flex-col md:text-gray-700 text-gray-400 z-50'>
              <p>Built with Next.js, TypeScript, and Tailwind</p>
              <p>Animations made in Blender</p>
              <InlineLink
                href={profile.links.source}
                className='w-fit hover:text-white'
              >
                View source
              </InlineLink>
            </footer>
          )}
        </div>
      </div>

      <div className='md:flex md:w-[80%] hidden md:flex-col md:items-center md:justify-center'>
        <BackgroundVideo
          key={`desktop-${selectedVideo.webm}`}
          selectedVideo={selectedVideo}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='md:hidden absolute w-[200%] top-[35%] right-[-120%]'>
        <BackgroundVideo
          key={`mobile-${selectedVideo.webm}`}
          selectedVideo={selectedVideo}
          className='w-full h-full object-cover'
        />
      </div>
    </main>
  )
}
