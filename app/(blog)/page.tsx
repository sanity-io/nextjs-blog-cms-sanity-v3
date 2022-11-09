import { previewData } from 'next/headers'

import HeroPost from '../../components/hero-post'
import MoreStories from '../../components/more-stories'
import { indexQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'

export default async function BlogPage() {
  const preview = !!previewData()
  let allPosts = []
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  }
  const [heroPost, ...morePosts] = allPosts || []

  return (
    <>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </>
  )
}
