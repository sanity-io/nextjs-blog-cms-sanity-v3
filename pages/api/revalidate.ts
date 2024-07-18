/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Dataset: Choose desired dataset or leave at default "all datasets"
 * 5. Trigger on: "Create", "Update", and "Delete"
 * 6. Filter: _type == "post" || _type == "author" || _type == "settings"
 * 7. Projection: Leave empty
 * 8. Status: Enable webhook
 * 9. HTTP method: POST
 * 10. HTTP Headers: Leave empty
 * 11. API version: v2021-03-25
 * 12. Include drafts: No
 * 13. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet)
 * 14. Save the cofiguration
 * 15. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 16. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createClient,
  groq,
  type SanityClient,
  type SanityDocument,
} from 'next-sanity'
import type { ParsedBody } from 'next-sanity/webhook'

export const config = {
  api: {
    /**
     * Next.js will by default parse the body, which can lead to invalid signatures.
     */
    bodyParser: false,
  },
}

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )
    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body?._id !== 'string' || !body?._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body as any)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

async function parseBody<Body = SanityDocument>(
  req: NextApiRequest,
  secret?: string,
  waitForContentLakeEventualConsistency: boolean = true,
): Promise<ParsedBody<Body>> {
  let signature = req.headers[SIGNATURE_HEADER_NAME]
  if (Array.isArray(signature)) {
    signature = signature[0]
  }
  if (!signature) {
    console.error('Missing signature header')
    return { body: null, isValidSignature: null }
  }

  if (req.readableEnded) {
    throw new Error(
      `Request already ended and the POST body can't be read. Have you setup \`export {config} from 'next-sanity/webhook' in your webhook API handler?\``,
    )
  }

  const body = await readBody(req)
  const validSignature = secret
    ? await isValidSignature(body, signature, secret.trim())
    : null

  if (validSignature !== false && waitForContentLakeEventualConsistency) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return {
    body: body.trim() ? JSON.parse(body) : null,
    isValidSignature: validSignature,
  }
}

async function readBody(readable: NextApiRequest): Promise<string> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

type StaleRoute = '/' | `/posts/${string}`

async function queryStaleRoutes(
  body: Pick<
    ParsedBody<SanityDocument>['body'],
    '_type' | '_id' | 'date' | 'slug'
  >,
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // Handle possible deletions
  if (body._type === 'post') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      const staleRoutes: StaleRoute[] = ['/']
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/posts/${(body.slug as any).current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == "post"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date },
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [...new Set([...(await queryAllRoutes(client)), ...staleRoutes])]
      }
      return staleRoutes
    }
  }

  switch (body._type) {
    case 'author':
      return await queryStaleAuthorRoutes(client, body._id)
    case 'post':
      return await queryStalePostRoutes(client, body._id)
    case 'settings':
      return await queryAllRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

async function _queryAllRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "post"].slug.current`)
}

async function queryAllRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const slugs = await _queryAllRoutes(client)

  return ['/', ...slugs.map((slug) => `/posts/${slug}` as StaleRoute)]
}

async function mergeWithMoreStories(
  client,
  slugs: string[],
): Promise<string[]> {
  const moreStories = await client.fetch(
    groq`*[_type == "post"] | order(date desc, _updatedAt desc) [0...3].slug.current`,
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllRoutes(client)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStaleAuthorRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "author" && _id == $id] {
    "slug": *[_type == "post" && references(^._id)].slug.current
  }["slug"][]`,
    { id },
  )

  if (slugs.length > 0) {
    slugs = await mergeWithMoreStories(client, slugs)
    return ['/', ...slugs.map((slug) => `/posts/${slug}`)]
  }

  return []
}

async function queryStalePostRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "post" && _id == $id].slug.current`,
    { id },
  )

  slugs = await mergeWithMoreStories(client, slugs)

  return ['/', ...slugs.map((slug) => `/posts/${slug}`)]
}
