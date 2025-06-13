/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack(config) {
    config.ignoreWarnings = [
      {
        module: /@supabase\/realtime-js/,
        message: /the request of a dependency is an expression/,
      },
    ];
    return config;
  },
}

export default nextConfig
