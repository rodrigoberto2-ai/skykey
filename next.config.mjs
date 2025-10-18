/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.tacdn.com' },
      { protocol: 'https', hostname: 'cdn-imgix.headout.com' },
      { protocol: 'https', hostname: 'cdn.getyourguide.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;

