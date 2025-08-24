import { Metadata } from 'next';
import Link from 'next/link';

/**
 * Dynamic page component for service/location landing pages.
 *
 * This file uses Next.js App Router dynamic segments (`[city]` and `[service]`) to
 * generate SEO‑friendly pages for each service in a given city. The metadata
 * generator sets a custom title and description based on the current URL
 * parameters, which helps search engines understand the purpose of the page.
 *
 * The main page reuses the same lead form as the homepage, but prepopulates
 * hidden inputs for the selected service and city so the API receives the
 * correct values when the form is submitted. Users can simply enter their
 * contact information and submit to receive quotes from local providers.
 */
interface PageProps {
  params: {
    city: string;
    service: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, service } = params;
  const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  return {
    title: `${serviceName} in ${cityName} | Solovoro`,
    description: `Get free quotes from trusted ${serviceName.toLowerCase()} providers in ${cityName}. Compare estimates and choose the best local professional for your project.`,
    openGraph: {
      title: `${serviceName} in ${cityName} | Solovoro`,
      description: `Get free quotes from trusted ${serviceName.toLowerCase()} providers in ${cityName}.`,
      url: `https://solovoro.ca/${city}/${service}`,
    },
  };
}

export default function ServiceCityPage({ params }: PageProps) {
  const { city, service } = params;
  const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <main style={{ maxWidth: 960, margin: '72px auto', padding: '0 20px' }}>
      <h1
        style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: 42, marginBottom: 12 }}
      >
        {serviceName} in {cityName}
      </h1>
      <p style={{ maxWidth: 560, color: '#444', fontSize: 18, lineHeight: 1.6 }}>
        Get trusted quotes from top {serviceName.toLowerCase()} providers in {cityName}. Fill out the form
        below to receive free estimates from local professionals.
      </p>

      <div style={{ height: 12 }} />

      {/* Lead form posting to our API. Hidden inputs prefill the service and city. */}
      <form action="/api/lead" method="POST" style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email" required />
        {/* Show the city as a read‑only field so users understand what they are requesting quotes for. */}
        <input name="city" defaultValue={cityName} readOnly />
        {/* Hidden field for service used by the API */}
        <input type="hidden" name="service" defaultValue={serviceName} />
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
  );
}
