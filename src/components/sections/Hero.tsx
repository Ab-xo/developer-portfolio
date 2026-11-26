import { lazy, Suspense, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { site } from '../../data/site'
import { MagneticButton } from '../ui/MagneticButton'
import { ScrollIndicator } from '../ui/ScrollIndicator'

const HeroScene = lazy(() =>
  import('../ui/HeroScene').then(({ HeroScene: Scene }) => ({ default: Scene })),
)

// Hero: full viewport. Split-text headline reveal, marquee tagline, and a
// creative portrait treatment: arched frame, rotating orbit ring, floating
// achievement badges, 3D sphere behind, mouse parallax and scroll parallax.
export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!ready) return
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
        gsap.set(lines, { yPercent: 120 })
        gsap.set('[data-hero-visual]', { autoAlpha: 0, scale: 0.8, y: 40 })
        gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 24 })
        gsap.set('[data-hero-badge]', { autoAlpha: 0, scale: 0.6 })

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.to('[data-hero-visual]', { autoAlpha: 1, scale: 1, y: 0, duration: 1.5 })
          .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1 }, '-=1.1')
          .to('[data-hero-badge]', { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.15 }, '-=0.7')
          .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.6')

        // Rotating orbit ring around the portrait.
        gsap.to('[data-hero-orbit]', {
          rotate: 360,
          duration: 40,
          repeat: -1,
          ease: 'none',
        })

        // Floating badges: gentle independent bobbing.
        gsap.utils.toArray<HTMLElement>('[data-hero-badge]').forEach((badge, i) => {
          gsap.to(badge, {
            y: i % 2 === 0 ? -8 : 8,
            duration: 2.6 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })

        // Portrait breathe: subtle scale loop.
        gsap.to('[data-hero-portrait]', {
          scale: 1.03,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }, root)

      return () => ctx.revert()
    })

    // Mouse parallax on the visual (fine pointers only).
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const visual = visualRef.current
      if (!visual) return

      const xTo = gsap.quickTo(visual, 'rotationY', { duration: 0.8, ease: 'power3.out' })
      const yTo = gsap.quickTo(visual, 'rotationX', { duration: 0.8, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2
        const py = (e.clientY / window.innerHeight - 0.5) * 2
        xTo(px * 8)
        yTo(py * -6)
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    })

    return () => mm.revert()
  }, [ready])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden bg-bg px-6 pb-16 pt-28 md:min-h-[100svh] md:px-10 md:pb-20 md:pt-32"
    >
      <div className="hero-atmosphere" aria-hidden />

      {/* Corner HUD readouts */}
      <div className="pointer-events-none absolute inset-x-6 top-24 z-20 flex justify-between md:inset-x-10 md:top-28">
        <div className="hero-readout">
          <span>{site.availability}</span>
          <span>{site.fullName}</span>
        </div>
        <span className="hero-readout hidden md:block">
          {site.location} · {site.timezone}
        </span>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 md:mt-4 md:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        {/* Left: headline + CTAs */}
        <div className="relative z-10 order-2 max-w-3xl md:order-1">
          <h1 className="font-display text-[clamp(2.75rem,11vw,4.5rem)] font-medium leading-[0.98] md:text-[clamp(3.5rem,6.5vw,6rem)] lg:text-[clamp(4.5rem,6.5vw,7rem)]">
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

        {/* Right: arched portrait with orbit ring + floating badges */}
        <div
          ref={visualRef}
          data-hero-visual
          className="relative order-1 mx-auto w-[220px] sm:w-[260px] md:order-2 md:mr-6 md:w-[300px] lg:mr-12 lg:w-[360px]"
          style={{ perspective: '1000px' }}
        >
          {/* 3D sphere behind */}
          <div className="absolute -inset-16 z-0" aria-hidden>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>

          {/* Rotating dashed orbit ring */}
          <div
            data-hero-orbit
            className="absolute -inset-4 z-10 rounded-full border border-dashed border-accent/25"
            aria-hidden
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(45,212,191,0.9)]" />
          </div>

          {/* Arched portrait frame */}
          <div
            data-hero-portrait
            className="relative z-20 aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-line-strong shadow-[0_40px_120px_-40px_rgba(45,212,191,0.35)]"
            role="img"
            aria-label="Portrait of Abraham Gebeyehu"
          >
            <img
              src="/avatar.png"
              alt="Portrait of Abraham Gebeyehu"
              width="700"
              height="700"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            {/* Subtle gradient tint to blend with background */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          {/* Floating achievement badges */}
          <div
            data-hero-badge
            className="glass absolute -left-6 top-[22%] z-30 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 md:-left-10"
          >
            <span className="font-display text-xl font-semibold text-accent tabular-nums">3.87</span>
            <span className="mono-label text-[8px] leading-tight">CGPA<br />/ 4.00</span>
          </div>

          <div
            data-hero-badge
            className="glass absolute -right-4 bottom-[18%] z-30 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 md:-right-8"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="mono-label text-[8px] leading-tight">Hackathon<br />Top 3</span>
          </div>
        </div>
      </div>

      <ScrollIndicator className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-10 md:right-auto md:translate-x-0" />
    </section>
  )
}
