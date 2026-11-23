import { introStatement } from '../../data/site'
import { SplitReveal } from '../ui/SplitReveal'

// Personal statement. Mask-reveal on scroll. Large type, generous space.
export function Intro() {
  return (
    <section
      id="intro"
      className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48"
    >
      <div className="flex items-center gap-4">
        <span className="mono-label uppercase">{introStatement.eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-14 max-w-5xl">
        <SplitReveal as="p" onScroll type="lines" className="text-h1 font-display italic" stagger={0.1}>
          {introStatement.lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </SplitReveal>

        <SplitReveal
          as="p"
          onScroll
          type="lines"
          delay={0.1}
          className="mt-12 max-w-2xl text-lead text-muted"
        >
          {introStatement.body}
        </SplitReveal>
      </div>
    </section>
  )
}
