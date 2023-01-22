const BASE_URL = 'https://docs.sanity.io/help/'

export function generateHelpUrl(slug: string): string {
  return BASE_URL + slug
}
