import 'server-only'

import { indexQuery, settingsQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import type { PostProps } from '../../types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
function canUseClient() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

export async function getTitle() {
  let title = 'Blog.'
  if (canUseClient()) {
    const settings = await getClient().fetch(settingsQuery)
    title = settings?.title || title
  }
  return title
}

export async function getAllPosts(): Promise<PostProps[]> {
  if (canUseClient()) {
    return (await getClient().fetch(indexQuery)) || []
  }
  return []
}