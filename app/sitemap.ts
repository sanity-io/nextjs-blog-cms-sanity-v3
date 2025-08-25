import type { MetadataRoute } from 'next';
import { services, cities } from '../lib/solovoro';

// Use site URL from env or default
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solovoro.ca';

// Generate sitemap statically at build time
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.SitemapUrl[] = [];

  // Homepage
  urls.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  // Service/city combinations
  services.forEach((service) => {
    cities.forEach((city) => {
      urls.push({
        url: `${siteUrl}/${city.slug}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Service hubs
  services.forEach((service) => {
    urls.push({
      url: `${siteUrl}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return urls;
}
