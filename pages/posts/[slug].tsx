import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import MoreStories from '../../components/more-stories'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import PostTitle from '../../components/post-title'
import SectionSeparator from '../../components/section-separator'
import { postQuery, postSlugsQuery, settingsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts, sanityClient } from '../../lib/sanity.server'
import { PostProps } from '../../types'

interface Props {
  data: { post: PostProps; morePosts: any }
  preview: any
  blogSettings: any
}

export default function Post(props: Props) {
  const { data, preview, blogSettings } = props
  const router = useRouter()

  const slug = data?.post?.slug
  const {
    data: { post, morePosts },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug !== '',
  })
  const { title = 'Blog.' } = blogSettings || {}

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header title={title} />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | {title}
                </title>
                {post.coverImage?.asset?._ref && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit('crop')
                      .url()}
                  />
                )}
              </Head>
              <PostHeader
                blogSettings={blogSettings}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  })
  const blogSettings = await getClient(preview).fetch(settingsQuery)

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
      },
      blogSettings,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
