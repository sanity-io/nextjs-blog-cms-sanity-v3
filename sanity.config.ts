import { createConfig, Slug } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import authorType from './schemas/author'
import postType from './schemas/post'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const basePath = '/studio'

export default createConfig({
  projectId,
  dataset,
  basePath,
  name: 'blog',
  title: 'Blog',
  plugins: [deskTool(), unsplashImageAsset()],
  schema: { types: [postType, authorType] },
  document: {
    productionUrl: async (prev, { document }) => {
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
      if (!secret && process.env.NODE_ENV === 'production') {
        console.warn('No preview secret set. Previews disabled.')
        return prev
      }
      const url = new URL('/api/preview', location.origin)
      if (secret) {
        url.searchParams.set('secret', secret)
      }

      try {
        switch (document._type) {
          case postType.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          default:
            return prev
        }
        return url.toString()
      } catch {
        return prev
      }
    },
  },
})
