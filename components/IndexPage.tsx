import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import Posts from 'components/Posts'
import * as fallback from 'lib/fallback.data'
import type { About, Photo, Post, Settings } from 'lib/sanity.queries'

import { AboutMe } from './AboutMe'
import { HireMeCTA } from './HireMeCTA'
import { LinkedInCTA } from './LinkedInCTA'
import Photos from './Photos'

export interface IndexPageProps {
  about?: About
  preview?: boolean
  loading?: boolean
  posts: Post[]
  photos: Photo[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings, about, photos } = props
  const { title = fallback.title } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} />
          <AboutMe {...about} />
          <div className="container mx-auto max-md:px-2 mt-2">
            <div className="flex flex-row max-md:flex-col mb-5 gap-2">
              <LinkedInCTA />
              <HireMeCTA />
            </div>
            {posts.length > 0 && <Posts posts={posts} />}
            {photos.length > 0 && <Photos photos={photos} />}
          </div>
        </Container>
      </Layout>
    </>
  )
}
