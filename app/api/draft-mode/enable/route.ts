import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { createClient } from 'next-sanity'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

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

export const { GET } = defineEnableDraftMode({ client })
