import 'tailwindcss/tailwind.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppProps } from 'next/app'
import { lazy, Suspense } from 'react'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      {draftMode && <VisualEditing />}
    </>
  )
}
