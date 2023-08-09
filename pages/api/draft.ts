import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
  useCdn,
} from 'lib/sanity.api'
import { postBySlugQuery } from 'lib/sanity.queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

function redirectToPreview(
  res: NextApiResponse<string | void>,
  Location: '/' | `/posts/${string}`,
): void {
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true })
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

const _client = createClient({ projectId, dataset, apiVersion, useCdn })

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  if (!req.query.secret) {
    return res.status(401).send('Invalid secret')
  }

  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    throw new Error(
      'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
    )
  }
  const client = _client.withConfig({ token })

  // Ensure the actor attempting to start Draft Mode is allowed to do so
  const validSecret = await isValidSecret(
    client,
    previewSecretId,
    Array.isArray(req.query.secret) ? req.query.secret[0] : req.query.secret,
  )
  if (!validSecret) {
    return res.status(401).send('Invalid secret')
  }

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/')
  }

  // Check if the post with the given `slug` exists
  const post = await client.fetch(postBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).send('Invalid slug')
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/posts/${post.slug}`)
}
