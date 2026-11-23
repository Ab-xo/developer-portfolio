import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { site } from '../../data/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Preloader: name reveals letter by letter, a progress line fills, then a
// clip-path wipe clears the panel to reveal the hero. Under 1.5s total.
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [count, setCount] = useState(0)
  const reduced = useReducedMotion()
  const letters = site.fullName.split('')

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const finish = () => {
      document.documentElement.style.overflow = ''
      onDone()
    }

    if (reduced) {
      setCount(100)
      const t = window.setTimeout(finish, 200)
      return () => window.clearTimeout(t)
    }

    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.to(barRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to(
        counter,
        { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => setCount(Math.round(counter.v)) },
        0,
      )
      .from(
        '[data-preloader-letter]',
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.5,
          ease: 'expo.out',
          stagger: 0.04,
        },
        0.1,
      )
      .to(rootRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.9,
        ease: 'expo.inOut',
        delay: 0.15,
        onComplete: finish,
      })

    return () => {
      tl.kill()
      document.documentElement.style.overflow = ''
    }
  }, [onDone, reduced])

  return (
    <div
      ref={rootRef}
      className="clip-wipe-up fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-6 py-8 md:px-10 md:py-10"
      role="status"
      aria-label="Loading"
    >
      <div className="flex items-center justify-between">
        <span className="mono-label uppercase">{site.role}</span>
        <span className="mono-label uppercase">{site.location}</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <h1
          ref={nameRef}
          className="flex flex-wrap justify-center gap-x-1 font-display text-[clamp(2rem,8vw,4rem)] font-medium leading-none tracking-tight"
          aria-label={site.fullName}
        >
          {letters.map((char, i) => (
            <span key={i} className="reveal-mask">
              <span data-preloader-letter className={`inline-block ${char === ' ' ? 'w-3' : ''}`}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))}
        </h1>
        <span className="mono-label uppercase text-accent">{site.title}</span>
      </div>

      <div className="flex items-end justify-between">
        <span className="mono-label uppercase">
          Portfolio <span className="px-2 text-faint">/</span> Initializing
        </span>
        <span className="font-mono text-2xl tabular-nums text-accent md:text-4xl">
          {String(count).padStart(3, '0')}
        </span>
      </div>

      <div className="relative h-px w-full bg-line">
        <span
          ref={barRef}
          className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-accent"
        />
      </div>
    </div>
  )
}
