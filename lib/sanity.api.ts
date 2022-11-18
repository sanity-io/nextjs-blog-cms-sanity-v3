/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-11-15'
// useCdn == true gives fast, cheap responses using a globally distributed cache.
// When in production the Sanity API is only queried on build-time, and on-demand when responding to webhooks.
// Thus the data need to be fresh and API response time is less important.
// When in development/working locally, it's more important to keep costs down as hot reloading can incurr a lot of API calls
// And every page load calls getStaticProps.
// To get the lowest latency, lowest cost, and latest data, use the Instant Preview mode
export const useCdn =
  typeof document !== 'undefined' && process.env.NODE_ENV === 'production'

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret'
