import { BrainCircuit, Layers3, Sparkles } from 'lucide-react'
import { aiFocus } from '../../data/site'
import { SectionHeader } from '../ui/SectionHeader'
import { HudGrid } from '../ui/HudGrid'

const pillarDetails = [
  { icon: BrainCircuit, focus: 'Forecasting · vision · evaluation' },
  { icon: Sparkles, focus: 'Resume analysis · LLMs · RAG' },
  { icon: Layers3, focus: 'Interfaces · APIs · data' },
]

export function AiEngineering() {
  return (
    <section id="ai" className="relative overflow-hidden border-y border-line bg-surface">
      <HudGrid className="opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56">
        <SectionHeader index="05" eyebrow={aiFocus.eyebrow} title={aiFocus.title} />

        <p className="mt-12 max-w-2xl text-lead text-muted">{aiFocus.body}</p>

        <div className="mt-14 grid auto-rows-fr gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {aiFocus.pillars.map((pillar, i) => {
            const { icon: Icon, focus } = pillarDetails[i]

            return (
              <article
                key={pillar.k}
                data-reveal
                className={`ai-pillar-card group relative isolate flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-line bg-bg/70 p-6 transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-surface-2 sm:p-8 lg:min-h-[360px] ${i === 2 ? 'md:col-span-2 md:mx-auto md:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 text-accent">
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-faint tabular-nums">
                    0{i + 1} <span className="text-line-strong">/</span> 03
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="max-w-[14ch] text-h3 font-display">{pillar.k}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{pillar.v}</p>
                </div>

                <div className="mt-auto border-t border-line pt-5">
                  <p className="mono-label text-[9px] uppercase tracking-[0.12em]">
                    {focus}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
