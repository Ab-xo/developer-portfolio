import { lazy, Suspense, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { site } from '../../data/site'
import { MagneticButton } from '../ui/MagneticButton'
import { ScrollIndicator } from '../ui/ScrollIndicator'

const HeroScene = lazy(() =>
  import('../ui/HeroScene').then(({ HeroScene: Scene }) => ({ default: Scene })),
)

// Hero: full viewport. 3D animated sphere behind the portrait (with a
// placeholder .glb slot), split-text headline reveal, marquee tagline,
// and two magnetic buttons. Mouse-parallax tilt on the 3D element.
export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!ready) return
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
        gsap.set(lines, { yPercent: 120 })
        gsap.set('[data-hero-visual]', { autoAlpha: 0, scale: 0.85 })
        gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 24 })

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.to('[data-hero-visual]', { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power2.out' })
          .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1 }, '-=0.9')
          .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.5')
      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [ready])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden bg-bg px-6 pb-16 pt-32 md:min-h-[100svh] md:px-10 md:pb-20 md:pt-36"
    >
      <div className="hero-atmosphere" aria-hidden />

      {/* Corner HUD readouts */}
      <div className="pointer-events-none absolute inset-x-6 top-28 z-20 flex justify-between md:inset-x-10 md:top-32">
        <div className="hero-readout">
          <span>{site.availability}</span>
          <span>{site.fullName}</span>
        </div>
        <span className="hero-readout hidden md:block">
          {site.location} · {site.timezone}
        </span>
      </div>

      <div className="relative z-10 mx-auto mt-10 grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 md:mt-8 md:grid-cols-[minmax(0,1fr)_300px] lg:mt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
        {/* Left: headline + CTAs */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="max-w-[12ch] font-display text-[clamp(2.75rem,12vw,4rem)] font-medium leading-[0.98] md:text-[clamp(3.75rem,7vw,6rem)] lg:text-[clamp(5rem,7vw,7.5rem)]">
            {site.heroLines.map((line, i) => (
              <span key={line} className="reveal-mask">
                <span
                  data-hero-line
                  className={`block ${i === 2 ? 'italic-accent text-gradient-accent' : ''}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Marquee tagline */}
          <div data-hero-fade className="marquee relative mt-6 overflow-hidden border-y border-line py-3 md:mt-8">
            <div className="marquee-track" style={{ '--marquee-duration': '25s', '--marquee-gap': '3rem' } as React.CSSProperties}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="font-mono text-sm uppercase tracking-widest text-muted">
                  {site.tagline}
                  <span className="ml-3 text-accent">◆</span>
                </span>
              ))}
            </div>
          </div>

          <p data-hero-fade className="mt-6 max-w-xl text-base text-muted md:mt-8 md:text-lead">
            {site.oneLiner}
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
            <MagneticButton href="#work">View Projects</MagneticButton>
            <MagneticButton href="/Abraham_Gebeyehu_CV.pdf" variant="outline">
              Download CV
            </MagneticButton>
          </div>

          <div data-hero-fade className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 md:mt-12 md:gap-x-8 md:pt-6">
            <span className="mono-label uppercase">BSc Computer Science</span>
            <span className="mono-label uppercase">CGPA 3.87 / 4.00</span>
            <span className="mono-label uppercase">Freelance since 2022</span>
          </div>
        </div>

        {/* Right: 3D avatar with particle/wireframe sphere */}
        <div data-hero-visual className="relative z-10 mx-auto w-[160px] sm:w-[200px] md:mb-10 md:w-full md:max-w-[300px] lg:max-w-[380px]">
          <div className="absolute -inset-8 rounded-full bg-[radial-gradient(ellipse,rgba(45,212,191,0.18),transparent_70%)] blur-2xl" aria-hidden />
          <div className="absolute -inset-4 z-0" aria-hidden>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
          {/* 3D avatar placeholder: drop a .glb here to replace the static portrait */}
          <div
            role="img"
            aria-label="Portrait of Abraham Gebeyehu"
            className="relative z-10 aspect-square w-full"
          >
            <img
              src="/avatar.png"
              alt="Portrait of Abraham Gebeyehu"
              width="700"
              height="700"
              fetchPriority="high"
              className="hero-portrait-image relative h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      <ScrollIndicator className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-10 md:right-auto md:translate-x-0" />
    </section>
  )
}
