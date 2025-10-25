/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ✅ Disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true,   // ✅ Skip TypeScript errors during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {}, // keeps Turbopack happy
    },
  },
};

export default nextConfig;
