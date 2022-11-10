import { previewData } from 'next/headers'

import Container from '../../components/container'
import IntroTemplate from '../../components/intro-template'
import PreviewSuspense from '../../components/PreviewMode/PreviewSuspense'
import Header from './Header'
import IndexPosts from './IndexPosts'
import PreviewIndexPosts from './PreviewIndexPosts'
import { getAllPosts, getTitle } from './server.utils'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { utm?: string }
}) {
  const preview = previewData()
  if (preview) {
    const { token } = preview

    // @TODO follow up on best practices for lazy loading preview-only components in Next 13, as they're still part of the bundle even when preview mode is disabled
    return (
      <>
        <Container>
          <PreviewSuspense
            fallback={
              <>
                <Header level={1} title="Loading…" />
                <div className="mb-8 md:mb-16">
                  <div className="flex aspect-[2/1] items-center justify-center">
                    <svg
                      className="sticky bottom-2 mr-3 -ml-1 h-5 w-5 animate-spin text-inherit"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                </div>
              </>
            }
          >
            <PreviewIndexPosts token={token} />
          </PreviewSuspense>
        </Container>
        {!searchParams.utm && <IntroTemplate />}
      </>
    )
  }

  // Start fetching early, but don't await, so the queries can run in parallel
  const title = getTitle()
  const allPosts = getAllPosts()
  const [heroPost, ...morePosts] = await allPosts

  return (
    <>
      <Container>
        <Header level={1} title={await title} />
        <IndexPosts hero={heroPost} more={morePosts} />
      </Container>
      {!searchParams.utm && <IntroTemplate />}
    </>
  )
}

// @TODO test if it works
export const revalidate = 61

export const runtime = 'experimental-edge'
