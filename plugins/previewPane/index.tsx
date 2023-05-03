// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import type { SanityDocument } from 'sanity'
import type { DefaultDocumentNodeResolver } from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import authorType from 'schemas/author'
import postType from 'schemas/post'

import AuthorAvatarPreviewPane from './AuthorAvatarPreviewPane'
import PostPreviewPane from './PostPreviewPane'

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
}: {
  apiVersion: string
  previewSecretId: `${string}.${string}`
}): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case authorType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <AuthorAvatarPreviewPane
                name={document.displayed.name as any}
                picture={document.displayed.picture as any}
              />
            ))
            .title('Preview'),
        ])

      case postType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <PostPreviewPane
                slug={document.displayed.slug?.current}
                apiVersion={apiVersion}
                previewSecretId={previewSecretId}
              />
            ))
            .title('Preview'),
          S.view
            .component(Iframe)
            .options({
              url: async (doc: SanityDocument) => {
                const url = new URL('/api/preview', location.origin)
                url.searchParams.set(
                  'slug',
                  (doc.slug as any)?.current as string
                )
                return url.toString()
              },
            })
            .title('Super Preview'),
        ])

      default:
        return null
    }
  }
}
