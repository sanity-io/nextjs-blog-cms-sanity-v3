/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 * It's imported in `sanity.config.ts´ and used as a component in the defaultDocumentNode function.
 */
import { Card, Text } from '@sanity/ui'
import React from 'react'

export function PostsPreview(props: any) {
  // if the document has no slug for the preview iframe
  if (!props.document.displayed.slug) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the post to see the preview!
        </Text>
      </Card>
    )
  }

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
