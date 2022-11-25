import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { PreviewSuspense } from 'components/PreviewSuspense'
import { getAllPosts, getSettings } from 'lib/sanity.client'
import { previewData } from 'next/headers'
import { redirect } from 'next/navigation'

// FIXME: https://github.com/vercel/next.js/issues/43147
// const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

// FIXME: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/issues/95

export default async function PreviewIndexRoute() {
  // If preview mode isn't active, we redirect to the production page
  if (!previewData()) {
    return redirect('/')
  }

  // Fetch queries in parallel
  const [settings, posts] = await Promise.all([getSettings(), getAllPosts()])
  const token = previewData().token || null

  return (
    <PreviewSuspense
      fallback={<IndexPage loading preview posts={posts} settings={settings} />}
    >
      <PreviewIndexPage token={token} />
    </PreviewSuspense>
  )
}
