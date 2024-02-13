import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'

import { SectionHeader } from './SectionHeader'

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <section className="flex flex-col items-center">
      <SectionHeader header="Posts" />
      <div className="mb-5 grid grid-cols-1 gap-y-4 lg:grid-cols-4 md:grid-cols-2 md:gap-x-2 md:gap-y-5 lg:gap-x-8">
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
