import PostPage, { PostPageProps } from 'components/PostPage'
import { type Post, postAndMoreStoriesQuery } from 'lib/sanity.queries'
import { useListeningQuery } from 'next-sanity/preview'

const initialData: { post: Post; morePosts: Post[] } = {
  post: null,
  morePosts: [],
}

export default function PreviewPostPage({ post, settings }: PostPageProps) {
  const { post: postPreview, morePosts }: { post: Post; morePosts: Post[] } =
    useListeningQuery(initialData, postAndMoreStoriesQuery, {
      slug: post.slug,
    })

  return (
    <PostPage
      preview
      post={postPreview}
      morePosts={morePosts}
      settings={settings}
    />
  )
}
