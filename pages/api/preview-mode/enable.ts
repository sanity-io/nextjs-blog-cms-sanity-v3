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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    isValid,
    redirectTo = '/',
    studioPreviewPerspective,
  } = await validatePreviewUrl(client, req.url)
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable Preview Mode by setting the cookies, and current selected perspective as preview data that can be retrieved in getStaticProps
  res.setPreviewData(studioPreviewPerspective)

  res.redirect(redirectTo)
}
