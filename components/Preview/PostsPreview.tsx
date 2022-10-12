import React from 'react'

export function PostsPreview(props: any) {
  function productionUrl({ document }) {
    const url = new URL('/api/preview', location.origin)
    const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
    if (secret) {
      url.searchParams.set('secret', secret)
    }

    url.searchParams.set('slug', document.displayed.slug?.current!)

    return url.toString()
  }

  return (
    <iframe
      style={{ width: '100%', height: '100%' }}
      src={productionUrl(props)}
    />
  )
}
