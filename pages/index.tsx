import IndexPage from 'components/IndexPage'
import { getAllPosts, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

const PreviewProvider = lazy(() => import('components/PreviewProvider'))
const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

interface PageProps {
  posts: Post[]
  settings: Settings
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, preview, token } = props

  if (preview) {
    return (
      <PreviewProvider token={token}>
        <PreviewIndexPage posts={posts} settings={settings} />
      </PreviewProvider>
    )
  }

  return <IndexPage posts={posts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { preview = false } = ctx
  const token = preview ? process.env.SANITY_API_READ_TOKEN ?? null : null

  const [settings, posts = []] = await Promise.all([
    getSettings(token),
    getAllPosts(token),
  ])

  return { props: { posts, settings, preview, token } }
}
