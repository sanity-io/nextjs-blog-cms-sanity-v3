import 'server-only'

import {
  indexQuery,
  postQuery,
  postSlugsQuery,
  settingsQuery,
} from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import type { PostProps } from '../../types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
function canUseClient() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

export const getTitle = async function getTitle() {
  console.count('getTitle')
  let title = 'Blog.'
  if (canUseClient()) {
    const settings = await getClient().fetch(settingsQuery)
    title = settings?.title || title
  }
  return title
}

export async function getAllPosts(): Promise<PostProps[]> {
  console.count('getAllPosts')
  if (canUseClient()) {
    return (await getClient().fetch(indexQuery)) || []
  }
  return []
}

export async function getAllPostsSlugs(): Promise<Pick<PostProps, 'slug'>[]> {
  console.count('getAllPostsSlugs')
  if (canUseClient()) {
    const slugs = (await getClient().fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPost(
  slug: string
): Promise<{ post: PostProps; morePosts: PostProps[] }> {
  console.count(`getPost(${slug})`)
  if (canUseClient()) {
    return await getClient().fetch(postQuery)
  }
  return { post: null, morePosts: [] }
}
