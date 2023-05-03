import { dataset, projectId, studioBasePath } from 'lib/sanity.api'
import { createClient } from 'next-sanity'
import { LiveStoreProvider } from 'next-sanity/preview/live-store'
import { useMemo } from 'react'

/**
 * LiveStoreProvider requires Content Source Maps in order to preview in real-time, as you type, changes as they happen.
 * If Visual Editing isn't used, and the amount of documents isn't in the tens of thousands then:
 * import {GroqStoreProvider} from 'next-sanity/preview-groq-store'
 * can be used instead.
 */

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) {
  const client = useMemo(
    () =>
      createClient({
        projectId,
        dataset,
        studioUrl: studioBasePath,
        // encodeSourceMap: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        encodeSourceMap: true,
        perspective: 'previewDrafts',
        // required by previewDrafts
        apiVersion: 'X',
        useCdn: false,
        token,
        ignoreBrowserTokenWarning: true,
      }),
    [token]
  )
  return <LiveStoreProvider client={client}>{children}</LiveStoreProvider>
}
