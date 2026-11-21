import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../../data/projects'
import { HudGrid } from '../ui/HudGrid'

export function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden">
      <HudGrid className="opacity-60" />

      <div className="mx-auto flex max-w-[1400px] items-end justify-between px-6 pt-24 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent">SW</span>
            <span className="mono-label uppercase">Selected Work</span>
          </div>
          <h2 className="max-w-[14ch] text-h2 font-display">Selected projects</h2>
        </div>
        <a
          href="https://github.com/Ab-xo?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="hidden min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent md:inline-flex"
        >
          <Github className="h-4 w-4" aria-hidden="true" /> All repositories
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-5 px-6 py-12 md:grid-cols-2 md:gap-6 md:px-10 md:py-16">
        {projects.map((p) => (
          <article
            key={p.id}
            className="work-card group relative isolate flex min-h-[560px] flex-col overflow-hidden rounded-3xl border border-line bg-surface/75 shadow-[0_24px_70px_-45px_rgba(83,224,194,0.28)] transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_90px_-42px_rgba(83,224,194,0.25)] md:min-h-[590px]"
          >
            <div className="work-card-visual">
              {p.id === 'addis-ride' ? (
                <img
                  src="/addis-ride-dashboard.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="work-card-screenshot"
                />
              ) : p.id === 'ak-drop' ? (
                <img
                  src="/ak-drop-commerce.png"
                  alt="AK Drop ecommerce storefront"
                  loading="lazy"
                  decoding="async"
                  className="work-card-screenshot"
                />
              ) : (
                <div
                  className="work-card-art"
                  style={{
                    background: `radial-gradient(circle at 72% 45%, hsla(${p.hue}, 70%, 58%, 0.28), transparent 35%), linear-gradient(135deg, #16211f, #080c0c)`,
                  }}
                  aria-hidden="true"
                >
                  <span>{p.index}</span>
                </div>
              )}
              <div className="work-card-image-shade" aria-hidden="true" />
              <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 md:inset-x-6 md:top-6">
                <span className="max-w-[75%] rounded-full border border-white/10 bg-bg/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-text backdrop-blur-md">
                  {p.index} <span className="px-1.5 text-accent">/</span> {p.category}
                </span>
                <span className="rounded-full border border-white/10 bg-bg/75 px-3 py-1.5 font-mono text-[10px] text-muted backdrop-blur-md">
                  {p.year}
                </span>
              </div>
              {p.id === 'addis-ride' && (
                <span className="absolute bottom-5 right-5 rounded-full border border-accent/30 bg-bg/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-accent backdrop-blur-md md:bottom-6 md:right-6">
                  Live dashboard
                </span>
              )}
              {p.id === 'ak-drop' && (
                <span className="absolute bottom-5 right-5 rounded-full border border-accent/30 bg-bg/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-accent backdrop-blur-md md:bottom-6 md:right-6">
                  Live storefront
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="font-display text-3xl leading-tight transition-colors duration-300 group-hover:text-accent md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">{p.description}</p>
              <p className="mt-5 border-l border-accent/60 pl-3 text-sm text-text">{p.outcome}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-faint">{t}</span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
                <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
                  <Github className="h-4 w-4" aria-hidden="true" /> Source code
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                {p.demoHref && (
                  <a href={p.demoHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent transition-colors hover:text-text">
                    Live demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
