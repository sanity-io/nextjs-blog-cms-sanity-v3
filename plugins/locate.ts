import { map, Observable } from 'rxjs'
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation'

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'settings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState
  }

  if (params.type === 'post') {
    // Listen to the query and fetch the draft and published document
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id && defined(slug.current)][0]{slug,title}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<{
      slug: { current: string }
      title: string | null
    } | null>

    return doc$.pipe(
      map((doc) => {
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/posts/${doc.slug.current}`,
            },
            {
              title: 'Home',
              href: `/`,
            },
          ],
        }
      }),
    )
  }

  if (params.type === 'author') {
    // Fetch all posts that reference the viewed author, if the post has a slug defined
    const doc$ = context.documentStore.listenQuery(
      `*[_type == "post" && references($id) && defined(slug.current)]{slug,title}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      {
        slug: { current: string }
        title: string | null
      }[]
    >

    return doc$.pipe(
      map((docs) => {
        return {
          locations: docs?.map((doc) => ({
            title: doc.title || 'Untitled',
            href: `/posts/${doc.slug.current}`,
          })),
        }
      }),
    )
  }

  return null
}
