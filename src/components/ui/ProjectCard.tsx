import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../../data/projects'

type Props = {
  project: Project
  onOpen: (project: Project) => void
}

// Project card: spotlight glow follows the cursor, hover tilt, and click
// opens a case-study modal. Full-width on mobile, fixed-width on desktop
// (inside the horizontal scroll track).
export function ProjectCard({ project, onOpen }: Props) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const mx = ((e.clientX - r.left) / r.width) * 100
    const my = ((e.clientY - r.top) / r.height) * 100
    e.currentTarget.style.setProperty('--mx', `${mx}%`)
    e.currentTarget.style.setProperty('--my', `${my}%`)
  }

  return (
    <article
      data-tilt
      onMouseMove={onMove}
      onClick={() => project.caseStudy && onOpen(project)}
      className={`spotlight-card project-card group relative isolate flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/75 shadow-card transition-[border-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-[var(--shadow-glow)] md:h-[540px] md:w-[420px] md:flex-shrink-0 ${
        project.caseStudy ? 'cursor-pointer' : ''
      }`}
    >
      <div className="project-visual relative h-48 overflow-hidden border-b border-line sm:h-56 md:h-[240px]">
        {project.id === 'addis-ride' ? (
          <img src="/addis-ride-dashboard.png" alt={`${project.title} dashboard`} loading="lazy" decoding="async" className="project-screenshot" />
        ) : project.id === 'ak-drop' ? (
          <img src="/ak-drop-commerce.png" alt={`${project.title} storefront`} loading="lazy" decoding="async" className="project-screenshot" />
        ) : (
          <div
            className="project-art"
            style={{ background: `radial-gradient(circle at 72% 45%, hsla(${project.hue}, 70%, 58%, 0.25), transparent 35%), linear-gradient(135deg, #16211f, #080c0c)` }}
            aria-hidden
          >
            <span>{project.index}</span>
          </div>
        )}
        <div className="project-image-shade" aria-hidden />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3 md:inset-x-5 md:top-5">
          <span className="max-w-[70%] rounded-full border border-white/10 bg-bg/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-text backdrop-blur-md">
            {project.index} <span className="px-1.5 text-accent">/</span> {project.category}
          </span>
          <span className="rounded-full border border-white/10 bg-bg/75 px-3 py-1.5 font-mono text-[10px] text-muted backdrop-blur-md">
            {project.year}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-medium leading-tight transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-[1.7rem]">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.description}</p>
        <p className="mt-3.5 border-l border-accent/60 pl-3 text-sm text-text">{project.outcome}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
          {project.caseStudy && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(project) }}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-text"
              aria-label={`View case study: ${project.title}`}
            >
              Case study <ArrowUpRight size={14} aria-hidden />
            </button>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <Github size={15} aria-hidden /> Source
          </a>
          {project.demoHref && (
            <a
              href={project.demoHref}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-accent transition-colors hover:text-text"
            >
              Live demo <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
