import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { projects, type Project } from '../../data/projects'
import { ProjectCard } from '../ui/ProjectCard'
import { CaseStudyModal } from '../ui/CaseStudyModal'
import { useTiltGroup } from '../../hooks/useTilt'

// Featured Projects: horizontal scroll on desktop, stacked cards on mobile.
// Each card has spotlight glow, hover tilt, and opens a case-study modal.
export function SelectedWork() {
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)
  useTiltGroup(rootRef)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return

    const mm = gsap.matchMedia()

    // Desktop: horizontal scroll pin
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const totalScroll = track.scrollWidth - window.innerWidth + 80
        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.to(track, {
              x: -totalScroll * self.progress,
              duration: 0.1,
              ease: 'none',
              overwrite: true,
            })
          },
        })
        return () => st.kill()
      }, root)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="work" ref={rootRef} className="relative overflow-hidden">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between px-6 pt-24 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent">01</span>
            <span className="mono-label uppercase">Featured Projects</span>
          </div>
          <h2 className="max-w-[14ch] text-h2 font-display font-medium">
            Selected <span className="italic-accent">work</span>
          </h2>
        </div>
        <span className="mono-label hidden md:block">
          <span className="text-accent">Scroll</span> to explore →
        </span>
      </div>

      {/* Horizontal track */}
      <div className="mt-12 overflow-hidden md:py-8">
        <div
          ref={trackRef}
          className="flex gap-5 px-6 pb-8 md:gap-6 md:px-10"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setActive} />
          ))}
          {/* End spacer card */}
          <div className="flex w-[85vw] max-w-[440px] flex-shrink-0 items-center justify-center sm:w-[400px]">
            <div className="text-center">
              <p className="mono-label uppercase text-accent">More on GitHub</p>
              <a
                href="https://github.com/Ab-xo?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-lg text-text transition-colors hover:text-accent"
              >
                All repositories <ArrowUpRight size={18} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
