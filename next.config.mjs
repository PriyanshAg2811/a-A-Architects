/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dhnxyhcwv/image/upload/**' }],
    formats: ['image/avif', 'image/webp'],
    qualities: [80],
    deviceSizes: [480, 640, 750, 1080, 1440, 1920, 2560],
  },
}

export default nextConfig
