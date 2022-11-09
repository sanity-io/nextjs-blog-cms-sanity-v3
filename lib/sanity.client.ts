/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export function canUseClient() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}
