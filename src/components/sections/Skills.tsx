import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { skills } from '../../data/site'
import { SectionHeader } from '../ui/SectionHeader'

// Skills: interactive grouped tech marquee. Each group scrolls horizontally,
// pauses on hover, and highlights the group label.
export function Skills() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-skill-group]').forEach((group) => {
          gsap.from(group, {
            y: 32,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48"
    >
      <SectionHeader index="02" eyebrow={skills.eyebrow} title={skills.title} />

      <div className="mt-16 space-y-3">
        {skills.groups.map((group, gi) => (
          <div
            key={group.label}
            data-skill-group
            className="group flex flex-col gap-3 border-t border-line py-5 md:flex-row md:items-center md:gap-8"
          >
            <div className="flex min-w-[140px] items-center gap-3 md:min-w-[180px]">
              <span className="font-mono text-xs text-accent tabular-nums">
                {String(gi + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg font-medium text-text transition-colors duration-300 group-hover:text-accent">
                {group.label}
              </h3>
            </div>

            <div className="marquee relative flex-1 overflow-hidden">
              <div
                className="marquee-track"
                style={{
                  '--marquee-duration': `${30 + gi * 8}s`,
                  '--marquee-gap': '1.5rem',
                } as React.CSSProperties}
              >
                {[...group.items, ...group.items].map((item, i) => (
                  <span key={i} className="tech-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
