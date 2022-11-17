import IndexPage from 'components/IndexPage'
import { projectId } from 'lib/sanity.api'
import { createClient } from 'lib/sanity.client'
import {
  type Post,
  type Settings,
  indexQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

export async function getStaticProps({ preview = false, previewData = {} }) {
  /* check if the project id has been defined by fetching the vercel envs */
  if (projectId) {
    const token = (previewData as any)?.token || null
    const client = createClient()
    const postsPromise = client.fetch<Post[]>(indexQuery)
    const settingsPromise = client.fetch<Settings>(settingsQuery)

    return {
      props: {
        preview,
        token,
        posts: (await postsPromise) || [],
        settings: (await settingsPromise) || {},
      },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  return {
    props: { posts: [], settings: {} },
    revalidate: undefined,
  }
}

export default function Index({ preview, token, posts, settings }) {
  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <IndexPage preview loading posts={posts} settings={settings} />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <IndexPage posts={posts} settings={settings} />
}
