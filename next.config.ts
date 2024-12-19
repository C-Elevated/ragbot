
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
        permanent: false,
      },
      {
        source: '/auth/confirm',
        destination: '/auth/callback',
        permanent: false,
      }
    ];
  },
  auth: {
    redirects: {
      callback: '/auth/callback',
      afterAuth: '/',
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    ppr: false
  },
  poweredByHeader: false,
};

export default nextConfig;
