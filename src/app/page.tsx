import AboutSection from '@/components/home/AboutSection'
import ContactSection from '@/components/home/ContactSection'
import ExperienceSection from '@/components/home/ExperienceSection'
import Hero from '@/components/home/Hero'
import PollardSection from '@/components/home/PollardSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import Shell from '@/components/shell/Shell'

export default function Home() {
  return (
    <Shell home>
      <main className='mx-auto w-full max-w-[1240px] px-3 pt-3 sm:px-6 sm:pt-6 xl:px-10'>
        <Hero />
        <PollardSection />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
    </Shell>
  )
}
