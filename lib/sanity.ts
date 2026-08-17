import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

export const sanityClient = client
