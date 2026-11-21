import { site } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line px-6 py-12 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-center md:justify-between">
          <p className="mono-label uppercase">Elsewhere</p>
          <nav aria-label="Social links" className="flex flex-wrap gap-x-8 gap-y-2">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent"
              >
                {s.label}
                <span aria-hidden="true" className="text-accent">↗</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <span className="mono-label">
            © {year} <span className="text-text">Built with care.</span>
          </span>
          <span className="mono-label uppercase">
            {site.location} · {site.timezone}
          </span>
          <a href="#top" className="mono-label inline-flex min-h-11 items-center uppercase transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
