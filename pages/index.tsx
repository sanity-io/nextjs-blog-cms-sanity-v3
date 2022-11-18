import IndexPage from 'components/IndexPage'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import {
  type Post,
  type Settings,
  indexQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { createClient } from 'next-sanity'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

export const getStaticProps: GetStaticProps<
  { preview: boolean; token: string | null; posts: Post[]; settings: Settings },
  any,
  { token?: string }
> = async ({ preview = false, previewData = {} }) => {
  /* check if the project id has been defined by fetching the vercel envs */
  if (projectId) {
    const token = previewData?.token || null
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: preview,
    })
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
    props: { preview: false, token: null, posts: [], settings: {} },
    revalidate: undefined,
  }
}

export default function IndexRoute({
  preview,
  token,
  posts,
  settings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
