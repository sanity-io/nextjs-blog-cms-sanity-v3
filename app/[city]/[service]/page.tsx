'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { services, cities } from '@/lib/solovoro'

export async function generateMetadata(
  { params }: { params: { city: string; service: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city, service } = params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://solovoro.ca'
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1)
  const capitalizedService = service.charAt(0).toUpperCase() + service.slice(1)
  const title = `${capitalizedService} in ${capitalizedCity} | Solovoro`
  const description = `Find the best ${capitalizedService.toLowerCase()} services in ${capitalizedCity}. Get free quotes from trusted providers.`
  const canonicalUrl = `${siteUrl}/${city}/${service}`
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Solovoro',
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function Page({ params }: { params: { city: string; service: string } }) {
  const { city, service } = params

  // Ensure only valid city/service slugs render; otherwise show 404
  const isValid =
    services.some((s) => s.slug === service) && cities.some((c) => c.slug === city)
  if (!isValid) {
    notFound()
  }

  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1)
  const capitalizedService = service.charAt(0).toUpperCase() + service.slice(1)

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>
        {capitalizedService} in {capitalizedCity}
      </h1>
      <p>
        Need {capitalizedService.toLowerCase()} services in {capitalizedCity}? Fill out the form
        and we’ll connect you with trusted professionals.
      </p>

      {status === 'success' && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Thanks — your request has been received!
        </p>
      )}
      {status === 'error' && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          Error: please try again later.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        {/* Hidden normalized values */}
        <input type="hidden" name="city" value={city.toLowerCase()} />
        <input type="hidden" name="service" value={service.toLowerCase()} />
        {/* Honeypot field to reduce spam */}
        <input
          type="text"
          name="company"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        <button type="submit" style={{ padding: '12px 16px', fontWeight: 600 }}>
          Get Free Quotes
        </button>
      </form>

      {/* Link back to home page */}
      <p style={{ marginTop: 20 }}>
        <Link href="/">← Back to Home</Link>
      </p>
    </main>
  )
}
