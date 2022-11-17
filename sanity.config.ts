/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { PostsPreview } from 'components/Posts/PostsPreview'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { productionUrl } from 'plugins/productionUrl'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import authorType from 'schemas/author'
import postType from 'schemas/post'
import settingsType from 'schemas/settings'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  // @TODO: update next-sanity/studio to automatically set this when needed
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [settingsType, postType, authorType],
  },
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),

      // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === 'post') {
          return S.document().views([
            S.view.form(),
            S.view.component(PostsPreview).title('Preview'),
          ])
        }

        return null
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [postType.name, settingsType.name],
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
