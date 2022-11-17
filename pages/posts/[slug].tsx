import PostPage from 'components/PostPage'
import { createClient } from 'lib/sanity.client'
import {
  type Post,
  type Settings,
  postQuery,
  postSlugsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewPostPage = lazy(() => import('components/PreviewPostPage'))

export async function getStaticPaths() {
  const client = createClient()
  const paths = await client.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  const token = (previewData as any)?.token || null
  const client = createClient()
  const dataPromise = client.fetch<Post[]>(postQuery, { slug: params.slug })
  const settingsPromise = client.fetch<Settings>(settingsQuery)

  return {
    props: {
      preview,
      token,
      data: (await dataPromise) || { post: {}, morePosts: [] },
      settings: (await settingsPromise) || {},
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default function Post(props: {
  preview?: boolean
  token: null | string
  data: { post: Post; morePosts: Post[] }
  settings: Settings
}) {
  const { preview, token, data, settings } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={<PostPage preview loading data={data} settings={settings} />}
      >
        <PreviewPostPage token={token} slug={data?.post?.slug} />
      </PreviewSuspense>
    )
  }

  return <PostPage data={data} settings={settings} />
}
