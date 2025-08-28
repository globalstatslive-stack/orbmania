/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@orbmania/types', '@orbmania/ui'],
  experimental: {
    optimizePackageImports: ['@orbmania/types', '@orbmania/ui'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;