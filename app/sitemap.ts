// app/sitemap.ts
//
// Generates the XML sitemap for the Solovoro application. This file
// exports a function that Next.js calls at build time to produce a
// static list of all pages on the site. The sitemap includes the
// homepage, service hub pages and every city/service combination.
//
// The `dynamic` export tells Next.js to treat this route as
// completely static regardless of any dynamic segments. Setting
// `force-static` ensures a single, predictable sitemap is emitted at
// build time instead of revalidating on each request.

import type { MetadataRoute } from 'next'
import { services, cities } from '@/lib/solovoro'

// Force Next.js to precompute this sitemap at build time.
export const dynamic = 'force-static'

// Determine the canonical base URL. During deployment this is
// configured via the NEXT_PUBLIC_SITE_URL environment variable. In
// development or fallback scenarios we default to the production
// domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://solovoro.ca'

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.SitemapUrl[] = []

  // Home page
  urls.push({
    url: `${siteUrl}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // Service hubs (e.g. /moving, /plumbing)
  for (const s of services) {
    urls.push({
      url: `${siteUrl}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // City × Service pages (e.g. /montreal/moving)
  for (const c of cities) {
    for (const s of services) {
      urls.push({
        url: `${siteUrl}/${c.slug}/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  return urls
}