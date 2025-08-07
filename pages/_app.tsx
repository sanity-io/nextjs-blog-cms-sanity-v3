import '../tailwind.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

export interface SharedPageProps {
  previewMode: boolean
  previewPerspective: string | null
  token: string
}

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { previewMode, previewPerspective, token } = pageProps
  return (
    <>
      {previewMode ? (
        <PreviewProvider perspective={previewPerspective} token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      {previewMode && <VisualEditing />}
    </>
  )
}
