import Avatar from 'components/AuthorAvatar'
import type { Post } from 'lib/sanity.queries'

import CoverImage from './cover-image'
import Date from './date'
import PostTitle from './post-title'

export default function PostHeader(props: Post) {
  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
