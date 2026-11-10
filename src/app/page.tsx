import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Record from '@/components/Record'
import Work from '@/components/Work'

export default function Home() {
  return (
    <>
      <main id='main'>
        <Hero />
        <Work />
        <Projects />
        <Record />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
