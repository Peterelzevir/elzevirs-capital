/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com'],
  },
  experimental: {
    // Removing optimizeCss which requires critters module
    scrollRestoration: true,
  },
}

module.exports = nextConfig
