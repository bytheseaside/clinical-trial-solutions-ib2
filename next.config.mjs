/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
    ],
  },

  redirects: async () => [
    {
      source: '/signin',
      destination: '/api/auth/login',
      permanent: true,
    },
    {
      source: '/login',
      destination: '/api/auth/login',
      permanent: true,
    },
    {
      source: '/logout',
      destination: '/api/auth/logout',
      permanent: true,
    },
  ],
};

export default nextConfig;
