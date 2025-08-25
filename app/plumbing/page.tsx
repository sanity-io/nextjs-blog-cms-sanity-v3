// app/plumbing/page.tsx
//
// Service hub page for the Plumbing category. Lists all Québec cities and
// links to the corresponding city/service pages. Provides structured
// metadata including canonical URL and an ItemList JSON‑LD schema.

import type { Metadata } from 'next'
import Link from 'next/link'
import { cities, services } from '@/lib/solovoro'

const service = services.find((s) => s.slug === 'plumbing')!

export function generateMetadata(): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://solovoro.ca'
  const url = `${siteUrl}/${service.slug}`
  const title = `${service.name} services in Québec | Solovoro`
  const description = `Discover the best ${service.name.toLowerCase()} companies across Québec. Browse providers in Montreal, Laval, Longueuil, Québec City, Gatineau and Sherbrooke.`
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  }
}

export default function Page() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://solovoro.ca'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${service.name} services in Québec`,
    itemListElement: cities.map((city, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/${city.slug}/${service.slug}`,
      name: `${service.name} in ${city.name}`,
    })),
  }
  return (
    <main className="prose mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-4">{service.name} services across Québec</h1>
      <p className="mb-6">
        Find trusted {service.name.toLowerCase()} companies in major Québec cities.
        Select your city below to get started.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        {cities.map((city) => (
          <li key={city.slug}>
            <Link href={`/${city.slug}/${service.slug}`}>
              {service.name} in {city.name}
            </Link>
          </li>
        ))}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}