/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    {
      protocol: "https",
      hostname: "i.ibb.co",
    }
    ],
  },
};

export default nextConfig;
