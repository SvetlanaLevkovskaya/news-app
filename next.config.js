/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    GUARDIAN_API_URL: process.env.GUARDIAN_API_URL
  },
  images: {
    unoptimized: true,
    domains: [
      'media.guim.co.uk',
    ]

  },
}

module.exports = nextConfig
