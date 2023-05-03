import {
  apiVersion,
  dataset,
  projectId,
  studioBasePath,
  useCdn,
} from 'lib/sanity.api'
import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      studioUrl: studioBasePath,
      resultSourceMap: process.env.SANITY_ENABLE_CONTENT_SOURCE_MAP === 'true',
      logger: console,
    })
  : null
const getClient = (token: string | null) =>
  token
    ? sanityClient.withConfig({
        token,
        perspective: 'previewDrafts',
        apiVersion: 'X',
      })
    : sanityClient

export async function getSettings(token: string | null): Promise<Settings> {
  if (sanityClient) {
    const client = getClient(token)
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

export async function getAllPosts(token: string | null): Promise<Post[]> {
  if (sanityClient) {
    const client = getClient(token)
    return (await client.fetch(indexQuery)) || []
  }
  return []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (sanityClient) {
    const client = getClient(null)
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPostBySlug(
  slug: string,
  token: string | null
): Promise<Post> {
  if (sanityClient) {
    const client = getClient(token)
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getPostAndMoreStories(
  slug: string,
  token: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  if (sanityClient) {
    const client = getClient(token)
    return await client.fetch(postAndMoreStoriesQuery, { slug })
  }
  return { post: null, morePosts: [] }
}
