import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../../data/projects'

type Props = {
  project: Project
  onOpen: (project: Project) => void
}

// Project card: spotlight glow follows the cursor, hover tilt, and click
// opens a shared-element transition to a case study.
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
      className="spotlight-card project-card group relative isolate flex w-[85vw] max-w-[440px] flex-col overflow-hidden rounded-3xl border border-line bg-surface/75 shadow-card transition-[border-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-[var(--shadow-glow)] sm:w-[400px] md:min-h-[560px]"
    >
      <button
        onClick={() => onOpen(project)}
        className="flex flex-1 flex-col text-left"
        aria-label={`View case study: ${project.title}`}
        data-cursor="hover"
      >
        <div className="project-visual relative h-[200px] overflow-hidden border-b border-line">
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
          <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4">
            <span className="max-w-[75%] rounded-full border border-white/10 bg-bg/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-text backdrop-blur-md">
              {project.index} <span className="px-1.5 text-accent">/</span> {project.category}
            </span>
            <span className="rounded-full border border-white/10 bg-bg/75 px-3 py-1.5 font-mono text-[10px] text-muted backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl font-medium leading-tight transition-colors duration-300 group-hover:text-accent md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
          <p className="mt-4 border-l border-accent/60 pl-3 text-sm text-text">{project.outcome}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
            {project.caseStudy && (
              <span className="inline-flex items-center gap-1.5 text-sm text-accent">
                View case study <ArrowUpRight size={14} aria-hidden />
              </span>
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
      </button>
    </article>
  )
}
