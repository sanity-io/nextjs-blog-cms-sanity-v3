import React from 'react'
import { Card } from '@sanity/ui'

export function PostsPreview(props: any) {
  return (
    <Card scheme="light" style={{ width: '100%', height: '100%' }}>
      <iframe style={{ width: '100%', height: '100%' }} src={getUrl(props)} />
    </Card>
  )
}

function getUrl({ document }) {
  const url = new URL('/api/preview', location.origin)
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  url.searchParams.set('slug', document.displayed.slug?.current!)

  return url.toString()
}
