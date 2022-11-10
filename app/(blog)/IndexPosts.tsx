import { memo } from 'react'

import HeroPost from '../../components/hero-post'
import MoreStories from '../../components/more-stories'
import type { PostProps } from '../../types'

export default memo(function IndexPosts({
  hero,
  more,
}: {
  hero: PostProps
  more: PostProps[]
}) {
  return (
    <>
      {hero && (
        <HeroPost
          title={hero.title}
          coverImage={hero.coverImage}
          date={hero.date}
          author={hero.author}
          slug={hero.slug}
          excerpt={hero.excerpt}
        />
      )}
      {more.length > 0 && <MoreStories posts={more} />}
    </>
  )
})
