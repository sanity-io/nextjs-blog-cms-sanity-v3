import { previewData } from 'next/headers'
import { Suspense } from 'react'

import { indexQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import IndexPosts from './IndexPosts'

export default async function BlogPage() {
  const preview = !!previewData()

  if (preview) {
    return (
      <Suspense
        fallback={
          <div className="mb-8 md:mb-16">
            <div className="flex aspect-[2/1] items-center justify-center">
              <div className="sticky flex flex-col items-center justify-center bottom-2">
                <svg
                  className="w-6 h-6 mr-3 -ml-1 animate-spin text-inherit"
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
                    stroke-width="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="block mt-2 text-sm">Loading preview…</p>
              </div>
            </div>
          </div>
        }
      >
        TODO
      </Suspense>
    )
  }

  let allPosts = []
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  }
  const [heroPost, ...morePosts] = allPosts || []

  return <IndexPosts hero={heroPost} more={morePosts} />
}
