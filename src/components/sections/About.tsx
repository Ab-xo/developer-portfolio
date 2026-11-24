import { useRef } from 'react'
import { gsap, SplitText } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { about } from '../../data/site'
import { SectionHeader } from '../ui/SectionHeader'

// About: pinned section where paragraph words fade from dim to bright as you
// scroll. Small stat cards count up on enter.
export function About() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const para = root.querySelector('[data-word-fade]')
        if (para) {
          const split = new SplitText(para, { type: 'words', wordsClass: 'word-fade' })

          gsap.to(split.words, {
            color: 'var(--color-text)',
            stagger: 1,
            duration: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: para,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          })
        }

        // Count-up stats
        gsap.utils.toArray<HTMLElement>('[data-count-up]').forEach((el) => {
          const text = el.textContent ?? ''
          const match = text.match(/[\d.]+/)
          if (!match) return
          const target = parseFloat(match[0])
          const suffix = el.dataset.suffix ?? text.slice(match.index! + match[0].length)
          const prefix = text.slice(0, match.index)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            snap: { v: target % 1 !== 0 ? 0.01 : 1 },
            onUpdate: () => { el.textContent = prefix + String(obj.v) + suffix },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48"
    >
      <SectionHeader index="04" eyebrow={about.eyebrow} title={about.title} />

      {/* Pinned word-fade paragraph */}
      <div className="mt-16 max-w-4xl">
        <p
          data-word-fade
          className="text-[clamp(1.25rem,2.5vw,2rem)] font-display font-normal leading-[1.4] tracking-tight text-faint"
        >
          {about.pinnedParagraph}
        </p>
      </div>

      {/* Count-up stat cards */}
      <div className="mt-20 grid gap-4 sm:grid-cols-3">
        {about.stats.map((s) => (
          <div
            key={s.k}
            data-reveal
            className="accent-border rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/30"
          >
            <p
              className="font-display text-[clamp(2rem,4vw,3rem)] text-accent tabular-nums"
              data-count-up
              data-suffix={s.suffix}
            >
              {s.v}{s.suffix}
            </p>
            <p className="mt-2 mono-label uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Education + extras */}
      <div className="mt-20 grid gap-14 border-t border-line pt-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="mono-label uppercase text-accent">Education</h3>
          <ol className="mt-6 divide-y divide-line">
            {about.education.map((item) => (
              <li key={item.qualification} className="py-6 first:pt-0 last:pb-0">
                <h4 className="font-display text-2xl font-medium">{item.qualification}</h4>
                <p className="mt-2 text-sm text-text">{item.institution}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="mono-label uppercase text-accent">Languages</h3>
            <p className="mt-4 text-text">{about.languages.join(' · ')}</p>
          </div>
          <div>
            <h3 className="mono-label uppercase text-accent">Tools</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {about.tools.map((tool) => (
                <li key={tool} className="text-sm text-muted">{tool}</li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mono-label uppercase text-accent">Outside work</h3>
            <p className="mt-4 text-sm text-muted">{about.interests.join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
