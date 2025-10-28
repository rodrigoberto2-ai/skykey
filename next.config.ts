import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      { protocol: "https", hostname: "isorepublic.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.patrimonionacional.es" },
      { protocol: "https", hostname: "patrimonionacional.es" },
      { protocol: "https", hostname: "nomadicniko.com" },
      { protocol: "https", hostname: "madridsecreto.co" },
      { protocol: "https", hostname: "www.esmadrid.com" },
      { protocol: "https", hostname: "staticsgrupojulia.blob.core.windows.net" },
      { protocol: "https", hostname: "cdn-imgix.headout.com" },
      { protocol: "https", hostname: "blog.flatsweethome.com" },
      { protocol: "https", hostname: "blog.guruwalk.com" },
      { protocol: "https", hostname: "madride.es" },
      { protocol: "https", hostname: "sh-assets.holidu.com" },
      { protocol: "https", hostname: "www.theprincipalmadridhotel.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "cms.getnomad.app" },
      { protocol: "https", hostname: "esmadrid.com" },
      { protocol: "https", hostname: "estaticos.esmadrid.com" },
      { protocol: "https", hostname: "assets.simpleviewinc.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "media.tacdn.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "images.ecestaticos.com" },
      { protocol: "https", hostname: "images.adsttc.com" },
    ],
  },
};

export default nextConfig;
