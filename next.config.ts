/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mun-website-images.s3.ap-south-1.amazonaws.com",
      },
    ],
    domains: ["images.unsplash.com", "api.microlink.io"], 
  },
};

module.exports = nextConfig;
