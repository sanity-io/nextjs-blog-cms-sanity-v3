import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPhotos,
  getAllPosts,
  getClient,
  getMostRecentAbout,
  getSettings,
} from 'lib/sanity.client'
import { About, Photo, Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  photos: Photo[]
  settings: Settings
  about?: About
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode, about, photos } = props

  if (draftMode) {
    return (
      <PreviewIndexPage posts={posts} settings={settings} photos={photos} />
    )
  }

  return (
    <IndexPage
      posts={posts}
      settings={settings}
      about={about}
      photos={photos}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [photos, about, settings, posts = []] = await Promise.all([
    getAllPhotos(client),
    getMostRecentAbout(client),
    getSettings(client),
    getAllPosts(client),
  ])

  return {
    props: {
      about,
      photos,
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
