import PostPage, { PostPageProps } from 'components/PostPage'
import {
  type Post,
  postQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview }, loadingPost] = useLiveQuery<{
    post: Post
  }>(
    { post: props.post },
    postQuery,
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
      settings={settings}
    />
  )
}
