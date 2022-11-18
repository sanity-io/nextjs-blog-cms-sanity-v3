/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 */
import { Card, Text } from '@sanity/ui'
import { getSecret } from 'plugins/productionUrl/utils'
import React, { memo, Suspense, useDeferredValue } from 'react'
import { useClient } from 'sanity'
import { suspend } from 'suspend-react'

type Props = {
  slug?: string
  previewSecretId: `${string}.${string}`
  apiVersion: string
}

export default function PostPreviewPane(props: Props) {
  const { previewSecretId, apiVersion } = props
  // The useDeferredValue hook helps with reducing the amount of times `/api/preview` gets called if
  // the user is manually typing out the slug instead of using the `Generate` button
  const slug = useDeferredValue(props.slug)
  console.log('slug', props.slug, slug)

  // if the document has no slug for the preview iframe
  if (!slug) {
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
        <Iframe
          apiVersion={apiVersion}
          previewSecretId={previewSecretId}
          slug={slug}
        />
      </Suspense>
    </Card>
  )
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret')
const Iframe = memo(function Iframe(
  props: Omit<Props, 'slug'> & Required<Pick<Props, 'slug'>>
) {
  const { apiVersion, slug, previewSecretId } = props
  const client = useClient({ apiVersion })

  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    [fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    { lifespan: 60000 }
  )

  const url = new URL('/api/preview', location.origin)
  url.searchParams.set('slug', slug)
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  return (
    <iframe style={{ width: '100%', height: '100%' }} src={url.toString()} />
  )
})
