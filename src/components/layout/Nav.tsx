import { useEffect, useState } from 'react'
import { nav, site } from '../../data/site'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-line bg-bg/75 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10"
      >
        <a
          href="#top"
          aria-label="Portfolio home"
          className="group flex min-h-11 items-center gap-3"
        >
          <span className="brand-mark-shell" aria-hidden="true">
            <svg className="brand-mark" viewBox="0 0 40 32" fill="none">
              <defs>
                <linearGradient id="brand-mark-gradient" x1="4" y1="27" x2="35" y2="5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--color-accent)" />
                  <stop offset="1" stopColor="var(--color-coral)" />
                </linearGradient>
              </defs>
              <path d="M4 27 14 5l10 22M8 18h12" />
              <path d="M34 10c-2-3-5-4-8-3-5 1-8 5-8 10s3 9 8 10c4 1 8-1 10-5v-5h-7" />
            </svg>
          </span>
          <span className="brand-wordmark">{site.fullName}</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex lg:gap-9">
          {nav.map((item, i) => (
            <li key={item.target}>
              <a
                href={item.target}
                className="group relative inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-300 hover:text-text"
              >
                <span className="mr-2 font-mono text-[10px] tabular-nums text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
                <span className="absolute bottom-3 left-7 h-px w-0 bg-accent transition-all duration-300 group-hover:w-[calc(100%-1.75rem)]" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden min-h-11 items-center rounded-full border border-line px-5 text-sm text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent lg:inline-flex"
        >
          Let&apos;s talk <span aria-hidden="true" className="ml-2 text-accent">↗</span>
        </a>

        <button
          className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-px w-full bg-text transition-transform duration-300 ${
                open ? 'translate-y-[9px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-full bg-text transition-opacity duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-px w-full bg-text transition-transform duration-300 ${
                open ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-transparent'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {nav.map((item) => (
            <li key={item.target}>
              <a
                href={item.target}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
