import PostPage from 'components/PostPage'
import {
  getAllPostsSlugs,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { lazy } from 'react'

const PreviewPostPage = lazy(() => import('components/PreviewPostPage'))

export async function generateStaticParams() {
  return await getAllPostsSlugs()
}

export default async function SlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  // Start fetching settings early, so it runs in parallel with the post query
  const settings = getSettings()

  /*
  import { PreviewSuspense } from 'components/PreviewSuspense'
  import { previewData } from 'next/headers'
  if (previewData()) {
    const token = previewData().token || null
    const data = getPostAndMoreStories(params.slug, token)
    return (
      <PreviewSuspense
        fallback={<PostPage loading preview data={await data} settings={await settings} />}
      >
        <PreviewPostPage token={token} slug={params.slug} />
      </PreviewSuspense>
    )
  }
  // */

  const data = getPostAndMoreStories(params.slug)
  return <PostPage data={await data} settings={await settings} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
