// next.config.mjs – disable ESLint completely
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: true,
  },
};

export default nextConfig;
