import { indexQuery, settingsQuery } from '../../lib/queries'
import { canUseClient } from '../../lib/sanity.client'
import { getClient } from '../../lib/sanity.server'
import type { PostProps } from '../../types'

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
