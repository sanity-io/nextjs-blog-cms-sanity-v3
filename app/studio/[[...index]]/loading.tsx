'use client'

/**
 * This route enables showing a loading state right away so that the user knows the studio is loading
 */

import NextStudioLoading from 'next-sanity/studio/loading'
import config from 'sanity.config'

export default function Loading() {
  return <NextStudioLoading config={config} />
}
