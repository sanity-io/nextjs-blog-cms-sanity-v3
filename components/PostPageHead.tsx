import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Post, Settings } from 'lib/sanity.queries'

export interface PostPageHeadProps {
  settings: Settings
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      <BlogMeta />
      {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </>
  )
}
