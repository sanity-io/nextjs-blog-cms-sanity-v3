// app/[city]/[service]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClientLeadForm from "@/components/ClientLeadForm";

/**
 * ROUTE PARAM TYPES (fix for TS constraint errors)
 */
type Params = {
  city: string;
  service: string;
};

// Rebuild the page every 24h (ISR)
export const revalidate = 86400;

/**
 * Canonical data (kept local to avoid external deps breaking the build)
 * Slugs must be lowercase.
 */
const CITY_LABELS: Record<string, string> = {
  montreal: "Montreal",
  laval: "Laval",
  longueuil: "Longueuil",
  "quebec-city": "Quebec City",
  gatineau: "Gatineau",
  sherbrooke: "Sherbrooke",
};

const SERVICE_LABELS: Record<string, string> = {
  moving: "Moving",
  plumbing: "Plumbing",
  cleaning: "Cleaning",
  roofing: "Roofing",
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://solovoro.ca";

/** Helpers */
const isValidCity = (c: string) => Object.prototype.hasOwnProperty.call(CITY_LABELS, c);
const isValidService = (s: string) =>
  Object.prototype.hasOwnProperty.call(SERVICE_LABELS, s);

const cityLabel = (c: string) => CITY_LABELS[c] ?? c;
const serviceLabel = (s: string) => SERVICE_LABELS[s] ?? s;

const canonicalFor = (city: string, service: string) =>
  `${SITE}/${city}/${service}`;

/**
 * METADATA (App Router compatible)
 */
export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const city = params.city?.toLowerCase();
  const service = params.service?.toLowerCase();

  if (!isValidCity(city) || !isValidService(service)) {
    // Let Next.js render the 404 page for invalid slugs.
    return {
      title: "Not found | Solovoro",
      robots: { index: false, follow: false },
    };
  }

  const title = `${serviceLabel(service)} in ${cityLabel(city)} | Solovoro`;
  const description = `Get trusted quotes for ${serviceLabel(service).toLowerCase()} in ${cityLabel(city)}. Compare vetted local providers and get fast estimates from Solovoro.`;

  const canonical = canonicalFor(city, service);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Solovoro",
      type: "website",
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * PAGE
 */
export default function Page(
  { params }: { params: Params }
) {
  const city = params.city?.toLowerCase();
  const service = params.service?.toLowerCase();

  if (!isValidCity(city) || !isValidService(service)) {
    notFound();
  }

  const capCity = cityLabel(city);
  const capService = serviceLabel(service);

  const canonical = canonicalFor(city, service);

  // JSON-LD for Service page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${capService} in ${capCity}`,
    areaServed: {
      "@type": "City",
      name: capCity,
      address: {
        "@type": "PostalAddress",
        addressCountry: "CA",
        addressRegion: "QC",
      },
    },
    provider: {
      "@type": "Organization",
      name: "Solovoro",
      url: SITE,
      logo: `${SITE}/logo.png`,
      sameAs: [
        // add socials when available
      ],
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      url: canonical,
      availability: "https://schema.org/InStock",
    },
    potentialAction: {
      "@type": "Action",
      name: "Request Quote",
      target: `${SITE}/api/lead`,
      "query-input": [
        "required name name",
        "required email email",
        "required text city",
        "required text service",
      ],
    },
  };

  return (
    <main style={{ maxWidth: 960, margin: "72px auto", padding: "0 20px" }}>
      {/* Canonical (for safety if you also set alternates in metadata) */}
      <link rel="canonical" href={canonical} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1
        style={{
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontSize: 42,
          marginBottom: 12,
        }}
      >
        {capService} in {capCity}
      </h1>

      <p style={{ maxWidth: 560, color: "#444", fontSize: 18, lineHeight: 1.6 }}>
        Get trusted quotes from top {capService.toLowerCase()} providers in {capCity}. Fill
        out the form below to receive free estimates from vetted local companies.
      </p>

      <ul style={{ margin: "16px 0 24px 20px", color: "#444" }}>
        <li>Fast responses — usually within hours</li>
        <li>Verified local providers</li>
        <li>No commitment, free to compare</li>
      </ul>

      <div style={{ height: 12 }} />

      <ClientLeadForm city={city} service={service} />

      <div style={{ height: 28 }} />

      <nav style={{ fontSize: 16 }}>
        <span>Explore more:</span>{" "}
        <Link href={`/${service}`}>All {capService} cities</Link>
        {" · "}
        <Link href={`/montreal/${service}`}>Montreal</Link>
        {" · "}
        <Link href={`/laval/${service}`}>Laval</Link>
        {" · "}
        <Link href={`/longueuil/${service}`}>Longueuil</Link>
      </nav>
    </main>
  );
}


