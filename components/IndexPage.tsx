import BlogHeader from 'components/blog-header'
import Container from 'components/container'
import HeroPost from 'components/HeroPost'
import Layout from 'components/layout'
import MoreStories from 'components/MoreStories'
import IntroTemplate from 'intro-template'
import type { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export default function IndexPage(props: {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts
  const { title = 'Blog.' } = settings

  return (
    <>
      <Layout preview={preview} loading={loading}>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <BlogHeader title={title} />
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
        </Container>
        <IntroTemplate />
      </Layout>
    </>
  )
}
