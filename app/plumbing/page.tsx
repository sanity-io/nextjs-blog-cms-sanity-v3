import Link from 'next/link'
import type { Metadata } from 'next'
import { cities } from '@/lib/solovoro'

export const metadata: Metadata = {
  title: 'Plumbing Services Across Canada | Solovoro',
  description: 'Find trusted plumbing services across Canada. Choose your city to get started.',
  alternates: {
    canonical: '/plumbing',
  },
}

export default function PlumbingPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Plumbing Services</h1>
      <p>
        Looking for professional plumbing services across Canada? Select your city below to get
        started.
      </p>
      <ul>
        {cities.map(({ slug, name }) => (
          <li key={slug} style={{ marginBottom: '8px' }}>
            <Link href={`/${slug}/plumbing`}>Plumbing in {name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
