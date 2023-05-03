import PostPage from 'components/PostPage'
import {
  getAllPostsSlugs,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

const PreviewProvider = lazy(() => import('components/PreviewProvider'))
const PreviewPostPage = lazy(() => import('components/PreviewPostPage'))

interface PageProps {
  post: Post
  morePosts: Post[]
  settings?: Settings
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, morePosts, preview, token } = props

  if (preview) {
    return (
      <PreviewProvider token={token}>
        <PreviewPostPage
          post={post}
          morePosts={morePosts}
          settings={settings}
        />
      </PreviewProvider>
    )
  }

  return <PostPage post={post} morePosts={morePosts} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(token),
    getPostAndMoreStories(params.slug, token),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      morePosts,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: 'blocking',
  }
}
