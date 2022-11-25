import PostPage from 'components/PostPage'
import PreviewPostPage from 'components/PreviewPostPage'
import { PreviewSuspense } from 'components/PreviewSuspense'
import { getPostAndMoreStories, getSettings } from 'lib/sanity.client'
import { previewData } from 'next/headers'
import { redirect } from 'next/navigation'

// FIXME: https://github.com/vercel/next.js/issues/43147
// const PreviewPostPage = lazy(() => import('components/PreviewPostPage'))

// FIXME: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/issues/95

export default async function SlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  // If preview mode isn't active, we redirect to the production page
  if (!previewData()) {
    return redirect(`/posts/${params.slug}`)
  }

  // Start fetching settings early, so it runs in parallel with the post query
  const settings = getSettings()

  const token = previewData().token || null
  const data = getPostAndMoreStories(params.slug, token)
  return (
    <PreviewSuspense
      fallback={
        <PostPage loading preview data={await data} settings={await settings} />
      }
    >
      <PreviewPostPage token={token} slug={params.slug} />
    </PreviewSuspense>
  )
}
