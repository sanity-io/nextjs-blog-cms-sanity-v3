import Link from 'next/link'
import type { Metadata } from 'next'
import { cities } from '@/lib/solovoro'

export const metadata: Metadata = {
  title: 'Cleaning Services Across Canada | Solovoro',
  description: 'Find quality cleaning services across Canada. Choose your city to get started.',
  alternates: {
    canonical: '/cleaning',
  },
}

export default function CleaningPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Cleaning Services</h1>
      <p>
        Looking for professional cleaning services across Canada? Select your city below to get
        started.
      </p>
      <ul>
        {cities.map(({ slug, name }) => (
          <li key={slug} style={{ marginBottom: '8px' }}>
            <Link href={`/${slug}/cleaning`}>Cleaning in {name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
