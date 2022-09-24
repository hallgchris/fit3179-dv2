const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
  assetPrefix: "/fit3179-dv2/",
  basePath: "/fit3179-dv2",
};

module.exports = nextConfig;
