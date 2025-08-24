import type { MetadataRoute } from 'next'
import { services, cities } from '../lib/solovoro'

// Generate a dynamic sitemap using Next.js metadata file convention.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solovoro.ca'

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.SitemapUrl[] = []

  // Always include the homepage
  urls.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // Generate service/city combinations
  services.forEach((service) => {
    cities.forEach((city) => {
      urls.push({
        url: `${siteUrl}/${city.slug}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  return urls
}
