// lib/solovoro.ts
//
// This module centralizes the list of supported services and cities for
// the Solovoro lead‑generation platform. Each service and city entry
// includes a slug used in URL construction along with a human‑readable
// name. This data is consumed throughout the app—for example when
// building the sitemap, validating dynamic route parameters or
// constructing metadata.

export type Service = {
  /**
   * A URL‑friendly identifier used in route segments (e.g. `/moving`).
   */
  slug: 'moving' | 'plumbing' | 'cleaning' | 'roofing'
  /**
   * A human friendly name for the service.
   */
  name: string
}

export type City = {
  /**
   * A URL‑friendly identifier used in route segments (e.g. `/montreal`).
   */
  slug:
    | 'montreal'
    | 'laval'
    | 'longueuil'
    | 'quebec-city'
    | 'gatineau'
    | 'sherbrooke'
  /**
   * Human friendly city name with proper capitalization and accents.
   */
  name: string
  /**
   * Canadian province abbreviation. Phase 1 focuses exclusively on Québec
   * (QC) but the type is included for future expansions.
   */
  province: 'QC'
}

// Core service offerings available on the platform. When adding new
// services in future phases, extend this array and update the Service
// type accordingly.
export const services: Service[] = [
  { slug: 'moving', name: 'Moving' },
  { slug: 'plumbing', name: 'Plumbing' },
  { slug: 'cleaning', name: 'Cleaning' },
  { slug: 'roofing', name: 'Roofing' },
]

// List of Québec cities targeted in Phase 1. Each entry defines a
// slug and a display name. New cities can be appended here when
// expanding beyond Québec.
export const cities: City[] = [
  { slug: 'montreal', name: 'Montreal', province: 'QC' },
  { slug: 'laval', name: 'Laval', province: 'QC' },
  { slug: 'longueuil', name: 'Longueuil', province: 'QC' },
  { slug: 'quebec-city', name: 'Québec City', province: 'QC' },
  { slug: 'gatineau', name: 'Gatineau', province: 'QC' },
  { slug: 'sherbrooke', name: 'Sherbrooke', province: 'QC' },
]