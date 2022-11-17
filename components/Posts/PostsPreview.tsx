/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 * It's imported in `sanity.config.ts´ and used as a component in the defaultDocumentNode function.
 */
import { Card, Text } from '@sanity/ui'
import { previewSecretId } from 'lib/sanity.api'
import { getSecret } from 'plugins/productionUrl/utils'
import React, { Suspense } from 'react'
import { useClient } from 'sanity'
import { suspend } from 'suspend-react'

export function PostsPreview(props: any) {
  const client = useClient()
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
      <Suspense fallback="Loading...">
        <iframe
          style={{ width: '100%', height: '100%' }}
          src={getUrl({ client, document: props.document })}
        />
      </Suspense>
    </Card>
  )
}

const fetchSecret = Symbol('preview.secret')
function getUrl({ client, document }) {
  const url = new URL('/api/preview', location.origin)

  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    [fetchSecret],
    { lifespan: 60000 }
  )
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  url.searchParams.set('slug', document.displayed.slug?.current!)

  return url.toString()
}
