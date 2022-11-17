import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import { createClient as _createClient } from 'next-sanity'

export const createClient = () =>
  _createClient({ projectId, dataset, apiVersion, useCdn })
