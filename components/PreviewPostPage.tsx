import PostPage, { PostPageProps } from 'components/PostPage'
import {
  type Post,
  postAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview, morePosts }, loadingPost] = useLiveQuery<{
    post: Post
    morePosts: Post[]
  }>(
    { post: props.post, morePosts: props.morePosts },
    postAndMoreStoriesQuery,
    {
      slug: props.post.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <PostPage
      preview
      loading={loadingPost || loadingSettings}
      post={postPreview}
      morePosts={morePosts}
      settings={settings}
    />
  )
}
