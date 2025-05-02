import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // La opción experimental ya no es necesaria en Next.js 15+ ya que appDir es el comportamiento predeterminado
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
