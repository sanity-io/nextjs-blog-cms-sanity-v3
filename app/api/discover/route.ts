// app/api/discover/route.ts
//
// Phase 2: AI discovery API.
//
// This API endpoint exposes structured service information for AI
// assistants and other automated consumers. It accepts `city` and
// `service` query parameters, validates them against the canonical
// registry defined in `lib/solovoro.ts`, and returns a JSON payload
// containing provider listings (currently a placeholder), metadata,
// canonical URLs and simple trust signals. The response format is
// designed to be easily parseable by language models and other
// agents that need authoritative data on local services.

import { NextResponse } from 'next/server'
import { services, cities } from '@/lib/solovoro'

// Specify that this route should always be evaluated on demand. We
// don't leverage Next.js revalidation here because data may change
// frequently, and AI consumers should always receive the latest
// information.
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const citySlug = searchParams.get('city')
  const serviceSlug = searchParams.get('service')

  if (!citySlug || !serviceSlug) {
    return NextResponse.json(
      { error: 'Missing city or service query parameter' },
      { status: 400 },
    )
  }

  const city = cities.find((c) => c.slug === citySlug)
  const service = services.find((s) => s.slug === serviceSlug)

  if (!city || !service) {
    return NextResponse.json(
      { error: 'Invalid city or service' },
      { status: 404 },
    )
  }

  // TODO: integrate actual provider lookup once our provider database
  // or third‑party integrations are ready. For now we return an
  // empty array to illustrate the shape of the response.
  const providers: Array<{
    name: string
    url: string
    rating?: number
    phone?: string
  }> = []

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://solovoro.ca'

  return NextResponse.json({
    city: {
      name: city.name,
      slug: city.slug,
    },
    service: {
      name: service.name,
      slug: service.slug,
    },
    canonical: `${siteUrl}/${city.slug}/${service.slug}`,
    trustSignals: {
      // Basic trust attributes—expand as we integrate reputation data.
      source: 'Solovoro',
      verified: true,
    },
    providers,
  })
}