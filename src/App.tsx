import { useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import { Cursor } from './components/ui/Cursor'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Preloader } from './components/sections/Preloader'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { SelectedWork } from './components/sections/SelectedWork'
import { Skills } from './components/sections/Skills'
import { Experience } from './components/sections/Experience'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

export function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  useEffect(() => {
    if (!ready) return

    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>('main > section:not(:first-child):not(#work), #work article')
          .forEach((element, index) => {
            const inWork = element.closest('#work')
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 48, filter: 'blur(8px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                delay: inWork ? (index % 2) * 0.12 : 0,
                ease: 'expo.out',
                clearProps: 'opacity,visibility,transform,filter',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  once: true,
                },
              },
            )
          })

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 32, filter: 'blur(6px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'expo.out',
              clearProps: 'opacity,visibility,transform,filter',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-draw-line]').forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'expo.out',
              transformOrigin: 'left',
              scrollTrigger: { trigger: line, start: 'top 90%', once: true },
            },
          )
        })
      })
      return () => context.revert()
    })

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      window.clearTimeout(t)
      motion.revert()
    }
  }, [ready])

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <div className="film-grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <ScrollProgress />
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Intro />
        <SelectedWork />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
