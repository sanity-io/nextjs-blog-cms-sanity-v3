import Link from 'next/link'
import type { Metadata } from 'next'
import { cities } from '@/lib/solovoro'

export const metadata: Metadata = {
  title: 'Moving Services Across Canada | Solovoro',
  description: 'Find reliable moving services across Canada. Choose your city to get started.',
  alternates: { canonical: '/moving' },
}

export default function MovingPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Moving Services</h1>
      <p>
        Looking for professional moving services across Canada? Select your city below to get
        started.
      </p>
      <ul>
        {cities.map(({ slug, name }) => (
          <li key={slug} style={{ marginBottom: '8px' }}>
            <Link href={`/${slug}/moving`}>Moving in {name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
