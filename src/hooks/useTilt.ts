import { useEffect, type RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

export function useTiltGroup(ref: RefObject<HTMLElement | null>, maxTilt = 5) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const container = ref.current
    if (!container || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const elements = container.querySelectorAll<HTMLElement>('[data-tilt]')
    const cleanups: Array<() => void> = []

    elements.forEach((el) => {
      gsap.set(el, { transformPerspective: 1000, transformOrigin: 'center' })
      const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
      const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        rotX((py - 0.5) * -2 * maxTilt)
        rotY((px - 0.5) * 2 * maxTilt)
        yTo(-6)
      }

      const onLeave = () => {
        rotX(0)
        rotY(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [ref, reduced, maxTilt])
}
