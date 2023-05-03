import IndexPage from 'components/IndexPage'
import {
  indexQuery,
  type Post,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useListeningQuery } from 'next-sanity/preview'

export default function PreviewIndexPage({
  posts: initialPosts,
  settings: initialSettings,
}: {
  posts: Post[]
  settings: Settings
}) {
  const posts: Post[] = useListeningQuery(initialPosts, indexQuery) || []
  const settings: Settings =
    useListeningQuery(initialSettings, settingsQuery) || {}

  return <IndexPage preview posts={posts} settings={settings} />
}
