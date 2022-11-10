'use client'

import { useEffect } from 'react'

import { indexQuery, settingsQuery } from '../../lib/queries'
import { usePreview } from '../../lib/sanity.preview'
import type { PostProps } from '../../types'
import Header from './Header'
import IndexPosts from './IndexPosts'

export default function PreviewIndexPosts({ token }: { token: string }) {
  const { title = 'Blog.' } =
    usePreview<{ title?: string }>(token, settingsQuery) || {}
  const [heroPost, ...morePosts] =
    usePreview<PostProps[]>(token, indexQuery) || []

  useEffect(() => {
    document.title = `[preview] ${title}`
  }, [title])

  return (
    <>
      <Header level={1} title={title} />
      <IndexPosts hero={heroPost} more={morePosts} />
    </>
  )
}
