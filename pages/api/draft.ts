import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error(
    'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
  )
}
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  if (!req.url) {
    throw new Error('Missing url')
  }
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    req.url,
  )
  if (!isValid) {
    return res.status(401).send('Invalid secret')
  }
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true })
  res.writeHead(307, { Location: redirectTo })
  res.end()
}
