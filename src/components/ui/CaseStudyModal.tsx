import { ArrowUpRight, Github, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import type { Project } from '../../data/projects'
import { MagneticButton } from './MagneticButton'

type Props = {
  project: Project
  onClose: () => void
}

// Case study modal: opens with a scale + fade transition. Shows problem,
// approach, what it delivers, and links.
export function CaseStudyModal({ project, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const cs = project.caseStudy

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [onClose])

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    const panel = panelRef.current
    if (!root || !panel) return

    const tl = gsap.timeline()
    tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
      .fromTo(
        panel,
        { scale: 0.9, y: 30, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out' },
        '-=0.15',
      )

    return () => tl.kill()
  }, [])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <div
        className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        className="glass relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line-strong p-8 shadow-card md:p-12"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Close case study"
        >
          <X size={18} aria-hidden />
        </button>

        <span className="mono-label uppercase text-accent">
          {project.index} <span className="px-1 text-faint">/</span> {project.category}
        </span>
        <h3 className="mt-4 font-display text-3xl font-medium leading-tight md:text-4xl">
          {project.title}
        </h3>

        <div className="mt-8 space-y-8">
          {cs && (
            <>
              <div>
                <h4 className="mono-label uppercase text-accent">Problem</h4>
                <p className="mt-3 text-base leading-relaxed text-muted">{cs.problem}</p>
              </div>
              <div>
                <h4 className="mono-label uppercase text-accent">Approach</h4>
                <p className="mt-3 text-base leading-relaxed text-muted">{cs.approach}</p>
              </div>
              <div>
                <h4 className="mono-label uppercase text-accent">What it delivers</h4>
                <p className="mt-3 text-base leading-relaxed text-text">{cs.delivers}</p>
              </div>
            </>
          )}

          <div>
            <h4 className="mono-label uppercase text-accent">Tech stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 border-t border-line pt-6">
            {project.demoHref && (
              <MagneticButton href={project.demoHref}>Live demo</MagneticButton>
            )}
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-8 py-3.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={16} aria-hidden /> Source code
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
