import Link from 'next/link'
import type { Metadata } from 'next'
import { cities } from '@/lib/solovoro'

export const metadata: Metadata = {
  title: 'Roofing Services Across Canada | Solovoro',
  description: 'Need professional roofing services across Canada? Choose your city to get started.',
  alternates: {
    canonical: '/roofing',
  },
}

export default function RoofingPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Roofing Services</h1>
      <p>Need professional roofing services across Canada? Select your city below to get started.</p>
      <ul>
        {cities.map(({ slug, name }) => (
          <li key={slug} style={{ marginBottom: '8px' }}>
            <Link href={`/${slug}/roofing`}>Roofing in {name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
