import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientLeadForm from './ClientLeadForm';
import { services, cities } from '../../../lib/solovoro';

interface PageProps {
  params: { city: string; service: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, service } = params;
  const capService = service.charAt(0).toUpperCase() + service.slice(1);
  const capCity = city.charAt(0).toUpperCase() + city.slice(1);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solovoro.ca';
  const url = `${siteUrl}/${city}/${service}`;
  return {
    title: `${capService} in ${capCity} | Solovoro`,
    description: `Get free quotes from trusted ${service} providers in ${capCity}. Compare estimates and choose the best local professional for your project.`,
    openGraph: {
      title: `${capService} in ${capCity} | Solovoro`,
      description: `Get free quotes from trusted ${service} providers in ${capCity}.`,
      url,
    },
    twitter: {
      card: 'summary',
      title: `${capService} in ${capCity} | Solovoro`,
      description: `Get free quotes from trusted ${service} providers in ${capCity}.`,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function Page({ params }: PageProps) {
  const { city, service } = params;

  // Validate service and city slugs against the central lists.
  const isValid =
    services.some((s) => s.slug === service) &&
    cities.some((c) => c.slug === city);
  if (!isValid) notFound();

  const capService = service.charAt(0).toUpperCase() + service.slice(1);
  const capCity = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <main style={{ maxWidth: 960, margin: '72px auto', padding: '0 20px' }}>
      <h1
        style={{
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontSize: 42,
          marginBottom: 12,
        }}
      >
        {capService} in {capCity}
      </h1>
      <p style={{ maxWidth: 560, color: '#444', fontSize: 18, lineHeight: 1.6 }}>
        Get trusted quotes from top {service} providers in {capCity}. Fill out the
        form below to receive free estimates.
      </p>
      <div style={{ height: 12 }} />
      <ClientLeadForm
        city={city}
        service={service}
        capCity={capCity}
        capService={capService}
      />
      <p style={{ marginTop: 20 }}>
        <Link href="/">← Back to Home</Link>
      </p>
    </main>
  );
}