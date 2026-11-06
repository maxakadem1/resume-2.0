'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { initGA, logPageView } from '../../analytics'

declare global {
  interface Window {
    GA_INITIALIZED?: boolean
  }
}

/** Sends a GA4 page view on every route change. */
export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [pathname])

  return null
}
