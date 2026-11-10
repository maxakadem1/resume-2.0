'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Reveals every `[data-reveal]` element the first time it scrolls into view.
 * One observer for the whole page, so sections stay server components and
 * only need the attribute.
 */
export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not([data-reveal="in"])',
    )

    if (!('IntersectionObserver' in window)) {
      pending.forEach((el) => el.setAttribute('data-reveal', 'in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal', 'in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    pending.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
