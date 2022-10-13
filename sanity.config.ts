import { visionTool } from '@sanity/vision'
import { createConfig, Slug } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import authorType from './schemas/author'
import postType from './schemas/post'
import settingsType from './schemas/settings'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const basePath = '/studio'

export default createConfig({
  projectId,
  dataset,
  basePath,
  name: 'blog',
  title: 'Blog',
  plugins: [
    deskTool({
      structure: (S) => {
        // The `Settings` root list item
        const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title('Settings')
            .child(
              S.document()
                .schemaType('settings')
                .documentId('settings')
                .title('Settings')
            )

        // The default root list items (except custom ones)
        const defaultListItems = S.documentTypeListItems().filter(
          (listItem) => listItem.getId() !== 'settings'
        )

        return S.list()
          .title('Content')
          .items([settingsListItem, S.divider(), ...defaultListItems])
      },
    }),
    unsplashImageAsset(),
    visionTool({
      defaultApiVersion: '2022-08-08',
    }),
  ],
  schema: {
    types: [settingsType, postType, authorType],
  },
  document: {
    productionUrl: async (prev, { document }) => {
      const url = new URL('/api/preview', location.origin)
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
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
