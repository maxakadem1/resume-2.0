'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'

const MEASUREMENT_ID = 'G-5HV07H8C8H'
let initialized = false

/** Sends a GA4 page view on every route change. */
export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!initialized) {
      ReactGA.initialize(MEASUREMENT_ID)
      initialized = true
    }
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])

  return null
}
