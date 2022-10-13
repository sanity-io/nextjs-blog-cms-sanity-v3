/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: true,
  },
}
