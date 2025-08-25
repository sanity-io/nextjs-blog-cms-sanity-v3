// app/[city]/[service]/page.tsx
//
// Dynamic route for a specific city and service combination. This
// server component validates the incoming URL segments against the
// canonical list of services and cities, generates structured metadata
// (including a canonical link and JSON‑LD schema) and renders a
// service/city landing page with a lead capture form.

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
// We do not link to other routes from the city/service page, so avoid
// importing unused modules.
import { cities, services } from '@/lib/solovoro'

// Revalidate this page once every 24 hours (86400 seconds) to
// accommodate daily content updates and signal freshness to crawlers.
export const revalidate = 86400

// Helper to look up a service and city by slug. Returns null if
// either segment is invalid.
function resolveSlugs(citySlug: string, serviceSlug: string) {
  const city = cities.find((c) => c.slug === citySlug) || null
  const service = services.find((s) => s.slug === serviceSlug) || null
  return { city, service }
}

type Props = { params: { city: string; service: string } }

// Generate page metadata. Next.js will merge this with site‑wide
// defaults defined in the root layout. We include a canonical link
// via the alternates field and craft a descriptive title and
// description for SEO.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = resolveSlugs(params.city, params.service)
  if (!city || !service) {
    // Trigger the 404 page if the slugs are unknown.
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://solovoro.ca'
  const url = `${siteUrl}/${city.slug}/${service.slug}`
  const title = `${service.name} in ${city.name} | Solovoro`
  const description = `Looking for ${service.name.toLowerCase()} services in ${city.name}? Solovoro connects you with trusted professionals.`

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

// Render the dynamic city/service page. Includes a JSON‑LD script for
// structured data. The form posts to `/api/lead` and includes hidden
// fields with normalized city and service slugs so the API can
// associate leads accurately.
export default function Page({ params }: Props) {
  const { city, service } = resolveSlugs(params.city, params.service)
  if (!city || !service) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://solovoro.ca'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Service', 'LocalBusiness'],
    name: `${service.name} in ${city.name}`,
    description: `Find the best ${service.name.toLowerCase()} services in ${city.name}.`,
    serviceType: service.name,
    areaServed: {
      '@type': 'City',
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.province,
        addressCountry: 'CA',
      },
    },
    provider: {
      '@type': 'Organization',
      name: 'Solovoro',
      url: siteUrl,
    },
  }

  return (
    <main className="prose mx-auto max-w-4xl p-6">
      {/* Page heading */}
      <h1 className="text-3xl font-bold mb-4">
        {service.name} services in {city.name}
      </h1>
      <p className="mb-6">
        Solovoro connects you with top‑rated providers for {service.name.toLowerCase()} services
        in {city.name}. Fill out the form below to request a quote and we'll
        match you with trusted professionals.
      </p>

      {/* Lead capture form */}
      <form
        action="/api/lead"
        method="POST"
        className="flex flex-col space-y-4"
      >
        {/* Hidden normalized values used by the API */}
        <input type="hidden" name="city" value={city.slug} />
        <input type="hidden" name="service" value={service.slug} />

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="border rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 font-medium">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="border rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 font-medium">Phone</span>
          <input
            type="tel"
            name="phone"
            required
            placeholder="(555) 123‑4567"
            className="border rounded px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Request a Quote
        </button>
      </form>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}