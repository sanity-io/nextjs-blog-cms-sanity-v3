'use client'

import { Suspense, useEffect, useReducer } from 'react'

/**
 * Preview Mode really needs to only load as client-only, as it uses EventSource to stream data from Content Lake
 * We don't want to run anything on the server but the fallback until it's loaded
 */

export default function PreviewSuspense({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback: React.ReactNode
}) {
  const [mounted, setMounted] = useReducer(() => true, false)
  useEffect(setMounted, [setMounted])

  return (
    <Suspense fallback={fallback}>{mounted ? children : fallback}</Suspense>
  )
}
