/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.tacdn.com" },
      { protocol: "https", hostname: "cdn-imgix.headout.com" },
      { protocol: "https", hostname: "cdn.getyourguide.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.patrimonionacional.es" },
      { protocol: "https", hostname: "patrimonionacional.es" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      {
        protocol: "https",
        hostname: "isorepublic.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "patrimonionacional.es",
      },
      {
        protocol: "https",
        hostname: "cdn.shortpixel.ai",
      },
      {
        protocol: "https",
        hostname: "offloadmedia.feverup.com",
      },
      {
        protocol: "https",
        hostname: "sh-assets.holidu.com",
      },
      {
        protocol: "https",
        hostname: "estaticos.esmadrid.com",
      },
      {
        protocol: "https",
        hostname: "madride.es",
      },
      {
        protocol: "https",
        hostname: "staticsgrupojulia.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "cdn-imgix.headout.com",
      },

      {
        protocol: "https",
        hostname: "blog.flatsweethome.com",
      },
      {
        protocol: "https",
        hostname: "estaticos.esmadrid.com",
      },
      {
        protocol: "https",
        hostname: "blog.guruwalk.com",
      },
    ],
  },
};

export default nextConfig;
